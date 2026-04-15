import { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelect } from '@divi/data';
import { useFetch } from '@divi/rest';

import { getDefaultShowcaseSettings, SHOWCASE_SETTING_KEY } from '../constants';

/**
 * Showcase draft state, save/discard, and REST persistence (per-post).
 *
 * Pattern: `draft` is editable React state; save writes draft to REST and mirrors into
 * `divi/settings` so the rest of the app sees the same key PHP injected on load. Discard
 * restores draft from the last baseline (initial hydrate or last successful save).
 *
 * @since 0.1.0
 *
 * @returns {Object} Hook API.
 */
export const useShowcaseSettings = () => {
  const { add } = useDispatch('divi/settings');
  const { fetch } = useFetch();

  // Merged defaults + post meta from PHP (`divi_visual_builder_settings_data`); lives in the global VB settings store.
  const serverSettings = useSelect(
    select => select('divi/settings').getSetting(SHOWCASE_SETTING_KEY, getDefaultShowcaseSettings()),
    [],
  );

  // WordPress post ID for the layout being edited; REST requires a real ID, so saves are blocked until the user saves the page once.
  const postId = useSelect(select => {
    const post = select('divi/settings').getSetting(['post']);

    return post?.id ? String(post.id) : '';
  }, []);

  // Working form values only; no network until the user clicks "Save to post" in the modal footer.
  const [draft, setDraft] = useState(() => getDefaultShowcaseSettings());

  // Last "committed" snapshot: initial server/meta merge, then updated only after a successful save. `discardDraft` copies this back into `draft`.
  const baselineRef = useRef(getDefaultShowcaseSettings());

  // Run the server → React merge a single time. Without this guard, later `serverSettings` updates from the store could reset the form while the user is still typing.
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    hydratedRef.current = true;
    const merged = { ...getDefaultShowcaseSettings(), ...serverSettings };

    // `Toggle` expects `'on'` / `'off'`. Only normalize real booleans: an unconditional `merged.enablePolish ? 'on' : 'off'` would mis-handle the string `'off'` because non-empty strings are truthy in JavaScript.
    if ('boolean' === typeof merged.enablePolish) {
      merged.enablePolish = merged.enablePolish ? 'on' : 'off';
    }

    setDraft(merged);
    baselineRef.current = merged;
  }, [serverSettings]);

  // Updates local draft only (instant UI). Contrast with `saveDraft`, which persists to the server and then updates `divi/settings` + baseline.
  const updateDraft = useCallback(updater => {
    setDraft(prev => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }));
  }, []);

  // Network boundary only: POST payload and boolean conversion for PHP; does not update Redux or `baselineRef` (the caller does that after a successful response).
  const persistToServer = useCallback(
    async payload => {
      const id = parseInt(postId, 10);

      if (id < 1) {
        // eslint-disable-next-line no-console
        console.warn('Modal Field Showcase: save skipped until the post has an ID (save the page first).');
        return { ok: false, reason: 'no_post' };
      }

      try {
        await fetch({
          method: 'POST',
          restRoute: '/divi/v1/modal-field-showcase-settings/update',
          data: {
            postId: id,
            data: {
              ...payload,
              enablePolish: 'on' === payload.enablePolish,
            },
          },
          forceRequest: true,
        });
        return { ok: true };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Modal Field Showcase: save failed.', error);
        return { ok: false, reason: 'request' };
      }
    },
    [fetch, postId],
  );

  // Persists draft to post meta via REST, then aligns Redux and baseline so the saved row matches what Discard would revert to.
  const saveDraft = useCallback(async () => {
    const result = await persistToServer(draft);

    if (result.ok) {
      // Keeps `getSetting(SHOWCASE_SETTING_KEY)` consistent for any other code reading the same injected key.
      add(SHOWCASE_SETTING_KEY, { ...draft });
      baselineRef.current = draft;
    }

    return result;
  }, [add, draft, persistToServer]);

  // Throws away unsaved edits by cloning the last baseline (hydrate or post-save), without calling the server.
  const discardDraft = useCallback(() => {
    setDraft({ ...baselineRef.current });
  }, []);

  return {
    draft,
    updateDraft,
    postId,
    saveDraft,
    discardDraft,
  };
};

import { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelect } from '@divi/data';
import { useFetch } from '@divi/rest';

import { getDefaultShowcaseSettings, SHOWCASE_SETTING_KEY } from '../constants';

/**
 * Showcase draft state, save/discard, and REST persistence (per-post).
 *
 * @since 0.1.0
 *
 * @returns {Object} Hook API.
 */
export const useShowcaseSettings = () => {
  const { add } = useDispatch('divi/settings');
  const { fetch } = useFetch();

  const serverSettings = useSelect(
    select => select('divi/settings').getSetting(SHOWCASE_SETTING_KEY, getDefaultShowcaseSettings()),
    [],
  );

  const postId = useSelect(select => {
    const post = select('divi/settings').getSetting(['post']);

    return post?.id ? String(post.id) : '';
  }, []);

  const [draft, setDraft] = useState(() => getDefaultShowcaseSettings());
  const baselineRef = useRef(getDefaultShowcaseSettings());
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    hydratedRef.current = true;
    const merged = { ...getDefaultShowcaseSettings(), ...serverSettings };

    if (true === merged.enablePolish || false === merged.enablePolish) {
      merged.enablePolish = merged.enablePolish ? 'on' : 'off';
    }

    setDraft(merged);
    baselineRef.current = merged;
  }, [serverSettings]);

  const updateDraft = useCallback(updater => {
    setDraft(prev => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }));
  }, []);

  const persistToServer = useCallback(
    async payload => {
      const id = parseInt(postId, 10);

      if (!id || id < 1) {
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

  const saveDraft = useCallback(async () => {
    const result = await persistToServer(draft);

    if (result.ok) {
      add(SHOWCASE_SETTING_KEY, { ...draft });
      baselineRef.current = draft;
    }

    return result;
  }, [add, draft, persistToServer]);

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

/**
 * Merge BorderRadius incremental `onChange` payloads.
 *
 * Simplified merge for local React state: `BorderRadius` passes `params.inputValue` with
 * `{ value, side, sync }`. When sync is on, all corners share `value`; when off, only `side`
 * updates. Full product wiring adds defaults, stricter validation, and store bridges; this file
 * keeps the example self-contained.
 *
 * @since 0.1.0
 *
 * @param {Object} prev Previous radius state.
 * @param {Object} params onChange argument from BorderRadius.
 * @returns {Object} Next radius state.
 */
export const mergeBorderRadiusChange = (prev, params) => {
  const payload = params?.inputValue;

  if (!payload) {
    return prev;
  }

  const next = { ...prev };
  const { value, side, sync } = payload;

  if (undefined !== sync) {
    next.sync = sync;
  }

  if (undefined === value || !side) {
    return next;
  }

  if ('on' === next.sync) {
    next.topLeft = value;
    next.topRight = value;
    next.bottomLeft = value;
    next.bottomRight = value;
  } else {
    next[side] = value;
  }

  return next;
};

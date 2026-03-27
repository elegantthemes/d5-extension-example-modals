/**
 * Merge BorderRadius incremental `onChange` payloads.
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

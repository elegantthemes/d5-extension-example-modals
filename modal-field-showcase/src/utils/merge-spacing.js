/**
 * Merge Spacing field incremental `onChange` payloads into stored padding state.
 *
 * Simplified merge for local React state: handles `isSyncButtonClick` and per-side updates so
 * linked horizontal/vertical padding matches what the `Spacing` field emits. Full module settings
 * in Divi run through Immutable stores and extra guards against stale sync events; this helper
 * omits that stack on purpose so the modal example stays small.
 *
 * @since 0.1.0
 *
 * @param {Object} prev Previous spacing value.
 * @param {Object} inputValue Payload from Spacing `onChange`.
 * @returns {Object} Next spacing value.
 */
export const mergeSpacingChange = (prev, inputValue) => {
  if (!inputValue || 'object' !== typeof inputValue) {
    return prev;
  }

  const next = { ...prev };

  if (true === inputValue.isSyncButtonClick) {
    next.syncHorizontal = inputValue.syncHorizontal;
    next.syncVertical = inputValue.syncVertical;

    const v = inputValue.value;
    const side = inputValue.side;

    if ('on' === inputValue.syncHorizontal) {
      next.left = v;
      next.right = v;
    }

    if ('on' === inputValue.syncVertical) {
      next.top = v;
      next.bottom = v;
    }

    if ('off' === inputValue.syncHorizontal && ('left' === side || 'right' === side)) {
      next[side] = v;
    }

    if ('off' === inputValue.syncVertical && ('top' === side || 'bottom' === side)) {
      next[side] = v;
    }

    return next;
  }

  const { value, side, syncHorizontal, syncVertical } = inputValue;

  next.syncHorizontal = syncHorizontal;
  next.syncVertical = syncVertical;

  if ('on' === syncHorizontal && ('left' === side || 'right' === side)) {
    next.left = value;
    next.right = value;
  } else if ('on' === syncVertical && ('top' === side || 'bottom' === side)) {
    next.top = value;
    next.bottom = value;
  } else if (side) {
    next[side] = value;
  }

  return next;
};

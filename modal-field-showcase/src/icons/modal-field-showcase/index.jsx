/**
 * Toolbar icon for the Modal Field Showcase example.
 *
 * @since 0.1.0
 */

export const name = 'd5-modal-field-showcase';

export const viewBox = '0 0 24 24';

export const component = (color = '#A2B0C1') => (
  <>
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M7 8h10M7 12h6M7 16h8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </>
);

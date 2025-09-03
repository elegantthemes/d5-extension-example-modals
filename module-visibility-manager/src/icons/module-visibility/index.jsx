// Icon data.
export const name      = 'module-visibility'; // Unique name.
export const viewBox   = '0 0 24 24'; // You will need to adjust this to match your SVG.
export const component = (color = '#A2B0C1') => (
  <>
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      fill={color}
    />
  </>
); // Eye SVG icon without the svg tag.

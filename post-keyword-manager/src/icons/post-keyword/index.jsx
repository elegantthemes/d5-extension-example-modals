/**
 * Post Keyword Icon Data.
 *
 * Icon representing keyword/SEO functionality.
 * Uses horizontal lines with a search/keyword indicator circle.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * Divi icons must export three properties:
 * - name: Unique identifier for the icon
 * - viewBox: SVG viewBox attribute (typically '0 0 24 24')
 * - component: Function that returns JSX (without <svg> wrapper)
 *
 * The component function receives a color parameter and should use it
 * for stroke/fill to respect theme colors.
 *
 * @since 0.1.0
 */

// Unique name for the icon.
export const name = 'post-keyword';

// ViewBox for the SVG (defines coordinate system).
export const viewBox = '0 0 24 24';

// Icon component (returns JSX without svg wrapper).
export const component = (color = '#A2B0C1') => (
  <>
    {/* Three horizontal lines representing text/content */}
    <path
      d="M3 7h18M3 12h18M3 17h12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Circle representing keyword/focus indicator */}
    <circle
      cx="19"
      cy="17"
      r="3"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
  </>
);


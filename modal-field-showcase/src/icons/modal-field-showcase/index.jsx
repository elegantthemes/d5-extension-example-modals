/**
 * Toolbar icon for the Modal Field Showcase example.
 *
 * @since 0.1.0
 */

/**
 * Stable icon id: must match `iconSvg.name` on `registerBuilderBarButton` and the key used in `divi.iconLibrary.icon.map`.
 */
export const name = 'd5-modal-field-showcase';

/**
 * SVG `viewBox` for this glyph; keeps stroke alignment when Divi scales the icon in the builder bar.
 */
export const viewBox = '0 0 24 24';

/**
 * Icon body as inline SVG elements; `color` is the stroke fill Divi passes so the mark matches bar theme tokens.
 *
 * @param {string} [color='#A2B0C1'] Stroke color for paths and rect outline.
 * @returns {React.ReactElement} Fragment containing SVG primitives.
 */
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

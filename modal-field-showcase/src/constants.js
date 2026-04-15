/**
 * Default settings for the showcase modal (client + server shape).
 *
 * @since 0.1.0
 */

// Must match the key added in PHP (`divi_visual_builder_settings_data`) so server hydration and `divi/settings` reads stay aligned.
export const SHOWCASE_SETTING_KEY = 'modalFieldShowcaseSettings';

export const getDefaultShowcaseSettings = () => ({
  labelPrefix: '',
  notes: '',
  enablePolish: 'off',
  accentColor: '',
  layoutDensity: 'comfortable',
  emphasisScale: '50',
  readingMeasure: '45em',
  sectionPadding: {
    top: '',
    right: '',
    bottom: '',
    left: '',
    syncHorizontal: 'off',
    syncVertical: 'off',
  },
  cornerRadius: {
    topLeft: '',
    topRight: '',
    bottomLeft: '',
    bottomRight: '',
    sync: 'off',
  },
  borderAll: {
    style: 'solid',
    color: '#333333',
    width: '1px',
  },
  triToggle: {
    a: false,
    b: false,
    c: false,
  },
});

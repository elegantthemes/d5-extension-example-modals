<?php
/**
 * Plugin Name: D5 Extension Example: Modals
 * Plugin URI:  https://github.com/elegantthemes/d5-extension-example-modals
 * Description: Collection of example custom modals for Divi 5 demonstrating different modal implementation patterns and functionality.
 * Version:     0.1.0
 * Author:      Elegant Themes
 * Author URI:  https://elegantthemes.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: d5-extension-example-modals
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 *
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants.
define( 'D5_EXTENSION_EXAMPLE_MODALS_VERSION', '0.1.0' );
define( 'D5_EXTENSION_EXAMPLE_MODALS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'D5_EXTENSION_EXAMPLE_MODALS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'D5_EXTENSION_EXAMPLE_MODALS_PLUGIN_FILE', __FILE__ );

/**
 * Check if Divi theme and Divi 5 Visual Builder are available.
 *
 * @since 0.1.0
 *
 * @return bool
 */
function d5_extension_example_modals_check_requirements() {
	// Check if Divi theme is active.
	$theme = wp_get_theme();
	if ( 'Divi' !== $theme->get( 'Name' ) && 'Divi' !== $theme->get_template() ) {
		return false;
	}

	// Check if required Divi functions exist.
	if ( ! function_exists( 'et_core_is_fb_enabled' ) || ! function_exists( 'et_builder_d5_enabled' ) ) {
		return false;
	}

	return true;
}

/**
 * Initialize the plugin.
 *
 * @since 0.1.0
 */
function d5_extension_example_modals_init() {
	// Load example modules.
	d5_extension_example_modals_load_examples();

	// Register settings data for Divi Visual Builder (priority 20: run after core merges `currentPage`, etc.).
	add_filter( 'divi_visual_builder_settings_data', 'd5_extension_example_modals_add_settings', 20 );

	// Register REST endpoint for saving data.
	add_action( 'rest_api_init', 'd5_extension_example_modals_register_rest_routes' );
}

/**
 * Add plugin settings to Divi Visual Builder settings data.
 *
 * @since 0.1.0
 *
 * @param array $settings The existing settings data.
 * @return array Modified settings data.
 */
function d5_extension_example_modals_add_settings( $settings ) {
	// Load saved module visibility data from database (or empty array for first time).
	$module_visibility_data = get_option( 'divi_module_visibility_settings', array() );
	$settings['moduleVisibilitySettings'] = $module_visibility_data;

	// Load saved post keyword data from database (or empty object for first time).
	$post_keyword_data = get_option( 'divi_post_keyword_settings', array(
		'focusKeyword' => '',
	) );
	$settings['postKeywordSettings'] = $post_keyword_data;

	// Per-post showcase settings (post meta), hydrated using the page being edited.
	$settings = d5_extension_example_modals_merge_modal_field_showcase_settings( $settings );

	return $settings;
}

/**
 * Register REST endpoints for saving plugin data.
 * Following D5 pattern from RESTRegistration.php
 *
 * @since 0.1.0
 */
function d5_extension_example_modals_register_rest_routes() {
	// Module visibility settings endpoint
	register_rest_route(
		'divi/v1',
		'/module-visibility-settings/update',
		array(
			'methods'             => 'POST',
			'callback'            => 'd5_extension_example_modals_save_module_visibility_data',
			'permission_callback' => 'd5_extension_example_modals_save_permission',
			'args'                => array(
				'data' => array(
					'required'          => true,
					'validate_callback' => 'd5_extension_example_modals_validate_module_visibility_data',
					'sanitize_callback' => 'd5_extension_example_modals_sanitize_module_visibility_data',
				),
			),
		)
	);

	// Post keyword settings endpoint
	register_rest_route(
		'divi/v1',
		'/post-keyword-settings/update',
		array(
			'methods'             => 'POST',
			'callback'            => 'd5_extension_example_modals_save_post_keyword_data',
			'permission_callback' => 'd5_extension_example_modals_save_permission',
			'args'                => array(
				'data' => array(
					'required'          => true,
					'validate_callback' => 'd5_extension_example_modals_validate_post_keyword_data',
					'sanitize_callback' => 'd5_extension_example_modals_sanitize_post_keyword_data',
				),
			),
		)
	);

	register_rest_route(
		'divi/v1',
		'/modal-field-showcase-settings/update',
		array(
			'methods'             => 'POST',
			'callback'            => 'd5_extension_example_modals_save_modal_field_showcase_data',
			'permission_callback' => 'd5_extension_example_modals_save_permission',
			'args'                => array(
				'postId' => array(
					'required'          => true,
					'validate_callback' => 'd5_extension_example_modals_validate_showcase_post_id',
					'sanitize_callback' => 'absint',
				),
				'data'   => array(
					'required'          => true,
					'validate_callback' => 'd5_extension_example_modals_validate_modal_field_showcase_data',
					'sanitize_callback' => 'd5_extension_example_modals_sanitize_modal_field_showcase_data',
				),
			),
		)
	);
}

/**
 * Permission callback - following D5 security patterns.
 *
 * @since 0.1.0
 *
 * @return bool Whether the user can save data.
 */
function d5_extension_example_modals_save_permission() {
	return current_user_can( 'edit_posts' );
}

/**
 * Validate module visibility data callback - following D5 validation patterns.
 *
 * @since 0.1.0
 *
 * @param mixed $data The data to validate.
 * @return bool Whether the data is valid.
 */
function d5_extension_example_modals_validate_module_visibility_data( $data ) {
	if ( ! is_array( $data ) ) {
		return false;
	}

	// Allow empty arrays.
	if ( empty( $data ) ) {
		return true;
	}

	// Validate each item has required structure.
	foreach ( $data as $item ) {
		if ( ! isset( $item['nodeName'] ) || ! isset( $item['visible'] ) ) {
			return false;
		}
		if ( ! is_string( $item['nodeName'] ) || ! is_bool( $item['visible'] ) ) {
			return false;
		}
	}

	return true;
}

/**
 * Sanitize module visibility data callback - following D5 sanitization patterns.
 *
 * @since 0.1.0
 *
 * @param mixed $data The data to sanitize.
 * @return array Sanitized data.
 */
function d5_extension_example_modals_sanitize_module_visibility_data( $data ) {
	$sanitized = array();

	foreach ( $data as $item ) {
		$sanitized[] = array(
			'nodeName' => sanitize_text_field( $item['nodeName'] ),
			'visible'  => (bool) $item['visible'],
		);
	}

	return $sanitized;
}

/**
 * Validate post keyword data callback - following D5 validation patterns.
 *
 * @since 0.1.0
 *
 * @param mixed $data The data to validate.
 * @return bool Whether the data is valid.
 */
function d5_extension_example_modals_validate_post_keyword_data( $data ) {
	if ( ! is_array( $data ) ) {
		return false;
	}

	// Allow empty arrays.
	if ( empty( $data ) ) {
		return true;
	}

	// Validate the data structure.
	if ( ! isset( $data['focusKeyword'] ) ) {
		return false;
	}

	if ( ! is_string( $data['focusKeyword'] ) ) {
		return false;
	}

	return true;
}

/**
 * Sanitize post keyword data callback - following D5 sanitization patterns.
 *
 * @since 0.1.0
 *
 * @param mixed $data The data to sanitize.
 * @return array Sanitized data.
 */
function d5_extension_example_modals_sanitize_post_keyword_data( $data ) {
	return array(
		'focusKeyword' => sanitize_text_field( $data['focusKeyword'] ),
	);
}

/**
 * Save module visibility data callback - following D5 saving patterns.
 *
 * @since 0.1.0
 *
 * @param WP_REST_Request $request The REST request.
 * @return WP_REST_Response|WP_Error The response.
 */
function d5_extension_example_modals_save_module_visibility_data( $request ) {
	$data = $request->get_param( 'data' );

	// Save to wp_options table.
	$saved = update_option( 'divi_module_visibility_settings', $data );

	if ( $saved ) {
		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => 'Module visibility data saved successfully',
				'data'    => $data,
			),
			200
		);
	} else {
		return new WP_Error(
			'save_failed',
			'Failed to save module visibility data',
			array( 'status' => 500 )
		);
	}
}

/**
 * Save post keyword data callback - following D5 saving patterns.
 *
 * @since 0.1.0
 *
 * @param WP_REST_Request $request The REST request.
 * @return WP_REST_Response|WP_Error The response.
 */
function d5_extension_example_modals_save_post_keyword_data( $request ) {
	$data = $request->get_param( 'data' );

	// Save to wp_options table.
	$saved = update_option( 'divi_post_keyword_settings', $data );

	if ( $saved ) {
		return new WP_REST_Response(
			array(
				'success' => true,
				'message' => 'Post keyword data saved successfully',
				'data'    => $data,
			),
			200
		);
	} else {
		return new WP_Error(
			'save_failed',
			'Failed to save post keyword data',
			array( 'status' => 500 )
		);
	}
}

/**
 * Default structure for modal field showcase settings (stored in post meta).
 *
 * @since 0.1.0
 *
 * @return array<string,mixed>
 */
function d5_extension_example_modals_default_modal_field_showcase_settings() {
	return array(
		'labelPrefix'    => '',
		'notes'          => '',
		'enablePolish'   => false,
		'accentColor'    => '',
		'layoutDensity'  => 'comfortable',
		'emphasisScale'  => '50',
		'readingMeasure' => '45em',
		'sectionPadding' => array(
			'top'              => '',
			'right'            => '',
			'bottom'           => '',
			'left'             => '',
			'syncHorizontal'   => 'off',
			'syncVertical'     => 'off',
		),
		'cornerRadius'   => array(
			'topLeft'     => '',
			'topRight'    => '',
			'bottomLeft'  => '',
			'bottomRight' => '',
			'sync'        => 'off',
		),
		'borderAll'      => array(
			'style' => 'solid',
			'color' => '#333333',
			'width' => '1px',
		),
		'triToggle'      => array(
			'a' => false,
			'b' => false,
			'c' => false,
		),
	);
}

/**
 * REST validate: positive post ID for showcase save.
 *
 * @since 0.1.0
 *
 * @param mixed $post_id Raw post ID.
 * @return bool
 */
function d5_extension_example_modals_validate_showcase_post_id( $post_id ) {
	return is_numeric( $post_id ) && (int) $post_id > 0;
}

/**
 * REST validate: showcase payload is a non-empty array.
 *
 * @since 0.1.0
 *
 * @param mixed $data Payload.
 * @return bool
 */
function d5_extension_example_modals_validate_modal_field_showcase_data( $data ) {
	return is_array( $data );
}

/**
 * Sanitize showcase payload (whitelist keys for post meta).
 *
 * @since 0.1.0
 *
 * @param mixed $data Raw data.
 * @return array<string,mixed>
 */
function d5_extension_example_modals_sanitize_modal_field_showcase_data( $data ) {
	$defaults = d5_extension_example_modals_default_modal_field_showcase_settings();
	$input    = is_array( $data ) ? $data : array();
	$out      = $defaults;

	if ( isset( $input['labelPrefix'] ) && is_string( $input['labelPrefix'] ) ) {
		$out['labelPrefix'] = sanitize_text_field( $input['labelPrefix'] );
	}

	if ( isset( $input['notes'] ) && is_string( $input['notes'] ) ) {
		$out['notes'] = sanitize_textarea_field( $input['notes'] );
	}

	if ( isset( $input['enablePolish'] ) ) {
		$out['enablePolish'] = (bool) $input['enablePolish'];
	}

	if ( isset( $input['accentColor'] ) && is_string( $input['accentColor'] ) ) {
		$out['accentColor'] = sanitize_text_field( $input['accentColor'] );
	}

	if ( isset( $input['layoutDensity'] ) && is_string( $input['layoutDensity'] ) ) {
		$allowed = array( 'comfortable', 'compact', 'spacious' );
		$val     = sanitize_key( $input['layoutDensity'] );
		if ( in_array( $val, $allowed, true ) ) {
			$out['layoutDensity'] = $val;
		}
	}

	if ( isset( $input['emphasisScale'] ) && is_string( $input['emphasisScale'] ) ) {
		$out['emphasisScale'] = sanitize_text_field( $input['emphasisScale'] );
	}

	if ( isset( $input['readingMeasure'] ) && is_string( $input['readingMeasure'] ) ) {
		$out['readingMeasure'] = sanitize_text_field( $input['readingMeasure'] );
	}

	if ( isset( $input['sectionPadding'] ) && is_array( $input['sectionPadding'] ) ) {
		$sp = $input['sectionPadding'];
		foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
			if ( isset( $sp[ $side ] ) && is_string( $sp[ $side ] ) ) {
				$out['sectionPadding'][ $side ] = sanitize_text_field( $sp[ $side ] );
			}
		}
		foreach ( array( 'syncHorizontal', 'syncVertical' ) as $sync_key ) {
			if ( isset( $sp[ $sync_key ] ) && is_string( $sp[ $sync_key ] ) ) {
				$sync_val = sanitize_key( $sp[ $sync_key ] );
				$out['sectionPadding'][ $sync_key ] = in_array( $sync_val, array( 'on', 'off' ), true ) ? $sync_val : 'off';
			}
		}
	}

	if ( isset( $input['cornerRadius'] ) && is_array( $input['cornerRadius'] ) ) {
		$cr = $input['cornerRadius'];
		foreach ( array( 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' ) as $k ) {
			if ( isset( $cr[ $k ] ) && is_string( $cr[ $k ] ) ) {
				$out['cornerRadius'][ $k ] = sanitize_text_field( $cr[ $k ] );
			}
		}
		if ( isset( $cr['sync'] ) && is_string( $cr['sync'] ) ) {
			$s = sanitize_key( $cr['sync'] );
			$out['cornerRadius']['sync'] = in_array( $s, array( 'on', 'off' ), true ) ? $s : 'off';
		}
	}

	if ( isset( $input['borderAll'] ) && is_array( $input['borderAll'] ) ) {
		$b = $input['borderAll'];
		if ( isset( $b['style'] ) && is_string( $b['style'] ) ) {
			$st = sanitize_key( $b['style'] );
			if ( in_array( $st, array( 'solid', 'dashed', 'dotted', 'none' ), true ) ) {
				$out['borderAll']['style'] = $st;
			}
		}
		if ( isset( $b['color'] ) && is_string( $b['color'] ) ) {
			$out['borderAll']['color'] = sanitize_text_field( $b['color'] );
		}
		if ( isset( $b['width'] ) && is_string( $b['width'] ) ) {
			$out['borderAll']['width'] = sanitize_text_field( $b['width'] );
		}
	}

	if ( isset( $input['triToggle'] ) && is_array( $input['triToggle'] ) ) {
		$t = $input['triToggle'];
		foreach ( array( 'a', 'b', 'c' ) as $bit ) {
			if ( array_key_exists( $bit, $t ) ) {
				$out['triToggle'][ $bit ] = (bool) $t[ $bit ];
			}
		}
	}

	return $out;
}

/**
 * Convert stored PHP row to client settings (Toggle expects on/off strings).
 *
 * @since 0.1.0
 *
 * @param array<string,mixed> $row Merged row.
 * @return array<string,mixed>
 */
function d5_extension_example_modals_showcase_php_to_client( array $row ) {
	$row['enablePolish'] = ! empty( $row['enablePolish'] ) ? 'on' : 'off';

	return $row;
}

/**
 * Merge showcase settings from post meta into Visual Builder settings data.
 *
 * @since 0.1.0
 *
 * @param array<string,mixed> $settings Settings array.
 * @return array<string,mixed>
 */
function d5_extension_example_modals_merge_modal_field_showcase_settings( $settings ) {
	if ( ! is_array( $settings ) ) {
		return $settings;
	}

	$defaults = d5_extension_example_modals_default_modal_field_showcase_settings();
	$post_id  = 0;

	if ( isset( $settings['currentPage']['id'] ) && is_numeric( $settings['currentPage']['id'] ) ) {
		$post_id = (int) $settings['currentPage']['id'];
	}

	$stored = array();

	if ( $post_id > 0 ) {
		$meta = get_post_meta( $post_id, '_d5_modal_field_showcase_v1', true );
		if ( is_array( $meta ) ) {
			$stored = $meta;
		}
	}

	$merged = array_merge( $defaults, $stored );

	$settings['modalFieldShowcaseSettings'] = d5_extension_example_modals_showcase_php_to_client( $merged );

	return $settings;
}

/**
 * Save showcase settings to post meta.
 *
 * @since 0.1.0
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function d5_extension_example_modals_save_modal_field_showcase_data( $request ) {
	$post_id = (int) $request->get_param( 'postId' );
	$data    = $request->get_param( 'data' );

	if ( $post_id < 1 || ! current_user_can( 'edit_post', $post_id ) ) {
		return new WP_Error(
			'forbidden',
			'Invalid post or insufficient permissions',
			array( 'status' => 403 )
		);
	}

	$sanitized = is_array( $data ) ? d5_extension_example_modals_sanitize_modal_field_showcase_data( $data ) : d5_extension_example_modals_default_modal_field_showcase_settings();

	update_post_meta( $post_id, '_d5_modal_field_showcase_v1', $sanitized );

	return new WP_REST_Response(
		array(
			'success' => true,
			'message' => 'Modal field showcase data saved to post meta',
			'data'    => d5_extension_example_modals_showcase_php_to_client( $sanitized ),
		),
		200
	);
}

/**
 * Load example modal implementations.
 *
 * @since 0.1.0
 */
function d5_extension_example_modals_load_examples() {
	$examples_dir = D5_EXTENSION_EXAMPLE_MODALS_PLUGIN_DIR;

	// Load Module Visibility Manager example.
	$module_visibility_file = $examples_dir . 'module-visibility-manager/d5-extension-example-modal-module-visibility.php';
	if ( file_exists( $module_visibility_file ) ) {
		require_once $module_visibility_file;
	}

	// Load Post Keyword Manager example.
	$post_keyword_file = $examples_dir . 'post-keyword-manager/d5-extension-example-modal-post-keyword.php';
	if ( file_exists( $post_keyword_file ) ) {
		require_once $post_keyword_file;
	}

	// Modal Field Showcase (tabs, search, footer, field-library, post meta).
	$field_showcase_file = $examples_dir . 'modal-field-showcase/d5-extension-example-modal-field-showcase.php';
	if ( file_exists( $field_showcase_file ) ) {
		require_once $field_showcase_file;
	}
}

/**
 * Plugin activation hook.
 *
 * @since 0.1.0
 */
function d5_extension_example_modals_activate() {
	// Check requirements on activation.
	if ( ! d5_extension_example_modals_check_requirements() ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die(
			esc_html__( 'D5 Extension Example: Modals requires the Divi theme with Divi 5 Visual Builder enabled.', 'd5-extension-example-modals' ),
			esc_html__( 'Plugin Activation Error', 'd5-extension-example-modals' ),
			array( 'back_link' => true )
		);
	}
}

/**
 * Plugin deactivation hook.
 *
 * @since 0.1.0
 */
function d5_extension_example_modals_deactivate() {
	// Cleanup tasks if needed.
}

// Register activation and deactivation hooks.
register_activation_hook( __FILE__, 'd5_extension_example_modals_activate' );
register_deactivation_hook( __FILE__, 'd5_extension_example_modals_deactivate' );

// Initialize the plugin.
add_action( 'plugins_loaded', 'd5_extension_example_modals_init' );

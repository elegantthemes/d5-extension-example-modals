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

	// Register settings data for Divi Visual Builder.
	add_filter( 'divi_visual_builder_settings_data', 'd5_extension_example_modals_add_settings' );

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

	// Future examples can be loaded here.
	// $future_example_file = $examples_dir . 'future-example/example.php';
	// if ( file_exists( $future_example_file ) ) {
	// require_once $future_example_file;
	// }.
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

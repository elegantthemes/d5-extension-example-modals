<?php
/*
Plugin Name: D5 Extension Example: Modals
Plugin URI:  https://github.com/elegantthemes/d5-extension-example-modals
Description: Collection of example custom modals for Divi 5 demonstrating different modal implementation patterns and functionality.
Version:     0.1.0
Author:      Elegant Themes
Author URI:  https://elegantthemes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: d5-extension-example-modals
Domain Path: /languages
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Network: false
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

	// Future examples can be loaded here.
	// $future_example_file = $examples_dir . 'future-example/example.php';
	// if ( file_exists( $future_example_file ) ) {
	//     require_once $future_example_file;
	// }
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

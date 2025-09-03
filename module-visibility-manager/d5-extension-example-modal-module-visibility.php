<?php
/*
Plugin Name: D5 Extension Example: Module Visibility Manager
Plugin URI:
Description: Custom modal for managing which modules appear in the module library
Version:     0.1.0
Author:      Elegant Themes
Author URI:  https://elegantthemes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// Setup constants.
define( 'D5_MODULE_VISIBILITY_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enqueue Divi 5 Visual Builder Assets
 */
function d5_module_visibility_enqueue_assets() {
	if ( et_core_is_fb_enabled() && et_builder_d5_enabled() ) {

		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-module-visibility-builder-bar-button',
				'version' => '1.0.0',
				'script'  => [
					'src'                => D5_MODULE_VISIBILITY_URL . 'build/add-bar-builder-buttons.js',
					'deps'               => [
						'divi-app-ui',
						'divi-data',
					],
					'enqueue_top_window' => false,
					'enqueue_app_window' => true,
					'args'               => [
						'in_footer' => true,
					],
				],
			]
		);

		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-module-visibility-bundle',
				'version' => '1.0.0',
				'script'  => [
					'src'                => D5_MODULE_VISIBILITY_URL . 'build/bundle.js',
					'deps'               => [
						'lodash',
						'divi-vendor-wp-hooks',
						'divi-modal',
						'divi-data',
					],
					'enqueue_top_window' => false,
					'enqueue_app_window' => true,
					'args'               => [
						'in_footer' => false,
					],
				],
			]
		);
	}
}

add_action( 'divi_visual_builder_assets_before_enqueue_scripts', 'd5_module_visibility_enqueue_assets' );

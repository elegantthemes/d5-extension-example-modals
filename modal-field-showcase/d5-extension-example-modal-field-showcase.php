<?php
/**
 * Modal Field Showcase Example.
 *
 * Demonstrates a comprehensive custom modal (tabs, search, footer, groups, field-library
 * controls, custom React control, post meta persistence) for Divi 5 third-party developers.
 *
 * @package D5ExtensionExampleModals
 * @since 0.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

define( 'D5_MODAL_FIELD_SHOWCASE_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enqueue Visual Builder assets for the Modal Field Showcase example.
 *
 * @since 0.1.0
 */
function d5_modal_field_showcase_enqueue_assets() {
	if ( et_core_is_fb_enabled() && et_builder_d5_enabled() ) {
		// Builder bar script: VB app iframe only (`enqueue_app_window`), where the bar is rendered.
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-modal-field-showcase-toolbar-button',
				'version' => '1.0.0',
				'script'  => [
					'src'                => D5_MODAL_FIELD_SHOWCASE_URL . 'build/add-toolbar-button.js',
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

		// Modal CSS: top window so preview chrome matches other Divi modals; the script bundle stays app-window below.
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-modal-field-showcase-bundle-style',
				'version' => '1.0.0',
				'style'   => [
					'src'                => D5_MODAL_FIELD_SHOWCASE_URL . 'styles/bundle.css',
					'deps'               => [],
					'enqueue_top_window' => true,
					'enqueue_app_window' => false,
				],
			]
		);

		// Main bundle: modal UI + `divi.modalLibrary.modalMapping` filter; runs in the app iframe like other VB extension scripts.
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-modal-field-showcase-bundle',
				'version' => '1.0.0',
				'script'  => [
					'src'                => D5_MODAL_FIELD_SHOWCASE_URL . 'build/bundle.js',
					'deps'               => [
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

add_action( 'divi_visual_builder_assets_before_enqueue_scripts', 'd5_modal_field_showcase_enqueue_assets' );

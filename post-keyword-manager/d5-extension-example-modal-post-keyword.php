<?php
/**
 * Post Keyword Manager Example
 *
 * Demonstrates et.builder.content.change hook integration for managing
 * post keywords. This file provides the PHP integration and WordPress
 * hooks for the Post Keyword Manager example within the d5-extension-example-modals plugin.
 *
 * This example shows third-party developers how to:
 * - Listen to the et.builder.content.change hook
 * - Receive rendered HTML content when builder content changes
 * - Create custom modals for content analysis
 * - Save metadata to WordPress post meta
 *
 * @package D5ExtensionExampleModals
 * @since 0.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// Setup constants.
define( 'D5_POST_KEYWORD_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enqueue Divi 5 Visual Builder Assets
 *
 * This function registers and enqueues the JavaScript bundles needed for
 * the Post Keyword Manager modal. It follows the Divi 5 pattern of using
 * PackageBuildManager to properly handle script dependencies and loading.
 *
 * @since 0.1.0
 */
function d5_post_keyword_enqueue_assets() {
	if ( et_core_is_fb_enabled() && et_builder_d5_enabled() ) {

		// Register toolbar button script.
		// This adds the "Post Keywords" button to the Visual Builder toolbar.
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-post-keyword-toolbar-button',
				'version' => '1.0.0',
				'script'  => [
					'src'                => D5_POST_KEYWORD_URL . 'build/add-toolbar-button.js',
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
		// Register CSS bundle separately.
		// Modals are rendered in the TOP WINDOW (via React portals), not in the app window iframe.
		// Therefore CSS must be enqueued for top_window, not app_window.
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-post-keyword-bundle-style',
				'version' => '1.0.0',
				'style'   => [
					'src'                => D5_POST_KEYWORD_URL . 'styles/bundle.css',
					'deps'               => [],
					'enqueue_top_window' => true,
					'enqueue_app_window' => false,
				],
			]
		);
		// Register main bundle script.
		// This contains the modal component, Redux store, and hook integration.
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'    => 'd5-post-keyword-bundle',
				'version' => '1.0.0',
				'script'  => [
					'src'                => D5_POST_KEYWORD_URL . 'build/bundle.js',
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

add_action( 'divi_visual_builder_assets_before_enqueue_scripts', 'd5_post_keyword_enqueue_assets' );

/**
 * Save focus keyword to post meta when post is updated.
 *
 * This demonstrates how to persist data from the Visual Builder modal
 * to WordPress post meta. The keyword is stored in a custom meta field
 * that can be retrieved later for SEO analysis or other purposes.
 *
 * The keyword is saved via the JavaScript hook's debounced REST API pattern
 * to the WordPress options table, following the same pattern as the Module
 * Visibility Manager. This provides persistent storage without using localStorage.
 *
 * This hook fires after the post content is successfully saved to the database.
 *
 * @since 0.1.0
 *
 * @param int $post_id The ID of the post being saved.
 */
function d5_post_keyword_save_meta( $post_id ) {
	// The keyword is now saved via the JavaScript usePostKeywordManager hook
	// using debounced REST API calls to persist data to WordPress options table.
	// This follows the same pattern as the Module Visibility Manager.

	// For educational purposes, log that the hook fired.
	// Remove this in production code.
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		error_log( 'D5 Post Keyword Manager: Save hook fired for post ID ' . $post_id );
	}
}

add_action( 'divi_visual_builder_rest_update_post', 'd5_post_keyword_save_meta' );


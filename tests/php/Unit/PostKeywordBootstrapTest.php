<?php
/**
 * Post Keyword Manager bootstrap unit tests.
 *
 * @package D5ExtensionExampleModals\Tests
 */

/**
 * Class PostKeywordBootstrapTest.
 */
class PostKeywordBootstrapTest extends WP_UnitTestCase {

	/**
	 * Verifies the post keyword URL constant is defined after load.
	 *
	 * @return void
	 */
	public function test_post_keyword_url_constant_is_defined(): void {
		$this->assertTrue( defined( 'D5_POST_KEYWORD_URL' ) );
		$this->assertStringContainsString(
			'post-keyword-manager/',
			D5_POST_KEYWORD_URL
		);
	}

	/**
	 * Verifies Visual Builder asset registration hook is wired.
	 *
	 * @return void
	 */
	public function test_post_keyword_assets_hook_is_registered(): void {
		$this->assertNotFalse(
			has_action(
				'divi_visual_builder_assets_before_enqueue_scripts',
				'd5_post_keyword_enqueue_assets'
			)
		);
	}

	/**
	 * Verifies post keyword settings are exposed to Visual Builder settings data.
	 *
	 * @return void
	 */
	public function test_post_keyword_settings_are_hydrated_in_vb_settings(): void {
		$settings = apply_filters( 'divi_visual_builder_settings_data', array() );

		$this->assertArrayHasKey( 'postKeywordSettings', $settings );
		$this->assertIsArray( $settings['postKeywordSettings'] );
		$this->assertArrayHasKey( 'focusKeyword', $settings['postKeywordSettings'] );
	}

	/**
	 * Verifies the post keyword REST route is registered.
	 *
	 * @return void
	 */
	public function test_post_keyword_rest_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		$this->assertArrayHasKey( '/divi/v1/post-keyword-settings/update', $routes );
	}

	/**
	 * Verifies post keyword sanitize callback normalizes focus keyword.
	 *
	 * @return void
	 */
	public function test_post_keyword_sanitize_callback_normalizes_focus_keyword(): void {
		$sanitized = d5_extension_example_modals_sanitize_post_keyword_data(
			array(
				'focusKeyword' => '  divi keyword  ',
			)
		);

		$this->assertSame( 'divi keyword', $sanitized['focusKeyword'] );
	}
}

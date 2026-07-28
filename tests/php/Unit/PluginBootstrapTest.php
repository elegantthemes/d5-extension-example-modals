<?php
/**
 * Module Visibility Manager bootstrap unit tests.
 *
 * @package D5ExtensionExampleModals\Tests
 */

/**
 * Class PluginBootstrapTest.
 */
class PluginBootstrapTest extends WP_UnitTestCase {

	/**
	 * Verifies the module visibility URL constant is defined after load.
	 *
	 * @return void
	 */
	public function test_module_visibility_url_constant_is_defined(): void {
		$this->assertTrue( defined( 'D5_MODULE_VISIBILITY_URL' ) );
		$this->assertStringContainsString(
			'module-visibility-manager/',
			D5_MODULE_VISIBILITY_URL
		);
	}

	/**
	 * Verifies Visual Builder asset registration hook is wired.
	 *
	 * @return void
	 */
	public function test_module_visibility_assets_hook_is_registered(): void {
		$this->assertNotFalse(
			has_action(
				'divi_visual_builder_assets_before_enqueue_scripts',
				'd5_module_visibility_enqueue_assets'
			)
		);
	}

	/**
	 * Verifies module visibility settings are exposed to Visual Builder settings data.
	 *
	 * @return void
	 */
	public function test_module_visibility_settings_are_hydrated_in_vb_settings(): void {
		$settings = apply_filters( 'divi_visual_builder_settings_data', array() );

		$this->assertArrayHasKey( 'moduleVisibilitySettings', $settings );
		$this->assertIsArray( $settings['moduleVisibilitySettings'] );
	}
}

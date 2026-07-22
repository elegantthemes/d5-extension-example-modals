<?php
/**
 * Modal Field Showcase bootstrap unit tests.
 *
 * @package D5ExtensionExampleModals\Tests
 */

/**
 * Class ModalFieldShowcaseBootstrapTest.
 */
class ModalFieldShowcaseBootstrapTest extends WP_UnitTestCase {

	/**
	 * Verifies the showcase URL constant is defined after load.
	 *
	 * @return void
	 */
	public function test_modal_field_showcase_url_constant_is_defined(): void {
		$this->assertTrue( defined( 'D5_MODAL_FIELD_SHOWCASE_URL' ) );
		$this->assertStringContainsString(
			'modal-field-showcase/',
			D5_MODAL_FIELD_SHOWCASE_URL
		);
	}

	/**
	 * Verifies Visual Builder asset registration hook is wired.
	 *
	 * @return void
	 */
	public function test_modal_field_showcase_assets_hook_is_registered(): void {
		$this->assertNotFalse(
			has_action(
				'divi_visual_builder_assets_before_enqueue_scripts',
				'd5_modal_field_showcase_enqueue_assets'
			)
		);
	}

	/**
	 * Verifies default showcase settings helper returns expected keys.
	 *
	 * @return void
	 */
	public function test_default_showcase_settings_include_expected_keys(): void {
		$defaults = d5_extension_example_modals_default_modal_field_showcase_settings();

		$this->assertArrayHasKey( 'labelPrefix', $defaults );
		$this->assertArrayHasKey( 'layoutDensity', $defaults );
		$this->assertArrayHasKey( 'sectionPadding', $defaults );
		$this->assertArrayHasKey( 'cornerRadius', $defaults );
		$this->assertSame( 'comfortable', $defaults['layoutDensity'] );
	}

	/**
	 * Verifies the showcase REST route is registered.
	 *
	 * @return void
	 */
	public function test_modal_field_showcase_rest_route_is_registered(): void {
		$routes = rest_get_server()->get_routes();

		$this->assertArrayHasKey( '/divi/v1/modal-field-showcase-settings/update', $routes );
	}

	/**
	 * Verifies showcase sanitize callback whitelists known keys.
	 *
	 * @return void
	 */
	public function test_modal_field_showcase_sanitize_callback_whitelists_keys(): void {
		$sanitized = d5_extension_example_modals_sanitize_modal_field_showcase_data(
			array(
				'labelPrefix'   => '  Showcase  ',
				'layoutDensity' => 'compact',
				'unknownField'  => 'ignored',
			)
		);

		$this->assertSame( 'Showcase', $sanitized['labelPrefix'] );
		$this->assertSame( 'compact', $sanitized['layoutDensity'] );
		$this->assertArrayNotHasKey( 'unknownField', $sanitized );
	}

	/**
	 * Verifies showcase settings merge into Visual Builder settings data.
	 *
	 * @return void
	 */
	public function test_modal_field_showcase_settings_are_hydrated_in_vb_settings(): void {
		$settings = apply_filters(
			'divi_visual_builder_settings_data',
			array(
				'currentPage' => array(
					'id' => 0,
				),
			)
		);

		$this->assertArrayHasKey( 'modalFieldShowcaseSettings', $settings );
		$this->assertIsArray( $settings['modalFieldShowcaseSettings'] );
		$this->assertSame( 'off', $settings['modalFieldShowcaseSettings']['enablePolish'] );
	}
}

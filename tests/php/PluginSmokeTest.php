<?php
/**
 * Plugin smoke tests for d5-extension-example-modals.
 *
 * @package D5ExtensionExampleModals\Tests
 */

/**
 * Class PluginSmokeTest.
 */
class PluginSmokeTest extends WP_UnitTestCase {

	/**
	 * Verifies the plugin main file exists on disk.
	 *
	 * @return void
	 */
	public function test_plugin_main_file_exists(): void {
		$plugin_main_file_path = dirname( __DIR__, 2 ) . '/d5-extension-example-modals.php';

		$this->assertFileExists( $plugin_main_file_path );
	}

	/**
	 * Verifies the plugin directory constant is defined after bootstrap.
	 *
	 * @return void
	 */
	public function test_plugin_dir_constant_is_defined(): void {
		$this->assertTrue( defined( 'D5_EXTENSION_EXAMPLE_MODALS_PLUGIN_DIR' ) );
		$this->assertStringEndsWith( '/', D5_EXTENSION_EXAMPLE_MODALS_PLUGIN_DIR );
	}

	/**
	 * Verifies example sub-plugin files exist on disk.
	 *
	 * @return void
	 */
	public function test_example_subplugin_files_exist(): void {
		$plugin_root = dirname( __DIR__, 2 );

		$this->assertFileExists( $plugin_root . '/module-visibility-manager/d5-extension-example-modal-module-visibility.php' );
		$this->assertFileExists( $plugin_root . '/post-keyword-manager/d5-extension-example-modal-post-keyword.php' );
		$this->assertFileExists( $plugin_root . '/modal-field-showcase/d5-extension-example-modal-field-showcase.php' );
	}

	/**
	 * Verifies showcase default settings helper is available after plugin load.
	 *
	 * @return void
	 */
	public function test_showcase_default_settings_function_exists(): void {
		$this->assertTrue( function_exists( 'd5_extension_example_modals_default_modal_field_showcase_settings' ) );
	}
}

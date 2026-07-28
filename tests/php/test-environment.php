<?php
/**
 * Shared helpers for the plugin PHPUnit environment.
 *
 * @package D5ExtensionExampleModals\Tests
 */

/**
 * Returns the absolute path to the plugin root directory.
 *
 * @return string
 */
function d5_extension_example_modals_get_plugin_root_path(): string {
	return dirname( __DIR__, 2 );
}

/**
 * Reads an environment variable as a trimmed string.
 *
 * @param string $environment_key Environment variable name.
 *
 * @return string
 */
function d5_extension_example_modals_get_env_string( string $environment_key ): string {
	$environment_value = $_ENV[ $environment_key ] ?? getenv( $environment_key );

	if ( false === $environment_value || null === $environment_value ) {
		return '';
	}

	return trim( (string) $environment_value );
}

/**
 * Loads key/value pairs from a dotenv file into the process environment.
 *
 * @param string $dotenv_file_path Absolute path to the dotenv file.
 *
 * @return void
 */
function d5_extension_example_modals_load_dotenv_file( string $dotenv_file_path ): void {
	if ( ! is_readable( $dotenv_file_path ) ) {
		return;
	}

	$dotenv_lines = file( $dotenv_file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );

	if ( false === $dotenv_lines ) {
		return;
	}

	foreach ( $dotenv_lines as $dotenv_line ) {
		$trimmed_line = trim( $dotenv_line );

		if ( '' === $trimmed_line || '#' === substr( $trimmed_line, 0, 1 ) ) {
			continue;
		}

		$key_value_pair = explode( '=', $trimmed_line, 2 );

		if ( 2 !== count( $key_value_pair ) ) {
			continue;
		}

		$environment_key   = trim( $key_value_pair[0] );
		$environment_value = trim( $key_value_pair[1], " \t\n\r\0\x0B\"'" );

		putenv( "{$environment_key}={$environment_value}" );
		$_ENV[ $environment_key ] = $environment_value;
	}
}

/**
 * Resolves the Divi theme root path from DIVI_PATH.
 *
 * @return string
 */
function d5_extension_example_modals_get_divi_theme_root_path(): string {
	$divi_theme_root_path = d5_extension_example_modals_get_env_string( 'DIVI_PATH' );

	return rtrim( $divi_theme_root_path, '/\\' );
}

/**
 * Resolves the absolute path to Divi's WP test bootstrap file.
 *
 * @return string
 */
function d5_extension_example_modals_get_divi_wp_tests_bootstrap_path(): string {
	$divi_theme_root_path = d5_extension_example_modals_get_divi_theme_root_path();

	return $divi_theme_root_path . '/includes/builder-5/server/__TESTS__/config/wp-tests-bootstrap.php';
}

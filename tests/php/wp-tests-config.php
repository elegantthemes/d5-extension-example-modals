<?php
/**
 * WPUnit test config for d5-extension-example-modals.
 *
 * @package D5ExtensionExampleModals\Tests
 */

require_once __DIR__ . '/test-environment.php';

$required_environment_keys = array(
	'WP_VERSION',
	'WP_ROOT_DIRECTORY',
	'WP_TESTS_DOMAIN',
	'WP_TESTS_EMAIL',
	'TEST_DB_NAME',
	'TEST_DB_HOST',
	'TEST_DB_USER',
	'TEST_TABLE_PREFIX',
);

foreach ( $required_environment_keys as $required_environment_key ) {
	if ( '' === d5_extension_example_modals_get_env_string( $required_environment_key ) ) {
		echo 'Error: Missing required environment variable: ' . $required_environment_key . PHP_EOL;
		echo 'Tip: Copy tests/php/.env.example to tests/php/.env and update the values.' . PHP_EOL;
		exit( 1 );
	}
}

$test_database_password = d5_extension_example_modals_get_env_string( 'TEST_DB_PASSWORD' );

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', d5_extension_example_modals_get_env_string( 'WP_ROOT_DIRECTORY' ) . '/' );
}

if ( ! defined( 'WP_DEFAULT_THEME' ) ) {
	$divi_theme_directory = d5_extension_example_modals_get_env_string( 'DIVI_THEME_DIRECTORY' );

	define( 'WP_DEFAULT_THEME', '' !== $divi_theme_directory ? $divi_theme_directory : 'Divi' );
}

$table_prefix = d5_extension_example_modals_get_env_string( 'TEST_TABLE_PREFIX' );

if ( ! defined( 'ET_DEBUG' ) ) {
	define( 'ET_DEBUG', true );
}

if ( ! defined( 'ET_USE_PRODUCT_CORE_PATHS' ) ) {
	define( 'ET_USE_PRODUCT_CORE_PATHS', true );
}

if ( ! defined( 'DIVI_PHPUNIT_DISABLE_WC_STORE_API' ) ) {
	define( 'DIVI_PHPUNIT_DISABLE_WC_STORE_API', true );
}

if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', true );
}

if ( ! defined( 'WP_DEBUG_LOG' ) ) {
	define( 'WP_DEBUG_LOG', true );
}

if ( ! defined( 'WP_AUTO_UPDATE_TRANSLATION' ) ) {
	define( 'WP_AUTO_UPDATE_TRANSLATION', false );
}

if ( ! defined( 'WP_AUTO_UPDATE_CORE' ) ) {
	define( 'WP_AUTO_UPDATE_CORE', false );
}

if ( ! defined( 'WP_TESTS_DOMAIN' ) ) {
	define( 'WP_TESTS_DOMAIN', d5_extension_example_modals_get_env_string( 'WP_TESTS_DOMAIN' ) );
}

if ( ! defined( 'WP_TESTS_EMAIL' ) ) {
	define( 'WP_TESTS_EMAIL', d5_extension_example_modals_get_env_string( 'WP_TESTS_EMAIL' ) );
}

if ( ! defined( 'WP_TESTS_TITLE' ) ) {
	define( 'WP_TESTS_TITLE', 'Test' );
}

if ( ! defined( 'WP_PHP_BINARY' ) ) {
	define( 'WP_PHP_BINARY', PHP_BINARY );
}

if ( ! defined( 'WPLANG' ) ) {
	define( 'WPLANG', '' );
}

define( 'DB_NAME', d5_extension_example_modals_get_env_string( 'TEST_DB_NAME' ) );
define( 'DB_USER', d5_extension_example_modals_get_env_string( 'TEST_DB_USER' ) );
define( 'DB_PASSWORD', $test_database_password );
define( 'DB_HOST', d5_extension_example_modals_get_env_string( 'TEST_DB_HOST' ) );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

define( 'AUTH_KEY', 'd5-extension-example-modals-test-auth-key' );
define( 'SECURE_AUTH_KEY', 'd5-extension-example-modals-test-secure-auth-key' );
define( 'LOGGED_IN_KEY', 'd5-extension-example-modals-test-logged-in-key' );
define( 'NONCE_KEY', 'd5-extension-example-modals-test-nonce-key' );
define( 'AUTH_SALT', 'd5-extension-example-modals-test-auth-salt' );
define( 'SECURE_AUTH_SALT', 'd5-extension-example-modals-test-secure-auth-salt' );
define( 'LOGGED_IN_SALT', 'd5-extension-example-modals-test-logged-in-salt' );
define( 'NONCE_SALT', 'd5-extension-example-modals-test-nonce-salt' );

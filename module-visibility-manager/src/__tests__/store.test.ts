import { applyFilters, hasFilter } from '@wordpress/hooks';

import '../hooks/use-reactive-module-filter';

import {
	filterModuleFolderList,
	getHiddenModulesFromSettings,
	syncHiddenModulesForFilter,
} from '../utils/module-visibility';

describe( 'module visibility settings selector', () => {
	it( 'returns only hidden modules from settings data', () => {
		const settingsData = [
			{ nodeName: 'divi/text', visible: true },
			{ nodeName: 'divi/blurb', visible: false },
			{ nodeName: 'divi/button', visible: false },
		];

		expect( getHiddenModulesFromSettings( settingsData ) ).toEqual( [
			{ nodeName: 'divi/blurb', visible: false },
			{ nodeName: 'divi/button', visible: false },
		] );
	} );

	it( 'returns an empty array for non-array settings data', () => {
		expect( getHiddenModulesFromSettings( null ) ).toEqual( [] );
		expect( getHiddenModulesFromSettings( undefined ) ).toEqual( [] );
	} );
} );

describe( 'moduleList filter', () => {
	const moduleFolderList = {
		'divi/text': { title: 'Text' },
		'divi/blurb': { title: 'Blurb' },
		'divi/button': { title: 'Button' },
	};

	beforeEach( () => {
		syncHiddenModulesForFilter( [] );
	} );

	it( 'returns the same keys when nothing is hidden', () => {
		const filtered = filterModuleFolderList( moduleFolderList, [] );

		expect( filtered ).toEqual( moduleFolderList );
		expect( Array.isArray( filtered ) ).toBe( false );
	} );

	it( 'removes hidden modules from the folder list', () => {
		const filtered = filterModuleFolderList( moduleFolderList, [
			{ nodeName: 'divi/blurb', visible: false },
		] );

		expect( filtered ).toHaveProperty( 'divi/text' );
		expect( filtered ).toHaveProperty( 'divi/button' );
		expect( filtered ).not.toHaveProperty( 'divi/blurb' );
	} );

	it( 'ignores hidden entries without a nodeName', () => {
		const filtered = filterModuleFolderList( moduleFolderList, [
			{ nodeName: '', visible: false },
		] );

		expect( filtered ).toEqual( moduleFolderList );
	} );

	it( 'registers the production moduleList filter on app load', () => {
		expect(
			hasFilter(
				'divi.modalLibrary.addModule.moduleList',
				'moduleVisibilityManager'
			)
		).toBeTruthy();
	} );

	it( 'applies via the app-registered divi.modalLibrary.addModule.moduleList hook', () => {
		syncHiddenModulesForFilter( [
			{ nodeName: 'divi/blurb', visible: false },
		] );

		const filtered = applyFilters(
			'divi.modalLibrary.addModule.moduleList',
			moduleFolderList,
			{}
		);

		expect( filtered ).not.toHaveProperty( 'divi/blurb' );
		expect( filtered ).toHaveProperty( 'divi/text' );
	} );
} );

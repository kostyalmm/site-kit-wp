/**
 * Internal dependencies
 */
import { sanitizeHTML, unTrailingSlashIt } from './sanitize';

describe( 'sanitizeHTML', () => {
	it( 'does not change links', () => {
		const html = '<a href="http://example.org">link</a>';
		expect( sanitizeHTML( html, [ 'a' ] ) ).toEqual( {
			__html: html,
		} );
	} );

	// This is a built-in feature of dompurify.
	it( 'removes `target` attribute on links without a config', () => {
		const html = '<a href="http://example.org" target="_blank">link</a>';
		expect( sanitizeHTML( html, [ 'a' ] ) ).toEqual( {
			__html: '<a href="http://example.org">link</a>',
		} );
	} );

	it( 'allows `target` attribute on links when configured', () => {
		const html = '<a href="http://example.org" target="_blank">link</a>';
		expect( sanitizeHTML( html, {
			ALLOWED_ATTR: [ 'href', 'target' ],
			ALLOWED_TAGS: [ 'a' ],
		} ) ).toEqual( {
			__html: '<a target="_blank" href="http://example.org">link</a>',
		} );
	} );
} );

describe( 'unTrailingSlashIt', () => {
	it( 'should not change a URL without trailing slash', () => {
		const url = 'http://example.org';
		expect( unTrailingSlashIt( url ) ).toEqual( 'http://example.org' );
	} );

	it( 'should change a URL with trailing slash', () => {
		const url = 'http://example.org/';
		expect( unTrailingSlashIt( url ) ).toEqual( 'http://example.org' );
	} );

	it( 'should return null if the parameter is not a string', () => {
		expect( unTrailingSlashIt( 1 ) ).toBeNull();
	} );
} );

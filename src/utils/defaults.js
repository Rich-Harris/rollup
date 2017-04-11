import { lstatSync, readdirSync, readFileSync, realpathSync } from './fs.js'; // eslint-disable-line
import { basename, dirname, isAbsolute, resolve } from './path.js';
import { blank } from './object.js';
import error from './error.js';

export function load ( id ) {
	return readFileSync( id, 'utf-8' );
}

function findFile ( file ) {
	try {
		const stats = lstatSync( file );
		if ( stats.isSymbolicLink() ) return findFile( realpathSync( file ) );
		if ( stats.isFile() ) {
			// check case
			const name = basename( file );
			const files = readdirSync( dirname( file ) );

			if ( ~files.indexOf( name ) ) return file;
		}
	} catch ( err ) {
		// suppress
	}
}

function addExtensionIfNecessary ( file ) {
	return findFile( file ) || findFile( file + '.js' ) || findFile( file + '.mjs' );
}

export function resolveId ( importee, importer ) {
	if ( typeof process === 'undefined' ) {
		error({
			code: 'MISSING_PROCESS',
			message: `It looks like you're using Rollup in a non-Node.js environment. This means you must supply a plugin with custom resolveId and load functions`,
			url: 'https://github.com/rollup/rollup/wiki/Plugins'
		});
	}

	// absolute paths are left untouched
	if ( isAbsolute( importee ) ) return addExtensionIfNecessary( resolve( importee ) );

	// if this is the entry point, resolve against cwd
	if ( importer === undefined ) return addExtensionIfNecessary( resolve( process.cwd(), importee ) );

	// external modules are skipped at this stage
	if ( importee[0] !== '.' ) return null;

	return addExtensionIfNecessary( resolve( dirname( importer ), importee ) );
}


export function makeOnwarn () {
	const warned = blank();

	return warning => {
		const str = warning.toString();
		if ( str in warned ) return;
		console.error( str ); //eslint-disable-line no-console
		warned[ str ] = true;
	};
}

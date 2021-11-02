// https://datatracker.ietf.org/doc/html/rfc2396
const INVALID_CHAR_RE = /[?*:\x00-\x1f\x7f<>#"{}|\^[\]`]/g

export function sanitizeFileName (name: string): string {
	const match = /^[a-z]:/i.exec(name)
	const driveLetter = match ? match[0] : ''

	// A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
	// Otherwise, avoid them because they can refer to NTFS alternate data streams.
	return driveLetter + name.substr(driveLetter.length).replace(INVALID_CHAR_RE, '_')
}

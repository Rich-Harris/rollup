let fsEvents: unknown;
let fsEventsImportError: Error | undefined;

export async function loadFsEvents(): Promise<void> {
	try {
		({ default: fsEvents } = await import('fsevents'));
	} catch (err: any) {
		fsEventsImportError = err;
	}
}

// A call to this function will be injected into the chokidar code
export function getFsEvents(): unknown {
	if (fsEventsImportError) throw fsEventsImportError;
	return fsEvents;
}

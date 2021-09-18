import { GenerateCodeSnippets } from './generateCodeSnippets';

const INTEROP_DEFAULT_VARIABLE = '_interopDefault';
const INTEROP_DEFAULT_LEGACY_VARIABLE = '_interopDefaultLegacy';
const INTEROP_NAMESPACE_VARIABLE = '_interopNamespace';
const INTEROP_NAMESPACE_DEFAULT_VARIABLE = '_interopNamespaceDefault';
export const INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE = '_interopNamespaceDefaultOnly';
export const MERGE_NAMESPACES_VARIABLE = '_mergeNamespaces';

export const defaultInteropHelpersByInteropType: { [interopType: string]: string | null } = {
	auto: INTEROP_DEFAULT_VARIABLE,
	default: null,
	defaultOnly: null,
	esModule: null,
	false: null,
	true: INTEROP_DEFAULT_LEGACY_VARIABLE
};

export const isDefaultAProperty = (interopType: string, externalLiveBindings: boolean): boolean =>
	interopType === 'esModule' ||
	(externalLiveBindings && (interopType === 'auto' || interopType === 'true'));

export const namespaceInteropHelpersByInteropType: { [interopType: string]: string | null } = {
	auto: INTEROP_NAMESPACE_VARIABLE,
	default: INTEROP_NAMESPACE_DEFAULT_VARIABLE,
	defaultOnly: INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE,
	esModule: null,
	false: null,
	true: INTEROP_NAMESPACE_VARIABLE
};

export const canDefaultBeTakenFromNamespace = (
	interopType: string,
	externalLiveBindings: boolean
): boolean =>
	isDefaultAProperty(interopType, externalLiveBindings) &&
	defaultInteropHelpersByInteropType[interopType] === INTEROP_DEFAULT_VARIABLE;

export const getHelpersBlock = (
	additionalHelpers: Set<string> | null,
	accessedGlobals: Set<string>,
	indent: string,
	snippets: GenerateCodeSnippets,
	liveBindings: boolean,
	freeze: boolean,
	namespaceToStringTag: boolean
): string => {
	const usedHelpers = new Set(additionalHelpers);
	for (const variable of HELPER_NAMES) {
		if (accessedGlobals.has(variable)) {
			usedHelpers.add(variable);
		}
	}
	return HELPER_NAMES.map(variable =>
		usedHelpers.has(variable)
			? HELPER_GENERATORS[variable](
					indent,
					snippets,
					liveBindings,
					freeze,
					namespaceToStringTag,
					usedHelpers
			  )
			: ''
	).join('');
};

const HELPER_GENERATORS: {
	[variable: string]: (
		indent: string,
		snippets: GenerateCodeSnippets,
		liveBindings: boolean,
		freeze: boolean,
		namespaceToStringTag: boolean,
		usedHelpers: Set<string>
	) => string;
} = {
	[INTEROP_DEFAULT_LEGACY_VARIABLE](_t, snippets, liveBindings) {
		const { _, getDirectReturnFunction, n } = snippets;
		const { left, right } = getDirectReturnFunction(['e'], {
			functionReturn: true,
			lineBreakIndent: false,
			name: INTEROP_DEFAULT_LEGACY_VARIABLE,
			t: ''
		});
		return (
			`${left}e${_}&&${_}typeof e${_}===${_}'object'${_}&&${_}'default'${_}in e${_}?${_}` +
			`${
				liveBindings ? getDefaultLiveBinding(snippets) : getDefaultStatic(snippets)
			}${right}${n}${n}`
		);
	},
	[INTEROP_DEFAULT_VARIABLE](_t, snippets, liveBindings) {
		const { _, getDirectReturnFunction, n } = snippets;
		const { left, right } = getDirectReturnFunction(['e'], {
			functionReturn: true,
			lineBreakIndent: false,
			name: INTEROP_DEFAULT_VARIABLE,
			t: ''
		});
		return (
			`${left}e${_}&&${_}e.__esModule${_}?${_}` +
			`${
				liveBindings ? getDefaultLiveBinding(snippets) : getDefaultStatic(snippets)
			}${right}${n}${n}`
		);
	},
	[INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE](
		_t,
		{ _, getDirectReturnFunction, getObject, n },
		_liveBindings: boolean,
		freeze: boolean,
		namespaceToStringTag: boolean
	) {
		const { left, right } = getDirectReturnFunction(['e'], {
			functionReturn: true,
			lineBreakIndent: false,
			name: INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE,
			t: ''
		});
		return `${left}${getFrozen(
			getObject(
				[
					['__proto__', 'null'],
					...(namespaceToStringTag
						? [[null, `[Symbol.toStringTag]:${_}'Module'`] as [null, string]]
						: []),
					['default', 'e']
				],
				{ lineBreakIndent: false }
			),
			freeze
		)}${right}${n}${n}`;
	},
	[INTEROP_NAMESPACE_DEFAULT_VARIABLE](t, snippets, liveBindings, freeze, namespaceToStringTag) {
		const { _, n } = snippets;
		return (
			`function ${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${_}{${n}` +
			createNamespaceObject(t, t, snippets, liveBindings, freeze, namespaceToStringTag) +
			`}${n}${n}`
		);
	},
	[INTEROP_NAMESPACE_VARIABLE](
		t,
		snippets,
		liveBindings,
		freeze,
		namespaceToStringTag,
		usedHelpers
	) {
		const { _, getDirectReturnFunction, n } = snippets;
		if (usedHelpers.has(INTEROP_NAMESPACE_DEFAULT_VARIABLE)) {
			const { left, right } = getDirectReturnFunction(['e'], {
				functionReturn: true,
				lineBreakIndent: false,
				name: INTEROP_NAMESPACE_VARIABLE,
				t: ''
			});
			return `${left}e${_}&&${_}e.__esModule${_}?${_}e${_}:${_}${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${right}${n}${n}`;
		}
		return (
			`function ${INTEROP_NAMESPACE_VARIABLE}(e)${_}{${n}` +
			`${t}if${_}(e${_}&&${_}e.__esModule)${_}return e;${n}` +
			createNamespaceObject(t, t, snippets, liveBindings, freeze, namespaceToStringTag) +
			`}${n}${n}`
		);
	},
	[MERGE_NAMESPACES_VARIABLE](t, snippets, liveBindings, freeze) {
		const { _, n } = snippets;
		// TODO Lukas mention improved helpers and used builtins in generatedCode docs
		return (
			`function ${MERGE_NAMESPACES_VARIABLE}(n, m)${_}{${n}` +
			`${t}${loopOverNamespaces(
				`{${n}` +
					`${t}${t}${t}if${_}(k${_}!==${_}'default'${_}&&${_}!(k in n))${_}{${n}` +
					(liveBindings ? copyPropertyLiveBinding : copyPropertyStatic)(
						t,
						t + t + t + t,
						snippets
					) +
					`${t}${t}${t}}${n}` +
					`${t}${t}}`,
				!liveBindings,
				t,
				snippets
			)}${n}` +
			`${t}return ${getFrozen('n', freeze)};${n}` +
			`}${n}${n}`
		);
	}
};

const getDefaultLiveBinding = ({ _, getObject }: GenerateCodeSnippets) =>
	`e${_}:${_}${getObject([['default', 'e']], { lineBreakIndent: false })}`;

const getDefaultStatic = ({ _, getPropertyAccess }: GenerateCodeSnippets) =>
	`e${getPropertyAccess('default')}${_}:${_}e`;

const createNamespaceObject = (
	t: string,
	i: string,
	snippets: GenerateCodeSnippets,
	liveBindings: boolean,
	freeze: boolean,
	namespaceToStringTag: boolean
) => {
	const { _, cnst, getPropertyAccess, n, s } = snippets;
	const copyProperty =
		`{${n}` +
		(liveBindings ? copyNonDefaultPropertyLiveBinding : copyPropertyStatic)(
			t,
			i + t + t,
			snippets
		) +
		`${i}${t}}`;
	return (
		`${i}${cnst} n${_}=${_}${
			namespaceToStringTag
				? `{__proto__:${_}null,${_}[Symbol.toStringTag]:${_}'Module'}`
				: 'Object.create(null)'
		};${n}` +
		`${i}if${_}(e)${_}{${n}` +
		`${i}${t}${loopOverKeys(copyProperty, !liveBindings, true, snippets)}${n}` +
		`${i}}${n}` +
		`${i}n${getPropertyAccess('default')}${_}=${_}e;${n}` +
		`${i}return ${getFrozen('n', freeze)}${s}${n}`
	);
};

const loopOverKeys = (
	body: string,
	allowVarLoopVariable: boolean,
	isStatement: boolean,
	{ _, cnst, getFunctionIntro, s }: GenerateCodeSnippets
) =>
	cnst !== 'var' || allowVarLoopVariable
		? wrapBracesIfNeeded(`for${_}(${cnst} k in e)${_}${body}`, !isStatement, _)
		: `Object.keys(e).forEach(${getFunctionIntro(['k'], {
				isAsync: false,
				name: null
		  })}${body})${isStatement ? s : ''}`;

const loopOverNamespaces = (
	body: string,
	allowVarLoopVariable: boolean,
	t: string,
	{ _, cnst, getDirectReturnFunction, getFunctionIntro, n }: GenerateCodeSnippets
) => {
	if (cnst !== 'var' || allowVarLoopVariable) {
		return (
			`for${_}(var i${_}=${_}0;${_}i${_}<${_}m.length;${_}i++)${_}{${n}` +
			`${t}${t}${cnst} e${_}=${_}m[i];${n}` +
			`${t}${t}for${_}(${cnst} k in e)${_}${body}${n}${t}}`
		);
	}
	const { left, right } = getDirectReturnFunction(['e'], {
		functionReturn: false,
		lineBreakIndent: t,
		name: null,
		t
	});
	return (
		`m.forEach(${left}` +
		`Object.keys(e).forEach(${getFunctionIntro(['k'], {
			isAsync: false,
			name: null
		})}${body})${right});`
	);
};

const copyNonDefaultPropertyLiveBinding = (
	t: string,
	i: string,
	snippets: GenerateCodeSnippets
) => {
	const { _, n } = snippets;
	return (
		`${i}if${_}(k${_}!==${_}'default')${_}{${n}` +
		copyPropertyLiveBinding(t, i + t, snippets) +
		`${i}}${n}`
	);
};

const copyPropertyLiveBinding = (
	t: string,
	i: string,
	{ _, cnst, getDirectReturnFunction, n }: GenerateCodeSnippets
) => {
	const { left, right } = getDirectReturnFunction([], {
		functionReturn: true,
		lineBreakIndent: false,
		name: null,
		t: ''
	});
	return (
		`${i}${cnst} d${_}=${_}Object.getOwnPropertyDescriptor(e,${_}k);${n}` +
		`${i}Object.defineProperty(n,${_}k,${_}d.get${_}?${_}d${_}:${_}{${n}` +
		`${i}${t}enumerable:${_}true,${n}` +
		`${i}${t}get:${_}${left}e[k]${right}${n}` +
		`${i}});${n}`
	);
};

const copyPropertyStatic = (_t: string, i: string, { _, n }: GenerateCodeSnippets) =>
	`${i}n[k]${_}=${_}e[k];${n}`;

const getFrozen = (fragment: string, freeze: boolean) =>
	freeze ? `Object.freeze(${fragment})` : fragment;

export const HELPER_NAMES = Object.keys(HELPER_GENERATORS);

const wrapBracesIfNeeded = (code: string, needsBraces: boolean | undefined, _: string): string =>
	needsBraces ? `{${_}${code}${_}` : code;

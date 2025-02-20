import translations from './en-GB.json';

type DotNotation<T> = T extends object
	? {
			[K in keyof T]: K extends string
				? T[K] extends object
					? `${K}.${DotNotation<T[K]>}`
					: K
				: never;
		}[keyof T]
	: never;

type TranslationKey = DotNotation<typeof translations>;

export function t(key: TranslationKey, params?: Record<string, string>): string {
	let translation = translations[key] || 'Translation not found for the key: ' + key;

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			translation = translation.replace(`{%s${key}}`, value);
		}
	}

	return translation;
}

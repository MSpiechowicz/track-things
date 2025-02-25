// We know that the field exists, but we don't know the type
// Don't remove this, it's intentional
// @ts-nocheck

export function sortData<T>(data: T[], field: string, modifier: number) {
	return [...data].sort((a: T, b: T) => {
		const typeA = typeof a[field];
		const typeB = typeof b[field];

		if (typeA === 'number' && typeB === 'number') {
			return sortDataByNumber(a[field] as number, b[field] as number, modifier);
		}

		if (typeA === 'date' && typeB === 'date') {
			return sortDataByDate(a[field] as Date, b[field] as Date, modifier);
		}

		return sortDataByString(a[field] as string, b[field] as string, modifier);
	});
}

function sortDataByNumber(a: number, b: number, modifier: number) {
	return modifier * (a - b);
}

function sortDataByString(a: string, b: string, modifier: number) {
	return modifier * a.localeCompare(b);
}

function sortDataByDate(a: Date, b: Date, modifier: number) {
	return modifier * (a.getTime() - b.getTime());
}

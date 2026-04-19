import rawConfig from "../../site.config.json";
import { defaults } from "./defaults";
import type { SiteConfig } from "./types";

function deepMerge<T extends Record<string, unknown>>(
	target: T,
	source: Record<string, unknown>,
): T {
	const result = { ...target };
	for (const key of Object.keys(source)) {
		const sv = source[key];
		const tv = (target as Record<string, unknown>)[key];
		if (
			sv !== null &&
			typeof sv === "object" &&
			!Array.isArray(sv) &&
			tv !== null &&
			typeof tv === "object" &&
			!Array.isArray(tv)
		) {
			(result as Record<string, unknown>)[key] = deepMerge(
				tv as Record<string, unknown>,
				sv as Record<string, unknown>,
			);
		} else if (sv !== undefined) {
			(result as Record<string, unknown>)[key] = sv;
		}
	}
	return result;
}

export const config: SiteConfig = deepMerge(
	defaults,
	rawConfig as Record<string, unknown>,
);

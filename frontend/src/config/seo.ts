import { config } from "./index";

function setMeta(name: string, content: string, attr = "name"): void {
	if (!content) return;
	let el = document.querySelector(
		`meta[${attr}="${name}"]`,
	) as HTMLMetaElement | null;
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, name);
		document.head.appendChild(el);
	}
	el.content = content;
}

export function applySeo(): void {
	const { site, theme } = config;

	document.documentElement.lang = site.lang;
	document.title = site.title;

	setMeta("description", site.description);
	setMeta("theme-color", site.themeColor || theme.colors.bg);

	setMeta("og:title", site.title, "property");
	setMeta("og:description", site.description, "property");
	setMeta("og:type", "website", "property");
	if (site.url) setMeta("og:url", site.url, "property");

	setMeta("twitter:card", "summary_large_image");
	setMeta("twitter:title", site.title);
	setMeta("twitter:description", site.description);
}

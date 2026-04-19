import { config } from "./index";

export function applyTheme(): void {
	const root = document.documentElement;
	const { colors, fonts } = config.theme;

	root.style.setProperty("--bg", colors.bg);
	root.style.setProperty("--text", colors.text);
	root.style.setProperty("--muted", colors.muted);
	root.style.setProperty("--success", colors.success);
	root.style.setProperty("--error", colors.error);
	root.style.setProperty("--font-title", `"${fonts.title}", sans-serif`);
	root.style.setProperty("--font-mono", `"${fonts.mono}", monospace`);

	if (fonts.googleFontsUrl) {
		const existing = document.querySelector(
			"link[data-config-fonts]",
		) as HTMLLinkElement | null;
		if (existing) {
			existing.href = fonts.googleFontsUrl;
		} else {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = fonts.googleFontsUrl;
			link.dataset.configFonts = "";
			document.head.appendChild(link);
		}
	}
}

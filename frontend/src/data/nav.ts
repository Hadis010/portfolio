import { config } from "../config";

export const navData = {
	links: config.nav.links.map((l) => ({
		href: l.href,
		sectionId: l.href,
		label: l.label,
	})),
	settings: {
		sound: config.nav.settings.soundLabel,
		animations: config.nav.settings.animationsLabel,
	},
};

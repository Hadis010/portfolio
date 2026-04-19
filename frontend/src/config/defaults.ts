import type { SiteConfig } from "./types";

export const defaults: SiteConfig = {
	site: {
		name: "Portfolio",
		title: "Portfolio",
		description: "Mon portfolio",
		lang: "fr",
		themeColor: "#151e16",
		url: "",
	},
	theme: {
		colors: {
			bg: "#151e16",
			text: "#ecffee",
			muted: "#808080",
			success: "#69a47e",
			error: "#da6a6a",
		},
		fonts: {
			title: "sans-serif",
			mono: "monospace",
			googleFontsUrl: "",
		},
	},
	hero: {
		displayName: "PORTFOLIO",
		scrollLabel: "Scroll to explore",
		loadingLabel: "Loading... {{progress}}%",
		enterLabel: "ENTER",
		backgroundImage: "",
		ambientSound: "",
	},
	about: {
		title: "À propos",
		paragraph: "",
		cv: { label: "Télécharger mon CV", path: "", filename: "CV.pdf" },
		image: { src: "", alt: "About" },
	},
	contact: {
		title: "Contact",
		image: { src: "", alt: "Contact" },
		form: {
			name: { label: "Nom", placeholder: "Votre nom", error: "Requis" },
			email: {
				label: "Email",
				placeholder: "email@example.com",
				error: "Requis",
				errorInvalid: "Email invalide",
			},
			subject: {
				label: "Sujet",
				placeholder: "Sujet",
				error: "Requis",
			},
			message: {
				label: "Message",
				placeholder: "Votre message...",
				error: "Requis",
			},
			submitLabel: "Envoyer",
			submittingLabel: "Envoi...",
		},
	},
	footer: {
		name: "Portfolio",
		template: "{{year}} {{name}}. Tous droits réservés.",
	},
	nav: {
		links: [],
		settings: { soundLabel: "Son", animationsLabel: "Animations" },
	},
	social: [],
	techMap: {},
	technologiesBanner: [],
	timeline: [],
	projects: {
		seeAllLabel: "Voir plus",
		noMediaLabel: "Aucun média",
		posterAltTemplate: "Aperçu du projet {{title}}",
		ariaLabels: {
			readmePdf: "README PDF",
			website: "Site web",
			github: "GitHub",
		},
		items: [],
	},
};

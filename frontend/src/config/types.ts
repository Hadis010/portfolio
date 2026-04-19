export interface SiteConfig {
	site: {
		name: string;
		title: string;
		description: string;
		lang: string;
		themeColor: string;
		url: string;
	};
	theme: {
		colors: {
			bg: string;
			text: string;
			muted: string;
			success: string;
			error: string;
		};
		fonts: {
			title: string;
			mono: string;
			googleFontsUrl: string;
		};
	};
	hero: {
		displayName: string;
		scrollLabel: string;
		loadingLabel: string;
		enterLabel: string;
		backgroundImage: string;
		ambientSound: string;
	};
	about: {
		title: string;
		paragraph: string;
		cv: { label: string; path: string; filename: string };
		image: { src: string; alt: string };
	};
	contact: {
		title: string;
		image: { src: string; alt: string };
		form: {
			name: { label: string; placeholder: string; error: string };
			email: {
				label: string;
				placeholder: string;
				error: string;
				errorInvalid: string;
			};
			subject: { label: string; placeholder: string; error: string };
			message: { label: string; placeholder: string; error: string };
			submitLabel: string;
			submittingLabel: string;
		};
	};
	footer: {
		name: string;
		template: string;
	};
	nav: {
		links: Array<{ href: string; label: string }>;
		settings: { soundLabel: string; animationsLabel: string };
	};
	social: Array<{ url: string; icon: string; label: string }>;
	techMap: Record<string, { icon: string; label: string }>;
	technologiesBanner: string[];
	timeline: Array<{
		date: string;
		organization: string;
		role?: string;
		description?: string;
		type: "formation" | "work";
	}>;
	projects: {
		seeAllLabel: string;
		noMediaLabel: string;
		posterAltTemplate: string;
		ariaLabels: {
			readmePdf: string;
			website: string;
			github: string;
		};
		items: Array<{
			id: string;
			title: string;
			description: string;
			technologies: string[];
			links: {
				readmePdf?: string;
				website?: string;
				github?: string;
			};
			video?: string;
			poster?: string;
		}>;
	};
}

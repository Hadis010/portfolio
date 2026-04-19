import { config } from "../config";

export interface Technology {
	icon: string;
	label: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	technologies: Technology[];
	links: {
		readmePdf?: string;
		website?: string;
		github?: string;
	};
	video: {
		src?: string;
		poster?: string;
	};
}

function mapTechnologies(keys: string[]): Technology[] {
	return keys
		.map((key) => config.techMap[key.toLowerCase()])
		.filter((tech): tech is Technology => tech !== undefined);
}

export const projects: Project[] = config.projects.items.map((item) => ({
	id: item.id,
	title: item.title,
	description: item.description,
	technologies: mapTechnologies(item.technologies),
	links: item.links,
	video: {
		src: item.video,
		poster: item.poster,
	},
}));

export const projectsSectionData = {
	seeAllLabel: config.projects.seeAllLabel,
};

export const projectCardData = {
	noMediaLabel: config.projects.noMediaLabel,
	posterAltTemplate: config.projects.posterAltTemplate,
	ariaLabels: config.projects.ariaLabels,
};

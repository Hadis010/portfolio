import { config } from "../config";

interface SocialLink {
	url: string;
	icon: string;
	label: string;
}

export const socialLinks: SocialLink[] = config.social;

import { config } from "../config";

export interface TimelineItem {
	date: string;
	organization: string;
	role?: string;
	description?: string;
	type: "formation" | "work";
}

export const timelineData: TimelineItem[] = config.timeline;

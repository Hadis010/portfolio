import { config } from "../config";
import type { Technology } from "./projects";

export const technologiesList: Technology[] = config.technologiesBanner
	.map((key) => config.techMap[key])
	.filter((t): t is Technology => t !== undefined);

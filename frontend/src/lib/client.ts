import { treaty } from "@elysiajs/eden";
import type { App } from "../../../backend/src/index";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const client = treaty<App>(API_URL);
export default client;

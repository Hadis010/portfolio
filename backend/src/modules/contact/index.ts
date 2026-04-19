import { Elysia } from "elysia";
import { contactBody, contactResponse } from "./model";
import { contactService } from "./service";

export const contactController = new Elysia().post(
	"/contact",
	async ({ body, set }) => {
		const response = await contactService.send(body);

		if (!response.success) {
			set.status = 400;
		}

		return response;
	},
	{
		body: contactBody,
		response: {
			200: contactResponse,
			400: contactResponse,
		},
	},
);

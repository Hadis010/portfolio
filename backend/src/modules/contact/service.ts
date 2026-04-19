import { env } from "../../config/env";
import type { ContactBody } from "./model";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const TURNSTILE_VERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerificationResponse = {
	success: boolean;
	"error-codes"?: string[];
};

const escapeHtml = (value: string): string =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

const verifyTurnstile = async (token: string): Promise<boolean> => {
	const body = new URLSearchParams({
		secret: env.turnstileSecret,
		response: token,
	});

	const response = await fetch(TURNSTILE_VERIFY_URL, {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		},
		body,
	});

	if (!response.ok) {
		console.error("Turnstile API error", { status: response.status });
		return false;
	}

	const result = (await response.json()) as TurnstileVerificationResponse;

	if (!result.success) {
		console.error("Turnstile validation failed", {
			errorCodes: result["error-codes"] ?? [],
		});
	}

	return result.success;
};

async function send(data: ContactBody) {
	const isHuman = await verifyTurnstile(data.turnstileToken);

	if (!isHuman) {
		return {
			success: false,
			message: "Validation anti-spam invalide",
		};
	}

	const htmlContent = `
		<h2>Nouveau message depuis le portfolio</h2>
		<p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
		<p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
		<p><strong>Sujet :</strong> ${escapeHtml(data.subject)}</p>
		<hr />
		<p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
	`;

	const textContent = [
		"Nouveau message depuis le portfolio",
		`Nom: ${data.name}`,
		`Email: ${data.email}`,
		`Sujet: ${data.subject}`,
		"",
		data.message,
	].join("\n");

	const response = await fetch(BREVO_API_URL, {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			"api-key": env.brevoApiKey,
		},
		body: JSON.stringify({
			sender: {
				email: env.contactFromEmail,
				name: env.contactFromName,
			},
			to: [{ email: env.contactToEmail }],
			replyTo: {
				email: data.email,
				name: data.name,
			},
			subject: `[Portfolio] ${data.subject}`,
			textContent,
			htmlContent,
		}),
	});

	if (!response.ok) {
		const errorBody = await response.text();
		console.error("Brevo API error", {
			status: response.status,
			body: errorBody,
		});
		throw new Error("Email sending failed");
	}

	return {
		success: true,
		message: "Message envoyé avec succès",
	};
}

export const contactService = { send };

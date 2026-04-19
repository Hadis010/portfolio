const readEnv = (name: string): string | undefined => {
	const value = Bun.env[name];
	if (!value) return undefined;

	const trimmedValue = value.trim();
	return trimmedValue.length > 0 ? trimmedValue : undefined;
};

const getRequiredEnv = (name: string): string => {
	const value = readEnv(name);
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
};

export const env = {
	brevoApiKey: getRequiredEnv("BREVO_API_KEY"),
	turnstileSecret: getRequiredEnv("TURNSTILE"),
	contactToEmail: getRequiredEnv("CONTACT_TO_EMAIL"),
	contactFromEmail: getRequiredEnv("CONTACT_FROM_EMAIL"),
	contactFromName: readEnv("CONTACT_FROM_NAME") ?? "Portfolio Contact",
};

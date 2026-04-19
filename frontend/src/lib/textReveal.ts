export interface TextRevealOptions {
	delay?: number;
	instant?: boolean;
}

export function textReveal(
	element: HTMLElement,
	text: string,
	options: TextRevealOptions = {},
): void {
	const { delay = 50, instant = false } = options;

	const normalizedText = text.trim().replace(/\s+/g, " ");

	if (instant) {
		element.textContent = normalizedText;
		return;
	}

	element.innerHTML = "";

	const words = normalizedText.split(" ");
	const spans: HTMLSpanElement[] = [];

	words.forEach((word, wordIndex) => {
		const wordSpan = document.createElement("span");
		wordSpan.style.display = "inline-block";
		wordSpan.style.whiteSpace = "nowrap";

		const wordChars = word.split("");
		wordChars.forEach((char) => {
			const charSpan = document.createElement("span");
			charSpan.textContent = char;
			charSpan.style.opacity = "0";
			charSpan.style.transition = "opacity 0.3s ease-out";
			charSpan.style.display = "inline";
			wordSpan.appendChild(charSpan);
			spans.push(charSpan);
		});

		if (wordIndex < words.length - 1) {
			const spaceSpan = document.createElement("span");
			spaceSpan.textContent = "\u00A0";
			spaceSpan.style.opacity = "0";
			spaceSpan.style.transition = "opacity 0.3s ease-out";
			spaceSpan.style.display = "inline";
			wordSpan.appendChild(spaceSpan);
			spans.push(spaceSpan);
		}

		element.appendChild(wordSpan);
	});

	const indices = Array.from({ length: spans.length }, (_, i) => i);
	for (let i = indices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const valI = indices[i];
		const valJ = indices[j];
		if (valI !== undefined && valJ !== undefined) {
			indices[i] = valJ;
			indices[j] = valI;
		}
	}

	indices.forEach((index, i) => {
		setTimeout(() => {
			const span = spans[index];
			if (span) {
				span.style.opacity = "1";
			}
		}, i * delay);
	});
}

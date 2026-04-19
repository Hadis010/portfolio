import Lenis from "lenis";
import { onUnmounted } from "vue";

type LenisState = {
	rafId: number | null;
	lenis: Lenis | null;
};

const state: LenisState = {
	rafId: null,
	lenis: null,
};

function loop(time: number): void {
	if (!state.lenis) return;
	state.lenis.raf(time);
	state.rafId = requestAnimationFrame(loop);
}

interface LenisOptions {
	lerp?: number;
	duration?: number;
	wheelMultiplier?: number;
	touchMultiplier?: number;
	smoothWheel?: boolean;
	easing?: (t: number) => number;
}

export function useLenis(options: LenisOptions = {}) {
	const start = (): void => {
		if (state.lenis) return;

		state.lenis = new Lenis({
			lerp: options.lerp ?? 0.06,
			duration: options.duration ?? 1.2,
			wheelMultiplier: options.wheelMultiplier ?? 1,
			touchMultiplier: options.touchMultiplier ?? 2,
			smoothWheel: options.smoothWheel ?? true,
			easing: options.easing,
		});

		state.rafId = requestAnimationFrame(loop);
	};

	const stop = (): void => {
		if (state.rafId !== null) {
			cancelAnimationFrame(state.rafId);
			state.rafId = null;
		}
		if (state.lenis) {
			state.lenis.destroy();
			state.lenis = null;
		}
	};

	onUnmounted(stop);

	return {
		start,
		stop,
		getInstance: () => state.lenis,
	};
}

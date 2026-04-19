<script setup lang="ts">
import {
	computed,
	onMounted,
	onUnmounted,
	provide,
	ref,
	watch,
	watchEffect,
} from "vue";
import Button from "./components/Button.vue";
import Footer from "./components/Footer.vue";
import { useLenis } from "./composables/useLenis";
import { heroData } from "./data/hero";
import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import HomePage from "./pages/HomePage.vue";
import ProjectsPage from "./pages/ProjectsPage.vue";
import TechnologiesPage from "./pages/TechnologiesPage.vue";
import TimelinePage from "./pages/TimelinePage.vue";

const progress = ref(0);
const loadingText = computed(() =>
	heroData.loadingLabel.replace("{{progress}}", String(progress.value)),
);
const ready = ref(false);
const entered = ref(false);
const isButtonFading = ref(false);
const audioRef = ref<HTMLAudioElement>();

const STORAGE_ANIMATIONS = "portfolio-animations-enabled";
const animationsEnabled = ref(
	typeof localStorage !== "undefined"
		? localStorage.getItem(STORAGE_ANIMATIONS) !== "false"
		: true,
);
watch(
	animationsEnabled,
	(enabled) => {
		document.documentElement.classList.toggle("animations-off", !enabled);
		try {
			localStorage.setItem(STORAGE_ANIMATIONS, String(enabled));
		} catch {
			/* quota exceeded */
		}
	},
	{ immediate: true },
);

const {
	start: startLenis,
	stop: stopLenis,
	getInstance: getLenisInstance,
} = useLenis({
	lerp: 0.5,
	duration: 3,
	wheelMultiplier: 0.5,
	touchMultiplier: 1,
});

provide("audioRef", audioRef);
provide("entered", entered);
provide("lenis", getLenisInstance);
provide("animationsEnabled", animationsEnabled);

onMounted(() => {
	const startTime = Date.now();
	const duration = 1000;

	const updateProgress = () => {
		const elapsed = Date.now() - startTime;
		const newProgress = Math.min((elapsed / duration) * 100, 100);

		if (newProgress >= 100) {
			progress.value = 100;
			ready.value = true;
		} else {
			progress.value = Math.ceil(newProgress);
			requestAnimationFrame(updateProgress);
		}
	};

	requestAnimationFrame(updateProgress);
});

const handleEnter = () => {
	isButtonFading.value = true;
	audioRef.value?.play().catch(() => {});
	setTimeout(() => {
		entered.value = true;
		startLenis();
	}, 1000);
};

watchEffect(() => {
	document.body.style.overflow = entered.value ? "" : "hidden";
});

onUnmounted(() => {
	stopLenis();
	document.body.style.overflow = "";
});
</script>

<template>
  <audio
    v-if="heroData.ambientSound"
    ref="audioRef"
    :src="heroData.ambientSound"
    loop
    preload="auto"
    muted
  ></audio>

  <div v-show="!entered" class="loader" role="dialog" aria-modal="true">
    <h1
      :style="{
        backgroundImage: `linear-gradient(to right, var(--text) 0%, var(--text) ${progress}%, color-mix(in srgb, var(--text) 10%, transparent) ${progress}%, color-mix(in srgb, var(--text) 10%, transparent) 100%)`,
      }"
    >
      {{ heroData.displayName }}
    </h1>
    <div class="loading-status-container">
      <Transition name="fade" mode="out-in">
        <p v-if="!ready" key="loading" role="status" aria-live="polite">
          {{ loadingText }}
        </p>
        <Button
          v-else
          key="button"
          :class="{ 'button--fade': isButtonFading }"
          :label="heroData.enterLabel"
          @click="handleEnter"
        />
      </Transition>
    </div>
  </div>

  <main v-show="entered" class="site-content">
    <HomePage />
    <div class="gradient-overlay"></div>
    <AboutPage />
    <TechnologiesPage />
    <TimelinePage />
    <ProjectsPage />
    <ContactPage />
    <Footer />
  </main>
</template>

<style scoped>
.loader {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  position: absolute;
  z-index: 1;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-image 0.08s linear;
}

.loading-status-container {
  position: relative;
  top: 15%;
  color: var(--muted);
  gap: var(--spacing-md);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--bg));
}
</style>

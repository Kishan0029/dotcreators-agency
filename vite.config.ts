import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Move the nitro configuration here
    nitro: {
      preset: "vercel",
    },
  },
  vite: {
    // Keep any other actual Vite-specific settings here if needed
  },
});
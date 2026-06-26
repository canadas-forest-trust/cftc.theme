import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Used by Storybook (@storybook/react-vite) to enable React + Tailwind v4.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

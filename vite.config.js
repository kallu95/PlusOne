import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your GitHub repo name, with slashes.
// If your repo is called "plus-one", leave this as "/plus-one/".
export default defineConfig({
  plugins: [react()],
  base: "/plus-one/",
});

import { defineConfig } from "tsup";

export default defineConfig({
	name: "shieldwall",
	bundle: false,
	clean: true,
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: "esm",
	outDir: "lib",
	sourcemap: true,
});

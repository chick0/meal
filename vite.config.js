import path from "path"
import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            src: path.resolve(__dirname) + "/src",
            routes: path.resolve(__dirname) + "/src/routes",
            lib: path.resolve(__dirname) + "/src/lib",
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:1365",
                changeOrigin: true,
                secure: false,
            },
        },
    },
})

import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [uni()],
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8080',
				rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
	}
});

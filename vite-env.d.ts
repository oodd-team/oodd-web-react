/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_REST_API_KEY: string;
	VITE_REDIRECT_URI: string;
	VITE_NAVER_CLIENT_ID: string;
	VITE_NAVER_CLIENT_SECRET: string;
	VITE_GOOGLE_CLIENT_ID: string;
	VITE_GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

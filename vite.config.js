import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: path.join(__dirname, '/resources/images'),
                    dest: path.join(__dirname, '/public'),
                },
            ],
        }),
    ],
});

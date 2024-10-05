import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';
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
        i18n(),
        viteStaticCopy({
            targets: [
                {
                    src: path.join(__dirname, '/resources/images'),
                    dest: path.join(__dirname, '/public'),
                },
                {
                    src: path.join(__dirname, '/resources/icons'),
                    dest: path.join(__dirname, '/public'),
                },
            ],
        }),
    ],
});

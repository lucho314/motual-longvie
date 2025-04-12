import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/index.tsx',
            refresh: true
        }),
        react(),


    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173
    }
})

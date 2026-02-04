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
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost'
        },
        watch: {
            usePolling: false
        }
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom']
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom']
                }
            }
        }
    }
})

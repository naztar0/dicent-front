import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import {defineConfig} from 'vite'
import {cwd, env} from 'process'
import {join} from 'path'

export default defineConfig({
    mode: env.NODE_ENV,
    root: cwd(),
    base: '/',
    plugins: [svgr(), react()],
    server: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@': join(__dirname, 'src'),
        },
    },
})
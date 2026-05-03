import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chokidar from 'chokidar'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'photo-reload-watcher',
      configureServer(server) {
        // Watch the photos folder for any additions or deletions
        const watcher = chokidar.watch('src/assets/photos/', {
          ignoreInitial: true,
        })

        // Trigger a full page reload whenever a file is added or removed
        const reload = () => {
          server.ws.send({ type: 'full-reload' })
        }

        watcher.on('add', reload)
        watcher.on('unlink', reload)
      },
    }
  ],
  assetsInclude: ["/*.JPG", "/*.JPEG", "/*.PNG", "/*.WEBP"],
})

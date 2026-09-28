import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

const uploadHeroPlugin: Plugin = {
  name: 'upload-hero-plugin',
  configureServer(server) {
    server.middlewares.use('/api/upload-hero', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.imageBase64) {
              const base64Data = parsed.imageBase64.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');
              const publicPath = path.resolve(__dirname, 'public/images/hero_exterior_twilight.png');
              fs.writeFileSync(publicPath, buffer);

              const distPath = path.resolve(__dirname, 'dist/images/hero_exterior_twilight.png');
              if (fs.existsSync(path.dirname(distPath))) {
                fs.writeFileSync(distPath, buffer);
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
              return;
            }
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
            return;
          }
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Missing imageBase64' }));
        });
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  }
};

export default defineConfig(() => {
  return {
    base: '/Bass_compex/'
    plugins: [react(), tailwindcss(), uploadHeroPlugin],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

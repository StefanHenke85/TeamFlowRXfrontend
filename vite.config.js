import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Nutzt das React SWC Plugin, um JSX korrekt zu verarbeiten
    react(),
  ],
  define: {
    'process.env': process.env, // Setzt Umgebungsvariablen in Vite
  },
  resolve: {
    // Stellt sicher, dass Vite `.jsx` Dateien korrekt auflöst
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    host: true, // Öffnet den Server für alle Netzwerke (z. B. 0.0.0.0)
    port: 5173, // Setzt den Port, falls du einen anderen bevorzugst, passe ihn an
  },
});

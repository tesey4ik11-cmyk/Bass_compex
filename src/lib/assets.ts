const BASE = import.meta.env.BASE_URL;

/**
 * Собирает корректный URL для файла из public/.
 * BASE_URL уже заканчивается на «/» и равен vite.config.ts → base
 * («/» при локальном запуске, «/Bass_compex/» на GitHub Pages),
 * поэтому «/images/...» в разметке уехал бы в корень домена и отдал бы 404.
 */
export function img(path: string): string {
  return BASE + path.replace(/^\/+/, '');
}

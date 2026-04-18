import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Prefix für Assets unter /public. Wichtig für GitHub Pages, wo die App
// unter /kfz-gutachter-landing/ läuft statt unter /.
export function asset(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

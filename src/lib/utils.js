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

// Berechnet wo ein Punkt aus dem ORIGINAL-Bild (in %) im Container landet,
// nachdem object-fit:cover das Bild beschnitten hat. So bleiben Pins immer
// auf dem Auto, egal welcher Viewport / welche Aspect Ratio.
//
// imgW, imgH    : natürliche Bildgröße (z. B. 2400 x 2400)
// containerW, H : aktuelle Container-Größe (px)
// xPct, yPct    : Position im Bild (0–100)
// returns       : { x, y } in Pixel, relativ zum Container
export function objectCoverPoint(imgW, imgH, containerW, containerH, xPct, yPct) {
  if (!containerW || !containerH) return { x: 0, y: 0 }
  const imgAspect = imgW / imgH
  const cAspect = containerW / containerH
  let displayedW, displayedH, offsetX = 0, offsetY = 0
  if (imgAspect > cAspect) {
    // Bild relativ breiter als Container → Höhe matched, Breite ragt seitlich raus
    displayedH = containerH
    displayedW = containerH * imgAspect
    offsetX = (displayedW - containerW) / 2
  } else {
    // Bild relativ höher → Breite matched, Höhe ragt oben/unten raus
    displayedW = containerW
    displayedH = containerW / imgAspect
    offsetY = (displayedH - containerH) / 2
  }
  return {
    x: (xPct / 100) * displayedW - offsetX,
    y: (yPct / 100) * displayedH - offsetY,
  }
}

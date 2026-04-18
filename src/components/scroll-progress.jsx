import { motion, useScroll, useSpring } from 'framer-motion'

// Dünner Gold-Balken am oberen Rand — füllt sich beim Scrollen.
// Spring-Physik → weicher, nicht ruckartig.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  })

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-soft shadow-[0_0_8px_rgba(184,145,94,0.6)]"
      style={{ scaleX }}
    />
  )
}

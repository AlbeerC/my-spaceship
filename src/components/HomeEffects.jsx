import { motion } from "framer-motion"
import { useMemo } from "react"

export function HomeEffects() {
  const particles = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      top: `${30 + Math.random() * 40}%`,
      x: Math.random() * 10 - 5,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Efecto de brillo en los bordes del parabrisas */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(45deg, transparent 40%, rgba(34, 211, 238, 0.1) 50%, transparent 60%)",
        }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      {/* Reflexiones ocasionales en el cristal */}
      <motion.div
        className="absolute top-[10%] left-[20%] w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        animate={{ opacity: [0, 0.4, 0], x: [0, 200, 400] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 8 }}
      />

      <motion.div
        className="absolute top-[60%] right-[15%] w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        animate={{ opacity: [0, 0.3, 0], x: [0, -150, -300] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 12 }}
      />

      {/* Partículas flotantes dentro del cockpit */}
      {particles.map((p) => (
        <motion.div
          key={`cockpit-particle-${p.id}`}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -20, 0],
            x: [0, p.x, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Efecto de respiración del ambiente */}
      <motion.div
        className="absolute inset-0 bg-cyan-500/5"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  )
}
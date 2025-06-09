import { motion } from "framer-motion"
import { useEffect, useState } from "react"


export default function WarpEffect({ triggerWarp = false, onWarpComplete }) {
  const [warpLines, setWarpLines] = useState([])
  const [isWarpActive, setIsWarpActive] = useState(false)

  useEffect(() => {
    const generateWarpLines = () => {
      const lines = []
      const centerX = 50
      const centerY = 40

      for (let i = 0; i < 25; i++) {
        const angle = (Math.PI * 2 * i) / 25
        const distance = Math.random() * 45 + 15
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        lines.push({
          id: i,
          x,
          y,
          length: Math.random() * 40 + 20,
          angle: angle,
          speed: Math.random() * 2 + 1,
        })
      }

      setWarpLines(lines)
    }

    generateWarpLines()

    // Activar efecto warp automático ocasionalmente
    const warpInterval = setInterval(() => {
      if (!triggerWarp) {
        setIsWarpActive(true)
        setTimeout(() => {
          setIsWarpActive(false)
          onWarpComplete?.()
        }, 2500)
      }
    }, 20000)

    return () => clearInterval(warpInterval)
  }, [triggerWarp, onWarpComplete])

  // Activar warp cuando se presiona el botón
  useEffect(() => {
    if (triggerWarp) {
      setIsWarpActive(true)
      setTimeout(() => {
        setIsWarpActive(false)
        onWarpComplete?.()
      }, 2500)
    }
  }, [triggerWarp, onWarpComplete])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(15% 0%, 85% 0%, 95% 40%, 85% 80%, 15% 80%, 5% 40%)",
        }}
      >
        {/* Líneas de warp principales */}
        {warpLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              left: `${line.x}%`,
              top: `${line.y}%`,
              width: isWarpActive ? `${line.length * 4}px` : "2px",
              height: "2px",
              transformOrigin: "left center",
              transform: `rotate(${line.angle}rad)`,
            }}
            animate={{
              opacity: isWarpActive ? [0, 1, 0.8, 0] : 0,
              scaleX: isWarpActive ? [0, 1, 1.5, 0] : 0,
              boxShadow: isWarpActive
                ? [
                    "0 0 0px rgba(34, 211, 238, 0)",
                    "0 0 10px rgba(34, 211, 238, 1)",
                    "0 0 20px rgba(34, 211, 238, 0.8)",
                    "0 0 0px rgba(34, 211, 238, 0)",
                  ]
                : "0 0 0px rgba(34, 211, 238, 0)",
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Efecto de túnel central durante el warp */}
        {isWarpActive && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 4],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            <div className="w-32 h-32 rounded-full border-4 border-cyan-400/50 bg-cyan-400/10" />
          </motion.div>
        )}

        {/* Partículas de energía durante el warp */}
        {isWarpActive &&
          [...Array(15)].map((_, i) => (
            <motion.div
              key={`warp-particle-${i}`}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${50 + (Math.random() - 0.5) * 60}%`,
                top: `${40 + (Math.random() - 0.5) * 40}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 300],
                y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
      </div>
    </div>
  )
}

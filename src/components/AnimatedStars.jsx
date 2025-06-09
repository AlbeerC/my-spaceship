import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedStars() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []

      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.6 + 0.3,
        })
      }

      for (let i = 50; i < 80; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.8 + 0.4,
        })
      }

      for (let i = 80; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1.5,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 1 + 0.6,
        })
      }

      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(15% 0%, 85% 0%, 95% 40%, 85% 80%, 15% 80%, 5% 40%)",
        }}
      >
        {/* Estrellas en movimiento */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              x: [0, -window.innerWidth * (star.speed / 10)],
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: 20 / star.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Estrellas que parpadean */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`twinkle-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "2px",
              height: "2px",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Efecto de nebulosa */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        {/* Polvo espacial */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute bg-gray-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "1px",
              height: "1px",
            }}
            animate={{
              x: [0, -window.innerWidth * 0.3],
              y: [0, Math.random() * 50 - 25],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </div>
  )
}

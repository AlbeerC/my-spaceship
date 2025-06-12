import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Zap, Wifi, Terminal, Radar, Satellite } from "lucide-react"

export default function SpaceLoadingScreen({ onLoadingComplete, duration }) {
  const [progress, setProgress] = useState(0)
  const [currentSystem, setCurrentSystem] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const systems = [
    { name: "INICIALIZANDO_SISTEMAS", icon: Terminal, color: "text-cyan-400" },
    { name: "CONECTANDO_SENSORES", icon: Radar, color: "text-blue-400" },
    { name: "CALIBRANDO_COMUNICACIONES", icon: Satellite, color: "text-green-400" },
    { name: "ACTIVANDO_INTERFACES", icon: Wifi, color: "text-orange-400" },
    { name: "SISTEMAS_OPERATIVOS", icon: Zap, color: "text-purple-400" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 50)

        // Cambiar sistema actual basado en el progreso
        const systemIndex = Math.floor((newProgress / 100) * systems.length)
        setCurrentSystem(Math.min(systemIndex, systems.length - 1))

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onLoadingComplete?.()
          }, 500)
          return 100
        }

        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [duration, onLoadingComplete, systems.length])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Fondo de estrellas animadas */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Círculos de escaneo */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-400/30 rounded-full"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: [0, 400, 800],
                  height: [0, 400, 800],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Contenedor principal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-md w-full mx-4"
          >
            {/* Logo/Identificación de la nave */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,255,255,0.3)",
                    "0 0 40px rgba(0,255,255,0.6)",
                    "0 0 20px rgba(0,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-cyan-400/60 bg-black/40 backdrop-blur-sm mb-4"
              >
                <Terminal className="w-10 h-10 text-cyan-400" />
              </motion.div>

              <motion.h1
                animate={{
                  textShadow: [
                    "0 0 10px rgba(0,255,255,0.5)",
                    "0 0 20px rgba(0,255,255,0.8)",
                    "0 0 10px rgba(0,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-2xl font-bold text-cyan-400 font-mono mb-2"
              >
                SPACE_PORTFOLIO
              </motion.h1>

              <p className="text-gray-400 text-sm font-mono">INICIALIZANDO_SISTEMAS_DE_NAVEGACION</p>
            </motion.div>

            {/* Panel de estado del sistema */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-black/60 rounded-lg border border-cyan-400/40 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,255,0.2)]"
            >
              {/* Estado actual del sistema */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {systems[currentSystem] && (
                    <div className={`w-5 h-5 ${systems[currentSystem].color}`}>
                      {(() => {
                        const IconComponent = systems[currentSystem].icon
                        return <IconComponent className="w-full h-full" />
                      })()}
                    </div>
                  )}
                </motion.div>

                <motion.span
                  key={currentSystem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-sm font-mono ${systems[currentSystem]?.color || "text-cyan-400"}`}
                >
                  {systems[currentSystem]?.name || "CARGANDO..."}
                </motion.span>

                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-green-400 rounded-full ml-auto"
                />
              </div>

              {/* Barra de progreso futurista */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-400">PROGRESO_GENERAL</span>
                  <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}%</span>
                </div>

                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  {/* Fondo con efecto de grid */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

                  {/* Barra de progreso principal */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Efecto de brillo que se mueve */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </motion.div>

                  {/* Efecto de glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-cyan-400/20 rounded-full blur-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Indicadores de subsistemas */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {systems.slice(0, 4).map((system, index) => (
                  <motion.div
                    key={system.name}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: currentSystem >= index ? 1 : 0.3,
                    }}
                    className="flex items-center gap-2 text-xs font-mono"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: currentSystem >= index ? "rgb(34, 197, 94)" : "rgb(107, 114, 128)",
                      }}
                      className="w-2 h-2 rounded-full"
                    />
                    <span className={currentSystem >= index ? "text-green-400" : "text-gray-500"}>
                      {system.name.split("_")[0]}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mensaje de estado */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 pt-4 border-t border-gray-700/50 text-center"
              >
                <motion.p
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-xs font-mono text-gray-400"
                >
                  {progress < 100 ? "PREPARANDO_INTERFAZ_DE_USUARIO..." : "SISTEMAS_LISTOS_PARA_NAVEGACION"}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Partículas de datos */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  animate={{
                    x: [0, Math.random() * 200 - 100],
                    y: [0, Math.random() * 200 - 100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

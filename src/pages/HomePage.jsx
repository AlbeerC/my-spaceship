import SnapSection from "../components/SnapSection"
import homebg from "../assets/home-bg.jpg"
import AnimatedStars from "../components/AnimatedStars"
import WarpEffect from "../components/WarpEffect"
import { HomeEffects } from "../components/HomeEffects"
import CockpitControls from "../components/Controls"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function HomePage() {
  const [warpTrigger, setWarpTrigger] = useState(false)
  const [cockpitLighting, setCockpitLighting] = useState("normal")
  const [engineEffects, setEngineEffects] = useState(false)
  const [showNavigationHUD, setShowNavigationHUD] = useState(false)
  const [showCommunicationsPanel, setShowCommunicationsPanel] = useState(false)
  const [communicationsMessages, setCommunicationsMessages] = useState([])
  const [navigationTargets] = useState([
    { id: "about", name: "Sección Sobre Mí", distance: "1.8 ly", status: "DISPONIBLE" },
    { id: "skills", name: "Habilidades", distance: "2.3 ly", status: "DISPONIBLE" },
    { id: "projects", name: "Proyectos", distance: "3.5 ly", status: "DISPONIBLE" },
    { id: "contact", name: "Contacto", distance: "4.5 ly", status: "DISPONIBLE" },
  ])

  const handleWarpActivate = () => {
    setWarpTrigger(true)
    setTimeout(() => setWarpTrigger(false), 100)
  }

  const handleSystemToggle = (system) => {
    if (system === "shields") {
      setCockpitLighting((prev) => (prev === "normal" ? "combat" : "normal"))
    }
    console.log(`System ${system} toggled`)
  }

  // Funcionalidad del sistema de navegación
  const handleNavigationActivate = () => {
    setShowNavigationHUD(true)
    setTimeout(() => setShowNavigationHUD(false), 8000)
  }

  // Funcionalidad del sistema de comunicaciones
  const handleCommunicationsActivate = () => {
    setShowCommunicationsPanel(true)
    setCommunicationsMessages([])

    // Simular mensajes de comunicación en tiempo real
    const messages = [
      { time: "12:34:56", type: "success", text: "Conexión establecida con la red" },
      { time: "12:34:57", type: "info", text: "Escaneando frecuencias disponibles..." },
      { time: "12:34:58", type: "warning", text: "Canales sociales detectados" },
      { time: "12:34:59", type: "success", text: "LinkedIn: Señal fuerte" },
      { time: "12:35:00", type: "success", text: "GitHub: Conexión estable" },
      { time: "12:35:01", type: "success", text: "Email: Canal abierto" },
      { time: "12:35:02", type: "info", text: "Sistema listo para transmisión" },
    ]

    messages.forEach((message, index) => {
      setTimeout(() => {
        setCommunicationsMessages((prev) => [...prev, message])
      }, index * 800)
    })

    setTimeout(() => setShowCommunicationsPanel(false), 10000)
  }

  // Funcionalidad del sistema de motores
  const handleEnginesActivate = (isActive) => {
    setEngineEffects(isActive)
  }

  // Navegación automática a sección
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setShowNavigationHUD(false)
    }
  }

  return (
    <SnapSection background={homebg} id="home" className="snap-mandatory">
      <AnimatedStars />
      <HomeEffects />

      {/* Efecto warp controlable */}
      <WarpEffect triggerWarp={warpTrigger} onWarpComplete={() => console.log("Warp completed!")} />

      {/* Efectos de motor mejorados */}
      <AnimatePresence>
        {engineEffects && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Partículas de motor principales */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`engine-particle-${i}`}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -80, -160],
                  opacity: [0, 1, 0],
                  scale: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Partículas de energía */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`energy-particle-${i}`}
                className="absolute w-2 h-2 bg-cyan-300 rounded-full blur-sm"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Efecto de propulsión de fondo */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/10 via-cyan-500/5 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD de Navegación mejorado */}
      <AnimatePresence>
        {showNavigationHUD && (
          <motion.div
            className="absolute top-20 right-16 bg-black/90 backdrop-blur-md border border-pink-500/50 rounded-lg p-4 max-w-sm shadow-2xl max-md:hidden"
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
          >
            <div className="text-pink-400 font-mono text-sm mb-3 flex items-center gap-2">
              🧭 SISTEMA DE NAVEGACIÓN
              <motion.div
                className="w-2 h-2 bg-pink-400 rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 0px rgba(244, 114, 182, 0)",
                    "0 0 8px rgba(244, 114, 182, 0.8)",
                    "0 0 0px rgba(244, 114, 182, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            {/* Radar de navegación */}
            <div className="relative w-full h-32 bg-black/50 rounded-lg mb-4 border border-pink-500/30 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-pink-300 font-mono text-xs"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ESCANEANDO DESTINOS...
                </motion.div>
              </div>
            </div>

            <div className="space-y-2">
              {navigationTargets.map((target, index) => (
                <motion.button
                  key={target.id}
                  className="w-full text-left p-3 rounded border border-pink-500/30 hover:bg-pink-500/10 transition-all hover:border-pink-400/50"
                  onClick={() => navigateToSection(target.id)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-pink-300 font-mono text-xs font-bold">{target.name}</div>
                    <motion.div
                      className="text-green-400 font-mono text-xs"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {target.status}
                    </motion.div>
                  </div>
                  <div className="text-pink-500 font-mono text-xs">Distancia: {target.distance}</div>
                </motion.button>
              ))}
            </div>

            <motion.div
              className="mt-4 p-2 bg-pink-500/10 rounded border border-pink-500/30"
              animate={{
                borderColor: ["rgba(244, 114, 182, 0.3)", "rgba(244, 114, 182, 0.6)", "rgba(244, 114, 182, 0.3)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-pink-300 font-mono text-xs text-center">Selecciona un destino para navegar</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de Comunicaciones mejorado */}
      <AnimatePresence>
        {showCommunicationsPanel && (
          <motion.div
            className="absolute top-20 left-8 bg-black/90 backdrop-blur-md border border-blue-500/50 rounded-lg p-4 max-w-md shadow-2xl max-md:hidden"
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
          >
            <div className="text-blue-400 font-mono text-sm mb-3 flex items-center gap-2">
              📡 SISTEMA DE COMUNICACIONES
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 8px rgba(59, 130, 246, 0.8)",
                    "0 0 0px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            {/* Terminal de comunicaciones */}
            <div className="bg-black/70 rounded p-3 border border-blue-500/30 mb-4 h-40 overflow-y-auto">
              <div className="space-y-1 text-xs font-mono">
                <AnimatePresence>
                  {communicationsMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`${
                        message.type === "success"
                          ? "text-green-400"
                          : message.type === "warning"
                            ? "text-yellow-400"
                            : message.type === "error"
                              ? "text-red-400"
                              : "text-blue-300"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      [{message.time}] {message.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Cursor parpadeante */}
                <motion.div
                  className="text-blue-400 inline-block"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  ▋
                </motion.div>
              </div>
            </div>

            {/* Controles de comunicación */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <motion.div
                className="p-2 bg-blue-500/10 rounded border border-blue-500/30 text-center"
                animate={{
                  borderColor: ["rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0.6)", "rgba(59, 130, 246, 0.3)"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="text-blue-300 font-mono text-xs">SEÑAL</div>
                <motion.div
                  className="text-green-400 font-mono text-xs font-bold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  FUERTE
                </motion.div>
              </motion.div>
              <div className="p-2 bg-blue-500/10 rounded border border-blue-500/30 text-center">
                <div className="text-blue-300 font-mono text-xs">CANALES</div>
                <div className="text-cyan-400 font-mono text-xs font-bold">4 ACTIVOS</div>
              </div>
            </div>

            <motion.button
              className="w-full p-3 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 hover:bg-blue-500/30 transition-all font-mono text-sm"
              onClick={() => navigateToSection("contact")}
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 Ir a Centro de Comunicaciones
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Información del piloto */}
      <div className="pt-12 2xl:pt-36 mx-auto max-w-sm 2xl:max-w-lg max-lg:max-w-[90%]">
        <motion.div
          className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(34, 211, 238, 0.4)",
            borderColor: "rgba(34, 211, 238, 0.6)",
          }}
        >
          {/* Efecto de escaneo de fondo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Partículas flotantes mejoradas */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="text-center relative z-10">
            <motion.div
              className="text-3xl 2xl:text-5xl font-mono font-bold text-cyan-300 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{
                textShadow: "0 0 15px rgba(34, 211, 238, 0.8)",
                scale: 1.05,
              }}
            >
              ALBERTO CAMINOS
            </motion.div>

            <motion.div
              className="text-md 2xl:text-lg font-mono text-gray-300 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              whileHover={{ color: "#22d3ee" }}
            >
              FRONTEND DEVELOPER
            </motion.div>

            <motion.div className="flex justify-center space-x-1 items-center mb-2" whileHover={{ scale: 1.1 }}>
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0px rgba(34, 197, 94, 0)",
                    "0 0 10px rgba(34, 197, 94, 0.8)",
                    "0 0 0px rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="text-[12px] 2xl:text-[16px] font-mono text-green-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ONLINE
              </motion.div>
            </motion.div>

            <motion.div
              className="text-[12px] 2xl:text-[16px] font-mono text-cyan-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              whileHover={{
                color: "#06b6d4",
                textShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
              }}
            >
              Base: Argentina | Destino: la Web
            </motion.div>

            {/* Líneas decorativas animadas mejoradas */}
            <div className="flex justify-center space-x-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="w-3 h-0.5 bg-cyan-500/50 rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleX: [0.5, 1.2, 0.5],
                    backgroundColor: ["rgba(34, 211, 238, 0.5)", "rgba(34, 211, 238, 1)", "rgba(34, 211, 238, 0.5)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Borde brillante animado mejorado */}
          <motion.div
            className="absolute inset-0 rounded-lg border border-cyan-400/0 pointer-events-none"
            animate={{
              borderColor: ["rgba(34, 211, 238, 0)", "rgba(34, 211, 238, 0.5)", "rgba(34, 211, 238, 0)"],
              boxShadow: [
                "0 0 0px rgba(34, 211, 238, 0)",
                "0 0 20px rgba(34, 211, 238, 0.3)",
                "0 0 0px rgba(34, 211, 238, 0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </motion.div>
      </div>

      {/* Controles interactivos del cockpit */}
      <CockpitControls
        onWarpActivate={handleWarpActivate}
        onSystemToggle={handleSystemToggle}
        onNavigationActivate={handleNavigationActivate}
        onCommunicationsActivate={handleCommunicationsActivate}
        onEnginesActivate={handleEnginesActivate}
      />

      {/* Iluminación del cockpit que cambia según el estado */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundColor: cockpitLighting === "combat" ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 211, 238, 0.05)",
        }}
        transition={{ duration: 1 }}
      />

      {/* Efectos ambientales adicionales */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="absolute bottom-5 w-full flex justify-center items-center gap-2">
        <p className="text-cyan-300 text-center font-mono font-bold uppercase">Scroll para explorar nuevas misiones</p>
        {/* Flecha animada mejorada */}
        <motion.div
          className="flex justify-center"
          animate={{
            y: [0, 8, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </SnapSection>
  )
}

export default HomePage


import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const systemStyles = {
  navigation: {
    active: "border-pink-500/50 bg-pink-500/10 text-pink-300",
    dot: "bg-pink-400",
  },
  shields: {
    active: "border-purple-500/50 bg-purple-500/10 text-purple-300",
    dot: "bg-purple-400",
  },
  engines: {
    active: "border-green-500/50 bg-green-500/10 text-green-300",
    dot: "bg-green-400",
  },
  communications: {
    active: "border-blue-500/50 bg-blue-500/10 text-blue-300",
    dot: "bg-blue-400",
  },
}

export default function CockpitControls({
  onWarpActivate,
  onSystemToggle,
  onNavigationActivate,
  onCommunicationsActivate,
  onEnginesActivate,
}) {
  const [systemStates, setSystemStates] = useState({
    navigation: false,
    shields: false,
    engines: true,
    communications: false,
  })

  const [lastActivated, setLastActivated] = useState(null)
  const [enginePower, setEnginePower] = useState(85)
  const [navigationTarget, setNavigationTarget] = useState("Skills")

  // Simular fluctuaciones de energía del motor
  useEffect(() => {
    if (systemStates.engines) {
      const interval = setInterval(() => {
        setEnginePower((prev) => {
          const variation = (Math.random() - 0.5) * 10
          return Math.max(75, Math.min(100, prev + variation))
        })
      }, 2000)
      return () => clearInterval(interval)
    } else {
      setEnginePower(0)
    }
  }, [systemStates.engines])

  // Cambiar target de navegación automáticamente
  useEffect(() => {
    if (systemStates.navigation) {
      const targets = ["Sobre Mí", "Proyectos", "Skills", "Contacto"]
      const interval = setInterval(() => {
        setNavigationTarget(targets[Math.floor(Math.random() * targets.length)])
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [systemStates.navigation])

  const toggleSystem = (system) => {
    const newState = !systemStates[system]

    setSystemStates((prev) => ({
      ...prev,
      [system]: newState,
    }))
    setLastActivated(system)
    onSystemToggle(system)

    // Funcionalidades específicas por sistema
    switch (system) {
      case "navigation":
        if (newState && onNavigationActivate) {
          setTimeout(() => {
            onNavigationActivate()
          }, 800)
        }
        break

      case "communications":
        if (newState && onCommunicationsActivate) {
          setTimeout(() => {
            onCommunicationsActivate()
          }, 800)
        }
        break

      case "engines":
        if (onEnginesActivate) {
          onEnginesActivate(newState)
        }
        break
    }

    setTimeout(() => setLastActivated(null), 1500)
  }

  const activateWarp = () => {
    setLastActivated("warp")
    onWarpActivate()
    setTimeout(() => setLastActivated(null), 2000)
  }

  return (
    <div className="absolute top-[42%] xl:top-[42%] left-[35%] w-[22%] h-[22%] 2xl:h-[26%] rounded-lg overflow-hidden max-md:w-[70%] max-md:left-[0%]">
      {/* Efecto de pantalla */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Líneas de escaneo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
        animate={{
          top: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Contenido de la pantalla */}
      <div className="relative h-full flex flex-col max-md:flex max-md:justify-start max-md:items-center max-md:w-[100%] max-md:h-auto">
        {/* Barra superior */}
        <div className="flex justify-between items-center mb-1 p-1">
          <div className="text-[12px] 2xl:text-[16px] 2xl:mt-5 font-mono text-cyan-300">SHIP CONTROL INTERFACE</div>
          <div className="flex space-x-1 max-lg:hidden">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-cyan-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px bg-cyan-500/30 mb-1" />

        {/* Área principal de controles */}
        <div className="flex-1 flex">
          {/* Panel izquierdo - Sistemas */}
          <div className="w-[60%] pr-1 border-r border-cyan-500/20 p-1">
            <div className="text-[10px] font-mono text-cyan-400 mb-1 2xl:text-[14px]">SHIP SYSTEMS</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "communications", label: "COM" },
                { id: "shields", label: "SHIELDS" },
                { id: "engines", label: "ENG" },
                { id: "navigation", label: "NAV" },
              ].map((system) => {
                const isActive = systemStates[system.id]
                const style = systemStyles[system.id]

                return (
                  <motion.button
                    key={system.id}
                    className={`p-2 2xl:py-4 rounded border text-left text-[10px] 2xl:text-[14px] font-mono cursor-pointer relative overflow-hidden ${
                      isActive ? style.active : "border-gray-500/30 bg-gray-500/10 text-gray-400"
                    }`}
                    onClick={() => toggleSystem(system.id)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Efecto de activación */}
                    {lastActivated === system.id && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.8 }}
                      />
                    )}

                    {/* Efecto de pulso cuando está activo */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 ${style.active.split(" ")[1]} opacity-20`}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}

                    <div className="flex justify-between items-center relative z-10">
                      <span>{system.label}</span>
                      <motion.div
                        className={`w-1 h-1 rounded-full ${isActive ? style.dot : "bg-gray-600"}`}
                        animate={{
                          opacity: isActive ? [0.5, 1, 0.5] : 0.5,
                          scale: lastActivated === system.id ? [1, 1.8, 1] : 1,
                          boxShadow: isActive
                            ? [
                                "0 0 0px rgba(34, 211, 238, 0)",
                                "0 0 6px rgba(34, 211, 238, 0.8)",
                                "0 0 0px rgba(34, 211, 238, 0)",
                              ]
                            : "none",
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>

                    {/* Información adicional para algunos sistemas */}
                    {system.id === "engines" && isActive && (
                      <motion.div
                        className="text-[8px] text-green-300 mt-1 max-md:hidden"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        PWR: {Math.round(enginePower)}%
                      </motion.div>
                    )}

                    {system.id === "navigation" && isActive && (
                      <motion.div
                        className="text-[8px] text-pink-300 mt-1 max-md:hidden"
                        key={navigationTarget}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        TGT: {navigationTarget}
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Panel derecho - Warp y estado */}
          <div className="w-[40%] pl-1 flex flex-col">
            {/* Botón WARP */}
            <motion.button
              className="h-12 rounded-lg border border-cyan-500/50 bg-cyan-500/10 flex flex-col items-center justify-center mb-1 relative cursor-pointer 2xl:h-20 overflow-hidden"
              whileHover={{
                boxShadow: "0 0 15px rgba(34, 211, 238, 0.6)",
                borderColor: "rgba(34, 211, 238, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={activateWarp}
              animate={{
                boxShadow:
                  lastActivated === "warp"
                    ? [
                        "0 0 10px rgba(34, 211, 238, 0.4)",
                        "0 0 25px rgba(34, 211, 238, 1)",
                        "0 0 10px rgba(34, 211, 238, 0.4)",
                      ]
                    : "0 0 3px rgba(34, 211, 238, 0.2)",
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Efecto de energía de fondo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <div className="text-[10px] font-mono font-bold text-cyan-300 2xl:text-[14px] relative z-10">WARP</div>
              <div className="text-[7px] text-cyan-400 2xl:text-[10px] relative z-10">DRIVE</div>

              {/* Anillo rotatorio */}
              <motion.div
                className="w-8 h-8 rounded-full border border-cyan-500/30 absolute 2xl:w-12 2xl:h-12"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.button>

            {/* Estado del sistema mejorado */}
            <div className="bg-black/40 rounded p-1 border border-cyan-500/20">
              <div className="text-[10px] font-mono text-gray-400 mb-0.5 2xl:text-[14px] flex items-center gap-1">
                STATUS
                <motion.div
                  className="w-1 h-1 bg-cyan-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between text-[10px] 2xl:text-[14px] font-mono">
                  <motion.span
                    className={systemStates.engines ? "text-green-400" : "text-red-400"}
                    animate={{ opacity: systemStates.engines ? [0.8, 1, 0.8] : 0.6 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ENG:{systemStates.engines ? "ON" : "OFF"}
                  </motion.span>
                  <motion.span
                    className={systemStates.shields ? "text-purple-400" : "text-gray-400"}
                    animate={{ opacity: systemStates.shields ? [0.8, 1, 0.8] : 0.6 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    SHD:{systemStates.shields ? "ON" : "OFF"}
                  </motion.span>
                </div>
                <div className="flex justify-between text-[10px] 2xl:text-[14px] font-mono">
                  <motion.span
                    className={systemStates.navigation ? "text-pink-400" : "text-gray-400"}
                    animate={{ opacity: systemStates.navigation ? [0.8, 1, 0.8] : 0.6 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    NAV:{systemStates.navigation ? "ON" : "OFF"}
                  </motion.span>
                  <motion.span
                    className={systemStates.communications ? "text-blue-400" : "text-gray-400"}
                    animate={{ opacity: systemStates.communications ? [0.8, 1, 0.8] : 0.6 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    COM:{systemStates.communications ? "ON" : "OFF"}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificación de activación mejorada */}
      {lastActivated && (
        <motion.div
          className="absolute top-[0px] left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-cyan-500/50 rounded-lg px-4 py-2 shadow-lg"
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
        >
          <motion.div
            className="text-[10px] font-mono text-cyan-300 text-center flex items-center gap-2"
            animate={{
              textShadow: [
                "0 0 0px rgba(34, 211, 238, 0)",
                "0 0 8px rgba(34, 211, 238, 0.8)",
                "0 0 0px rgba(34, 211, 238, 0)",
              ],
            }}
            transition={{ duration: 1, repeat: 2 }}
          >
            {lastActivated === "warp" && (
              <>
                <span>🚀</span>
                <span>WARP DRIVE ACTIVATED</span>
              </>
            )}
            {lastActivated === "shields" && (
              <>
                <span>🛡️</span>
                <span>SHIELDS {systemStates.shields ? "ACTIVATED" : "DEACTIVATED"}</span>
              </>
            )}
            {lastActivated === "navigation" && (
              <>
                <span>🧭</span>
                <span>NAVIGATION {systemStates.navigation ? "ONLINE" : "OFFLINE"}</span>
              </>
            )}
            {lastActivated === "engines" && (
              <>
                <span>⚡</span>
                <span>ENGINES {systemStates.engines ? "ONLINE" : "OFFLINE"}</span>
              </>
            )}
            {lastActivated === "communications" && (
              <>
                <span>📡</span>
                <span>COMMS {systemStates.communications ? "ACTIVE" : "INACTIVE"}</span>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

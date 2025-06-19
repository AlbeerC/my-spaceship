import { motion } from "framer-motion";
import { useState } from "react";

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
};

export default function CockpitControls({ onWarpActivate, onSystemToggle }) {
  const [systemStates, setSystemStates] = useState({
    navigation: true,
    shields: false,
    engines: true,
    communications: true,
  });

  const [lastActivated, setLastActivated] = useState(null);

  const toggleSystem = (system) => {
    setSystemStates((prev) => ({
      ...prev,
      [system]: !prev[system],
    }));
    setLastActivated(system);
    onSystemToggle(system);
    setTimeout(() => setLastActivated(null), 1000);
  };

  const activateWarp = () => {
    setLastActivated("warp");
    onWarpActivate();
    setTimeout(() => setLastActivated(null), 2000);
  };

  return (
    // Contenedor principal más pequeño y mejor posicionado
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
          <div className="text-[12px] 2xl:text-[16px] 2xl:mt-5 font-mono text-cyan-300">
            SHIP CONTROL INTERFACE
          </div>
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
            <div className="text-[10px] font-mono text-cyan-400 mb-1 2xl:text-[14px]">
              SHIP SYSTEMS
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "navigation", label: "NAV" },
                { id: "shields", label: "SHIELDS" },
                { id: "engines", label: "ENG" },
                { id: "communications", label: "COM" },
              ].map((system) => {
                const isActive = systemStates[system.id];
                const style = systemStyles[system.id];

                return (
                  <motion.button
                    key={system.id}
                    className={`p-2 2xl:py-4 rounded border text-left text-[10px] 2xl:text-[14px] font-mono cursor-pointer ${
                      isActive
                        ? style.active
                        : "border-gray-500/30 bg-gray-500/10 text-gray-400"
                    }`}
                    onClick={() => toggleSystem(system.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{system.label}</span>
                      <motion.div
                        className={`w-1 h-1 rounded-full ${
                          isActive ? style.dot : "bg-gray-600"
                        }`}
                        animate={{
                          opacity: isActive ? [0.5, 1, 0.5] : 0.5,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Panel derecho - Warp y estado */}
          <div className="w-[40%] pl-1 flex flex-col">
            {/* Botón WARP */}
            <motion.button
              className=" h-12 rounded-lg border border-cyan-500/50 bg-cyan-500/10 flex flex-col items-center justify-center mb-1 relative cursor-pointer 2xl:h-20"
              whileHover={{
                boxShadow: "0 0 10px rgba(34, 211, 238, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={activateWarp}
              animate={{
                boxShadow:
                  lastActivated === "warp"
                    ? [
                        "0 0 10px rgba(34, 211, 238, 0.4)",
                        "0 0 20px rgba(34, 211, 238, 0.8)",
                        "0 0 10px rgba(34, 211, 238, 0.4)",
                      ]
                    : "0 0 3px rgba(34, 211, 238, 0.2)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[10px] font-mono font-bold text-cyan-300 2xl:text-[14px]">
                WARP
              </div>
              <div className="text-[7px] text-cyan-400 2xl:text-[10px]">DRIVE</div>
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

            {/* Estado del sistema */}
            <div className="bg-black/40 rounded p-1">
              <div className="text-[10px] font-mono text-gray-400 mb-0.5 2xl:text-[14px]">
                STATUS
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between text-[10px] 2xl:text-[14px] font-mono">
                  <span
                    className={
                      systemStates.engines ? "text-green-400" : "text-red-400"
                    }
                  >
                    ENG:{systemStates.engines ? "ON" : "OFF"}
                  </span>
                  <span
                    className={
                      systemStates.shields ? "text-purple-400" : "text-gray-400"
                    }
                  >
                    SHD:{systemStates.shields ? "ON" : "OFF"}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] 2xl:text-[14px] font-mono">
                  <span
                    className={
                      systemStates.navigation
                        ? "text-pink-400"
                        : "text-gray-400"
                    }
                  >
                    NAV:{systemStates.navigation ? "ON" : "OFF"}
                  </span>
                  <span
                    className={
                      systemStates.communications
                        ? "text-blue-400"
                        : "text-gray-400"
                    }
                  >
                    COM:{systemStates.communications ? "ON" : "OFF"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificación de activación */}
      {lastActivated && (
        <motion.div
          className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded px-2 py-0.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="text-[8px] font-mono text-cyan-300">
            {lastActivated === "warp" && "WARP DRIVE ACTIVATED"}
            {lastActivated === "shields" &&
              `SHIELDS ${systemStates.shields ? "ACTIVATED" : "DEACTIVATED"}`}
            {lastActivated === "navigation" &&
              `NAVIGATION ${systemStates.navigation ? "ONLINE" : "OFFLINE"}`}
            {lastActivated === "engines" &&
              `ENGINES ${systemStates.engines ? "ONLINE" : "OFFLINE"}`}
            {lastActivated === "communications" &&
              `COMMS ${systemStates.communications ? "ACTIVE" : "INACTIVE"}`}
          </div>
        </motion.div>
      )}
    </div>
  );
}

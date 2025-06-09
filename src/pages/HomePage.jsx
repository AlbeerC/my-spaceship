import SnapSection from "../components/SnapSection";
import homebg from "../assets/home-bg.jpg";
import AnimatedStars from "../components/AnimatedStars";
import WarpEffect from "../components/WarpEffect";
import { HomeEffects } from "../components/HomeEffects";
import CockpitControls from "../components/Controls";
import { useState } from "react";
import { motion } from "framer-motion";

function HomePage() {
  const [warpTrigger, setWarpTrigger] = useState(false);
  const [cockpitLighting, setCockpitLighting] = useState("normal");

  const handleWarpActivate = () => {
    setWarpTrigger(true);
    setTimeout(() => setWarpTrigger(false), 100); // Reset trigger
  };

  const handleSystemToggle = (system) => {
    if (system === "shields") {
      setCockpitLighting((prev) => (prev === "normal" ? "combat" : "normal"));
    }

    // Aquí puedes añadir más efectos según el sistema activado
    console.log(`System ${system} toggled`);
  };

  return (
    <SnapSection background={homebg} id="home" className="snap-mandatory">
      <AnimatedStars />
      <HomeEffects />
      {/* Efecto warp controlable */}
      <WarpEffect
        triggerWarp={warpTrigger}
        onWarpComplete={() => console.log("Warp completed!")}
      />

      {/* Información del piloto */}
      <div className="pt-12 mx-auto max-w-sm">
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

          {/* Partículas flotantes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="text-center relative z-10">
            <motion.div
              className="text-3xl font-mono font-bold text-cyan-300 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{
                textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                scale: 1.05,
              }}
            >
              ALBERTO CAMINOS
            </motion.div>

            <motion.div
              className="text-md font-mono text-gray-300 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              whileHover={{ color: "#22d3ee" }}
            >
              FRONTEND DEVELOPER
            </motion.div>

            <motion.div
              className="flex justify-center space-x-1 items-center mb-2"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0px rgba(34, 197, 94, 0)",
                    "0 0 8px rgba(34, 197, 94, 0.8)",
                    "0 0 0px rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="text-[12px] font-mono text-green-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ONLINE
              </motion.div>
            </motion.div>

            <motion.div
              className="text-[12px] font-mono text-cyan-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              whileHover={{
                color: "#06b6d4",
                textShadow: "0 0 5px rgba(6, 182, 212, 0.6)",
              }}
            >
              Base: Argentina | Destino: la Web
            </motion.div>

            {/* Líneas decorativas animadas */}
            <div className="flex justify-center space-x-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="w-4 h-0.5 bg-cyan-500/50 rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleX: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Borde brillante animado */}
          <motion.div
            className="absolute inset-0 rounded-lg border border-cyan-400/0 pointer-events-none"
            animate={{
              borderColor: [
                "rgba(34, 211, 238, 0)",
                "rgba(34, 211, 238, 0.3)",
                "rgba(34, 211, 238, 0)",
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
      />

      {/* Iluminación del cockpit que cambia según el estado */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundColor:
            cockpitLighting === "combat"
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(34, 211, 238, 0.05)",
        }}
        transition={{ duration: 1 }}
      />

      <div className="absolute bottom-5 w-full flex justify-center items-center gap-2">
        <p className="text-cyan-300 text-center font-mono font-bold uppercase">
          Scroll para explorar nuevas misiones
        </p>
        {/* Flecha animada */}
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </SnapSection>
  );
}

export default HomePage;

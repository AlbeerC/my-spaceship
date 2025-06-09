import SnapSection from "../components/SnapSection";
import aboutbg from "../assets/about-bg.png";
import AnimatedStars from "../components/AnimatedStars";
import { HomeEffects } from "../components/HomeEffects";
import HudAboutMe from "../components/HudAboutMe";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AboutPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <SnapSection background={aboutbg} id="about" className="snap-mandatory">
      <div className="flex w-full h-full">
        {/* Columna izquierda con efectos visuales */}
        <div className="w-[20%] max-h-[60%] relative overflow-hidden mt-10">
          <div className="">
            <AnimatedStars />
            <HomeEffects />
          </div>
        </div>

        {/* Columna derecha con el contenido principal */}
        <div className="w-[80%] p-6">
          {/* Interactive Desk Screen with Button */}
          <div
            className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-[15%] h-[15%] ml-5 z-20"
            style={{ transform: "rotate(2deg)" }}
          >
            {/* Vital Stats Button - Integrated as a system control */}
            <motion.button
              className="mt-4 mb-1 mx-auto bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 hover:from-cyan-500/50 hover:to-cyan-600/50 border border-cyan-400/70 rounded px-2 py-1 text-cyan-300 font-mono text-[1rem] tracking-wider flex items-center justify-center gap-1 w-[90%] relative group overflow-hidden cursor-pointer"
              style={{ transform: "rotate(-2deg)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenModal(true)}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Animated Icon */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(6, 182, 212, 0.5)",
                    "0 0 5px rgba(6, 182, 212, 0.8)",
                    "0 0 0px rgba(6, 182, 212, 0.5)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
              />

              {/* Button Text with shadow on hover */}
              <motion.span
                className="transition-all duration-300"
                whileHover={{
                  textShadow: "0 0 6px rgba(6, 182, 212, 0.8)",
                }}
              >
                VITAL STATS
              </motion.span>

              {/* Pulsing border */}
              <motion.div
                className="absolute inset-0 rounded border border-cyan-400/0 opacity-0 group-hover:opacity-100 pointer-events-none"
                animate={{
                  borderColor: [
                    "rgba(6, 182, 212, 0)",
                    "rgba(6, 182, 212, 0.7)",
                    "rgba(6, 182, 212, 0)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Shine effect as a moving white stripe */}
              <motion.div
                className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12"
                initial={{ left: "-75%" }}
                animate={{ left: ["-75%", "125%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </div>
          {openModal && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
              onClick={() => setOpenModal(false)}
            >
              {/* Prevent closing when clicking INSIDE modal */}
              <div onClick={(e) => e.stopPropagation()}>
                <HudAboutMe closeModal={() => setOpenModal(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </SnapSection>
  );
}

export default AboutPage;

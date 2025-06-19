import { motion, AnimatePresence } from "framer-motion";
import computerbg from "../assets/computer-skills.png";


export default function SkillAnalyzer({ skill, scanningProgress }) {
  return (
    <div className="relative w-[100vw] max-w-[500px] 2xl:max-w-[750px] aspect-[11/12] overflow-hidden">

      <img
        src={computerbg}
        alt="computer"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute top-[14%] left-[15%] w-[55%] h-[45%] z-10 " style={{transform: "rotate(2deg)"}}>
        <AnimatePresence mode="wait">
          {skill ? (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-3 h-full relative"
            >
              {/* Header */}
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-2">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-purple-300 font-mono text-sm 2xl:text-xl font-bold">
                    {skill.name}
                  </h3>
                  <span
                    className={`text-xs 2xl:text-lg font-mono ${
                      skill.level === "INTERMEDIATE"
                        ? "text-green-400"
                        : skill.level === "LEARNING"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Scanning progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs 2xl:text-lg text-purple-300 mb-1">
                  <span>SCANNING...</span>
                  <span>{scanningProgress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanningProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 2xl:space-y-4 mb-3">
                <div className="flex justify-between text-xs 2xl:text-lg">
                  <span className="text-purple-300">Experiencia:</span>
                  <span className="text-cyan-300">
                    {skill.experience} {skill.experience === 1 ? "año" : "años"}
                  </span>
                </div>
                <div className="flex justify-between text-xs 2xl:text-lg">
                  <span className="text-purple-300">Proyectos:</span>
                  <span className="text-cyan-300">{skill.projects}</span>
                </div>
              </div>

              {/* Performance bars */}
              <div className="space-y-2 2xl:space-y-4">
                {Object.entries(skill.stats).map(([key, value], index) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs 2xl:text-lg text-purple-300 mb-1">
                      <span className="capitalize">{key}:</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <motion.div
                        className={`h-1 rounded-full ${
                          key === "proficiency"
                            ? "bg-gradient-to-r from-green-500 to-emerald-400"
                            : key === "usage"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                            : "bg-gradient-to-r from-purple-500 to-pink-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative scan line */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                animate={{ y: [0, 200, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center 2xl:mb-40">
                <motion.div
                  className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <p className="text-purple-300 font-mono text-xs 2xl:text-xl">
                  STANDBY MODE
                </p>
                <p className="text-purple-400/70 font-mono text-xs mt-1 2xl:text-lg">
                  Hover skill to analyze
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

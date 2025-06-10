import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"


export default function FloatingSkillsAnalyzer() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scanningProgress, setScanningProgress] = useState(0)

  const skills = [
    {
      name: "Git",
      icon: "/skills/git.png",
      color: "from-cyan-400 to-purple-500",
      position: { x: 15, y: 25 },
      size: 80,
      delay: 0,
      experience: 4,
      projects: 25,
      level: "EXPERT",
      description: "Control de versiones y colaboración",
      stats: { proficiency: 95, usage: 100, learning: 85 },
    },
    {
      name: "React",
      icon: "/skills/react.png",
      color: "from-blue-400 to-cyan-500",
      position: { x: 55, y: 15 },
      size: 90,
      delay: 0.5,
      experience: 3,
      projects: 18,
      level: "ADVANCED",
      description: "Biblioteca para interfaces de usuario",
      stats: { proficiency: 90, usage: 95, learning: 92 },
    },
    {
      name: "Node.js",
      icon: "/skills/node.png",
      color: "from-green-400 to-emerald-500",
      position: { x: 25, y: 60 },
      size: 85,
      delay: 1,
      experience: 3,
      projects: 15,
      level: "ADVANCED",
      description: "Runtime de JavaScript para backend",
      stats: { proficiency: 85, usage: 80, learning: 88 },
    },
    {
      name: "TypeScript",
      icon: "/skills/typescript.png",
      color: "from-blue-500 to-indigo-600",
      position: { x: 60, y: 70 },
      size: 75,
      delay: 1.5,
      experience: 2,
      projects: 12,
      level: "INTERMEDIATE",
      description: "JavaScript con tipado estático",
      stats: { proficiency: 80, usage: 85, learning: 95 },
    },
    {
      name: "JavaScript",
      icon: "/skills/javascript.png",
      color: "from-yellow-400 to-orange-500",
      position: { x: 40, y: 40 },
      size: 70,
      delay: 2,
      experience: 4,
      projects: 30,
      level: "EXPERT",
      description: "Lenguaje de programación web",
      stats: { proficiency: 95, usage: 100, learning: 80 },
    },
    {
      name: "Tailwind CSS",
      icon: "/skills/tailwind.png",
      color: "from-teal-400 to-cyan-500",
      position: { x: 10, y: 80 },
      size: 65,
      delay: 2.5,
      experience: 2,
      projects: 20,
      level: "ADVANCED",
      description: "Framework CSS utility-first",
      stats: { proficiency: 88, usage: 90, learning: 85 },
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scanning animation when hovering
  useEffect(() => {
    if (hoveredSkill) {
      setScanningProgress(0)
      const interval = setInterval(() => {
        setScanningProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [hoveredSkill])

  const getFloatingAnimation = (index) => ({
    y: [0, -20, 0],
    x: [0, 10, -5, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 1],
  })

  const getFloatingTransition = (delay) => ({
    duration: 4 + Math.random() * 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
    delay,
  })

  const currentSkill = skills.find((skill) => skill.name === hoveredSkill)

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/skills-bg.png" alt="Skills analyzer room" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/50" />
      </div>

      {/* Skill Analyzer Screen Overlay */}
      <div className="absolute bottom-[15%] right-[8%] w-[25%] h-[35%] z-15">
        <AnimatePresence mode="wait">
          {hoveredSkill && currentSkill ? (
            <motion.div
              key={hoveredSkill}
              className="w-full h-full bg-slate-900/95 backdrop-blur-sm rounded-lg border border-purple-500/50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.1)",
              }}
            >
              {/* Header */}
              <div className="bg-purple-600/30 p-2 border-b border-purple-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-mono text-xs">SKILL ANALYZER</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 h-full">
                {/* Skill Header */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-2">
                    <img
                      src={currentSkill.icon || "/placeholder.svg"}
                      alt={currentSkill.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div>
                    <h3 className="text-purple-300 font-mono text-sm font-bold">{currentSkill.name}</h3>
                    <span
                      className={`text-xs font-mono ${
                        currentSkill.level === "EXPERT"
                          ? "text-green-400"
                          : currentSkill.level === "ADVANCED"
                            ? "text-blue-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {currentSkill.level}
                    </span>
                  </div>
                </div>

                {/* Scanning Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-purple-300 mb-1">
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
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">Experiencia:</span>
                    <span className="text-cyan-300">{currentSkill.experience} años</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">Proyectos:</span>
                    <span className="text-cyan-300">{currentSkill.projects}</span>
                  </div>
                </div>

                {/* Performance Bars */}
                <div className="space-y-2">
                  {Object.entries(currentSkill.stats).map(([key, value], index) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs text-purple-300 mb-1">
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

                {/* Description */}
                <div className="mt-3 pt-2 border-t border-purple-500/30">
                  <p className="text-purple-200 text-xs leading-relaxed">{currentSkill.description}</p>
                </div>

                {/* Animated Elements */}
                <motion.div
                  className="absolute bottom-2 right-2 w-4 h-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-full h-full border-2 border-purple-400 border-t-transparent rounded-full" />
                </motion.div>
              </div>

              {/* Scan Line Effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                animate={{ y: [0, 200, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-full bg-slate-900/80 backdrop-blur-sm rounded-lg border border-purple-500/30 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full mx-auto mb-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <p className="text-purple-300 font-mono text-xs">STANDBY MODE</p>
                <p className="text-purple-400/70 font-mono text-xs mt-1">Hover skill to analyze</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Skills - Limited to left 70% */}
      <div className="absolute inset-0 z-10" style={{ width: "70%" }}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="absolute cursor-pointer"
            style={{
              left: `${skill.position.x}%`,
              top: `${skill.position.y}%`,
              width: skill.size,
              height: skill.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...getFloatingAnimation(index),
            }}
            transition={{
              opacity: { duration: 0.8, delay: skill.delay },
              scale: { duration: 0.8, delay: skill.delay },
              ...getFloatingTransition(skill.delay),
            }}
            whileHover={{
              scale: 1.2,
              zIndex: 50,
              transition: { duration: 0.3 },
            }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            {/* Skill Circle */}
            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden"
              animate={{
                boxShadow:
                  hoveredSkill === skill.name
                    ? [
                        "0 0 20px rgba(6, 182, 212, 0.5)",
                        "0 0 40px rgba(6, 182, 212, 0.8)",
                        "0 0 20px rgba(6, 182, 212, 0.5)",
                      ]
                    : [
                        "0 0 10px rgba(6, 182, 212, 0.3)",
                        "0 0 20px rgba(6, 182, 212, 0.5)",
                        "0 0 10px rgba(6, 182, 212, 0.3)",
                      ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} p-1`}>
                <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                  {/* Skill Icon */}
                  <div className="relative w-[60%] h-[60%]">
                    <img src={skill.icon || "/placeholder.svg"} alt={skill.name} fill className="object-contain" />
                  </div>
                </div>
              </div>

              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  background: `conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.5), transparent)`,
                  mask: "radial-gradient(circle, transparent 70%, black 72%, black 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8 + index * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Analysis Beam when hovered */}
              {hoveredSkill === skill.name && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                }}
              />
            </motion.div>

            {/* Skill Name Tooltip */}
            {hoveredSkill === skill.name && (
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm border border-cyan-400/50 rounded-lg px-3 py-1 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="text-cyan-300 font-mono text-sm">{skill.name}</span>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 border-l border-t border-cyan-400/50 rotate-45" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data Transfer Particles */}
      {hoveredSkill && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${35 + Math.random() * 30}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                x: [0, 200, 400],
                y: [0, -50, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Section Title */}
      <motion.div
        className="absolute top-8 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2 className="text-4xl font-mono font-bold text-cyan-300 mb-2">TECH STACK</h2>
        <motion.div
          className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
        <p className="text-cyan-400/70 font-mono text-sm mt-2">Hover para analizar tecnologías</p>
      </motion.div>
    </div>
  )
}

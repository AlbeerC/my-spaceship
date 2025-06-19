import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SnapSection from "../components/SnapSection";
import useBreakpoint from "../components/UseBreakpoint";
import { useWindowWidth } from "../components/UseWindowWidth";
import skillsbg from "../assets/skills-bg.png";
import git from "../assets/skills/git.png";
import react from "../assets/skills/react.png";
import node from "../assets/skills/node.png";
import typescript from "../assets/skills/typescript.png";
import javascript from "../assets/skills/javascript.png";
import tailwind from "../assets/skills/tailwind.png";
import leetcode from "../assets/skills/leetcode.png";
import css from "../assets/skills/css.png";
import SkillsAnalyzer from "../components/SkillsAnalyzer";

export default function FloatingSkills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [scanningProgress, setScanningProgress] = useState(0);


  const is2XL = useBreakpoint()

  const width = useWindowWidth();

  const skillsStyles = (() => {
    if (width >= 2200) return { bottom: "30%", right: "11%" };
    if (width >= 2000) return { bottom: "31%", right: "11%" };
    if (width >= 1800) return { bottom: "30%", right: "11%" };
    if (width >= 1600) return { bottom: "31%", right: "12%" };
    return { bottom: "31%", right: "12%" };
  })();

  const skills = [
    {
      name: "CSS",
      icon: css,
      color: "from-cyan-400 to-blue-500",
      position: { x: 7, y: 50 },
      size: 90,
      xlSize: 120,
      delay: 0.8,
      experience: 3,
      projects: 30,
      level: "INTERMEDIATE",
      stats: { usage: 82, learning: 76 },
    },
    {
      name: "Git",
      icon: git,
      color: "from-cyan-400 to-purple-500",
      position: { x: 15, y: 25 },
      size: 90,
      xlSize: 120,
      delay: 0,
      experience: 3,
      projects: 40,
      level: "INTERMEDIATE",
      stats: { usage: 88, learning: 80 },
    },
    {
      name: "React",
      icon: react,
      color: "from-blue-400 to-cyan-500",
      position: { x: 40, y: 20 },
      size: 90,
      xlSize: 120,
      delay: 0.5,
      experience: 2,
      projects: 15,
      level: "INTERMEDIATE",
      stats: { usage: 95, learning: 92 },
    },
    {
      name: "Node.js",
      icon: node,
      color: "from-green-400 to-emerald-500",
      position: { x: 25, y: 60 },
      size: 90,
      xlSize: 120,
      delay: 1,
      experience: 2,
      projects: 5,
      level: "LEARNING",
      stats: { usage: 45, learning: 70 },
    },
    {
      name: "TypeScript",
      icon: typescript,
      color: "from-blue-500 to-indigo-600",
      position: { x: 50, y: 70 },
      size: 90,
      xlSize: 120,
      delay: 1.5,
      experience: 1,
      projects: 4,
      level: "LEARNING",
      stats: { usage: 70, learning: 95 },
    },
    {
      name: "JavaScript",
      icon: javascript,
      color: "from-yellow-400 to-orange-500",
      position: { x: 40, y: 40 },
      size: 90,
      xlSize: 120,
      delay: 2,
      experience: 3,
      projects: 25,
      level: "INTERMEDIATE",
      stats: { usage: 100, learning: 84 },
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
      color: "from-teal-400 to-cyan-500",
      position: { x: 10, y: 75 },
      size: 90,
      xlSize: 120,
      delay: 2.5,
      experience: 1,
      projects: 5,
      level: "LEARNING",
      stats: { usage: 90, learning: 85 },
    },
    {
      name: "Leetcode",
      icon: leetcode,
      color: "from-cyan-400 to-purple-500",
      position: { x: 55, y: 45 },
      size: 90,
      xlSize: 120,
      delay: 2.5,
      experience: 2,
      projects: 91,
      level: "LEARNING",
      stats: { usage: 75, learning: 90 },
    },
  ];

  // Scanning animation when hovering
  useEffect(() => {
    if (hoveredSkill) {
      setScanningProgress(0);
      const interval = setInterval(() => {
        setScanningProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [hoveredSkill]);

  const getFloatingAnimation = (index) => ({
    y: [0, -20, 0],
    x: [0, 10, -5, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 1],
  });

  const getFloatingTransition = (delay) => ({
    duration: 4 + Math.random() * 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
    delay,
  });

  const currentSkill = skills.find((skill) => skill.name === hoveredSkill);

  return (
    <SnapSection background={skillsbg} id="skills" className="snap-mandatory">
      {/* Skill Analyzer Screen Overlay */}

      <div className="flex justify-end items-center min-h-screen mr-10">
        <SkillsAnalyzer skill={currentSkill} scanningProgress={scanningProgress} />
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
              ...(is2XL && {
                width: skill.xlSize,
                height: skill.xlSize,
              }),
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
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} p-1`}
              >
                <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                  {/* Skill Icon */}
                  <div className="relative w-[60%]">
                    <img
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      className="object-contain w-full h-full"
                    />
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
                    background:
                      "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
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
                <span className="text-cyan-300 font-mono text-sm">
                  {skill.name}
                </span>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 border-l border-t border-cyan-400/50 rotate-45" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Section Title */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2 className="text-4xl font-mono font-bold text-cyan-300 mb-2">
          TECH STACK
        </h2>
        <motion.div
          className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
        <p className="text-cyan-400/70 font-mono text-lg mt-2">
          Hover para analizar tecnologías
        </p>
      </motion.div>
    </SnapSection>
  );
}

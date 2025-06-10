import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import SnapSection from "../components/SnapSection"
import projectsbg from '../assets/projects-bg.png'
// project images
import bz from '../assets/projects/bz.png'
import ktw from '../assets/projects/ktw.png'
import tvtrack from '../assets/projects/tvtrack.png'
import chatapp from '../assets/projects/chatapp.png'
import mya from '../assets/projects/mya.png'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [scanningProgress, setScanningProgress] = useState(0)

  const projects = [
    {
      id: "project-1",
      name: "Basket Zone",
      codename: "OPERATION HOOPS",
      image: bz,
      position: { x: 10, y: 30 },
      size: { width: 300, height: 200 },
      delay: 0,
      missionData: {
        status: "DEPLOYED",
        duration: "5 semanas",
        technologies: ["React", "CSS", "JavaScript", "Firebase"],
        complexity: "INTERMEDIATE",
        description:
          "Plataforma de comercio electrónico especializada en equipamiento de basketball. Interfaz moderna con carrito de compras y sistema de navegación intuitivo.",
        objectives: [
          "Crear experiencia de compra fluida",
          "Implementar búsqueda, filtrado y navegación",
          "Conetar con base de datos para usuarios y productos",
        ],
        liveDemo: "https://basket-zone.vercel.app/",
        repository: "https://github.com/AlbeerC/basket-zone",
      },
    },
    {
      id: "project-2",
      name: "TV Track",
      codename: "OPERATION NEXUS",
      image: tvtrack,
      position: { x: 40, y: 35 },
      size: { width: 280, height: 180 },
      delay: 0.5,
      missionData: {
        status: "ACTIVE",
        duration: "4 semanas",
        technologies: ["React", "Javascript", "CSS", "Firebase", "APIs"],
        complexity: "ADVANCED",
        description: "App de películas con login y seguimiento personalizado para usuarios",
        objectives: [
          "Desarrollar panel de control",
          "Implementar autenticación",
          "Permitir a los usuarios llevar sus listas",
          "Optimizar experiencia de usuario",
        ],
        liveDemo: "https://tv-track-24.web.app/",
        repository: "https://github.com/AlbeerC/tv-track",
      },
    },
    {
      id: "project-3",
      name: "Know The World",
      codename: "OPERATION STELLAR",
      image: ktw,
      position: { x: 15, y: 65 },
      size: { width: 320, height: 220 },
      delay: 1,
      missionData: {
        status: "ACTIVE",
        duration: "3 semanas",
        technologies: ["React", "CSS", "APIs & Libraries"],
        complexity: "INTERMEDIATE",
        description:
          "App para aprender de geografía de forma interactiva y divertida",
        objectives: [
          "Implementar un mapa interactivo",
          "Crear interfaz intuitiva",
          "Dividir en distintas secciones",
        ],
        liveDemo: "https://know-the-world-three.vercel.app/",
        repository: "https://github.com/AlbeerC/know-the-world",
      },
    },
    {
      id: "project-4",
      name: "ChatApp",
      codename: "OPERATION QUANTUM",
      image: chatapp,
      position: { x: 60, y: 70 },
      size: { width: 290, height: 190 },
      delay: 1.5,
      missionData: {
        status: "IN DEVELOPMENT",
        duration: "En progreso",
        technologies: ["React", "TypeScript", "Firebase", "Node JS"],
        complexity: "BEGINNER",
        description: "App de chat en tiempo real con perfiles y mensajes",
        objectives: [
          "Implementar conexiones a tiempo real",
          "Optimizar rendimiento y velocidad",
          "Permitir enviar, editar y borrar mensajes",
        ],
        liveDemo: "https://alberchatapp.vercel.app/",
        repository: "https://github.com/AlbeerC/Real-time-chat",
      },
    },
    {
        id: "project-5",
        name: "Gestión de ventas",
        codename: "OPERATION VENDOR",
        image: mya,
        position: { x: 65, y: 30 },
        size: { width: 300, height: 200 },
        delay: 1.5,
        missionData: {
          status: "ACTIVE",
          duration: "3 semanas",
          technologies: ["React", "Tailwind", "Firebase"],
          complexity: "INTERMEDIATE",
          description: "App de gestión de ventas y préstamos para uso interno de un cliente",
          objectives: [
            "Permitir crear, editar y eliminar elementos",
            "Asegurar la seguridad y privacidad del sitio",
            "Conetar con base de datos",
          ],
        },
    }
  ]

  const currentProject = projects.find((p) => p.id === selectedProject)

  const getStatusColor = (status) => {
    switch (status) {
      case "DEPLOYED":
        return "text-green-400"
      case "ACTIVE":
        return "text-blue-400"
      case "COMPLETED":
        return "text-purple-400"
      case "IN DEVELOPMENT":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "BEGINNER":
        return "text-green-400"
      case "INTERMEDIATE":
        return "text-yellow-400"
      case "ADVANCED":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <SnapSection background={projectsbg} id="projects" className="snap-mandatory">
      {/* Project Cards */}
      <div className="absolute inset-0 z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute cursor-pointer"
            style={{
              left: `${project.position.x}%`,
              top: `${project.position.y}%`,
              width: project.size.width,
              height: project.size.height,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: project.delay,
              type: "spring",
              damping: 20,
            }}
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 },
            }}
            onClick={() => setSelectedProject(project.id)}
          >
            {/* Project Card */}
            <motion.div
              className="relative w-full h-full rounded-lg overflow-hidden border border-cyan-400/30 bg-slate-900/20 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(6, 182, 212, 0.3)",
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                  "0 0 10px rgba(6, 182, 212, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Project Image */}
              <div className="relative w-full h-[70%] overflow-hidden">
                <img src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-900/90 backdrop-blur-sm">
                <h3 className="text-cyan-300 font-mono text-sm font-bold mb-1">{project.codename}</h3>
                <p className="text-slate-300 font-mono text-xs">{project.name}</p>
                <div className="flex items-center mt-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400 mr-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-cyan-400 font-mono text-xs">CLICK TO ANALYZE</span>
                </div>
              </div>

              {/* Scan Lines */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                animate={{ y: [0, project.size.height, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              />

              {/* Corner Decorations */}
              <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-400/60" />
              <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-400/60" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-cyan-400/60" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-cyan-400/60" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Project Analysis Modal */}
      <AnimatePresence>
        {selectedProject && currentProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-slate-900/95 backdrop-blur-md border border-cyan-400/50 rounded-2xl p-6 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 30px rgba(6, 182, 212, 0.1)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-400/30">
                <div>
                  <h2 className="text-cyan-300 font-mono text-2xl font-bold">{currentProject.codename}</h2>
                  <p className="text-cyan-400/70 font-mono text-sm">MISSION ANALYSIS REPORT</p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div
                    className={`px-3 py-1 rounded-full border font-mono text-xs ${getStatusColor(currentProject.missionData.status)} border-current`}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {currentProject.missionData.status}
                  </motion.div>
                  <button
                    className="text-cyan-300 hover:text-cyan-100 text-2xl"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Preview */}
                <div className="space-y-4">
                  <h3 className="text-purple-300 font-mono text-lg font-bold">VISUAL INTERFACE</h3>
                  <div className="relative rounded-lg overflow-hidden border border-purple-400/30">
                    <img
                      src={currentProject.image || "/placeholder.svg"}
                      alt={currentProject.name}
                      width={500}
                      height={300}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {currentProject.missionData.liveDemo && (
                      <motion.a
                        href={currentProject.missionData.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg px-4 py-2 text-green-300 font-mono text-sm text-center hover:from-green-500/30 hover:to-emerald-500/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🚀 LAUNCH DEMO
                      </motion.a>
                    )}
                    {currentProject.missionData.repository && (
                      <motion.a
                        href={currentProject.missionData.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/50 rounded-lg px-4 py-2 text-blue-300 font-mono text-sm text-center hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        📡 ACCESS CODE
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Mission Data */}
                <div className="space-y-4">
                  <h3 className="text-purple-300 font-mono text-lg font-bold">MISSION DATA</h3>

                  {/* Mission Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                      <p className="text-slate-400 font-mono text-xs">DURATION</p>
                      <p className="text-cyan-300 font-mono text-sm">{currentProject.missionData.duration}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                      <p className="text-slate-400 font-mono text-xs">COMPLEXITY</p>
                      <p className={`font-mono text-sm ${getComplexityColor(currentProject.missionData.complexity)}`}>
                        {currentProject.missionData.complexity}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <p className="text-slate-400 font-mono text-xs mb-2">TECH STACK</p>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.missionData.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded text-purple-300 font-mono text-xs"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-slate-400 font-mono text-xs mb-2">MISSION BRIEFING</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{currentProject.missionData.description}</p>
                  </div>

                  {/* Objectives */}
                  <div>
                    <p className="text-slate-400 font-mono text-xs mb-2">OBJECTIVES COMPLETED</p>
                    <div className="space-y-2">
                      {currentProject.missionData.objectives.map((objective, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-slate-300 text-sm">{objective}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg" />

              {/* Scanning Line */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                animate={{ y: [0, 400, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SnapSection>
  )
}
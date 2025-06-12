import { motion } from "framer-motion"

function UltraWideLayout({ children, maxContentWidth = 2300 }) {
  return (
    <div className="relative w-full min-h-screen">
      {/* Fondo de estrellas para los bordes - Solo visible en pantallas ultra-anchas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Estrellas estáticas */}
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
              width: Math.random() < 0.8 ? "1px" : "2px",
              height: Math.random() < 0.8 ? "1px" : "2px",
            }}
          />
        ))}

        {/* Nebulosas distantes */}
        <div className="absolute top-[10%] left-[5%] w-[30%] h-[40%] rounded-full bg-purple-900/10 blur-3xl" />
        <div className="absolute bottom-[20%] right-[5%] w-[25%] h-[30%] rounded-full bg-blue-900/10 blur-3xl" />

        {/* Paneles laterales de la nave - Solo aparecen cuando hay espacio */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-slate-900/80 via-slate-800/20 to-transparent"
          style={{
            width: `max(0px, calc((100vw - ${maxContentWidth}px) / 2))`,
          }}
        />
        <div
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-slate-900/80 via-slate-800/20 to-transparent"
          style={{
            width: `max(0px, calc((100vw - ${maxContentWidth}px) / 2))`,
          }}
        />

        {/* Líneas estructurales de la nave */}
        <div
          className="absolute top-0 h-full w-[1px] bg-cyan-500/20"
          style={{
            left: `max(5%, calc((100vw - ${maxContentWidth}px) / 2 + 50px))`,
          }}
        />
        <div
          className="absolute top-0 h-full w-[1px] bg-cyan-500/10"
          style={{
            left: `max(8%, calc((100vw - ${maxContentWidth}px) / 2 + 80px))`,
          }}
        />
        <div
          className="absolute top-0 h-full w-[1px] bg-cyan-500/20"
          style={{
            right: `max(5%, calc((100vw - ${maxContentWidth}px) / 2 + 50px))`,
          }}
        />
        <div
          className="absolute top-0 h-full w-[1px] bg-cyan-500/10"
          style={{
            right: `max(8%, calc((100vw - ${maxContentWidth}px) / 2 + 80px))`,
          }}
        />

        {/* Luces de navegación parpadeantes */}
        <motion.div
          className="absolute top-[10%] h-2 w-2 rounded-full bg-red-500"
          style={{
            left: `max(3%, calc((100vw - ${maxContentWidth}px) / 2 + 30px))`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-[10%] h-2 w-2 rounded-full bg-red-500"
          style={{
            right: `max(3%, calc((100vw - ${maxContentWidth}px) / 2 + 30px))`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-[10%] h-2 w-2 rounded-full bg-cyan-400"
          style={{
            left: `max(3%, calc((100vw - ${maxContentWidth}px) / 2 + 30px))`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-[10%] h-2 w-2 rounded-full bg-cyan-400"
          style={{
            right: `max(3%, calc((100vw - ${maxContentWidth}px) / 2 + 30px))`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      {/* Contenedor principal con ancho máximo */}
      <div className="relative mx-auto h-full" style={{ maxWidth: `${maxContentWidth}px` }}>
        {/* Efecto de borde de ventana espacial */}
        <div className="absolute -left-4 top-0 h-full w-4 bg-gradient-to-r from-cyan-900/30 to-transparent pointer-events-none" />
        <div className="absolute -right-4 top-0 h-full w-4 bg-gradient-to-l from-cyan-900/30 to-transparent pointer-events-none" />

        {/* Contenido principal */}
        {children}
      </div>
    </div>
  )
}

export default UltraWideLayout

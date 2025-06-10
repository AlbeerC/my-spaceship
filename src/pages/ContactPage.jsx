import SnapSection from "../components/SnapSection";
import contactbg from "../assets/contact-bg.png";
import AnimatedStars from "../components/AnimatedStars";
import { HomeEffects } from "../components/HomeEffects";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function ContactPage() {
  const [state, handleSubmit] = useForm("mzzgeqrr");

  const socialNetworks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/AlbeerC",
      color: "text-purple-400",
      glowColor: "shadow-purple-400/50",
      label: "GIT_HUB",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/alberto-caminos/",
      color: "text-blue-400",
      glowColor: "shadow-blue-400/50",
      label: "LINKED_IN",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:caminosalbertodev@gmail.com",
      color: "text-green-400",
      glowColor: "shadow-green-400/50",
      label: "E_MAIL",
    },
    {
      name: "Twitter",
      icon: FaSquareXTwitter,
      url: "https://x.com/AlberCaminos03",
      color: "text-gray-400",
      glowColor: "shadow-cyan-400/50",
      label: "TWITTER",
    },
  ];

  const screenVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <SnapSection background={contactbg} id="contact">
      <div className="flex w-full h-full justify-between relative">
        <div className="w-[60%] p-6">
          {/* Espacio para contenido opcional */}
        </div>

        {/* Columna derecha con efectos visuales */}
        <div className="w-[40%] max-h-[70%] relative overflow-hidden mt-10 pr-20">
          <AnimatedStars />
          <HomeEffects />
        </div>

        {/* Panel de Redes Sociales - Esquina inferior izquierda */}
        <motion.div
          variants={screenVariants}
          className="absolute bottom-[20%] left-[12%] w-[250px] h-[210px]"
        >
          <div className="w-full h-full bg-black/40 rounded-lg border border-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] p-3 backdrop-blur-sm">
            {/* Header del panel */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-400 text-xs font-mono">
                SOCIAL_LINKS
              </span>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
            </div>

            {/* Grid de botones de redes sociales */}
            <div className="grid grid-cols-2 gap-2">
              {socialNetworks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 20px ${
                      social.glowColor.includes("purple")
                        ? "rgba(168, 85, 247, 0.5)"
                        : social.glowColor.includes("blue")
                        ? "rgba(59, 130, 246, 0.5)"
                        : social.glowColor.includes("green")
                        ? "rgba(34, 197, 94, 0.5)"
                        : "rgba(6, 182, 212, 0.5)"
                    }`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div
                    className={`w-full h-15 bg-black/60 border border-gray-600/50 rounded flex flex-col items-center justify-center hover:border-cyan-400/60 transition-all duration-300`}
                  >
                    <social.icon className={`w-6 h-6 ${social.color} mb-1`} />
                    <span className="text-xs font-mono text-gray-400 group-hover:text-cyan-400 transition-colors">
                      {social.label}
                    </span>
                  </div>

                  {/* Efecto de activación */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-cyan-400/10 rounded pointer-events-none"
                  />
                </motion.a>
              ))}
            </div>

            {/* Indicador de estado */}
            <div className="mt-2 text-center">
              <span className="text-xs font-mono text-gray-500">
                EXTERNAL_COMM
              </span>
            </div>
          </div>
        </motion.div>

        {/* Formulario de contacto */}
        <div
          className="p-4 absolute bottom-[18%] right-[16%]"
          style={{ transform: "rotate(4deg)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[350px] h-[200px]"
            style={{
              transform: "perspective(800px) rotateX(5deg) rotateY(-10deg)",
            }}
          >
            <div className="w-full h-full">
              {/* Header estilo terminal */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <div className="flex gap-2 items-center">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-orange-400 text-xs font-mono">
                    COMM_TERMINAL
                  </span>
                </div>
              </div>

              {state.succeeded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-4"
                >
                  <div className="text-green-400 text-xs font-mono mb-2">
                    TRANSMISION_EXITOSA
                  </div>
                  <div className="text-green-400 text-xs font-mono">
                    MENSAJE_ENVIADO
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-green-400 text-xs font-mono mt-2"
                  >
                    ● ONLINE
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-2 py-1 bg-black/60 border border-cyan-400/40 rounded text-cyan-400 text-xs placeholder-cyan-400/60 focus:border-cyan-400 focus:outline-none font-mono"
                        placeholder="> NOMBRE_USUARIO"
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-2 py-1 bg-black/60 border border-cyan-400/40 rounded text-cyan-400 text-xs placeholder-cyan-400/60 focus:border-cyan-400 focus:outline-none font-mono"
                        placeholder="> EMAIL_USUARIO"
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      className="w-full px-2 py-1 bg-black/60 border border-cyan-400/40 rounded text-cyan-400 text-xs placeholder-cyan-400/60 focus:border-cyan-400 focus:outline-none resize-none font-mono"
                      placeholder="> MENSAJE_TRANSMISION"
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={state.submitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-mono rounded hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {state.submitting ? "ENVIANDO..." : "TRANSMITIR"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </SnapSection>
  );
}

export default ContactPage;

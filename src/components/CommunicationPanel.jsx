import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Radar, Zap, Radio, Satellite } from "lucide-react";
import contactScreen from "../assets/contact-screen.png";

export default function CommunicationPanel({ stations }) {
  const [activeStation, setActiveStation] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [transmitting, setTransmitting] = useState(null);
  const [iconsVisible, setIconsVisible] = useState([]);
  const [autoMessages, setAutoMessages] = useState([]);
  const [clickedStation, setClickedStation] = useState(null);

  const scanControls = useAnimation();
  const radarControls = useAnimation();

  // Animaciones del radar
  useEffect(() => {
    if (isScanning) {
      scanControls.start({
        rotate: 360,
        transition: {
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      });
    } else {
      scanControls.stop();
    }
  }, [isScanning, scanControls]);

  // Animación de entrada de iconos
  useEffect(() => {
    const showIcons = async () => {
      for (let i = 0; i < stations.length; i++) {
        setTimeout(() => {
          setIconsVisible((prev) => [...prev, stations[i].id]);
          setAutoMessages((prev) => [
            ...prev,
            `[12:34:${58 + i}] Estación ${stations[i].name} detectada`,
          ]);
        }, i * 800);
      }

      setTimeout(() => {
        setAutoMessages((prev) => [
          ...prev,
          `[12:35:05] Todas las estaciones operativas. Haz clic para conectar.`,
        ]);
      }, stations.length * 800 + 1000);
    };

    showIcons();
  }, []);

  const handleStationClick = (stationId) => {
    const station = stations.find((s) => s.id === stationId);

    setTransmitting(stationId);

    // Simular conexión por 1.5 segundos, luego abrir enlace
    setTimeout(() => {
      setTransmitting(null);

      // Abrir la URL correspondiente
      if (station?.url) {
        window.open(station.url, "_blank", "noopener,noreferrer");
      }

      // Añadir mensaje al log
      setAutoMessages((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Conexión establecida con ${
          station.name
        }`,
      ]);
    }, 1500);
  };

  const toggleScan = () => {
    setIsScanning(!isScanning);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const stationVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const scanLineVariants = {
    scanning: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  };

  return (
    <div className="relative w-[100vw] max-w-[90vw] aspect-[1289/740] overflow-hidden mx-auto 
  max-md:aspect-auto max-md:h-auto max-md:min-h-[100vh] max-md:flex max-md:items-center max-md:justify-center">
      <img
        src={contactScreen}
        alt="contact-panel"
        className="absolute inset-0 w-full h-full object-cover z-0 max-md:hidden"
      />

      <div className="absolute top-[12%] left-[10%] w-[80%] h-[75%] z-10 overflow-hidden 
      max-md:static max-md:w-full max-md:h-auto max-md:flex max-md:items-center max-md:justify-center">
        <motion.div
          className=" rounded-lg p-4 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Panel superior de estado */}
          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-2">
            <motion.div
              className="bg-gray-900 rounded p-3 border border-green-500/20 max-md:hidden"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <span className="text-green-400 font-mono text-sm max-md:text-xs">
                  SISTEMA
                </span>
              </div>
              <p className="text-green-300 font-mono text-xs">OPERACIONAL</p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded p-3 border border-green-500/20"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Satellite className="w-4 h-4 text-blue-400" />
                </motion.div>
                <span className="text-blue-400 font-mono text-sm max-md:text-xs">SEÑAL</span>
              </div>
              <p className="text-blue-300 font-mono text-xs">FUERTE</p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded p-3 border border-green-500/20"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-mono text-sm max-md:text-xs">
                  ESTACIONES
                </span>
              </div>
              <motion.p
                className="text-yellow-300 font-mono text-xs"
                key={iconsVisible.length}
                initial={{ scale: 1.2, color: "#fbbf24" }}
                animate={{ scale: 1, color: "#fde047" }}
                transition={{ duration: 0.3 }}
              >
                {stations.length} DETECTADAS
              </motion.p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radar/Scanner */}
            <motion.div
              className="bg-gray-900 rounded-lg p-4 border border-green-500/20"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 font-mono text-lg">
                  RADAR ESPACIAL
                </h3>
                <motion.button
                  onClick={toggleScan}
                  className={`px-3 py-1 rounded font-mono text-xs border transition-colors ${
                    isScanning
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-green-500 text-black border-green-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isScanning ? "DETENER" : "INICIAR"}
                </motion.button>
              </div>

              <div className="relative w-64 h-64 mx-auto bg-black rounded-full border-2 border-green-500/30 overflow-hidden max-md:h-32 max-md:rounded-2xl">
                {/* Líneas de radar */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-px bg-green-500/20 top-1/2 origin-left"
                      style={{ transform: `rotate(${i * 45}deg)` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-green-500/20 rounded-full"
                      style={{
                        width: `${(i + 1) * 25}%`,
                        height: `${(i + 1) * 25}%`,
                        top: `${50 - (i + 1) * 12.5}%`,
                        left: `${50 - (i + 1) * 12.5}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 * i, type: "spring" }}
                    />
                  ))}
                </div>

                {/* Línea de escaneo */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent top-1/2 origin-left"
                      variants={scanLineVariants}
                      animate="scanning"
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Estaciones en el radar */}
                <AnimatePresence>
                  {stations.map((station) => {
                    const Icon = station.icon;
                    const isVisible = iconsVisible.includes(station.id);

                    return (
                      <motion.div
                        key={station.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${station.position.x}%`,
                          top: `${station.position.y}%`,
                        }}
                        variants={stationVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          setActiveStation(station.id);
                          setClickedStation(station.id);
                        }}
                        onMouseEnter={() => setActiveStation(station.id)}
                      >
                        {/* Círculo de fondo con pulso - área de click más precisa */}
                        <motion.div
                          className={`w-8 h-8 rounded-full bg-gray-800 border-2 flex items-center justify-center relative ${
                            activeStation === station.id ||
                            clickedStation === station.id
                              ? station.id === "linkedin"
                                ? "border-blue-400"
                                : station.id === "twitter"
                                ? "border-cyan-400"
                                : station.id === "github"
                                ? "border-purple-400"
                                : "border-green-400"
                              : "border-gray-600"
                          }`}
                          onClick={() => setActiveStation(station.id)}
                        >
                          <Icon className={`w-4 h-4 ${station.color}`} />

                          {/* Efecto de pulso */}
                          <motion.div
                            className={`absolute inset-0 rounded-full ${station.color.replace(
                              "text-",
                              "bg-"
                            )}/20`}
                            variants={pulseVariants}
                            animate={isVisible ? "pulse" : ""}
                          />

                          {/* Anillos de radar cuando está activo */}
                          <AnimatePresence>
                            {activeStation === station.id && (
                              <>
                                <motion.div
                                  className={`absolute -inset-1 rounded-full border-2 ${station.color.replace(
                                    "text-",
                                    "border-"
                                  )} opacity-60`}
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                  }}
                                />
                                <motion.div
                                  className={`absolute inset-0 rounded-full border-2 ${station.color.replace(
                                    "text-",
                                    "border-"
                                  )}`}
                                  initial={{ scale: 1, opacity: 1 }}
                                  animate={{ scale: 2, opacity: 0 }}
                                  exit={{ scale: 1, opacity: 0 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                />
                                <motion.div
                                  className={`absolute -inset-2 rounded-full border ${station.color.replace(
                                    "text-",
                                    "border-"
                                  )}/50`}
                                  initial={{ scale: 1, opacity: 1 }}
                                  animate={{ scale: 2.5, opacity: 0 }}
                                  exit={{ scale: 1, opacity: 0 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: 0.5,
                                  }}
                                />
                              </>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Tooltip con nombre - solo aparece en hover real */}
                        <motion.div
                          className={`absolute ${
                            station.position.y < 50 ? "-bottom-10" : "-top-10"
                          } left-1/2 max-md:hidden transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-mono border ${station.color.replace(
                            "text-",
                            "border-"
                          )} whitespace-nowrap pointer-events-none`}
                          initial={{ opacity: 0, y: 5, scale: 0.8 }}
                          animate={{
                            opacity: activeStation === station.id ? 1 : 0,
                            y: activeStation === station.id ? 0 : 5,
                            scale: activeStation === station.id ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {station.name
                            .replace(" Station", "")
                            .replace(" Outpost", "")
                            .replace(" Satellite", "")
                            .replace(" Beacon", "")
                            .replace(" Hub", "")
                            .replace(" Base", "")}
                          <div
                            className={`absolute ${
                              station.position.y < 50
                                ? "bottom-full"
                                : "top-full"
                            } left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 ${
                              station.position.y < 50
                                ? "border-b-2 border-t-transparent"
                                : "border-t-2 border-b-transparent"
                            } border-transparent ${station.color.replace(
                              "text-",
                              station.position.y < 50
                                ? "border-b-"
                                : "border-t-"
                            )}`}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Centro del radar */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.7)",
                      "0 0 0 10px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </div>

              {/* Leyenda del radar */}
              <div className="mt-3 grid grid-cols-4 gap-1 max-md:grid-cols-2">
                {stations.map((station, index) => {
                  const Icon = station.icon;
                  return (
                    <motion.div
                      key={station.id}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${
                        activeStation === station.id
                          ? "bg-gray-800 border border-green-500/30"
                          : "hover:bg-gray-800/50"
                      }`}
                      onClick={() => setActiveStation(station.id)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Icon className={`w-4 h-4 ${station.color}`} />
                      <span className="text-gray-300 font-mono text-xs">
                        {station.name
                          .replace(" Station", "")
                          .replace(" Outpost", "")
                          .replace(" Satellite", "")
                          .replace(" Beacon", "")
                          .replace(" Hub", "")
                          .replace(" Base", "")}
                      </span>
                      <motion.div
                        className={`ml-auto w-2 h-2 rounded-full ${station.color.replace(
                          "text-",
                          "bg-"
                        )}`}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Panel de comunicaciones */}
            <motion.div
              className="bg-gray-900 rounded-lg p-4 border border-green-500/20"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-green-400 font-mono text-lg mb-4">
                PANEL DE COMUNICACIONES
              </h3>

              <AnimatePresence mode="wait">
                {activeStation ? (
                  <motion.div
                    key={activeStation}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      const station = stations.find(
                        (s) => s.id === activeStation
                      );
                      const Icon = station.icon;
                      return (
                        <motion.div
                          className="bg-black rounded p-4 border border-green-500/30"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            >
                              <Icon className={`w-6 h-6 ${station.color}`} />
                            </motion.div>
                            <div>
                              <h4 className="text-white font-mono">
                                {station.name}
                              </h4>
                              <p className="text-gray-400 font-mono text-xs">
                                FREQ: {station.frequency}
                              </p>
                            </div>
                            <motion.div
                              className={`ml-auto px-2 py-1 rounded text-xs font-mono ${
                                station.status === "ONLINE"
                                  ? "bg-green-500 text-black"
                                  : "bg-red-500 text-white"
                              }`}
                              animate={{ opacity: [1, 0.7, 1] }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            >
                              {station.status}
                            </motion.div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-400">LATENCIA:</span>
                              <motion.span
                                className="text-green-400"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                              >
                                12ms
                              </motion.span>
                            </div>
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-400">POTENCIA:</span>
                              <span className="text-green-400">98%</span>
                            </div>
                            <div className="flex justify-between text-xs font-mono max-md:hidden">
                              <span className="text-gray-400">
                                ENCRIPTACIÓN:
                              </span>
                              <span className="text-green-400">AES-256</span>
                            </div>
                          </div>

                          <motion.button
                            onClick={() => handleStationClick(station.id)}
                            disabled={transmitting === station.id}
                            className={`w-full py-3 rounded font-mono text-sm border-2 transition-all ${
                              transmitting === station.id
                                ? "bg-yellow-500 text-black border-yellow-500"
                                : "bg-green-500 text-black border-green-500 hover:bg-green-400"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            animate={
                              transmitting === station.id
                                ? { opacity: [1, 0.7, 1] }
                                : {}
                            }
                            transition={{
                              duration: 0.5,
                              repeat:
                                transmitting === station.id
                                  ? Number.POSITIVE_INFINITY
                                  : 0,
                            }}
                          >
                            {transmitting === station.id ? (
                              <div className="flex items-center justify-center gap-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                  }}
                                >
                                  <Zap className="w-4 h-4" />
                                </motion.div>
                                CONECTANDO...
                              </div>
                            ) : (
                              `CONECTAR CON ${station.name
                                .replace(" Outpost", "")
                                .replace(" Satellite", "")
                                .replace(" Station", "")
                                .replace(" Beacon", "")
                                .toUpperCase()}`
                            )}
                          </motion.button>
                        </motion.div>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Radar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-500 font-mono">
                      SELECCIONA UNA ESTACIÓN EN EL RADAR
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Log de actividad */}
          <motion.div
            className="mt-4 bg-black rounded p-3 border border-green-500/20 max-2xl:hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h4 className="text-green-400 font-mono text-sm mb-2">
              LOG DE ACTIVIDAD
            </h4>
            <div className="space-y-1 text-xs font-mono max-h-30 overflow-y-auto terminal-log-contact">
              <motion.p
                className="text-green-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                [12:34:56] Sistema iniciado correctamente
              </motion.p>
              <motion.p
                className="text-blue-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                [12:34:57] Iniciando escaneo automático...
              </motion.p>
              <AnimatePresence>
                {autoMessages.map((message, index) => (
                  <motion.p
                    key={index}
                    className="text-yellow-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message}
                  </motion.p>
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {transmitting && (
                  <motion.p
                    className="text-orange-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    [12:35:00] Estableciendo conexión con{" "}
                    {stations.find((s) => s.id === transmitting)?.name || "N/A"}
                    ...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

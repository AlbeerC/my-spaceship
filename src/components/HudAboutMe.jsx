import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SpaceshipHUD() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [vitalStats, setVitalStats] = useState([
    {
      label: "ENERGÍA",
      value: 87,
      maxValue: 100,
      unit: "%",
      color: "emerald",
      icon: "⚡",
    },
    {
      label: "CARGA COGNITIVA",
      value: 34,
      maxValue: 100,
      unit: "%",
      color: "blue",
      icon: "🧠",
    },
    {
      label: "ESTADO EMOCIONAL",
      value: 92,
      maxValue: 100,
      unit: "%",
      color: "purple",
      icon: "💫",
    },
    {
      label: "OXÍGENO MENTAL",
      value: 78,
      maxValue: 100,
      unit: "%",
      color: "cyan",
      icon: "👨🏽‍🚀",
    },
  ]);
  const [orbitTime, setOrbitTime] = useState(0);

  // Update time and orbit counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setOrbitTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate vital stats fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: Math.max(
            0,
            Math.min(stat.maxValue, stat.value + (Math.random() - 0.5) * 4)
          ),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: "from-emerald-500/20 to-emerald-600/20",
        border: "border-emerald-400/50",
        text: "text-emerald-300",
        glow: "shadow-emerald-400/20",
        bar: "bg-gradient-to-r from-emerald-500 to-emerald-400",
      },
      blue: {
        bg: "from-blue-500/20 to-blue-600/20",
        border: "border-blue-400/50",
        text: "text-blue-300",
        glow: "shadow-blue-400/20",
        bar: "bg-gradient-to-r from-blue-500 to-blue-400",
      },
      purple: {
        bg: "from-purple-500/20 to-purple-600/20",
        border: "border-purple-400/50",
        text: "text-purple-300",
        glow: "shadow-purple-400/20",
        bar: "bg-gradient-to-r from-purple-500 to-purple-400",
      },
      cyan: {
        bg: "from-cyan-500/20 to-cyan-600/20",
        border: "border-cyan-400/50",
        text: "text-cyan-300",
        glow: "shadow-cyan-400/20",
        bar: "bg-gradient-to-r from-cyan-500 to-cyan-400",
      },
    };
    return colors[color];
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {/* HUD Interface */}
      <motion.div
        className="absolute top-[50%] left-[50%] -translate-x-[50%] translate-y-[-50%] w-[40%]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-6 min-w-[320px]">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-6 pb-3 border-b border-cyan-400/20"
            animate={{
              borderColor: [
                "rgba(6, 182, 212, 0.2)",
                "rgba(6, 182, 212, 0.4)",
                "rgba(6, 182, 212, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <div>
              <h2 className="text-cyan-300 font-mono text-lg font-bold">
                VITAL STATS
              </h2>
              <p className="text-cyan-400/70 font-mono text-xs">
                TRIPULANTE: ALBERTO
              </p>
            </div>
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(34, 197, 94, 0.5)",
                  "0 0 15px rgba(34, 197, 94, 0.8)",
                  "0 0 5px rgba(34, 197, 94, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Vital Stats */}
          <div className="space-y-4 mb-6">
            {vitalStats.map((stat, index) => {
              const colors = getColorClasses(stat.color);
              const percentage = (stat.value / stat.maxValue) * 100;

              return (
                <motion.div
                  key={stat.label}
                  className={`bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-3`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{stat.icon}</span>
                      <span className={`font-mono text-sm ${colors.text}`}>
                        {stat.label}
                      </span>
                    </div>
                    <motion.span
                      className={`font-mono text-lg font-bold ${colors.text}`}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      {Math.round(stat.value)}
                      {stat.unit}
                    </motion.span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute top-0 left-0 h-full ${colors.bar} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />

                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-32, 320] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Critical warning for low values */}
                  {stat.value < 30 && (
                    <motion.div
                      className="flex items-center space-x-1 mt-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="text-red-300 font-mono text-xs">
                        CRÍTICO
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Orbit Time */}
          <motion.div
            className="bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-400/50 rounded-lg p-3"
            animate={{
              boxShadow: [
                "0 0 10px rgba(99, 102, 241, 0.2)",
                "0 0 20px rgba(99, 102, 241, 0.4)",
                "0 0 10px rgba(99, 102, 241, 0.2)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌍</span>
                <span className="font-mono text-sm text-indigo-300">
                  TIEMPO EN ÓRBITA
                </span>
              </div>
              <motion.span
                className="font-mono text-lg font-bold text-indigo-300"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(99, 102, 241, 0.5)",
                    "0 0 15px rgba(99, 102, 241, 0.8)",
                    "0 0 5px rgba(99, 102, 241, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {formatTime(orbitTime)}
              </motion.span>
            </div>
          </motion.div>

          {/* System Time */}
          <motion.div
            className="mt-4 pt-3 border-t border-cyan-400/20 flex justify-between items-center"
            animate={{
              borderColor: [
                "rgba(6, 182, 212, 0.2)",
                "rgba(6, 182, 212, 0.4)",
                "rgba(6, 182, 212, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="font-mono text-xs text-cyan-400/70">
              SISTEMA LOCAL
            </span>
            <motion.span
              className="font-mono text-sm text-cyan-300"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              {currentTime.toLocaleTimeString()}
            </motion.span>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg" />

          {/* Scanning line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            animate={{ y: [0, 280, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

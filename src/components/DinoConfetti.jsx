import React from "react";
import { motion } from "framer-motion";

export default function DinoConfetti() {
  const confetti = ["🦖", "🦕", "🥚", "🦴", "🌿"];

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {confetti.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl"
          initial={{ y: -50, x: Math.random() * 1200 }}
          animate={{ y: 800, rotate: 360 }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          style={{ left: Math.random() * 1200 }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}

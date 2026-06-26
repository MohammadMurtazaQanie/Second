import { motion } from "motion/react";

export function FloatingHearts() {
  const hearts = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = 8 + Math.random() * 8;
        const size = 14 + Math.random() * 22;
        return (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
            style={{ left: `${left}%`, fontSize: size }}
            className="absolute text-pink-strong/60"
          >
            ♥
          </motion.div>
        );
      })}
    </div>
  );
}

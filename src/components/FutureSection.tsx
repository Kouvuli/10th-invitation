import { motion } from "framer-motion";
import { useState } from "react";

/* ================= SPARKLES ================= */

function Sparkles() {
  const sparkles = Array.from({ length: 10 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 30;

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0.6, 1, 0.8],
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              absolute left-1/2 top-1/2
              w-1.5 h-1.5 rounded-full
              bg-accent
            "
          />
        );
      })}
    </div>
  );
}

/* ================= COMPONENT ================= */

export default function FutureGateSection() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    document.querySelector("#event")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        relative min-h-screen
        flex items-center justify-center
       text-text
        transition-colors duration-500
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        onClick={handleClick}
        className="
          relative text-center cursor-pointer select-none
        "
      >
        {/* Sparkles */}
        {clicked && <Sparkles />}

        {/* Main text */}
        <motion.h2
          whileHover={{ scale: 1.01 }}
          className="
            text-3xl md:text-4xl
            font-semibold tracking-widest
            leading-tight
            text-text
          "
        >
          2026 này, chúng ta sẽ có gì?
        </motion.h2>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="
            mt-6 text-sm
            text-muted
          "
        >
          Chạm để tiếp tục
        </motion.p>
      </motion.div>
    </section>
  );
}

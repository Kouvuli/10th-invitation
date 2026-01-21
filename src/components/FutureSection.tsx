import { motion } from "framer-motion";
import { useState } from "react";

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
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0.6,
            }}
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
              w-1.5 h-1.5
              rounded-full
              bg-rose-400
            "
          />
        );
      })}
    </div>
  );
}

export default function FutureGateSection() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    const next = document.querySelector("#event");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative text-center cursor-pointer select-none"
        onClick={handleClick}
      >
        {/* Sparkles */}
        {clicked && <Sparkles />}

        {/* Text */}
        <motion.h2
          whileHover={{ scale: 1.01 }}
          className="
            text-3xl md:text-4xl
            font-semibold
            tracking-widest
            text-slate-900
            leading-tight
          "
        >
          2026 này, chúng ta sẽ có gì?
        </motion.h2>

        {/* hint */}
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{
            opacity: [1, 0, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="mt-6 text-sm text-slate-500"
        >
          Chạm để tiếp tục
        </motion.p>
      </motion.div>
    </section>
  );
}

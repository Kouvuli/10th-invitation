import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.96 }}
      animate={{
        backgroundColor: isDark
          ? "rgba(255,255,255,0.12)" // giữ nguyên dark
          : "rgba(255,255,255,0.85)", // 🔥 sáng & nổi hơn
        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.2)"
          : "0 12px 30px rgba(15,23,42,0.18)", // 🔥 shadow rõ hơn
        borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.12)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="cursor-pointer fixed top-6 right-6 z-50 w-25 h-12.5 rounded-full flex items-center px-1.5 backdrop-blur-md border"
      aria-label="Toggle theme"
    >
      {/* ☀️ */}
      <motion.span
        animate={{ opacity: isDark ? 0.4 : 1 }}
        className="absolute left-4 text-base pointer-events-none"
      >
        ☀️
      </motion.span>

      {/* 🌙 */}
      <motion.span
        animate={{ opacity: isDark ? 1 : 0.4 }}
        className="absolute right-4 text-base pointer-events-none"
      >
        🌙
      </motion.span>

      {/* THUMB */}
      <motion.div
        layout
        animate={{
          backgroundColor: isDark ? "#011f45" : "#ffffff",
          boxShadow: isDark
            ? "0 6px 18px rgba(0,0,0,0.2)"
            : "0 6px 18px rgba(0,0,0,0.2)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          w-10 h-10 rounded-full
          flex items-center justify-center
          ${isDark ? "translate-x-12" : "translate-x-0"}
        `}
      >
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-base"
        >
          {isDark ? "🌙" : "☀️"}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Center } from "@react-three/drei";
import { JSX, Suspense } from "react";
import BigHeroText from "../three/BigHeroText";

function Hero3D(): JSX.Element {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Center>
        <Suspense fallback={null}>
          <BigHeroText />
        </Suspense>
      </Center>
    </Canvas>
  );
}

export default function HeroSection(): JSX.Element {
  const handleClick = () => {
    document.querySelector("#timeline")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2 text-text transition-colors duration-500">
      {/* ===== LEFT CONTENT ===== */}
      <div className="flex items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.h1
              className="font-extrabold tracking-widest leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="block text-4xl md:text-6xl font-medium text-accent">
                CT1619
              </span>

              <span className="block text-3xl md:text-5xl text-text">
                10 Năm Thanh Xuân
              </span>
            </motion.h1>

            {/* underline */}
            <motion.svg
              viewBox="0 0 200 20"
              className="w-56 h-10 mt-4 text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <motion.path
                d="M5 10 C40 0, 80 20, 120 10 C160 0, 195 20, 195 10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>

          {/* DESCRIPTION */}
          <p className="leading-relaxed text-text">
            Năm nay đánh dấu cột mốc{" "}
            <motion.span
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block cursor-pointer font-semibold text-accent"
            >
              1 thập kỷ
            </motion.span>{" "}
            chúng ta đồng hành cùng nhau. Giữa guồng quay cuộc sống, việc giữ
            được một tập thể gắn kết suốt 10 năm là điều vô cùng đáng trân
            trọng.
          </p>
        </motion.div>
      </div>

      {/* ===== RIGHT 3D ===== */}
      <div className="hidden md:block">
        <Hero3D />
      </div>
    </section>
  );
}

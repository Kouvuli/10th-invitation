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
    const next = document.querySelector("#timeline");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-6"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold tracking-widest text-slate-900 leading-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="block text-4xl md:text-6xl font-medium text-rose-600">
                CT1619
              </span>
              <span className="block text-3xl md:text-5xl text-slate-800">
                10 Năm Thanh Xuân
              </span>
            </motion.h1>

            <motion.svg
              viewBox="0 0 200 20"
              className="w-56 h-10 mt-4 text-rose-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.path
                d="M5 10 C40 0, 80 20, 120 10 C160 0, 195 20, 195 10"
                fill="transparent"
                stroke="#fb7185"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
          <p className="text-slate-700 leading-relaxed">
            Năm nay đánh dấu cột mốc{" "}
            <motion.a
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer inline-block font-semibold text-rose-600 decoration-rose-300/70 transition hover:decoration-rose-500"
            >
              1 thập kỷ
            </motion.a>{" "}
            chúng ta đồng hành cùng nhau. Giữa guồng quay cuộc sống, giữ được
            một tập thể gắn kết suốt 10 năm là điều vô cùng đáng trân trọng.
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block">
        <Hero3D />
      </div>
    </section>
  );
}

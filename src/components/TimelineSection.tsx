import { motion } from "framer-motion";
import { useState } from "react";
import { JSX } from "react";

type Item = {
  id: number;
  title: string;
  desc: string;
};

export default function TimelineSection(): JSX.Element {
  const startYear = 2016;

  const items: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Checkpoint ${i + 1}`,
    desc: `Short description for checkpoint ${i + 1}.`,
  }));

  const topItems = items.slice(0, 5);
  const bottomItems = items.slice(5, 10);

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="timeline"
      className="relative px-14 md:px-28 flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="mb-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold tracking-widest text-slate-900 leading-tight"
          whileHover={{ scale: 1.02 }}
        >
          <span className="block text-3xl text-center md:text-5xl text-slate-800">
            1 Thập Kỷ
          </span>
        </motion.h1>

        <motion.svg
          viewBox="0 0 200 20"
          className="w-56 h-10 mt-2 text-rose-400"
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

      <div className="w-full max-w-7xl relative">
        {/* ===== TOP ROW ===== */}
        <div className="grid grid-cols-5 gap-3 mb-3">
          {topItems.map((it) => (
            <div key={it.id} className="flex flex-col items-center">
              <motion.div
                className="w-28 h-16 md:w-44 md:h-28 rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => setOpen(it.id)}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`/images/checkpoint-${it.id}.jpg`}
                  alt={it.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* ===== TIMELINE LINE ===== */}
        <div className="relative h-20">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-300 rounded-full" />

          <div className="grid grid-cols-5 absolute inset-0">
            {topItems.map((it) => (
              <div key={it.id} className="flex flex-col items-center">
                <button
                  onClick={() => setOpen(it.id)}
                  className="w-3 h-3 rounded-full bg-rose-600 z-10"
                />
                <div className="mt-2 text-sm font-medium text-rose-600">
                  {startYear + it.id - 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM ROW ===== */}
        <div className="grid grid-cols-5 gap-3 mt-12">
          {bottomItems.map((it) => (
            <div key={it.id} className="flex flex-col items-center">
              <motion.div
                className="w-28 h-16 md:w-44 md:h-28 rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => setOpen(it.id)}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`/images/checkpoint-${it.id}.jpg`}
                  alt={it.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MODAL PREVIEW ===== */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setOpen(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white">
              <button
                onClick={() => setOpen(null)}
                className="absolute top-3 right-3 z-50 bg-white rounded-full p-2 shadow cursor-pointer"
              >
                ✕
              </button>

              <img
                src={`/images/checkpoint-${open}.jpg`}
                alt={`Checkpoint ${open}`}
                className="w-full max-h-[80vh] object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

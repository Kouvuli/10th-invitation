import { motion } from "framer-motion";
import { useState } from "react";
import { JSX } from "react";

type Item = {
  id: number;
  title: string;
  desc: string;
};

/* ================= CONFIG ================= */

const LINE_DURATION = 1.5;
const BOTTOM_OFFSET = 1.8;

const getDelay = (index: number, total: number, offset = 0) =>
  offset + (index / (total - 1)) * LINE_DURATION;

/* ================= VARIANTS ================= */

const timelineItem = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { delay, duration: 0.2, ease: "easeOut" },
  }),
};

const lineTop = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: LINE_DURATION, ease: "easeOut" },
  },
};

const lineBottom = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: LINE_DURATION,
      delay: BOTTOM_OFFSET,
      ease: "easeOut",
    },
  },
};

/* ================= COMPONENT ================= */

export default function TimelineSection(): JSX.Element {
  const startYear = 2016;

  const items: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Checkpoint ${i + 1}`,
    desc: `Short description for checkpoint ${i + 1}.`,
  }));

  const topItems = items.slice(0, 5);
  const bottomItems = items.slice(5);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="timeline"
      className="
        relative min-h-screen
        px-14 md:px-28
        flex flex-col items-center justify-center
       text-text
        transition-colors duration-500
      "
    >
      {/* ===== TITLE ===== */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mb-6 text-center"
      >
        <motion.h1
          className="font-extrabold tracking-widest leading-tight"
          whileHover={{ scale: 1.02 }}
        >
          <span className="block text-3xl md:text-5xl text-text">
            1 Thập Kỷ
          </span>
        </motion.h1>

        <motion.svg
          viewBox="0 0 200 20"
          className="md:w-56 md:h-10 w-32 h-8 my-2 mx-auto text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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

      <div className="w-full max-w-7xl relative">
        {/* ================= TOP ROW ================= */}

        <div className="grid grid-cols-5 gap-3 mb-6">
          {topItems.map((it, index) => {
            const delay = getDelay(index, topItems.length);

            return (
              <motion.div
                key={it.id}
                custom={delay}
                variants={timelineItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <motion.div
                  onClick={() => setOpen(it.id)}
                  whileHover={{ scale: 1.05 }}
                  className="
                    w-28 h-16 md:w-44 md:h-28
                    rounded-lg overflow-hidden
                    shadow-md cursor-pointer
                    bg-base
                  "
                >
                  <img
                    src={`/images/checkpoint-${it.id}.jpg`}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* LINE + DOT + YEAR */}
        <div className="relative h-20">
          <motion.div
            variants={lineTop}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="
              absolute inset-x-0 top-1 h-0.5
              bg-accent origin-left rounded-full
            "
          />

          <div className="grid grid-cols-5">
            {topItems.map((it, index) => {
              const delay = getDelay(index, topItems.length);

              return (
                <motion.div
                  key={it.id}
                  custom={delay}
                  variants={timelineItem}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="mt-3 text-sm font-semibold text-accent">
                    {startYear + it.id - 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM ROW ================= */}

        <div className="grid grid-cols-5 gap-3 mb-6">
          {bottomItems.map((it, index) => {
            const delay = getDelay(index, bottomItems.length, BOTTOM_OFFSET);

            return (
              <motion.div
                key={it.id}
                custom={delay}
                variants={timelineItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <motion.div
                  onClick={() => setOpen(it.id)}
                  whileHover={{ scale: 1.05 }}
                  className="
                    w-28 h-16 md:w-44 md:h-28
                    rounded-lg overflow-hidden
                    shadow-md cursor-pointer
                    bg-base
                  "
                >
                  <img
                    src={`/images/checkpoint-${it.id}.jpg`}
                    alt={it.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="relative h-20 mb-10">
          <motion.div
            variants={lineBottom}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="
              absolute inset-x-0 top-1 h-0.5
              bg-accent origin-left rounded-full
            "
          />

          <div className="grid grid-cols-5">
            {bottomItems.map((it, index) => {
              const delay = getDelay(index, bottomItems.length, BOTTOM_OFFSET);

              return (
                <motion.div
                  key={it.id}
                  custom={delay}
                  variants={timelineItem}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="mt-3 text-sm font-semibold text-accent">
                    {startYear + it.id - 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
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
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-base">
              <button
                onClick={() => setOpen(null)}
                className="
                  absolute top-3 right-3
                  rounded-full p-2 shadow
                  bg-base text-text
                  cursor-pointer
                "
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

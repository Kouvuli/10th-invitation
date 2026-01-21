import { motion } from "framer-motion";
import { useState } from "react";
import { JSX } from "react";

type Item = {
  id: number;
  title: string;
  desc: string;
  color: string;
};

export default function TimelineSection(): JSX.Element {
  const startYear = 2016;

  const items: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Checkpoint ${i + 1}`,
    desc: `Short description for checkpoint ${i + 1}.`,
    color: [
      "#7c3aed",
      "#06b6d4",
      "#84cc16",
      "#f59e0b",
      "#fb7185",
      "#f472b6",
      "#a78bfa",
      "#60a5fa",
      "#fb923c",
      "#ef4444",
    ][i % 10],
  }));

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center text-slate-900">
          Timeline
        </h2>

        <div className="relative">
          <div className="overflow-x-auto no-scrollbar py-6 relative">
            {/* horizontal line centered vertically across the thumbnail row */}
            <div className="absolute left-6 right-6 bottom-15 transform -translate-y-1/2 h-1 bg-slate-300 z-0 rounded-full" />

            <div className="min-w-full flex items-start gap-8 px-8 md:px-12">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="w-56 md:w-72 flex flex-col items-center relative"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-40 h-24 md:w-56 md:h-36 overflow-hidden rounded-lg shadow-md cursor-pointer mb-2"
                      onClick={() => setOpen(it.id)}
                    >
                      <img
                        src={`/images/checkpoint-${it.id}.jpg`}
                        alt={`Checkpoint ${it.id}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.style.opacity = "0.5";
                        }}
                      />
                    </div>

                    {/* dot on the line */}
                    <div className="relative z-10">
                      <button
                        onClick={() => setOpen(it.id)}
                        className="w-4 h-4 rounded-full bg-black"
                        aria-label={`Open checkpoint ${it.id}`}
                      />
                    </div>

                    <div className="mt-3 text-sm text-rose-600 font-semibold">
                      {startYear + (it.id - 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for preview (optional) */}
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
            <div className="relative bg-transparent rounded-lg overflow-hidden shadow-xl">
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-50 bg-white/90 hover:bg-white rounded-full p-2 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-slate-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <img
                src={`/images/checkpoint-${open}.jpg`}
                alt={`Checkpoint ${open}`}
                className="w-full h-auto max-h-[80vh] object-contain bg-white"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

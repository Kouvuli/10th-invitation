import { motion } from "framer-motion";
import { JSX } from "react";

export default function EventSection(): JSX.Element {
  return (
    <section
      className="
      max-w-5xl px-6 md:px-28
      flex flex-col justify-center gap-20 min-h-screen
      text-slate-800 dark:text-slate-200
    "
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-text ">
          🔥 Gala 10 Năm
        </h2>

        <ul className="space-y-2 text-text">
          <li>
            📅 Thứ 7, ngày <b>05/09</b>
          </li>
          <li>📍 Sài Gòn (sẽ thông báo chi tiết sau)</li>
          <li>
            💬 Dịp hội tụ đầy đủ nhất — mong các bạn ở xa sắp xếp về chung vui.
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-text ">
          🌲 Trip Đà Lạt
        </h2>

        <ul className="space-y-2 text-text">
          <li>
            📅 Tối <b>26/02 – 02/03</b>
          </li>
          <li>💬 Chuyến đi hâm nóng tình cảm trước thềm Gala chính</li>
        </ul>
      </motion.div>
    </section>
  );
}

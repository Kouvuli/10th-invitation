import { motion } from "framer-motion";
import Footer from "./Footer";

export default function ConfirmSection() {
  const googleFormUrl =
    import.meta.env.VITE_GOOGLE_FORM_URL ||
    "https://forms.gle/qb4eG3oRvGVpxBEdA";

  return (
    <section className="relative flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          max-w-xl w-full mx-6
          rounded-2xl
          border border-white/10
          bg-white/5 backdrop-blur-md
          text-center
          px-10 py-14
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mb-10 flex justify-center items-center flex-col"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold tracking-widest text-slate-900 leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="block text-3xl text-center md:text-5xl text-slate-800">
              Xác nhận tham gia
            </span>
          </motion.h1>

          <motion.svg
            viewBox="0 0 200 20"
            className="w-72 h-10 mt-2 text-rose-400"
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

        <p className="text-slate-700 leading-relaxed mb-10">
          Mười năm không phải lúc nào cũng có lần thứ hai.
          <br />
          Tụi mình rất mong có sự hiện diện của bạn.
        </p>

        <motion.a
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="
            inline-flex items-center justify-center gap-2
            rounded-full
            bg-white text-black
            px-8 py-3
            font-medium
            transition
          "
        >
          Xác nhận tại đây
          <span className="text-lg">→</span>
        </motion.a>

        <p className="mt-8 text-sm text-slate-600">
          ⏰ Ngày chốt danh sách:{" "}
          <span className=" text-slate-700 font-bold">Chủ Nhật 25/01</span>
        </p>
        <Footer />
      </motion.div>
    </section>
  );
}

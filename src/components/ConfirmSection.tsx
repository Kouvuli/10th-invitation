import { motion } from "framer-motion";
import { JSX } from "react/jsx-dev-runtime";
import { useState } from "react";

export default function ConfirmSection(): JSX.Element {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState("both");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submitUrl = import.meta.env.VITE_SUBMIT_URL || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!submitUrl) {
      setMessage("No submit URL configured. Set VITE_SUBMIT_URL in .env");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, choice, time: new Date().toISOString() }),
      });
      if (res.ok) {
        setMessage("Submitted — thank you!");
        setName("");
        setChoice("both");
      } else {
        setMessage("Submit failed");
      }
    } catch (err: any) {
      setMessage(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 text-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Xác Nhận Tham Gia</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 text-left"
        >
          <label className="block">
            <span className="text-slate-700">Họ và tên (tùy chọn)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded bg-slate-100 px-3 py-2 text-slate-900"
              placeholder="Tên của bạn"
            />
          </label>

          <label className="block">
            <span className="text-slate-700">Lựa chọn tham gia</span>
            <select
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              className="mt-1 w-full rounded bg-slate-100 px-3 py-2 text-slate-900"
            >
              <option value="both">💝 Cả hai</option>
              <option value="dalat">❤️ Chỉ Đà Lạt</option>
              <option value="gala">🫶 Chỉ Gala</option>
            </select>
          </label>

          <div className="flex items-center justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-rose-600 text-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Gửi"}
            </button>
            {message && <div className="text-sm text-slate-700">{message}</div>}
          </div>
        </form>

        <p className="text-sm text-slate-600 mt-8">
          ⏰ Chốt danh sách Đà Lạt: <b>Chủ Nhật 25/01</b>
        </p>
      </motion.div>
    </section>
  );
}

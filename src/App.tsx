import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import EventSection from "./components/EventSection";
import ConfirmSection from "./components/ConfirmSection";
import FutureSection from "./components/FutureSection";

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sections = Array.from(
          el.querySelectorAll("section"),
        ) as HTMLElement[];
        const top = el.scrollTop;
        let nearest = 0;
        let min = Infinity;
        sections.forEach((s, i) => {
          const offset = Math.abs(s.offsetTop - top);
          if (offset < min) {
            min = offset;
            nearest = i;
          }
        });
        setActive(nearest);
        activeRef.current = nearest;
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      // don't intercept typing in form controls
      const target = document.activeElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          (target as HTMLElement).isContentEditable)
      ) {
        return;
      }

      // compute current index at keypress time
      const sections = Array.from(
        el.querySelectorAll("section"),
      ) as HTMLElement[];
      if (sections.length === 0) return;
      const top = el.scrollTop;
      let nearest = 0;
      let min = Infinity;
      sections.forEach((s, i) => {
        const offset = Math.abs(s.offsetTop - top);
        if (offset < min) {
          min = offset;
          nearest = i;
        }
      });

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(Math.min(nearest + 1, sections.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(Math.max(nearest - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(sections.length - 1);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function scrollToIndex(i: number) {
    const el = containerRef.current;
    if (!el) return;
    const sections = Array.from(
      el.querySelectorAll("section"),
    ) as HTMLElement[];
    const idx = Math.max(0, Math.min(i, sections.length - 1));
    el.scrollTo({ top: sections[idx].offsetTop, behavior: "smooth" });
    setActive(idx);
    activeRef.current = idx;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-stone-200 to-amber-100 text-slate-800">
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative"
      >
        <section id="hero" className="snap-start h-screen">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection />
          </motion.div>
        </section>

        <section id="timeline" className="snap-start h-screen">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TimelineSection />
          </motion.div>
        </section>
        <section id="gift" className="snap-start h-screen">
          <FutureSection />
        </section>

        <section id="event" className="snap-start h-screen">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <EventSection />
          </motion.div>
        </section>

        <section id="confirm" className="snap-start h-screen">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ConfirmSection />
          </motion.div>
        </section>

        {/* dots navigation removed per request */}
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import EventSection from "./components/EventSection";
import ConfirmSection from "./components/ConfirmSection";
import FutureSection from "./components/FutureSection";
import MainLayout from "./layout/MainLayout";

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
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MainLayout>
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
          <TimelineSection />
        </section>

        <section id="gift" className="snap-start h-screen">
          <FutureSection />
        </section>

        <section id="event" className="snap-start h-screen">
          <EventSection />
        </section>

        <section id="confirm" className="snap-start h-screen">
          <ConfirmSection />
        </section>
      </div>
    </MainLayout>
  );
}

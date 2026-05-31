"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PixelImage } from "@/registry/magicui/pixel-image";
import "@/styles/maintenance.css";

function useTimecode() {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(
        2,
        "0"
      );
      setTimecode(`${h}:${m}:${s}:${f}`);
    };

    tick();
    const id = setInterval(tick, 42);
    return () => clearInterval(id);
  }, []);

  return timecode;
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const letterbox = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function MaintenanceScreen() {
  const timecode = useTimecode();

  return (
    <div className="maintenance-root">
      <div className="maintenance-bg" aria-hidden>
        <PixelImage
          src="/logo/maintenance.png"
          customGrid={{ rows: 8, cols: 12 }}
          grayscaleAnimation
          fill
          loop
          maxAnimationDelay={1600}
          loopHoldDuration={3200}
          className="maintenance-bg-pixel"
        />
      </div>
      <div className="maintenance-bg-scrim" aria-hidden />

      <motion.div
        className="maintenance-letterbox maintenance-letterbox--top"
        variants={letterbox}
        initial="hidden"
        animate="show"
        style={{ transformOrigin: "top center" }}
      />
      <motion.div
        className="maintenance-letterbox maintenance-letterbox--bottom"
        variants={letterbox}
        initial="hidden"
        animate="show"
        style={{ transformOrigin: "bottom center" }}
      />

      <div className="maintenance-grain" aria-hidden />
      <div className="maintenance-noise" aria-hidden />
      <div className="maintenance-vignette" aria-hidden />
      <div
        className="maintenance-film-edge maintenance-film-edge--left"
        aria-hidden
      />
      <div
        className="maintenance-film-edge maintenance-film-edge--right"
        aria-hidden
      />

      <header className="maintenance-header">
        <Link href="/" className="maintenance-logo">
          Cinewacky
        </Link>
      </header>

      <motion.main
        className="maintenance-content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div className="maintenance-rec" variants={fadeUp}>
          <motion.span
            className="maintenance-rec-dot"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          In production
        </motion.div>

        <motion.p className="maintenance-timecode" variants={fadeUp}>
          TC {timecode}
        </motion.p>

        <motion.p className="maintenance-lead" variants={fadeUp}>
          We&apos;re in the
        </motion.p>
        <motion.h1 className="maintenance-hero-line" variants={fadeUp}>
          <motion.span
            className="maintenance-bold"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Cutting Room
          </motion.span>
        </motion.h1>

        <motion.p className="maintenance-body" variants={fadeUp}>
          Our production house is shaping new documentaries and cinematic work.
          The site returns soon — stories worth the wait.
        </motion.p>

        <motion.div className="maintenance-tags" variants={fadeUp}>
          {["Documentaries", "Commercial", "Events", "Brand Films"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                className="maintenance-tag"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>

      </motion.main>

      <footer className="maintenance-footer">
        <motion.p
          className="maintenance-footer-contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Questions?{" "}
          <Link href="/contact">Get in touch</Link>
        </motion.p>
      </footer>
    </div>
  );
}

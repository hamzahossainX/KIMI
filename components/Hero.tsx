"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const CanvasScene = dynamic(() => import("@/components/CanvasScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-void" />,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      <CanvasScene />

      <motion.div
        style={{ y, opacity }}
        className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full pt-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease }}
          className="text-accent text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
        >
          Digital Sculptor — CGI Artist
        </motion.p>

        <h1 className="font-display font-bold leading-[0.9] tracking-tight text-[clamp(3.2rem,11vw,9rem)]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15, duration: 1, ease }}
            >
              SCULPTING
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-stroke"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease }}
            >
              IMPOSSIBLE
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 1, ease }}
            >
              WORLDS<span className="text-accent">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
          className="mt-8 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed"
        >
          I&apos;m Kael Voss — a 3D artist blending procedural systems, organic
          sculpting and cinematic lighting into images that feel inevitable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group relative px-8 py-4 rounded-full bg-accent text-void font-semibold text-sm overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View Selected Work
            </span>
            <span className="absolute inset-0 bg-violet translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full glass text-sm text-zinc-200 hover:border-accent/60 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="relative border-t border-line py-4 overflow-hidden"
      >
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm tracking-[0.3em] uppercase text-zinc-600">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12">
              {["Procedural", "Character Art", "Hard Surface", "Cinematic CGI", "World Building", "Lookdev"].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-24 right-8 hidden md:flex flex-col items-center gap-3 text-zinc-600"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
      </motion.div>
    </section>
  );
}

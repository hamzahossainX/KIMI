"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Chrysalis", tag: "Character Sculpt", seed: "chrysalis3d", h: 1100, year: "2026" },
  { title: "Neon Relic", tag: "Hard Surface", seed: "neonrelic", h: 800, year: "2026" },
  { title: "Tidal Monolith", tag: "Environment", seed: "tidalmono", h: 950, year: "2025" },
  { title: "Sirena", tag: "Portrait", seed: "sirenaport", h: 1250, year: "2025" },
  { title: "Iron Bloom", tag: "Procedural", seed: "ironbloom", h: 850, year: "2025" },
  { title: "Vault of Dust", tag: "Environment", seed: "vaultdust", h: 1050, year: "2024" },
  { title: "Prototype 09", tag: "Mecha", seed: "proto09", h: 900, year: "2024" },
  { title: "Aurelia", tag: "Creature", seed: "aureliacrea", h: 1150, year: "2024" },
  { title: "Static Choir", tag: "Abstract", seed: "staticchoir", h: 800, year: "2023" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <motion.a
      href="#work"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease }}
      className="group relative block mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-carbon"
    >
      <div className="relative overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${p.seed}/900/${p.h}`}
          alt={p.title}
          width={900}
          height={p.h}
          className="w-full object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* hover meta */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-3 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-accent text-[11px] tracking-[0.3em] uppercase mb-2">{p.tag}</p>
              <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
            </div>
            <span className="glass px-3 py-1.5 rounded-full text-xs text-zinc-300 shrink-0">
              {p.year}
            </span>
          </div>
        </div>

        {/* corner accent */}
        <span className="absolute top-4 right-4 w-9 h-9 rounded-full glass grid place-items-center text-zinc-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="relative max-w-7xl mx-auto px-6 py-28 md:py-40">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-accent text-xs tracking-[0.4em] uppercase mb-4"
          >
            01 — Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-display font-bold tracking-tight leading-[0.95] text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            RENDERS THAT
            <br />
            <span className="text-stroke">REFUSE SILENCE</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-sm text-zinc-500 text-sm leading-relaxed"
        >
          A curated slice of personal and client commissions — from organic
          creatures to hard-surface machines, each built from primitives to final grade.
        </motion.p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

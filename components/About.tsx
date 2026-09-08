"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Blender", level: 96 },
  { name: "ZBrush", level: 92 },
  { name: "Maya", level: 85 },
  { name: "Substance 3D", level: 88 },
  { name: "Houdini", level: 74 },
  { name: "Unreal Engine", level: 81 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: bio */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-accent text-xs tracking-[0.4em] uppercase mb-4"
          >
            02 — About
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-display font-bold tracking-tight leading-[0.95] text-[clamp(2.4rem,6vw,4.5rem)] mb-10"
          >
            FORM, LIGHT,
            <br />
            <span className="text-stroke">OBSESSION.</span>
          </motion.h2>

          {[
            "For the past decade I've lived at the intersection of sculpture and simulation — carving characters in ZBrush, wiring procedural cities in Houdini, and grading the light until it lies convincingly.",
            "My work has shipped in game cinematics, music videos and gallery installations. Whether it's a creature's skin pore or a mech's panel line, every pixel earns its place.",
            "Currently open for select commissions and studio collaborations.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className="text-zinc-400 leading-relaxed mb-5 max-w-lg"
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { n: "10+", l: "Years" },
              { n: "120+", l: "Projects" },
              { n: "14", l: "Awards" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5 text-center">
                <p className="font-display text-3xl font-bold text-accent">{s.n}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: skills */}
        <div className="glass rounded-3xl p-8 md:p-10 lg:sticky lg:top-28">
          <h3 className="font-display text-xl font-bold mb-8 text-white">
            Software Mastery
          </h3>
          <ul className="space-y-7">
            {skills.map((s, i) => (
              <li key={s.name}>
                <div className="flex justify-between text-sm mb-2.5">
                  <span className="text-zinc-300 font-medium">{s.name}</span>
                  <span className="text-zinc-500 tabular-nums">{s.level}%</span>
                </div>
                <div className="h-[3px] rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease }}
                    className="h-full rounded-full bg-gradient-to-r from-violet to-accent"
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-line">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">Also fluent in</p>
            <div className="flex flex-wrap gap-2">
              {["RizomUV", "Marvelous Designer", "Redshift", "Nuke", "After Effects", "Photoshop"].map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400 hover:border-accent/50 hover:text-accent transition-colors duration-300 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

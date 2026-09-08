"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const socials = [
  { label: "ArtStation", href: "https://www.artstation.com" },
  { label: "Behance", href: "https://www.behance.net" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const inputCls =
  "w-full glass rounded-xl px-5 py-4 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-accent/60 transition-colors duration-300";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 md:py-40 border-t border-line overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-violet/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-accent text-xs tracking-[0.4em] uppercase mb-4"
          >
            03 — Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-display font-bold tracking-tight leading-[0.95] text-[clamp(2.6rem,7vw,5.5rem)] mb-8"
          >
            LET&apos;S BUILD
            <br />
            <span className="text-stroke">SOMETHING</span>
            <br />
            IMPOSSIBLE<span className="text-accent">.</span>
          </motion.h2>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            href="mailto:hello@kaelvoss.studio"
            className="text-zinc-400 hover:text-accent transition-colors duration-300 text-lg"
          >
            hello@kaelvoss.studio
          </motion.a>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-5 py-2.5 rounded-full glass text-sm text-zinc-300 hover:border-accent/60 hover:text-accent transition-colors duration-300"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <input required placeholder="Name" className={inputCls} />
            <input required type="email" placeholder="Email" className={inputCls} />
          </div>
          <input placeholder="Project type (character / env / CGI...)" className={inputCls} />
          <textarea
            required
            rows={5}
            placeholder="Tell me about the impossible thing you need built..."
            className={`${inputCls} resize-none`}
          />
          <button
            type="submit"
            disabled={sending || sent}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-500 ${
              sent
                ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                : "bg-accent text-void hover:bg-violet hover:text-white"
            }`}
          >
            {sent ? "✓ Message received — I'll reply within 48h" : sending ? "Transmitting..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

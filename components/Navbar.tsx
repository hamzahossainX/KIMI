"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="font-display font-bold tracking-tight text-lg">
          KAEL<span className="text-accent">.</span>VOSS
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-white transition-colors duration-300">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full border border-white/15 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-px bg-white transition-transform ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`w-6 h-px bg-white transition-transform ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden glass mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1 text-zinc-300">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

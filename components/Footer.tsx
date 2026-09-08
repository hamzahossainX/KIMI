export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <p className="font-display font-bold tracking-tight text-zinc-400">
          KAEL<span className="text-accent">.</span>VOSS
        </p>
        <p>© 2026 Kael Voss Studio — All renders are placeholder art.</p>
        <p className="tracking-[0.3em] uppercase">Made with vertices</p>
      </div>
    </footer>
  );
}

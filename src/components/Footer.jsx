export default function Footer({ meta }) {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-gold/30 rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gold/50" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-white/20 uppercase">
            Farewell Memory
          </span>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="font-body text-sm text-white/20 italic">
            Made with love, for those who made it worth it.
          </p>
          <p className="font-mono text-[10px] text-white/10 tracking-widest mt-1">
            {meta.date}
          </p>
        </div>

        {/* Right */}
        <div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/20" />
        </div>
      </div>
    </footer>
  );
}

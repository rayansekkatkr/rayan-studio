export function Footer() {
  return (
    <footer className="px-4 pb-10 md:px-8">
      <div className="glass-panel mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-2xl px-5 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Rayan Studio. Tous droits réservés.</p>
        <div className="flex flex-wrap items-center justify-end gap-5 text-xs uppercase tracking-[0.15em] md:ml-auto">
          <a href="#hero" className="transition-colors hover:text-slate-800">
            Accueil
          </a>
          <a href="#services" className="transition-colors hover:text-slate-800">
            Services
          </a>
          <a href="#contact" className="transition-colors hover:text-slate-800">
            Contact
          </a>
          <a href="/mentions-legales" className="transition-colors hover:text-slate-800">
            Mentions légales
          </a>
          <a href="/politique-confidentialite" className="transition-colors hover:text-slate-800">
            Politique de confidentialité
          </a>
          <a href="/cgv" className="transition-colors hover:text-slate-800">
            CGV
          </a>
        </div>
      </div>
    </footer>
  );
}

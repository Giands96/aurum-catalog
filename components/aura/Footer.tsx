"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-black tracking-[0.35em] text-text-primary text-lg mb-4">
            AURUM
          </div>
          <p className="text-text-secondary text-sm max-w-[26ch] leading-relaxed">
            Fragancias y relojería de autor. Curaduría editorial premium.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="/catalogo?categoria=perfume" className="hover:text-text-primary">Perfumes</Link></li>
            <li><Link href="/catalogo?categoria=reloj" className="hover:text-text-primary">Relojes</Link></li>
            <li><Link href="/" className="hover:text-text-primary">Nosotros</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">Ayuda</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><span className="hover:text-text-primary cursor-pointer">Envíos</span></li>
            <li><span className="hover:text-text-primary cursor-pointer">Devoluciones</span></li>
            <li><span className="hover:text-text-primary cursor-pointer">Contacto</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">
            Newsletter
          </h4>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              placeholder="tu@correo.com"
              className="bg-transparent border-b border-line text-sm text-text-primary placeholder:text-text-muted py-2 focus:outline-none focus:border-text-primary transition-colors"
            />
            <button
              type="submit"
              className="self-start text-xs uppercase tracking-[0.2em] text-text-primary border-b border-text-primary pb-1 hover:text-surface-alt hover:border-surface-alt transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} AURA. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-text-muted">
            <a href="#" aria-label="Instagram" className="hover:text-text-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-text-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

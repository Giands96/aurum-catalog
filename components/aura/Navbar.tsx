"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo?categoria=perfume", label: "Perfumes" },
  { href: "/catalogo?categoria=reloj", label: "Relojes" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-md border-b border-line"
          : "bg-black/20 text-white" 
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display font-black tracking-[0.35em] text-text-primary text-base md:text-lg"
        >
          AURUM
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l, i) => (
            <Link
              key={i}
              href={l.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-text-primary after:transition-[width] after:duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
        
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-line">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {links.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-text-secondary hover:text-text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  );
}

import Link from "next/link";
import { Truck, ShieldCheck, PackageCheck, Headset } from "lucide-react";
import { WordsPullUp } from "@/components/aura/WordsPullUp";
import { CtaPill } from "@/components/aura/CtaPill";
import { SectionHeader } from "@/components/aura/SectionHeader";
import { ProductCard } from "@/components/aura/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import Perfume from "@/public/images/bleu.webp"
import Reloj from "@/public/images/relojes.webp"

export default async function Home() {
  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    featured = await getFeaturedProducts();
  } catch {
    // Supabase no configurada aún
  }

  return (
    <div className="bg-background text-text-primary">
      <Hero />
      <Bestsellers products={featured} />
      <Categories />
      <Trust />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden snap-start">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-placeholder.png"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero-2-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(245,245,242,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="grain-overlay" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-text-secondary text-center mb-6">
          Edición Otoño &middot; MMXXVI
        </div>

        <WordsPullUp
          text="AURUM"
          className="font-display font-black text-text-primary text-center tracking-[-0.04em] text-[18vw] lg:text-[14vw] leading-60 md:leading-0"
        />

        <p className="text-center text-text-secondary text-sm md:text-base mt-4 md:mt-6 max-w-xl mx-auto">
          Fragancias y relojería de autor. Selección editorial, serena, precisa.
        </p>

        <div className="flex justify-center mt-8 md:mt-10">
          <Link href="/catalogo">
            <CtaPill label="Explorar colección" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 z-10 flex items-center justify-between px-6 md:px-10 text-[10px] uppercase tracking-[0.3em] text-text-muted">
        <span>Lima &middot; Perú</span>
        <span className="hidden md:block">Envío gratis desde S/. 150</span>
        <span>01 / 04</span>
      </div>
    </section>
  );
}

function Bestsellers({
  products,
}: {
  products: Awaited<ReturnType<typeof getFeaturedProducts>>;
}) {
  return (
    <section className="min-h-svh bg-off-white flex flex-col py-16 md:py-20 items-center justify-center snap-start">
      <div className="mx-auto container px-6 md:px-10 h-full flex flex-col">
        <SectionHeader
          eyebrow="Selección"
          title="Lo más vendido"
          counter={`01 — ${String(products.length || 6).padStart(2, "0")}`}
        />
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none flex-1 py-4">
          {products.length > 0
            ? products.map((p) => (
                <div key={p.id} className="shrink-0 h-full w-[260px] sm:w-[300px] snap-start">
                  <ProductCard product={p} />
                </div>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[260px] sm:w-[300px] snap-start">
                  <div className="bg-white rounded-[32px] p-[12px] animate-pulse">
                    <div className="h-[340px] rounded-[22px] bg-neutral-200" />
                    <div className="px-[12px] pt-4 space-y-2">
                      <div className="h-5 bg-neutral-200 rounded w-3/4" />
                      <div className="h-4 bg-neutral-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

const CATEGORY_ITEMS = [
  { title: "Perfumes", sub: "Fragancias · Autor", categoria: "perfume", imagen: "/images/bleu.webp" },
  { title: "Relojes", sub: "Piezas · Precisión", categoria: "reloj", imagen: "/images/relojes.webp" },
];

function Categories() {
  return (
    <section className="h-svh bg-background snap-start">
      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        {CATEGORY_ITEMS.map((item, i) => (
          <Link
            href={`/catalogo?categoria=${item.categoria}`}
            key={item.title}
            className="group relative overflow-hidden cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item.imagen})` }}
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-700 group-hover:bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-4">
                {`0${i + 1} / 02`}
              </div>
              <h3 className="font-display font-semibold text-text-primary text-4xl md:text-6xl lg:text-7xl tracking-tight">
                {item.title}
              </h3>
              <p className="text-text-secondary text-xs md:text-sm uppercase tracking-[0.25em] mt-4">
                {item.sub}
              </p>
              <span className="mt-8 text-xs uppercase tracking-[0.28em] text-text-primary border-b border-text-primary pb-1 group-hover:tracking-[0.35em] transition-[letter-spacing] duration-500">
                Ver colección
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const TRUST_ITEMS = [
  { icon: Truck, label: "Envío gratis en compra de relojes" },
  { icon: ShieldCheck, label: "Garantía de autenticidad" },
  { icon: PackageCheck, label: "Empaque premium incluido" },
  { icon: Headset, label: "Atención personalizada" },
];

function Trust() {
  return (
    <section className=" bg-off-white text-background py-16 md:py-20 snap-start">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {TRUST_ITEMS.map((it) => (
          <div key={it.label} className="flex flex-col items-start gap-4">
            <it.icon className="w-6 h-6" strokeWidth={1.4} />
            <p className="text-sm leading-relaxed text-background max-w-[22ch]">
              {it.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Producto, ProductoVariante, ProductoImagen } from "@/types/database";
import type { ProductoConPrecio } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { generateWhatsAppUrl, buildProductMessage } from "@/lib/whatsapp";
import { ImageGallery } from "@/components/aura/ImageGallery";
import { ProductCard } from "@/components/aura/ProductCard";

interface Props {
  producto: Producto;
  variantes: ProductoVariante[];
  imagenes: ProductoImagen[];
  whatsapp: string;
  mensaje: string;
  relacionados: ProductoConPrecio[];
}

export function ProductDetailClient({
  producto,
  variantes,
  imagenes,
  whatsapp,
  mensaje,
  relacionados,
}: Props) {
  const [selectedId, setSelectedId] = useState<string>(
    variantes.length > 0 ? variantes[0].id : ""
  );

  const selected = variantes.find((v) => v.id === selectedId);
  const whatsappUrl =
    selected && whatsapp
      ? generateWhatsAppUrl({
          phone: whatsapp,
          message: buildProductMessage(mensaje, {
            nombre: producto.nombre,
            presentacion: selected.presentacion,
            precio: formatPrice(selected.precio),
            url: typeof window !== "undefined" ? window.location.href : "",
          }),
        })
      : null;

  return (
    <div className="min-h-screen bg-[#f8f8f6] pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <ImageGallery
            images={imagenes}
            fallbackUrl={producto.imagen_url}
            alt={producto.nombre}
          />

          <div className="flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 mb-2">
              {producto.categoria === "perfume" ? "Perfume" : "Reloj"}
            </span>
            <h1 className="font-display font-semibold text-neutral-900 text-3xl md:text-5xl tracking-tight">
              {producto.nombre}
            </h1>

            {producto.marca && (
              <p className="mt-2 text-sm text-neutral-500">{producto.marca}</p>
            )}

            {producto.descripcion && (
              <p className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-lg">
                {producto.descripcion}
              </p>
            )}

            {variantes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
                  Presentación
                </h3>
                <div className="flex flex-wrap gap-3">
                  {variantes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedId(v.id)}
                      className={`px-5 py-3 rounded-lg text-sm border transition-colors ${
                        selectedId === v.id
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-300 text-neutral-500 hover:text-neutral-800 hover:border-neutral-500"
                      }`}
                    >
                      <span className="block">{v.presentacion}</span>
                      <span className="block text-xs mt-1 opacity-70">
                        {formatPrice(v.precio)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selected && whatsappUrl && (
              <div className="mt-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="mt-24 md:mt-32">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-3">
                  Catálogo
                </div>
                <h2 className="font-display font-semibold text-neutral-900 text-3xl md:text-5xl leading-[1.02] tracking-tight">
                  Ver más
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="hidden md:inline-flex text-xs uppercase tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity"
              >
                Ir al catálogo
              </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-6 px-6">
              {relacionados.map((p) => (
                <div key={p.id} className="snap-start shrink-0 w-[280px] sm:w-[260px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link
                href="/catalogo"
                className="inline-flex text-xs uppercase tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity"
              >
                Ir al catálogo
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

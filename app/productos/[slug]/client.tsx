"use client";

import { useState } from "react";
import type { Producto, ProductoVariante } from "@/types/database";
import { formatPrice } from "@/lib/currency";
import { generateWhatsAppUrl, buildProductMessage } from "@/lib/whatsapp";

interface Props {
  producto: Producto;
  variantes: ProductoVariante[];
  whatsapp: string;
  mensaje: string;
}

export function ProductDetailClient({
  producto,
  variantes,
  whatsapp,
  mensaje,
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
    <div className="min-h-screen bg-background pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="aspect-[3/4] rounded-xl bg-surface-alt overflow-hidden">
            {producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-xs uppercase tracking-[0.2em]">
                Sin imagen
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-2">
              {producto.categoria === "perfume" ? "Perfume" : "Reloj"}
            </span>
            <h1 className="font-display font-semibold text-text-primary text-3xl md:text-5xl tracking-tight">
              {producto.nombre}
            </h1>

            {producto.marca && (
              <p className="mt-2 text-sm text-text-secondary">{producto.marca}</p>
            )}

            {producto.descripcion && (
              <p className="mt-6 text-sm text-text-secondary leading-relaxed max-w-lg">
                {producto.descripcion}
              </p>
            )}

            {variantes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-4">
                  Presentación
                </h3>
                <div className="flex flex-wrap gap-3">
                  {variantes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedId(v.id)}
                      className={`px-5 py-3 rounded-lg text-sm border transition-colors ${
                        selectedId === v.id
                          ? "border-text-primary bg-text-primary text-background"
                          : "border-line text-text-secondary hover:text-text-primary hover:border-text-muted"
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

            {selected && selected.presentacion && whatsappUrl && (
              <div className="mt-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

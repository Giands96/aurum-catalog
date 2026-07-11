"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import type { ProductoConPrecio } from "@/lib/products";

interface ProductCardProps {
  product: ProductoConPrecio;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/productos/${product.slug}`} className="block group">
      <div className="bg-white rounded-[32px] p-[12px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] transition-shadow duration-400">
        <div className="relative h-[340px] rounded-[22px] overflow-hidden bg-neutral-100">
          {product.imagen_mostrar ? (
            <img
              src={product.imagen_mostrar}
              alt={product.nombre}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs uppercase tracking-[0.15em]">
              Sin imagen
            </div>
          )}

          {product.destacado && (
            <span className="absolute top-3 left-3 bg-white/30 backdrop-blur-md text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-lg">
              Best Seller
            </span>
          )}


          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-[6px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-[6px] h-[6px] rounded-full ${
                  i === 0 ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-[12px] pt-4 pb-1">
          <h3 className="text-[20px] md:text-[22px] font-bold text-neutral-900 leading-tight">
            {product.nombre}
          </h3>

          {product.marca && (
            <p className="text-[16px] font-semibold text-neutral-500 mt-1">
              {product.marca}
            </p>
          )}

          {product.descripcion && (
            <p className="text-[14px] font-semibold text-neutral-400 mt-1 leading-snug line-clamp-2">
              {product.descripcion}
            </p>
          )}

          <div className="flex items-center justify-between mt-6 mb-1">
            <div className="h-[40px] inline-flex items-center px-5 rounded-full bg-neutral-100 text-neutral-900 text-base font-bold tracking-tight">
              {product.precio_desde !== null
                ? formatPrice(product.precio_desde)
                : "—"}
            </div>

            <div className="h-[40px] inline-flex items-center gap-2 px-5 rounded-full bg-neutral-900 text-white font-semibold text-sm group-hover:scale-[1.03] transition-transform duration-300">
              Comprar
              <span className="w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center">
                <ArrowRight className="w-2.5 h-2.5 text-neutral-900 -rotate-45" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import type { ProductoConPrecio } from "@/lib/products";

interface ProductCardProps {
  product: ProductoConPrecio;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/productos/${product.slug}`} className="block group">
      <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-400">
        <div className="relative h-64 sm:h-[340px] rounded-[22px] overflow-hidden bg-neutral-100">
          {product.imagen_mostrar ? (
            <Image
              src={product.imagen_mostrar}
              alt={product.nombre}
              fill
              loading="eager"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs uppercase tracking-[0.15em]">
              Sin imagen
            </div>
          )}

          {product.destacado && (
            <span className="absolute top-3 left-3 bg-white/30 backdrop-blur-md text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-lg">
              Destacado
            </span>
          )}
        </div>

        <div className="px-[12px] pt-4 pb-1 flex flex-col flex-1">
          <h3 className="text-[20px] md:text-[22px] font-bold text-neutral-900 leading-tight">
            {product.nombre}
          </h3>

          <p className="text-[16px] font-semibold text-neutral-500 mt-1 min-h-[24px]">
            {product.marca ?? ""}
          </p>

          {product.descripcion && (
            <p className="text-[14px] font-regular text-neutral-400 mt-1 line-clamp-2 min-h-[40px]">
              {product.descripcion}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-6 mb-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-[40px] flex items-center justify-center px-5 rounded-full bg-neutral-100 text-neutral-900 text-base font-bold tracking-tight sm:inline-flex">
              {product.precio_desde !== null
                ? formatPrice(product.precio_desde)
                : "—"}
            </div>

            <div className="h-[40px] flex items-center justify-center gap-2 px-5 rounded-full bg-neutral-900 text-white font-semibold text-sm group-hover:scale-[1.03] transition-transform duration-300 sm:inline-flex">
              Comprar
              <span className="w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center">
                <ArrowRight
                  className="w-2.5 h-2.5 text-neutral-900 -rotate-45"
                  strokeWidth={2.5}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import type { Producto } from "@/types/database";

interface ProductCardProps {
  product: Producto;
  precioDesde?: number;
  index?: number;
  animate?: boolean;
}

export function ProductCard({ product, precioDesde, index = 0, animate = true }: ProductCardProps) {
  const content = (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-surface-alt aspect-[3/4] mb-4">
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs uppercase tracking-[0.2em]">
            Sin imagen
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-muted">
          {product.categoria === "perfume" ? "Perfume" : "Reloj"}
        </span>
        <h3 className="text-sm text-text-primary font-medium">{product.nombre}</h3>
        {precioDesde !== undefined && (
          <span className="text-sm text-text-primary mt-1">
            Desde {formatPrice(precioDesde)}
          </span>
        )}
      </div>
    </Link>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {content}
    </motion.div>
  );
}

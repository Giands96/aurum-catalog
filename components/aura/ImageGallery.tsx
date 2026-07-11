"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductoImagen } from "@/types/database";

interface Props {
  images: ProductoImagen[];
  fallbackUrl: string | null;
  alt: string;
}

export function ImageGallery({ images, fallbackUrl, alt }: Props) {
  const allImages = images.length > 0
    ? images.map((i) => i.url)
    : fallbackUrl
      ? [fallbackUrl]
      : [];

  const [current, setCurrent] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-[3/4] rounded-xl bg-surface-alt flex items-center justify-center text-text-muted text-xs uppercase tracking-[0.2em]">
        Sin imagen
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[3/4] rounded-xl bg-surface-alt overflow-hidden group">
        <img
          src={allImages[current]}
          alt={`${alt} — imagen ${current + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((p) => (p === 0 ? allImages.length - 1 : p - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur flex items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <button
              onClick={() => setCurrent((p) => (p === allImages.length - 1 ? 0 : p + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur flex items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {allImages.map((url, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === current ? "border-text-primary" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={url}
                alt={`${alt} — miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

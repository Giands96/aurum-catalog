import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/aura/SectionHeader";
import { ProductCard } from "@/components/aura/ProductCard";
import { getActiveProducts, getActiveProductsByCategory } from "@/lib/products";

interface Props {
  searchParams: Promise<{ categoria?: string; pagina?: string }>;
}

export default async function CatalogoPage({ searchParams }: Props) {
  const params = await searchParams;
  const categoria = params.categoria;
  const pagina = Math.max(1, Number(params.pagina) || 1);

  let result: Awaited<ReturnType<typeof getActiveProducts>>;
  let error = false;

  try {
    if (categoria && ["perfume", "reloj"].includes(categoria)) {
      result = await getActiveProductsByCategory(categoria, pagina);
    } else {
      result = await getActiveProducts(pagina);
    }
  } catch {
    error = true;
    result = { data: [], total: 0, pagina: 1, totalPaginas: 1 };
  }

  const filtros = [
    { label: "Todos", href: "/catalogo", activo: !categoria },
    { label: "Perfumes", href: "/catalogo?categoria=perfume", activo: categoria === "perfume" },
    { label: "Relojes", href: "/catalogo?categoria=reloj", activo: categoria === "reloj" },
  ];

  function hrefConPagina(p: number) {
    const search = new URLSearchParams();
    if (categoria) search.set("categoria", categoria);
    if (p > 1) search.set("pagina", String(p));
    const qs = search.toString();
    return `/catalogo${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] pt-28 md:pt-32 pb-20">
      <div className="mx-auto container px-6 md:px-10">
        <SectionHeader
          eyebrow="Catálogo"
          title={
            categoria === "perfume"
              ? "Perfumes"
              : categoria === "reloj"
                ? "Relojes"
                : "Todos los productos"
          }
          subtitle="Explorá nuestra colección editorial."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {filtros.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors ${
                f.activo
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "border-neutral-300 text-neutral-500 hover:text-neutral-800 hover:border-neutral-500"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {error && (
          <p className="mt-8 text-neutral-500 text-sm">
            No se pudieron cargar los productos. Verificá que Supabase esté configurado.
          </p>
        )}

        {!error && result.data.length === 0 && (
          <p className="mt-8 text-neutral-500 text-sm">
            No hay productos disponibles en esta categoría.
          </p>
        )}

        {!error && result.data.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {result.data.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {!error && result.totalPaginas > 1 && (
          <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Paginación">
            {pagina > 1 && (
              <Link
                href={hrefConPagina(pagina - 1)}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.8} />
              </Link>
            )}
            {Array.from({ length: result.totalPaginas }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={hrefConPagina(p)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  p === pagina
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {p}
              </Link>
            ))}
            {pagina < result.totalPaginas && (
              <Link
                href={hrefConPagina(pagina + 1)}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.8} />
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}

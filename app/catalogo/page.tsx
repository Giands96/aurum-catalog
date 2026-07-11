import Link from "next/link";
import { SectionHeader } from "@/components/aura/SectionHeader";
import { ProductCard } from "@/components/aura/ProductCard";
import { getActiveProducts, getActiveProductsByCategory } from "@/lib/products";

interface Props {
  searchParams: Promise<{ categoria?: string; busqueda?: string }>;
}

export default async function CatalogoPage({ searchParams }: Props) {
  const { categoria, busqueda } = await searchParams;

  let productos: Awaited<ReturnType<typeof getActiveProducts>> = [];
  let error = false;

  try {
    if (categoria && ["perfume", "reloj"].includes(categoria)) {
      productos = await getActiveProductsByCategory(categoria);
    } else {
      productos = await getActiveProducts();
    }

    if (busqueda) {
      const q = busqueda.toLowerCase();
      productos = productos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p.marca && p.marca.toLowerCase().includes(q))
      );
    }
  } catch {
    error = true;
  }

  const filtros = [
    { label: "Todos", href: "/catalogo", activo: !categoria },
    { label: "Perfumes", href: "/catalogo?categoria=perfume", activo: categoria === "perfume" },
    { label: "Relojes", href: "/catalogo?categoria=reloj", activo: categoria === "reloj" },
  ];

  return (
    <div className="min-h-screen bg-background pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow="Catálogo"
          title={categoria === "perfume" ? "Perfumes" : categoria === "reloj" ? "Relojes" : "Todos los productos"}
          subtitle="Explorá nuestra colección editorial."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {filtros.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors ${
                f.activo
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-line text-text-secondary hover:text-text-primary hover:border-text-muted"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {error && (
          <p className="mt-8 text-text-muted text-sm">
            No se pudieron cargar los productos. Verificá que Supabase esté configurado.
          </p>
        )}

        {!error && productos.length === 0 && (
          <p className="mt-8 text-text-muted text-sm">
            No hay productos disponibles en esta categoría.
          </p>
        )}

        {!error && productos.length > 0 && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {productos.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                precioDesde={p.precio_desde ?? undefined}
                index={i}
                animate={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

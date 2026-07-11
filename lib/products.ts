import { supabase } from "./supabase";
import type { Producto, ProductoVariante, ProductoImagen } from "@/types/database";

const POR_PAGINA = 9;

export interface ProductoConPrecio extends Producto {
  precio_desde: number | null;
  imagen_mostrar: string | null;
}

async function getPrecioMinimo(productoId: string): Promise<number | null> {
  const { data } = await supabase
    .from("producto_variantes")
    .select("precio")
    .eq("producto_id", productoId)
    .eq("activo", true)
    .gt("stock", 0)
    .order("precio", { ascending: true })
    .limit(1);

  const rows = data as unknown as { precio: number }[] | null;
  return rows?.[0]?.precio ?? null;
}

async function getPrimeraImagen(productoId: string): Promise<string | null> {
  const { data } = await supabase
    .from("producto_imagenes")
    .select("url")
    .eq("producto_id", productoId)
    .order("orden", { ascending: true })
    .limit(1);

  const rows = data as unknown as { url: string }[] | null;
  return rows?.[0]?.url ?? null;
}

async function enriquecer(producto: Producto): Promise<ProductoConPrecio> {
  const [precio_desde, imgGaleria] = await Promise.all([
    getPrecioMinimo(producto.id),
    getPrimeraImagen(producto.id),
  ]);
  return {
    ...producto,
    precio_desde,
    imagen_mostrar: imgGaleria ?? producto.imagen_url,
  };
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

export async function getActiveProducts(pagina = 1) {
  const from = (pagina - 1) * POR_PAGINA;
  const to = from + POR_PAGINA - 1;

  const [{ count }, { data, error }] = await Promise.all([
    supabase
      .from("productos")
      .select("*", { count: "exact", head: true })
      .eq("activo", true),
    supabase
      .from("productos")
      .select("*")
      .eq("activo", true)
      .order("created_at", { ascending: false })
      .range(from, to),
  ]);

  if (error) throw new Error(`Error al cargar productos: ${error.message}`);

  const total = count ?? 0;
  const enriquecidos = await Promise.all(
    (data as unknown as Producto[]).map(enriquecer)
  );

  return {
    data: enriquecidos,
    total,
    pagina,
    totalPaginas: Math.max(1, Math.ceil(total / POR_PAGINA)),
  } satisfies PaginatedResult<ProductoConPrecio>;
}

export async function getActiveProductsByCategory(categoria: string, pagina = 1) {
  const from = (pagina - 1) * POR_PAGINA;
  const to = from + POR_PAGINA - 1;

  const [{ count }, { data, error }] = await Promise.all([
    supabase
      .from("productos")
      .select("*", { count: "exact", head: true })
      .eq("activo", true)
      .eq("categoria", categoria),
    supabase
      .from("productos")
      .select("*")
      .eq("activo", true)
      .eq("categoria", categoria)
      .order("created_at", { ascending: false })
      .range(from, to),
  ]);

  if (error) throw new Error(`Error al cargar productos: ${error.message}`);

  const total = count ?? 0;
  const enriquecidos = await Promise.all(
    (data as unknown as Producto[]).map(enriquecer)
  );

  return {
    data: enriquecidos,
    total,
    pagina,
    totalPaginas: Math.max(1, Math.ceil(total / POR_PAGINA)),
  } satisfies PaginatedResult<ProductoConPrecio>;
}

export async function getLatestProducts(limit = 5) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Error al carrar productos recientes: ${error.message}`);
  return Promise.all((data as unknown as Producto[]).map(enriquecer));
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("destacado", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al cargar destacados: ${error.message}`);
  return Promise.all((data as unknown as Producto[]).map(enriquecer));
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (error) return null;
  return data as unknown as Producto;
}

export async function getActiveVariantsByProduct(productoId: string) {
  const { data, error } = await supabase
    .from("producto_variantes")
    .select("*")
    .eq("producto_id", productoId)
    .eq("activo", true)
    .gt("stock", 0)
    .order("precio", { ascending: true });

  if (error) throw new Error(`Error al cargar variantes: ${error.message}`);
  return data as unknown as ProductoVariante[];
}

export async function getProductImages(productoId: string) {
  const { data, error } = await supabase
    .from("producto_imagenes")
    .select("*")
    .eq("producto_id", productoId)
    .order("orden", { ascending: true });

  if (error) throw new Error(`Error al cargar imágenes: ${error.message}`);
  return data as unknown as ProductoImagen[];
}

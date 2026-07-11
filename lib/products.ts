import { supabase } from "./supabase";
import type { Producto, ProductoVariante } from "@/types/database";

export interface ProductoConPrecio extends Producto {
  precio_desde: number | null;
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

function mapConPrecio(productos: Producto[]): Promise<ProductoConPrecio[]> {
  return Promise.all(
    productos.map(async (p) => ({
      ...p,
      precio_desde: await getPrecioMinimo(p.id),
    }))
  );
}

export async function getActiveProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al cargar productos: ${error.message}`);
  return mapConPrecio(data as unknown as Producto[]);
}

export async function getActiveProductsByCategory(categoria: string) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("categoria", categoria)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al cargar productos: ${error.message}`);
  return mapConPrecio(data as unknown as Producto[]);
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .eq("destacado", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al cargar destacados: ${error.message}`);
  return mapConPrecio(data as unknown as Producto[]);
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

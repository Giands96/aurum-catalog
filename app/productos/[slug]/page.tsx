import { getProductBySlug, getActiveVariantsByProduct } from "@/lib/products";
import { getStoreSettings } from "@/lib/settings";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;

  const producto = await getProductBySlug(slug);
  if (!producto) notFound();

  const [variantes, config] = await Promise.all([
    getActiveVariantsByProduct(producto.id),
    getStoreSettings(),
  ]);

  return (
    <ProductDetailClient
      producto={producto}
      variantes={variantes}
      whatsapp={config?.whatsapp ?? ""}
      mensaje={config?.mensaje_whatsapp ?? "Hola, quisiera consultar por este producto:\n\nProducto: {nombre}\nPresentación: {presentacion}\nPrecio: S/ {precio}\nEnlace: {url}"}
    />
  );
}

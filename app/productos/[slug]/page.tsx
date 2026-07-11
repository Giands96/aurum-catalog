import { getProductBySlug, getActiveVariantsByProduct, getProductImages, getLatestProducts } from "@/lib/products";
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

  const [variantes, imagenes, config, ultimos] = await Promise.all([
    getActiveVariantsByProduct(producto.id),
    getProductImages(producto.id),
    getStoreSettings(),
    getLatestProducts(5),
  ]);

  const relacionados = ultimos.filter((p) => p.id !== producto.id).slice(0, 5);

  return (
    <ProductDetailClient
      producto={producto}
      variantes={variantes}
      imagenes={imagenes}
      whatsapp={config?.whatsapp ?? ""}
      mensaje={config?.mensaje_whatsapp ?? "Hola, quisiera consultar por este producto:\n\nProducto: {nombre}\nPresentación: {presentacion}\nPrecio: S/ {precio}\nEnlace: {url}"}
      relacionados={relacionados}
    />
  );
}

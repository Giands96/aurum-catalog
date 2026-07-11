interface WhatsAppParams {
  phone: string;
  message: string;
}

export function generateWhatsAppUrl({ phone, message }: WhatsAppParams): string {
  const cleaned = phone.replace(/\D/g, "");
  return `https://api.whatsapp.com/send?phone=${cleaned}&text=${encodeURIComponent(message)}`;
}

export function buildProductMessage(
  template: string,
  params: { nombre: string; presentacion: string; precio: string; url: string }
): string {
  return template
    .replace(/{nombre}/g, params.nombre)
    .replace(/{presentacion}/g, params.presentacion)
    .replace(/{precio}/g, params.precio)
    .replace(/{url}/g, params.url);
}

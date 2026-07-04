export const siteConfig = {
  name: "Suplementos Point",
  displayName: "SUPLEMENTOS Y ACCESORIOS",
  fullName: "Suplementos & Accesorios",
  tagline: "Impulsa tu rendimiento al máximo",
  brandLine: "Gold Nutrition",
  description:
    "Suplementos, accesorios y nutrición deportiva en Marcos Juárez y Leones, Córdoba. Chusmeá el catálogo por WhatsApp y recibí asesoramiento personalizado.",
  bio: [
    "Impulsa tu rendimiento al máximo",
    "Chusmeá el catálogo en WhatsApp",
    "San Martín 848 — MsJz.",
    "Leones — @tipsysuplementos.ar",
  ],
  brands: ["Gold Nutrition", "ENA", "Star Nutrition", "DeporAr"],
  instagram: {
    url: "https://www.instagram.com/suplementospoint/",
    handle: "@suplementospoint",
    dmUrl: "https://ig.me/m/suplementospoint",
  },
  instagramLeones: {
    url: "https://www.instagram.com/tipsysuplementos.ar/",
    handle: "@tipsysuplementos.ar",
    dmUrl: "https://ig.me/m/tipsysuplementos.ar",
  },
  contact: {
    whatsappUrl: "https://wa.me/3472620754",
    whatsappLabel: "Chusmeá el catálogo en WhatsApp",
    mainAddress: "San Martín 848, MsJz., Córdoba",
    leonesAddress: "Sarmiento 1142, Leones, Córdoba",
  },
} as const;

export function getWhatsAppProductUrl(productName: string) {
  const text = encodeURIComponent(`Hola! Quería consultar por el producto: ${productName}`);
  return `${siteConfig.contact.whatsappUrl}?text=${text}`;
}

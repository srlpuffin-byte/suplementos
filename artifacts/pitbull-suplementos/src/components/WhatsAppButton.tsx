import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/data/siteConfig";

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label={siteConfig.contact.whatsappLabel}
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
}

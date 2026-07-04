import { FaInstagram } from "react-icons/fa";
import { Link } from "wouter";
import { siteConfig } from "@/data/siteConfig";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 mt-auto border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-800 pb-8 mb-8 gap-6">
          <BrandMark logoSize={56} />
          <div className="flex flex-col gap-1 text-sm text-zinc-400 max-w-md">
            {siteConfig.bio.slice(0, 2).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-heading text-xl mb-4 text-primary">Navegación</h4>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Productos</Link></li>
              <li><Link href="/sucursales" className="hover:text-white transition-colors">Sucursales</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-4 text-primary">Locales</h4>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li>{siteConfig.contact.mainAddress}</li>
              <li>{siteConfig.contact.leonesAddress}</li>
              <li className="pt-2">
                <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {siteConfig.contact.whatsappLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-4 text-primary">Instagram</h4>
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center shrink-0">
                  <FaInstagram className="w-5 h-5" />
                </span>
                {siteConfig.instagram.handle}
              </a>
              <a
                href={siteConfig.instagramLeones.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors shrink-0">
                  <FaInstagram className="w-5 h-5" />
                </span>
                {siteConfig.instagramLeones.handle} — Leones
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-500 pt-6 border-t border-zinc-800">
          <p>&copy; {new Date().getFullYear()} Suplementos POINT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

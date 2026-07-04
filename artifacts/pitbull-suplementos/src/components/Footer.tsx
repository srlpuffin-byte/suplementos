import { FaInstagram } from "react-icons/fa";
import { Link } from "wouter";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-800 pb-8 mb-8 gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl mb-1">Newsletter</h3>
            <p className="text-zinc-400 text-sm">Registrate y recibí nuestras ofertas.</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white text-black px-4 py-2 w-full outline-none min-w-[200px]"
            />
            <button className="bg-primary text-black font-bold px-6 py-2 uppercase hover:bg-yellow-500 transition-colors">
              Enviar
            </button>
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
            <h4 className="font-heading text-xl mb-4 text-primary">Contáctanos</h4>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li>
                <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {siteConfig.contact.whatsappLabel}
                </a>
              </li>
              <li className="mt-2 text-xs">{siteConfig.contact.mainAddress}</li>
              <li className="text-xs">{siteConfig.contact.leonesAddress}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-4 text-primary">Redes Sociales</h4>
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center hover:bg-primary hover:text-black transition-colors shrink-0">
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
                <span className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center hover:bg-primary hover:text-black transition-colors shrink-0">
                  <FaInstagram className="w-5 h-5" />
                </span>
                {siteConfig.instagramLeones.handle} — Leones
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-500 pt-6 border-t border-zinc-800">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

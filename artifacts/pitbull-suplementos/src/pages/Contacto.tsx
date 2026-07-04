import { Link } from "wouter";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/data/siteConfig";

export default function Contacto() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: "Mensaje enviado correctamente",
        description: "Nos contactaremos con vos a la brevedad.",
        className: "bg-green-500 text-white border-none",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
      <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-black">Inicio</Link>
        <span>&gt;</span>
        <span className="text-black font-medium">Contacto</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl uppercase inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-primary">
          Contacto
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{siteConfig.tagline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-20">
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="font-heading text-2xl uppercase mb-6">Información de contacto</h2>
            <p className="text-gray-600 mb-8">
              Chusmeá el catálogo por WhatsApp o seguinos en Instagram. Nuestro equipo está listo para ayudarte a elegir el mejor suplemento para tus objetivos.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <FaWhatsapp className="w-6 h-6 text-gray-700 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">WhatsApp</p>
                <p className="font-medium text-lg">{siteConfig.contact.whatsappLabel}</p>
              </div>
            </a>

            <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm group-hover:bg-primary group-hover:text-black transition-colors">
                <FaInstagram className="w-6 h-6 text-gray-700 group-hover:text-black" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Instagram</p>
                <p className="font-medium">{siteConfig.instagram.handle}</p>
              </div>
            </a>

            <a href={siteConfig.instagramLeones.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm group-hover:bg-primary group-hover:text-black transition-colors">
                <FaInstagram className="w-6 h-6 text-gray-700 group-hover:text-black" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Instagram Leones</p>
                <p className="font-medium">{siteConfig.instagramLeones.handle}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-sm group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                <FaMapMarkerAlt className="w-6 h-6 text-gray-700 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Locales</p>
                <p className="font-medium">{siteConfig.contact.mainAddress}</p>
                <p className="font-medium mt-2">{siteConfig.contact.leonesAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-[#f9f9f9] p-8 md:p-10 rounded-sm border border-border">
          <h2 className="font-heading text-2xl uppercase mb-6">Dejanos tu mensaje</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido *</label>
              <input 
                type="text" 
                id="name" 
                required 
                placeholder="ej.: Maria Perez"
                className="w-full border border-input rounded-sm px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="ej.: tuemail@email.com"
                  className="w-full border border-input rounded-sm px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="ej.: 1123445567"
                  className="w-full border border-input rounded-sm px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
              <textarea 
                id="message" 
                required 
                rows={5}
                placeholder="ej.: Tu mensaje"
                className="w-full border border-input rounded-sm px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-black text-white font-bold py-4 rounded-sm hover:bg-primary hover:text-black transition-colors uppercase tracking-widest mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

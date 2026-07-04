import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Dumbbell, Zap, RefreshCcw, Flame, FlameKindling, Leaf, Package, MapPin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  
  const categories = [
    { name: "Proteína", icon: <Dumbbell className="w-5 h-5" /> },
    { name: "Creatina", icon: <Zap className="w-5 h-5" /> },
    { name: "EEAs & BCAAs", icon: <RefreshCcw className="w-5 h-5" /> },
    { name: "Pre Entreno", icon: <Flame className="w-5 h-5" /> },
    { name: "Quemador", icon: <FlameKindling className="w-5 h-5" /> },
    { name: "Bienestar", icon: <Leaf className="w-5 h-5" /> },
    { name: "Combos", icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />

      {/* Bio estilo Instagram */}
      <section className="bg-black text-white border-b border-zinc-800">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-3 text-sm md:text-base">
            {siteConfig.bio.map((line, i) => (
              <p key={line} className={`flex items-start gap-3 ${i === 0 ? 'font-heading text-lg md:text-xl text-primary uppercase' : 'text-zinc-300'}`}>
                <span className="shrink-0 w-5 text-center text-primary">
                  {i === 0 ? '✊' : i === 1 ? '⚡' : '📍'}
                </span>
                {line}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:opacity-90 transition-opacity"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-black text-xs font-bold uppercase tracking-wider px-4 py-2 hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                {siteConfig.instagram.handle}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas del local */}
      <section className="py-10 bg-primary border-b border-black/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-black/60 text-xs uppercase tracking-[0.25em] mb-4 font-bold">Trabajamos con</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {siteConfig.brands.map((brand) => (
              <span
                key={brand}
                className="bg-black text-primary font-heading text-lg md:text-xl uppercase px-5 py-2 tracking-wider"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-zinc-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={cat.name}
              >
                <Link 
                  href="/productos" 
                  className="flex items-center gap-2 bg-white border-2 border-black px-6 py-3 rounded-full hover:bg-primary hover:border-primary transition-all group cursor-pointer text-black"
                >
                  <span className="group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-heading uppercase tracking-wide font-bold">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl uppercase inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-primary">
              Destacados
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/productos" 
              className="inline-block border-2 border-black text-black font-bold px-10 py-3 rounded-sm hover:bg-black hover:text-primary transition-colors uppercase tracking-widest text-sm"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-primary py-16 text-black text-center border-t-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-5xl md:text-6xl uppercase mb-4">{siteConfig.tagline}</h2>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto text-lg flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 shrink-0" />
            {siteConfig.contact.mainAddress} · {siteConfig.contact.leonesAddress}
          </p>
          <a 
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-primary font-bold px-10 py-4 rounded-sm hover:bg-zinc-900 transition-colors uppercase tracking-widest"
          >
            Chusmeá el catálogo en WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

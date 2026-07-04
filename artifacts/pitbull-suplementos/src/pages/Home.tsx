import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Dumbbell, Zap, RefreshCcw, Flame, FlameKindling, Leaf, Package } from "lucide-react";

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
                  className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-primary hover:shadow-md transition-all group cursor-pointer text-black"
                >
                  <span className="group-hover:scale-110 transition-transform group-hover:text-primary">{cat.icon}</span>
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
              className="inline-block border-2 border-black text-black font-bold px-10 py-3 rounded-sm hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-black py-16 text-white text-center border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-5xl md:text-6xl uppercase mb-4">{siteConfig.tagline}</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto text-lg">
            {siteConfig.description}
          </p>
          <a 
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white font-bold px-10 py-4 rounded-sm hover:bg-green-500 transition-colors uppercase tracking-widest"
          >
            Chusmeá el catálogo en WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

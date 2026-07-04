import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { BrandMark } from '@/components/BrandMark';
import { siteConfig } from '@/data/siteConfig';

type SlideVariant = 'yellow' | 'dark';

interface Slide {
  id: number;
  variant: SlideVariant;
  image?: string;
  content: React.ReactNode;
}

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    
    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  const slides: Slide[] = [
    {
      id: 1,
      variant: 'yellow',
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 text-center z-10">
          <BrandMark logoSize={88} variant="light" stacked className="mb-6" />
          <h1 className="font-heading text-4xl md:text-6xl uppercase leading-none text-black mb-3">
            {siteConfig.tagline}
          </h1>
          <p className="text-black/70 text-sm md:text-base uppercase tracking-[0.2em] mb-8">
            {siteConfig.fullName}
          </p>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-primary font-bold px-8 py-3 rounded-sm hover:bg-zinc-900 transition-colors uppercase tracking-widest text-sm border-2 border-black"
          >
            Chusmeá el catálogo en WhatsApp
          </a>
        </div>
      ),
    },
    {
      id: 2,
      variant: 'dark',
      image: '/slide2-hero.jpg',
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 text-center z-10">
          <p className="text-primary font-heading text-2xl md:text-3xl uppercase tracking-[0.3em] mb-4">Marcas destacadas</p>
          <h2 className="text-white font-heading text-5xl md:text-[80px] uppercase leading-none mb-6">
            GOLD NUTRITION<br/>
            <span className="text-primary">ENA · STAR · DEPORAR</span>
          </h2>
          <Link href="/productos" className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm">
            Ver productos
          </Link>
        </div>
      ),
    },
    {
      id: 3,
      variant: 'dark',
      image: '/slide3-hero.jpg',
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 z-10 text-center">
          <h2 className="text-white font-heading text-5xl md:text-[80px] uppercase leading-none mb-4">
            MARCOS JUÁREZ <span className="text-primary">&</span> LEONES
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-2">{siteConfig.contact.mainAddress}</p>
          <p className="text-zinc-400 text-base mb-8">{siteConfig.instagramLeones.handle} — Leones</p>
          <Link href="/sucursales" className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm">
            Ver sucursales
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="relative group overflow-hidden bg-black">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[480px] md:h-[560px]">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full flex items-center">
              <div className="absolute inset-0 z-0">
                {slide.variant === 'yellow' ? (
                  <div className="absolute inset-0 bg-primary" />
                ) : (
                  <>
                    <img 
                      src={slide.image} 
                      alt="" 
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/1920x800/111111/333333?text=Slide+${slide.id}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
                  </>
                )}
              </div>
              
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black z-20"
        onClick={scrollPrev}
        aria-label="Anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black z-20"
        onClick={scrollNext}
        aria-label="Siguiente"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-primary' : 'bg-white/50 hover:bg-white'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

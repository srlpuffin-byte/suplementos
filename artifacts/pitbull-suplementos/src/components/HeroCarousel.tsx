import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

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
    
    // Autoplay
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    
    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  const slides = [
    {
      id: 1,
      image: '/slide1-hero.jpg',
      content: (
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl mx-auto px-4">
          <div className="md:w-1/2 text-left z-10">
            <h1 className="flex flex-col uppercase leading-none">
              <span className="text-white font-heading text-5xl md:text-[70px]">IMPULSÁ TU</span>
              <span className="text-primary font-heading text-7xl md:text-[90px] font-black tracking-wide -mt-2">RENDIMIENTO</span>
              <span className="text-white font-heading text-4xl md:text-[50px] -mt-1">AL MÁXIMO</span>
            </h1>
            <Link href="/productos" className="inline-block mt-8 bg-primary text-black font-bold px-8 py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm">
              Ver Catálogo
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end">
          </div>
        </div>
      )
    },
    {
      id: 2,
      image: '/slide2-hero.jpg',
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 text-center z-10">
          <h2 className="text-white font-heading text-5xl md:text-[80px] uppercase leading-none mb-6">
            GOLD NUTRITION<br/>
            <span className="text-primary">SUPLEMENTOS & ACCESORIOS</span>
          </h2>
          <Link href="/productos" className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm">
            Comprar Ahora
          </Link>
        </div>
      )
    },
    {
      id: 3,
      image: '/slide3-hero.jpg',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 z-10">
           <div className="text-center">
            <h2 className="text-white font-heading text-6xl md:text-[90px] uppercase leading-none mb-4">
              MARCOS JUÁREZ <span className="text-primary">&</span> LEONES
            </h2>
            <p className="text-white text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
              Dos locales en Córdoba para asesorarte y equiparte.
            </p>
            <Link href="/sucursales" className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm">
              Ver Sucursales
            </Link>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative group overflow-hidden bg-[#0a0a0a]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[500px] md:h-[630px]">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full flex items-center">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.image} 
                  alt="Slide background" 
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => {
                    // Fallback if image not generated yet
                    (e.target as HTMLImageElement).src = `https://placehold.co/1920x800/111111/333333?text=Slide+${slide.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              {/* Content */}
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black z-20"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black z-20"
        onClick={scrollNext}
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-primary' : 'bg-white/50 hover:bg-white'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

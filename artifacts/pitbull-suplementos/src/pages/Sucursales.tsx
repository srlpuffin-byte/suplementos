import { Link } from "wouter";
import { branches } from "@/data/branches";
import { MapPin, Clock } from "lucide-react";

export default function Sucursales() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-black">Inicio</Link>
        <span>&gt;</span>
        <span className="text-black font-medium">Sucursales</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl uppercase inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-primary">
          Nuestras Sucursales
        </h1>
        <p className="mt-8 text-gray-600">Visitá nuestros locales y recibí asesoramiento personalizado.</p>
      </div>

      <div className="flex flex-col gap-6">
        {branches.map(branch => (
          <div 
            key={branch.id} 
            className="border border-border p-6 md:p-8 rounded-sm hover:border-primary hover:shadow-md transition-all bg-white"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
              <h2 className="font-heading text-2xl uppercase font-bold text-black flex items-center gap-3">
                {branch.name}
                {branch.isPickupAvailable && (
                  <span className="bg-primary text-black text-xs px-2 py-1 font-sans rounded-sm font-bold tracking-wider">
                    HABILITADA PARA RETIRO
                  </span>
                )}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="font-medium text-lg">{branch.address}</p>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p>{branch.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-zinc-50 p-8 text-center rounded-sm border border-border">
        <h3 className="font-heading text-2xl uppercase mb-2">¿Querés que tu pedido llegue a tu casa?</h3>
        <p className="text-gray-600 mb-6">Realizamos envíos a todo el país a través de Andreani.</p>
        <Link href="/productos" className="inline-block bg-black text-white font-bold px-8 py-3 rounded-sm hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm">
          Comprar Online
        </Link>
      </div>
    </div>
  );
}

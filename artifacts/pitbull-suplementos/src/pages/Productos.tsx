import { useState } from "react";
import { Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ChevronDown, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Productos() {
  const [selectedSort, setSelectedSort] = useState("Relevancia");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "Proteína", "Creatina", "EEAs & BCAAs", "Pre Entreno", 
    "Quemador", "Bienestar", "OFERTA DE LA SEMANA", "Combos"
  ];

  const flavors = [
    { name: "Acai", count: 2 },
    { name: "Banana", count: 2 },
    { name: "Blue Lemon", count: 1 },
    { name: "Blue Raz", count: 1 },
    { name: "Blueberry Lemonade", count: 1 },
    { name: "Cherry", count: 1 },
    { name: "Chocolate", count: 12 },
    { name: "Frambuesa", count: 2 },
    { name: "Frutilla", count: 3 },
    { name: "Natural", count: 3 },
    { name: "S/Sabor", count: 4 },
    { name: "Vainilla", count: 5 },
  ];

  const filteredProducts = selectedCategory
    ? products.filter(p => 
        selectedCategory === "OFERTA DE LA SEMANA" 
          ? p.discountBadge 
          : p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Categorías */}
      <div>
        <h3 className="font-heading text-xl uppercase mb-4 border-b border-border pb-2">Categorías</h3>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`transition-all text-sm w-full text-left ${selectedCategory === null ? 'text-black font-bold' : 'text-muted-foreground hover:text-black'}`}
            >
              Todas las categorías
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat}>
              <button 
                onClick={() => setSelectedCategory(cat)}
                className={`transition-all text-sm w-full text-left ${selectedCategory === cat ? 'text-black font-bold' : 'text-muted-foreground hover:text-black'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sabores */}
      <div>
        <h3 className="font-heading text-xl uppercase mb-4 border-b border-border pb-2">Sabor</h3>
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {flavors.map(flavor => (
            <li key={flavor.name} className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id={`flavor-${flavor.name}`}
                className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary accent-primary"
              />
              <label htmlFor={`flavor-${flavor.name}`} className="text-sm text-gray-700 flex-1 cursor-pointer">
                {flavor.name}
              </label>
              <span className="text-xs text-gray-400">({flavor.count})</span>
            </li>
          ))}
        </ul>
        <button className="text-primary text-sm font-semibold mt-2 hover:underline">
          Ver más +
        </button>
      </div>

      {/* Precio */}
      <div>
        <h3 className="font-heading text-xl uppercase mb-4 border-b border-border pb-2">Precio</h3>
        <div className="flex gap-2 items-center">
          <input type="number" placeholder="$ Min" className="w-full border border-input rounded-sm px-2 py-1 text-sm outline-none focus:border-primary" />
          <span>-</span>
          <input type="number" placeholder="$ Max" className="w-full border border-input rounded-sm px-2 py-1 text-sm outline-none focus:border-primary" />
          <button className="bg-black text-white px-3 py-1 rounded-sm text-sm hover:bg-primary hover:text-black transition-colors">→</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-black">Inicio</Link>
        <span>&gt;</span>
        <span className="text-black font-medium">Productos {selectedCategory && `> ${selectedCategory}`}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-[#f9f9f9] p-6 rounded-sm border border-border sticky top-24">
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-border pb-4">
            <h1 className="font-heading text-4xl uppercase">
              {selectedCategory || "Todos los Productos"}
            </h1>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <div className="mt-6">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 ml-auto">
                <label className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</label>
                <div className="relative">
                  <select 
                    className="appearance-none border border-input bg-white py-2 pl-3 pr-8 rounded-sm text-sm outline-none focus:border-primary"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                  >
                    <option>Relevancia</option>
                    <option>Precio: menor a mayor</option>
                    <option>Precio: mayor a menor</option>
                    <option>Nombre: A-Z</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No se encontraron productos para esta categoría.
            </div>
          )}

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="bg-black text-white font-bold px-10 py-3 rounded-sm hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm">
                Cargar más productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

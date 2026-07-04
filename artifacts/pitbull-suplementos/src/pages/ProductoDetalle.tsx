import { useParams, Link, useLocation } from "wouter";
import { 
  useGetProduct, 
  getGetProductQueryKey, 
  useListProducts, 
  getListProductsQueryKey 
} from "@workspace/api-client-react";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/data/products";
import { getWhatsAppProductUrl } from "@/data/siteConfig";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Dumbbell, ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function ProductoDetalle() {
  const params = useParams();
  const id = Number(params.id);
  const [, setLocation] = useLocation();

  const { data: product, isLoading, isError } = useGetProduct(id, { 
    query: { 
      enabled: !!id, 
      queryKey: getGetProductQueryKey(id) 
    } 
  });

  const { data: relatedProducts = [] } = useListProducts(
    { category: product?.category },
    { 
      query: { 
        enabled: !!product?.category,
        queryKey: getListProductsQueryKey({ category: product?.category }) 
      } 
    }
  );

  const filteredRelated = relatedProducts.filter(p => p.id !== id).slice(0, 4);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-gray-200 aspect-square rounded-sm"></div>
          <div className="md:w-1/2 space-y-4 pt-4">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-16 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-4xl mb-4">Producto no encontrado</h1>
        <p className="text-muted-foreground mb-8">El producto que estás buscando no existe o fue removido.</p>
        <Link href="/productos" className="bg-black text-white px-8 py-3 uppercase font-bold text-sm tracking-wider hover:bg-primary hover:text-black transition-colors">
          Volver a Productos
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[currentImageIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/productos" className="text-sm text-gray-500 hover:text-black mb-2 inline-block">
          &larr; Volver a Productos
        </Link>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-black">Inicio</Link>
          <span>&gt;</span>
          <Link href="/productos" className="hover:text-black">Productos</Link>
          <span>&gt;</span>
          <span className="text-black font-medium">{product.name}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
        {/* Left Column - Images */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="aspect-square bg-white border border-gray-100 rounded-sm relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentImage ? (
                <motion.img
                  key={currentImageIndex}
                  src={currentImage}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain p-4 mix-blend-multiply"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full bg-gray-50">
                  <Pill className="w-16 h-16 mb-2" />
                  <span className="text-sm uppercase tracking-widest font-heading">Sin imagen</span>
                </div>
              )}
            </AnimatePresence>
            
            {product.discountBadge && (
              <div className="absolute top-4 left-4 bg-[#e53e3e] text-white text-sm font-bold px-3 py-1 z-10 shadow-sm">
                {product.discountBadge}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 flex-shrink-0 border-2 rounded-sm overflow-hidden bg-white p-1 transition-colors ${
                    idx === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Info */}
        <div className="md:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 uppercase rounded-sm inline-block">
              {product.category}
            </span>
          </div>
          
          <h1 className="font-heading text-4xl lg:text-5xl leading-[0.9] uppercase mb-4 text-black">
            {product.name}
          </h1>

          <div className="mb-6">
            {product.originalPrice && (
              <div className="text-muted-foreground text-lg line-through mb-1">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-4xl font-bold text-black tracking-tight">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Stock Indicator */}
          <div className="mb-6 flex items-center gap-2 text-sm font-medium">
            {product.stock > 10 ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-green-700">En stock ({product.stock} unidades)</span>
              </>
            ) : product.stock > 0 ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                <span className="text-orange-700">Pocas unidades ({product.stock} disponibles)</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <span className="text-red-700">Sin stock</span>
              </>
            )}
          </div>

          {product.flavor && (
            <div className="mb-6 flex gap-2 items-center">
              <span className="text-sm font-bold text-gray-700 uppercase">Sabor:</span>
              <span className="bg-gray-100 px-3 py-1 text-sm rounded-sm">{product.flavor}</span>
            </div>
          )}

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {product.description && (
            <div className="prose prose-sm prose-gray mb-8 max-w-none">
              <p className="text-[15px] text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <button 
              disabled={product.stock === 0}
              className={`w-full py-4 px-6 font-heading text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                product.stock === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-primary hover:text-black border-2 border-transparent hover:border-black'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </button>
            
            <a 
              href={getWhatsAppProductUrl(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-[#25D366] transition-colors py-2"
            >
              <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {filteredRelated.length > 0 && (
        <div className="border-t border-gray-200 pt-16 mt-8">
          <h2 className="font-heading text-3xl uppercase mb-8 text-center">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRelated.map(related => (
              <ProductCard key={related.id} product={{
                id: String(related.id),
                name: related.name,
                price: related.price,
                originalPrice: related.originalPrice || undefined,
                discountBadge: related.discountBadge || undefined,
                category: related.category,
                flavor: related.flavor || undefined,
                imageUrl: related.images?.[0]
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

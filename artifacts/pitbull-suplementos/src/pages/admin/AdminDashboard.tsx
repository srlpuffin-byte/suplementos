import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  useAdminCheck,
  getAdminCheckQueryKey,
  useListProducts, 
  useUpdateProduct, 
  useDeleteProduct,
  getListProductsQueryKey
} from "@workspace/api-client-react";
import { useAdminToken } from "@/hooks/useAdminToken";
import { useQueryClient } from "@tanstack/react-query";
import { formatPrice } from "@/data/products";
import { 
  Dumbbell, 
  Package, 
  Plus, 
  LogOut, 
  Edit, 
  Trash2, 
  AlertCircle,
  Star,
  CheckCircle2,
  XCircle,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
  const { token, setToken } = useAdminToken();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [editStockValue, setEditStockValue] = useState<string>("");

  const { data: authStatus, isLoading: isAuthLoading, isError: isAuthError } = useAdminCheck({
    query: {
      enabled: !!token,
      retry: false,
      queryKey: getAdminCheckQueryKey(),
    }
  });

  useEffect(() => {
    if (!token || isAuthError || (authStatus && !authStatus.authenticated)) {
      setLocation("/admin/login");
    }
  }, [token, authStatus, isAuthError, setLocation]);

  const { data: products = [], isLoading: isProductsLoading } = useListProducts({ active: false }, {
    query: {
      enabled: !!authStatus?.authenticated,
      queryKey: getListProductsQueryKey({ active: false }),
    }
  });

  const updateMutation = useUpdateProduct({
    mutation: {
      onSuccess: (updatedProduct) => {
        toast({ title: "Producto actualizado", description: "El stock se actualizó correctamente." });
        queryClient.setQueryData(getListProductsQueryKey({ active: false }), (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((p: any) => p.id === updatedProduct.id ? updatedProduct : p);
        });
        setEditingStockId(null);
      },
      onError: () => {
        toast({ title: "Error", description: "No se pudo actualizar el producto.", variant: "destructive" });
      }
    }
  });

  const deleteMutation = useDeleteProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: "Producto eliminado", description: "El producto ha sido eliminado del catálogo." });
        queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({ active: false }) });
        setDeleteId(null);
      },
      onError: () => {
        toast({ title: "Error", description: "No se pudo eliminar el producto.", variant: "destructive" });
        setDeleteId(null);
      }
    }
  });

  const handleLogout = () => {
    setToken(null);
  };

  const handleStockEditSubmit = (id: number) => {
    const stock = parseInt(editStockValue);
    if (isNaN(stock) || stock < 0) {
      toast({ title: "Stock inválido", description: "Ingrese un número válido.", variant: "destructive" });
      return;
    }
    updateMutation.mutate({ id, data: { stock } });
  };

  const toggleProductStatus = (id: number, currentStatus: boolean) => {
    updateMutation.mutate({ id, data: { active: !currentStatus } });
  };

  const toggleProductFeatured = (id: number, currentFeatured: boolean) => {
    updateMutation.mutate({ id, data: { featured: !currentFeatured } });
  };

  if (isAuthLoading || !authStatus?.authenticated) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>;
  }

  // Stats
  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const featuredCount = products.filter(p => p.featured).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1a1a1a] text-white flex flex-col md:min-h-screen flex-shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-[#333]">
          <Dumbbell className="w-8 h-8 text-primary" />
          <span className="font-heading text-xl uppercase tracking-widest">Admin</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#333] text-primary rounded-sm font-medium transition-colors">
            <Package className="w-5 h-5" />
            Productos
          </Link>
          <Link href="/admin/productos/nuevo" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#222] rounded-sm font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </Link>
        </nav>

        <div className="p-4 border-t border-[#333]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-[#222] rounded-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-heading uppercase text-gray-900">Panel de Control</h1>
          <Link href="/admin/productos/nuevo" className="bg-primary text-black font-bold px-6 py-2 rounded-sm hover:bg-[#e0b00c] transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Agregar Producto
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
            <div className="text-gray-500 text-sm font-medium uppercase mb-1">Total Productos</div>
            <div className="text-3xl font-bold">{totalProducts}</div>
          </div>
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm border-b-4 border-b-green-500">
            <div className="text-gray-500 text-sm font-medium uppercase mb-1">En Stock</div>
            <div className="text-3xl font-bold">{inStock}</div>
          </div>
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm border-b-4 border-b-red-500">
            <div className="text-gray-500 text-sm font-medium uppercase mb-1">Sin Stock</div>
            <div className="text-3xl font-bold">{outOfStock}</div>
          </div>
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm border-b-4 border-b-primary">
            <div className="text-gray-500 text-sm font-medium uppercase mb-1">Destacados</div>
            <div className="text-3xl font-bold">{featuredCount}</div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Imagen</th>
                  <th className="p-4 font-medium">Nombre</th>
                  <th className="p-4 font-medium">Categoría</th>
                  <th className="p-4 font-medium">Precio</th>
                  <th className="p-4 font-medium w-32">Stock</th>
                  <th className="p-4 font-medium text-center">Destacado</th>
                  <th className="p-4 font-medium text-center">Activo</th>
                  <th className="p-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isProductsLoading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-500">Cargando productos...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-500">No hay productos en el catálogo.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4">
                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                          ) : (
                            <Package className="w-6 h-6 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-900 line-clamp-1">{product.name}</div>
                        {product.flavor && <div className="text-xs text-gray-500 mt-1">Sabor: {product.flavor}</div>}
                      </td>
                      <td className="p-4">
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-sm uppercase font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium">
                        {formatPrice(product.price)}
                      </td>
                      <td className="p-4">
                        {editingStockId === product.id ? (
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              className="w-16 border border-gray-300 rounded-sm px-2 py-1 text-sm focus:border-primary outline-none"
                              value={editStockValue}
                              onChange={(e) => setEditStockValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleStockEditSubmit(product.id);
                                if (e.key === 'Escape') setEditingStockId(null);
                              }}
                              autoFocus
                            />
                            <button 
                              onClick={() => handleStockEditSubmit(product.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded-sm"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setEditingStockId(null)}
                              className="p-1 text-gray-400 hover:bg-gray-200 rounded-sm"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="flex items-center gap-2 cursor-pointer group/stock"
                            onClick={() => {
                              setEditingStockId(product.id);
                              setEditStockValue(product.stock.toString());
                            }}
                          >
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                              product.stock > 10 ? 'bg-green-500' : 
                              product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                            }`}></span>
                            <span className="font-medium group-hover/stock:underline">{product.stock}</span>
                            <Edit className="w-3 h-3 text-gray-300 opacity-0 group-hover/stock:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => toggleProductFeatured(product.id, product.featured)}
                          className={`p-1 rounded-full transition-colors ${product.featured ? 'text-primary' : 'text-gray-300 hover:text-gray-400'}`}
                        >
                          <Star className="w-5 h-5" fill={product.featured ? "currentColor" : "none"} />
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => toggleProductStatus(product.id, product.active)}
                          className={`transition-colors ${product.active ? 'text-green-500' : 'text-gray-300'}`}
                        >
                          {product.active ? <CheckCircle2 className="w-6 h-6 mx-auto" /> : <XCircle className="w-6 h-6 mx-auto" />}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/productos/${product.id}/editar`} className="p-2 text-gray-500 hover:text-primary hover:bg-yellow-50 rounded-sm transition-colors">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => setDeleteId(product.id)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente de la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

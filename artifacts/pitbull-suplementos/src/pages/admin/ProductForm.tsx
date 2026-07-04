import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "wouter";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useAdminCheck,
  getAdminCheckQueryKey,
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
  getListProductsQueryKey,
  getGetProductQueryKey
} from "@workspace/api-client-react";
import { useAdminToken } from "@/hooks/useAdminToken";
import { useQueryClient } from "@tanstack/react-query";
import { Dumbbell, ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  category: z.string().min(1, "La categoría es requerida"),
  flavor: z.string().optional(),
  price: z.coerce.number().min(0, "El precio debe ser un número positivo"),
  originalPrice: z.coerce.number().optional().or(z.literal(0)),
  discountBadge: z.string().optional(),
  stock: z.coerce.number().min(0, "El stock debe ser un número positivo"),
  images: z.array(
    z.object({
      url: z.string().url("Debe ser una URL válida").or(z.literal(""))
    })
  ).optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

const CATEGORIES = [
  "Proteína", "Creatina", "EEAs & BCAAs", "Pre Entreno", 
  "Quemador", "Bienestar", "OFERTA DE LA SEMANA", "Combos"
];

export default function ProductForm() {
  const { token } = useAdminToken();
  const [, setLocation] = useLocation();
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isEdit = !!params.id && params.id !== "nuevo";
  const productId = isEdit ? Number(params.id) : undefined;

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

  const { data: product, isLoading: isProductLoading } = useGetProduct(productId as number, {
    query: {
      enabled: isEdit,
      queryKey: getGetProductQueryKey(productId as number)
    }
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      flavor: "",
      price: 0,
      originalPrice: 0,
      discountBadge: "",
      stock: 0,
      images: [{ url: "" }],
      featured: false,
      active: true,
    }
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images"
  });

  useEffect(() => {
    if (product && isEdit) {
      form.reset({
        name: product.name,
        description: product.description || "",
        category: product.category,
        flavor: product.flavor || "",
        price: product.price,
        originalPrice: product.originalPrice || 0,
        discountBadge: product.discountBadge || "",
        stock: product.stock,
        images: product.images?.length ? product.images.map(url => ({ url })) : [{ url: "" }],
        featured: product.featured,
        active: product.active,
      });
    }
  }, [product, isEdit, form]);

  const createMutation = useCreateProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: "Producto creado", description: "El producto ha sido guardado exitosamente." });
        queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({ active: false }) });
        setLocation("/admin");
      },
      onError: () => {
        toast({ title: "Error", description: "No se pudo crear el producto.", variant: "destructive" });
      }
    }
  });

  const updateMutation = useUpdateProduct({
    mutation: {
      onSuccess: () => {
        toast({ title: "Producto actualizado", description: "Los cambios han sido guardados." });
        queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({ active: false }) });
        if (productId) {
          queryClient.invalidateQueries({ queryKey: getGetProductQueryKey(productId) });
        }
        setLocation("/admin");
      },
      onError: () => {
        toast({ title: "Error", description: "No se pudo actualizar el producto.", variant: "destructive" });
      }
    }
  });

  const onSubmit = (data: ProductFormValues) => {
    // Transform data for API
    const apiData = {
      ...data,
      originalPrice: data.originalPrice === 0 ? undefined : data.originalPrice,
      images: data.images?.map(img => img.url).filter(url => url.trim() !== ""),
    };

    if (isEdit && productId) {
      updateMutation.mutate({ id: productId, data: apiData });
    } else {
      createMutation.mutate({ data: apiData });
    }
  };

  if (isAuthLoading || !authStatus?.authenticated || (isEdit && isProductLoading)) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>;
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1a1a1a] text-white flex flex-col flex-shrink-0 md:min-h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-[#333]">
          <Dumbbell className="w-8 h-8 text-primary" />
          <span className="font-heading text-xl uppercase tracking-widest">Admin</span>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#222] rounded-sm font-medium transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a Productos
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-heading uppercase text-gray-900">
              {isEdit ? "Editar Producto" : "Nuevo Producto"}
            </h1>
          </div>

          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-6 md:col-span-2">
                    <h2 className="text-lg font-heading uppercase border-b pb-2">Información Principal</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej. Whey Protein ENA 1kg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoría *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CATEGORIES.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="flavor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sabor</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej. Chocolate, Vainilla, S/Sabor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descripción detallada del producto..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Pricing & Stock */}
                  <div className="space-y-6 md:col-span-2 mt-4">
                    <h2 className="text-lg font-heading uppercase border-b pb-2">Precio y Stock</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio Actual (ARS) *</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio Original (Opcional)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormDescription>Para mostrar descuento (tachado)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="discountBadge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Etiqueta Descuento</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej. -25% OFF" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unidades en Stock *</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4 md:col-span-2 mt-4">
                    <h2 className="text-lg font-heading uppercase border-b pb-2">Imágenes</h2>
                    <FormDescription>URLs de las imágenes del producto.</FormDescription>
                    
                    {imageFields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`images.${index}.url`}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input placeholder="https://ejemplo.com/imagen.jpg" {...inputField} />
                              </FormControl>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="icon"
                                onClick={() => removeImage(index)}
                                disabled={imageFields.length === 1}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => appendImage({ url: "" })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar imagen
                    </Button>
                  </div>

                  {/* Settings */}
                  <div className="space-y-6 md:col-span-2 mt-4">
                    <h2 className="text-lg font-heading uppercase border-b pb-2">Configuración</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-sm border p-4 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Producto Activo</FormLabel>
                              <FormDescription>
                                Visible en la tienda para los clientes.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-sm border p-4 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Producto Destacado</FormLabel>
                              <FormDescription>
                                Aparecerá en la página principal.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t mt-8">
                  <Link href="/admin">
                    <Button type="button" variant="outline" className="px-8">
                      Cancelar
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    className="bg-primary text-black font-bold hover:bg-[#e0b00c] px-8"
                    disabled={isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isPending ? "Guardando..." : "Guardar Producto"}
                  </Button>
                </div>

              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}

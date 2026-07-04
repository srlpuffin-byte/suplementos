import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { useAdminToken } from "@/hooks/useAdminToken";
import { PointLogo } from "@/components/PointLogo";
import { siteConfig } from "@/data/siteConfig";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { setToken } = useAdminToken();
  const { toast } = useToast();

  const loginMutation = useAdminLogin({
    mutation: {
      onSuccess: (data) => {
        setToken(data.token);
        toast({
          title: "Acceso concedido",
          description: "Bienvenido al panel administrativo.",
        });
        setLocation("/admin");
      },
      onError: () => {
        toast({
          title: "Error de autenticación",
          description: "Contraseña incorrecta.",
          variant: "destructive"
        });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    loginMutation.mutate({ data: { password } });
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-sm shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <PointLogo size={64} className="mb-4" />
          <h1 className="font-heading text-3xl text-white uppercase tracking-wider">Panel Administrativo</h1>
          <p className="text-gray-400 text-sm mt-2">{siteConfig.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
              Contraseña de Administrador
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#222] border border-[#444] rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              disabled={loginMutation.isPending}
            />
          </div>
          
          <button
            type="submit"
            disabled={loginMutation.isPending || !password}
            className="w-full bg-primary text-black font-heading uppercase text-xl py-3 tracking-widest hover:bg-[#e0b00c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

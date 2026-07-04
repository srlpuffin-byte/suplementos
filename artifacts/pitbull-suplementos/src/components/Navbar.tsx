import { Link, useLocation } from "wouter";
import { PointLogo } from "@/components/PointLogo";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/productos" },
    { label: "Sucursales", path: "/sucursales" },
    { label: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-black text-white h-[65px] flex items-center border-b border-zinc-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <PointLogo size={44} />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-heading text-lg uppercase tracking-wide text-primary">{siteConfig.displayName}</span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{siteConfig.instagram.handle}</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-[14px] font-medium transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-primary transition-colors hidden md:block">
            <User className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-primary transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-primary hover:bg-transparent">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black border-r-zinc-800 text-white p-6">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    className={`text-lg font-heading tracking-wider transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-white'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

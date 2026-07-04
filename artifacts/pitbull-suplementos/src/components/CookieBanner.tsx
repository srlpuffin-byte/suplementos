import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-auto md:bottom-6 md:left-6 z-50 p-4 bg-white border border-gray-200 shadow-xl max-w-sm rounded-sm">
      <p className="text-sm text-gray-700 mb-3">
        Al navegar por este sitio aceptás el uso de cookies para agilizar tu experiencia de compra.
      </p>
      <Button 
        onClick={handleAccept} 
        className="w-full bg-black text-white hover:bg-gray-800 rounded-sm"
      >
        Entendido
      </Button>
    </div>
  );
}

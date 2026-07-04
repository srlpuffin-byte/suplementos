import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CookieBanner } from '@/components/CookieBanner';
import Home from '@/pages/Home';
import Productos from '@/pages/Productos';
import ProductoDetalle from '@/pages/ProductoDetalle';
import Sucursales from '@/pages/Sucursales';
import Contacto from '@/pages/Contacto';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ProductForm from '@/pages/admin/ProductForm';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/productos" component={Productos} />
      <Route path="/productos/:id" component={ProductoDetalle} />
      <Route path="/sucursales" component={Sucursales} />
      <Route path="/contacto" component={Contacto} />

      {/* Admin Routes - no Navbar/Footer */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/productos/nuevo" component={ProductForm} />
      <Route path="/admin/productos/:id/editar" component={ProductForm} />

      <Route component={NotFound} />
    </Switch>
  );
}

function PublicLayout() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/productos/nuevo" component={ProductForm} />
      <Route path="/admin/productos/:id/editar" component={ProductForm} />
      <Route>
        <div className="flex flex-col min-h-[100dvh] bg-white">
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/productos" component={Productos} />
              <Route path="/productos/:id" component={ProductoDetalle} />
              <Route path="/sucursales" component={Sucursales} />
              <Route path="/contacto" component={Contacto} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <PublicLayout />
          <Toaster />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

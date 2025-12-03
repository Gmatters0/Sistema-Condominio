import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import ReservaCadastro from "./pages/ReservaCadastro"
import OrdensServico from "./pages/OrdensServico";
import OrdemServicoCadastro from "./pages/OrdemServicoCadastro";
import Visitantes from "./pages/Visitantes";
import Avisos from "./pages/admin/Avisos";
import QuadroAvisos from "./pages/QuadroAvisos";
import Emails from "./pages/Emails";
import Moradores from "./pages/admin/Moradores";
import Unidades from "./pages/admin/Unidades";
import Prestadores from "./pages/admin/Prestadores";
import NotFound from "./pages/NotFound";
import MoradoresCadastro from "./pages/admin/MoradoresCadastro";
import UnidadesCadastro from "./pages/admin/UnidadesCadastro";
import PrestadoresCadastro from "./pages/admin/PrestadoresCadastro";
import VisitanteCadastro from "./pages/VisitanteCadastro";
import AvisoCadastro from "./pages/admin/AvisoCadastro";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reservas" element={<Reservas />} />
            <Route path="reserva-cadastro" element={<ReservaCadastro />} />
            <Route path="ordens-servico" element={<OrdensServico />} />
            <Route path="ordem-servico-cadastro" element={<OrdemServicoCadastro />} />
            <Route path="visitantes" element={<Visitantes />} />
            <Route path="visitante-cadastro" element={<VisitanteCadastro />} />
            <Route path="quadro-avisos" element={<QuadroAvisos />} />
            <Route path="emails" element={<Emails />} />
            <Route path="admin/moradores" element={<Moradores />} />
            <Route path="admin/moradores-cadastro" element={<MoradoresCadastro />} />
            <Route path="admin/unidades" element={<Unidades />} />
            <Route path="admin/unidades-cadastro" element={<UnidadesCadastro />} />
            <Route path="admin/prestadores" element={<Prestadores />} />
            <Route path="admin/prestadores-cadastro" element={<PrestadoresCadastro />} />
            <Route path="admin/avisos" element={<Avisos />} />
            <Route path="admin/aviso-cadastro" element={<AvisoCadastro />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

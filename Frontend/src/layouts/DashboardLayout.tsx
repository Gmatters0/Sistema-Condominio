import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import axios from "axios";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Função para validar o token com o backend
    const verifyToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Se a requisição deu certo, o token é válido. Guardamos os dados.
        setUser(response.data);
      } catch (error) {
        // Se deu erro, o token é inválido.
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background ">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card sticky top-0 z-10 shadow-sm">
            <div className="h-full px-6 flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {localStorage.getItem("userEmail") || "Usuário"}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  {(localStorage.getItem("userEmail") || "U")[0].toUpperCase()}
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
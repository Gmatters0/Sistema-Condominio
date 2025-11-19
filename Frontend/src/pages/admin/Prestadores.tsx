import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserCog, AlertCircle, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Tipo alinhado com a entidade do Backend
type Prestador = {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  especialidade: string;
  empresa: string;
};

const Prestadores = () => {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestadores = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Prestador[]>('http://localhost:3000/prestadores', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrestadores(response.data);
      } catch (error) {
        console.error("Erro ao buscar prestadores:", error);
        toast.error("Não foi possível carregar a lista de prestadores.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrestadores();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prestadores de Serviço</h1>
          <p className="text-muted-foreground mt-1">Gerencie os profissionais e empresas parceiras</p>
        </div>
        <Link to={'/admin/prestadores-cadastro'}>
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Prestador
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Profissionais Cadastrados</CardTitle>
          <CardDescription>Lista completa de prestadores ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading ? (
              // Loading Skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-[80px]" />
                </div>
              ))
            ) : prestadores.length > 0 ? (
              // Lista Real
              prestadores.map((prestador) => (
                <div key={prestador.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-orange-500/10">
                      <UserCog className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {prestador.nome}
                        {prestador.empresa && (
                          <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> {prestador.empresa}
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {prestador.especialidade} • {prestador.telefone}
                      </p>
                    </div>
                  </div>
                  {/* Como ainda não temos status no banco, deixei visualmente como 'Disponível' */}
                  <Badge variant="outline" className="bg-background">
                    Disponível
                  </Badge>
                </div>
              ))
            ) : (
              // Estado Vazio
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                <p>Nenhum prestador cadastrado.</p>
                <p className="text-sm">Clique em "Novo Prestador" para adicionar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prestadores;
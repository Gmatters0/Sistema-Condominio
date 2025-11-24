import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wrench, AlertCircle, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Tipo alinhado com a entidade do Backend
type OrdemServico = {
  id: number;
  titulo: string;
  local: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'aberto' | 'em andamento' | 'fechado';
  prestador: {
    id: number;
    nome: string;
  };
};

const OrdensServico = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrdens();
  }, []);

  const fetchOrdens = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<OrdemServico[]>('http://localhost:3000/ordens-servico', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrdens(response.data);
    } catch (error) {
      console.error("Erro ao buscar ordens de serviço:", error);
      toast.error("Não foi possível carregar as ordens de serviço.");
    } finally {
      setLoading(false);
    }
  };

  // Auxiliares para formatação visual
  const getPriorityBadge = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return "destructive";
      case 'media': return "default"; // Ou use uma cor personalizada como "secondary"
      default: return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em andamento': return "Em Andamento";
      case 'fechado': return "Concluída";
      default: return "Aberta";
    }
  };

  const getStatusVariant = (status: string) => {
    if (status === 'fechado') return "outline"; // Concluído mais discreto
    if (status === 'em andamento') return "default"; // Em destaque
    return "secondary"; // Aberto padrão
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
          <p className="text-muted-foreground mt-1">Gerencie as manutenções do condomínio</p>
        </div>
        <Link to="/ordem-servico-cadastro">
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Ordem de Serviço
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Ordens Ativas</CardTitle>
          <CardDescription>Acompanhe todas as ordens de serviço registradas</CardDescription>
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
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-[60px] rounded-full" />
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                  </div>
                </div>
              ))
            ) : ordens.length > 0 ? (
              // Lista Real
              ordens.map((ordem) => (
                <div key={ordem.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-base hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-warning/10">
                      <Wrench className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{ordem.titulo}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {ordem.local}
                        {/* Mostra o prestador se existir */}
                        {ordem.prestador && (
                          <span className="flex items-center gap-1 text-xs border-l pl-2 ml-1 border-muted-foreground/30">
                            <UserCog className="w-3 h-3" /> {ordem.prestador.nome}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Badge de Prioridade */}
                    <Badge variant={getPriorityBadge(ordem.prioridade) as any}>
                      {ordem.prioridade.charAt(0).toUpperCase() + ordem.prioridade.slice(1)}
                    </Badge>

                    {/* Badge de Status */}
                    <Badge variant={getStatusVariant(ordem.status) as any} className={ordem.status === 'fechado' ? 'bg-green-100 text-green-800 hover:bg-green-200 border-0' : ''}>
                      {getStatusLabel(ordem.status)}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              // Estado Vazio
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                <p>Nenhuma ordem de serviço encontrada.</p>
                <p className="text-sm">Clique em "Nova OS" para abrir um chamado.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdensServico;
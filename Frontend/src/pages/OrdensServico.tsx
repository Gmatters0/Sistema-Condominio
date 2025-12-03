/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wrench, AlertCircle, UserCog, MoreVertical, CheckCircle, XCircle, Clock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrdemServico = {
  id: number;
  titulo: string;
  local: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'aberto' | 'em andamento' | 'concluido' | 'cancelado';
  prestador: {
    id: number;
    nome: string;
  };
};

const BASE_URL = "http://localhost:3000";

const OrdensServico = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar permissão

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail"); // Pega o e-mail salvo

  useEffect(() => {
    // 1. Verifica a Role do usuário assim que a tela carrega
    const checkUserRole = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get(`${BASE_URL}/users/email/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Verifica se a role é 'admin'
        if (response.data && response.data.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Erro ao verificar permissões do usuário:", error);
      }
    };

    checkUserRole();
    fetchOrdens();
  }, [userEmail, token]);

  const fetchOrdens = async () => {
    setLoading(true);
    try {
      const response = await axios.get<OrdemServico[]>(`${BASE_URL}/ordens-servico`, {
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

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      setOrdens(prev => prev.map(order =>
        order.id === id ? { ...order, status: newStatus as any } : order
      ));

      await axios.patch(
        `${BASE_URL}/ordens-servico/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Status atualizado para ${getStatusLabel(newStatus)}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar status");
      fetchOrdens();
    }
  };

  const getPriorityBadge = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return "destructive";
      case 'media': return "default";
      default: return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em andamento': return "Em Andamento";
      case 'concluido': return "Concluída";
      case 'cancelado': return "Cancelada";
      default: return "Aberta";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
      case 'em andamento': return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
      case 'cancelado': return "bg-red-100 text-red-800 hover:bg-red-200 border-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
    }
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
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </div>
              ))
            ) : ordens.length > 0 ? (
              ordens.map((ordem) => (
                <div key={ordem.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-all hover:bg-muted/50 border border-transparent hover:border-muted-foreground/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Wrench className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{ordem.titulo}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          📍 {ordem.local}
                        </span>
                        {ordem.prestador && (
                          <span className="flex items-center gap-1 border-l pl-3 border-muted-foreground/30">
                            <UserCog className="w-3 h-3" /> {ordem.prestador.nome}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={getPriorityBadge(ordem.prioridade) as any}>
                      {ordem.prioridade.charAt(0).toUpperCase() + ordem.prioridade.slice(1)}
                    </Badge>

                    {/* Agora verifica o estado isAdmin buscado no banco */}
                    {isAdmin ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`h-7 border px-3 cursor-pointer ${getStatusColor(ordem.status)}`}
                          >
                            {getStatusLabel(ordem.status)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Alterar Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleStatusChange(ordem.id, 'aberto')}>
                            <Clock className="w-4 h-4 mr-2" /> Aberta
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(ordem.id, 'em andamento')}>
                            <PlayCircle className="w-4 h-4 mr-2" /> Em Andamento
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(ordem.id, 'concluido')}>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Concluída
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(ordem.id, 'cancelado')}>
                            <XCircle className="w-4 h-4 mr-2 text-red-600" /> Cancelada
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Badge className={`${getStatusColor(ordem.status)} border-0`}>
                        {getStatusLabel(ordem.status)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-3 bg-muted/10 rounded-lg border-2 border-dashed">
                <div className="p-4 rounded-full bg-muted/30">
                  <AlertCircle className="w-8 h-8 opacity-50" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Nenhuma ordem encontrada</h3>
                  <p className="text-sm mt-1">Clique em "Nova Ordem de Serviço" para abrir um chamado.</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdensServico;
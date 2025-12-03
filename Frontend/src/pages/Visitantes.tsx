/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Alterado
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BASE_URL = "http://localhost:3000";

interface Visitante {
  id: number;
  nome: string;
  dataEntrada: string;
  status: "ativo" | "saiu";
  unidade: {
    bloco: string;
    apartamento: string;
  };
}

const Visitantes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const token = localStorage.getItem("token");

  const fetchVisitantes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/visitantes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar visitantes", error);
    }
  };

  useEffect(() => {
    fetchVisitantes();
  }, [token]);

  const handleRegistrarSaida = async (id: number) => {
    try {
      await axios.patch(
        `${BASE_URL}/visitantes/${id}/saida`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Saída registrada",
        description: "O status do visitante foi atualizado.",
      });
      fetchVisitantes(); // Atualiza a lista
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível registrar a saída.",
      });
    }
  };

  // Cálculos de resumo
  const visitantesHoje = visitantes.filter((v) => {
    if (!v.dataEntrada) return false;
    const hoje = new Date().toISOString().split("T")[0];
    return v.dataEntrada.startsWith(hoje);
  }).length;

  const ativosAgora = visitantes.filter((v) => v.status === "ativo").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Visitantes</h1>
          <p className="text-muted-foreground mt-1">
            Registre e monitore visitantes
          </p>
        </div>
        <Button
          className="gradient-primary hover:opacity-90"
          onClick={() => navigate("/visitante-cadastro")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Entrada
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Visitantes Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{visitantesHoje}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Ativos Agora</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success">{ativosAgora}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Total Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-warning">
              {visitantes.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Histórico de Visitantes</CardTitle>
          <CardDescription>
            Lista de entradas e saídas do condomínio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visitantes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum visitante registrado.
              </p>
            ) : (
              visitantes.map((visitante) => (
                <div
                  key={visitante.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-all hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{visitante.nome}</h4>
                      <p className="text-sm text-muted-foreground">
                        {visitante.unidade ? `Bloco ${visitante.unidade.bloco} - Apt ${visitante.unidade.apartamento}` : 'Unidade removida'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {visitante.dataEntrada && format(
                        new Date(visitante.dataEntrada),
                        "dd/MM HH:mm",
                        { locale: ptBR }
                      )}
                    </div>
                    <Badge
                      variant={
                        visitante.status === "ativo" ? "default" : "secondary"
                      }
                      className={
                        visitante.status === "ativo" ? "bg-green-500" : ""
                      }
                    >
                      {visitante.status === "ativo" ? "No Local" : "Saiu"}
                    </Badge>

                    {visitante.status === "ativo" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRegistrarSaida(visitante.id)}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Saída
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visitantes;
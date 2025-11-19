import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type Reserva = {
  id: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  areaComum: {
    id: number;
    nome: string;
  };
  morador: {
    id: number;
    nome: string;
    sobrenome: string;
    unidade: {
      bloco: string;
      apartamento: string;
    };
  };
};

const Reservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Reserva[]>('http://localhost:3000/reservas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      toast.error("Não foi possível carregar a lista de reservas.");
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para formatar data: 2025-11-27 -> 27/11/2025
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função auxiliar para formatar hora: 14:00:00 -> 14:00
  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString.slice(0, 5);
  };

  // Lógica simples para definir status baseado na data atual vs data da reserva
  const getStatus = (dataReserva: string) => {
    const hoje = new Date().toISOString().split('T')[0];
    return dataReserva < hoje ? "Concluída" : "Agendada";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reserva de Áreas Comuns</h1>
          <p className="text-muted-foreground mt-1">Gerencie as reservas das áreas do condomínio</p>
        </div>
        {/* Ajuste da rota para onde criamos o cadastro anteriormente */}
        <Link to="/reserva-cadastro">
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Reserva
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Reservas Ativas</CardTitle>
          <CardDescription>Lista de todas as reservas realizadas</CardDescription>
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
                  <div className="flex flex-col gap-2 items-end">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                  </div>
                </div>
              ))
            ) : reservas.length > 0 ? (
              // Lista Real
              reservas.map((reserva) => {
                const status = getStatus(reserva.data);

                return (
                  <div
                    key={reserva.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-base hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{reserva.areaComum.nome}</h4>
                        <p className="text-sm text-muted-foreground">
                          {reserva.morador.nome} {reserva.morador.sobrenome} • Bloco {reserva.morador.unidade.bloco} - Apto {reserva.morador.unidade.apartamento}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatDate(reserva.data)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(reserva.horaInicio)} - {formatTime(reserva.horaFim)}
                        </p>
                      </div>
                      <Badge
                        variant={status === "Agendada" ? "default" : "secondary"}
                        className={status === "Agendada" ? "bg-success hover:bg-success/90 text-white" : ""}
                      >
                        {status}
                      </Badge>
                    </div>
                  </div>
                );
              })
            ) : (
              // Estado Vazio
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                <p>Nenhuma reserva encontrada.</p>
                <p className="text-sm">Clique em "Nova Reserva" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservas;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Wrench, Users, Home, Bell, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

// Interfaces para tipar os dados do backend
interface Reserva {
  id: number;
  data: string;
  horaInicio: string;
  areaComum: { nome: string };
  morador: { nome: string; sobrenome: string; unidade: { bloco: string; apartamento: string } };
}

interface OrdemServico {
  id: number;
  titulo: string;
  local: string;
  status: 'aberto' | 'em andamento' | 'fechado';
  dataCriacao: string;
}

interface Activity {
  id: string; // Composite ID
  type: "success" | "warning" | "info";
  icon: any;
  title: string;
  description: string;
  time: string;
  originalDate: Date;
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    reservasHoje: 0,
    ordensAbertas: 0,
    totalMoradores: 0,
    totalUnidades: 0,
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `há ${Math.floor(interval)} anos`;
    interval = seconds / 2592000;
    if (interval > 1) return `há ${Math.floor(interval)} meses`;
    interval = seconds / 86400;
    if (interval > 1) return `há ${Math.floor(interval)} dias`;
    interval = seconds / 3600;
    if (interval > 1) return `há ${Math.floor(interval)} horas`;
    interval = seconds / 60;
    if (interval > 1) return `há ${Math.floor(interval)} minutos`;
    return "agora mesmo";
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        const [resReservas, resOrdens, resMoradores, resUnidades] = await Promise.all([
          fetch("http://localhost:3000/reservas", { headers }),
          fetch("http://localhost:3000/ordens-servico", { headers }),
          fetch("http://localhost:3000/moradores", { headers }),
          fetch("http://localhost:3000/unidades", { headers })
        ]);

        const reservas: Reserva[] = resReservas.ok ? await resReservas.json() : [];
        const ordens: OrdemServico[] = resOrdens.ok ? await resOrdens.json() : [];
        const moradores = resMoradores.ok ? await resMoradores.json() : [];
        const unidades = resUnidades.ok ? await resUnidades.json() : [];

        const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const reservasHojeCount = reservas.filter(r => r.data === hoje).length;
        const ordensAbertasCount = ordens.filter(o => o.status === 'aberto').length;

        setStats({
          reservasHoje: reservasHojeCount,
          ordensAbertas: ordensAbertasCount,
          totalMoradores: Array.isArray(moradores) ? moradores.length : 0,
          totalUnidades: Array.isArray(unidades) ? unidades.length : 0,
        });

        const recentReservas: Activity[] = reservas.map(r => ({
          id: `res-${r.id}`,
          type: "success",
          icon: CheckCircle,
          title: "Reserva Agendada",
          description: `${r.areaComum?.nome} - ${r.morador?.unidade?.bloco}/${r.morador?.unidade?.apartamento}`,
          time: r.data === hoje ? "Hoje" : r.data,
          originalDate: new Date(`${r.data}T${r.horaInicio}`)
        }));

        const recentOrdens: Activity[] = ordens.map(o => ({
          id: `ord-${o.id}`,
          type: "warning",
          icon: AlertCircle,
          title: "Nova Ordem de Serviço",
          description: `${o.titulo} - ${o.local}`,
          time: timeAgo(new Date(o.dataCriacao)),
          originalDate: new Date(o.dataCriacao)
        }));

        const combinedActivities = [...recentReservas, ...recentOrdens]
          .sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime())
          .slice(0, 5);

        setActivities(combinedActivities);

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Reservas Hoje",
      value: stats.reservasHoje.toString(),
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Ordens Abertas",
      value: stats.ordensAbertas.toString(),
      icon: Wrench,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Total Moradores",
      value: stats.totalMoradores.toString(),
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total Unidades",
      value: stats.totalUnidades.toString(),
      icon: Home,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo ao sistema de gestão do condomínio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-custom gradient-card transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dados atualizados em tempo real
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-custom h-full">
          <CardHeader>
            <CardTitle className="text-xl">Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações registradas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Nenhuma atividade recente encontrada.</p>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={`p-2 rounded-lg ${activity.type === "success"
                      ? "bg-success/10"
                      : activity.type === "warning"
                        ? "bg-warning/10"
                        : "bg-accent/10"
                      }`}
                  >
                    <activity.icon
                      className={`w-5 h-5 ${activity.type === "success"
                        ? "text-success"
                        : activity.type === "warning"
                          ? "text-warning"
                          : "text-accent"
                        }`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quadro de Avisos (Estático por enquanto, ou pode conectar se criar módulo de avisos) */}
        <Card className="border-0 shadow-custom h-full">
          <CardHeader>
            <CardTitle className="text-xl">Avisos do Sistema</CardTitle>
            <CardDescription>Informações importantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5 flex gap-3">
              <Bell className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Backup Realizado</h4>
                <p className="text-sm text-muted-foreground">
                  O backup do banco de dados foi realizado com sucesso hoje às 03:00.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg border-l-4 border-warning bg-warning/5 flex gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Status do Servidor</h4>
                <p className="text-sm text-muted-foreground">
                  Todos os serviços estão operando normalmente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
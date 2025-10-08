import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Wrench, Users, Package, Bell, AlertCircle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Reservas Hoje",
      value: "8",
      change: "+12%",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Ordens Abertas",
      value: "23",
      change: "-5%",
      icon: Wrench,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Visitantes Hoje",
      value: "45",
      change: "+18%",
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Patrimônios",
      value: "156",
      change: "+2",
      icon: Package,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle,
      title: "Reserva Confirmada",
      description: "Salão de Festas - Apt. 302",
      time: "há 5 minutos",
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      title: "Nova Ordem de Serviço",
      description: "Manutenção elevador - Bloco A",
      time: "há 15 minutos",
    },
    {
      id: 3,
      type: "info",
      icon: Bell,
      title: "Novo Aviso Publicado",
      description: "Limpeza da piscina amanhã",
      time: "há 1 hora",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo ao sistema de gestão do condomínio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-custom gradient-card transition-slow hover:shadow-custom-lg">
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
                <span className={stat.change.startsWith("+") ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>{" "}
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-custom">
          <CardHeader>
            <CardTitle className="text-xl">Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 transition-base hover:bg-muted/50"
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
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-custom">
          <CardHeader>
            <CardTitle className="text-xl">Avisos Importantes</CardTitle>
            <CardDescription>Comunicados do condomínio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border-l-4 border-warning bg-warning/5">
              <h4 className="font-semibold text-sm mb-1">Manutenção Programada</h4>
              <p className="text-sm text-muted-foreground">
                Sistema de água será desligado amanhã das 8h às 12h.
              </p>
            </div>
            <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
              <h4 className="font-semibold text-sm mb-1">Assembleia Geral</h4>
              <p className="text-sm text-muted-foreground">
                Dia 15/01 às 19h no salão de festas. Presença obrigatória.
              </p>
            </div>
            <div className="p-4 rounded-lg border-l-4 border-success bg-success/5">
              <h4 className="font-semibold text-sm mb-1">Nova Academia</h4>
              <p className="text-sm text-muted-foreground">
                Academia reformada já está disponível para uso!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

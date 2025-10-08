import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Reservas = () => {
  const [reservas] = useState([
    {
      id: 1,
      area: "Salão de Festas",
      unidade: "Apt. 302",
      data: "15/01/2025",
      horario: "19:00 - 23:00",
      status: "confirmada",
    },
    {
      id: 2,
      area: "Churrasqueira 1",
      unidade: "Apt. 105",
      data: "18/01/2025",
      horario: "12:00 - 18:00",
      status: "pendente",
    },
    {
      id: 3,
      area: "Quadra de Tênis",
      unidade: "Apt. 501",
      data: "20/01/2025",
      horario: "08:00 - 10:00",
      status: "confirmada",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reserva de Áreas Comuns</h1>
          <p className="text-muted-foreground mt-1">Gerencie as reservas das áreas do condomínio</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Reserva
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Salão de Festas</CardTitle>
            <CardDescription>Capacidade: 100 pessoas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Bloco A - Térreo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Horário: 08:00 - 23:00</span>
              </div>
              <Badge variant="outline" className="mt-2">Disponível</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Churrasqueira</CardTitle>
            <CardDescription>4 churrasqueiras disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Área de Lazer</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Horário: 10:00 - 22:00</span>
              </div>
              <Badge variant="outline" className="mt-2">Disponível</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Quadra de Tênis</CardTitle>
            <CardDescription>Reserva por 2 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Área Esportiva</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Horário: 06:00 - 22:00</span>
              </div>
              <Badge variant="outline" className="mt-2">Disponível</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Reservas Ativas</CardTitle>
          <CardDescription>Lista de todas as reservas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-base hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{reserva.area}</h4>
                    <p className="text-sm text-muted-foreground">{reserva.unidade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{reserva.data}</p>
                    <p className="text-sm text-muted-foreground">{reserva.horario}</p>
                  </div>
                  <Badge
                    variant={reserva.status === "confirmada" ? "default" : "secondary"}
                    className={
                      reserva.status === "confirmada"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {reserva.status === "confirmada" ? "Confirmada" : "Pendente"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservas;

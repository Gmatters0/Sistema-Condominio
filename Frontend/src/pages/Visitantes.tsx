import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Visitantes = () => {
  const [visitantes] = useState([
    { id: 1, nome: "João Silva", unidade: "Apt. 302", tipo: "visitante", entrada: "14:30", status: "ativo" },
    { id: 2, nome: "Maria Santos", unidade: "Apt. 105", tipo: "prestador", entrada: "09:00", status: "ativo" },
    { id: 3, nome: "Pedro Costa", unidade: "Apt. 201", tipo: "visitante", entrada: "16:45", status: "saiu" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Visitantes</h1>
          <p className="text-muted-foreground mt-1">Registre e monitore visitantes</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Entrada
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Visitantes Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">45</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Ativos Agora</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success">12</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-custom gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Prestadores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-warning">8</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Visitantes Ativos</CardTitle>
          <CardDescription>Lista de visitantes no condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visitantes.map((visitante) => (
              <div key={visitante.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{visitante.nome}</h4>
                    <p className="text-sm text-muted-foreground">{visitante.unidade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    {visitante.entrada}
                  </div>
                  <Badge variant={visitante.status === "ativo" ? "default" : "secondary"}>
                    {visitante.status === "ativo" ? "Ativo" : "Saiu"}
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

export default Visitantes;

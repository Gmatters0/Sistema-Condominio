import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrdensServico = () => {
  const [ordens] = useState([
    { id: 1, titulo: "Manutenção Elevador", local: "Bloco A", prioridade: "alta", status: "aberta" },
    { id: 2, titulo: "Limpeza Piscina", local: "Área de Lazer", prioridade: "media", status: "em_andamento" },
    { id: 3, titulo: "Troca de Lâmpadas", local: "Garagem", prioridade: "baixa", status: "concluida" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
          <p className="text-muted-foreground mt-1">Gerencie as manutenções do condomínio</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nova OS
        </Button>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Ordens Ativas</CardTitle>
          <CardDescription>Acompanhe todas as ordens de serviço</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ordens.map((ordem) => (
              <div key={ordem.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-base hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <Wrench className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{ordem.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{ordem.local}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={ordem.prioridade === "alta" ? "destructive" : "outline"}>
                    {ordem.prioridade === "alta" ? "Alta" : ordem.prioridade === "media" ? "Média" : "Baixa"}
                  </Badge>
                  <Badge variant={ordem.status === "concluida" ? "default" : "secondary"}>
                    {ordem.status === "aberta" ? "Aberta" : ordem.status === "em_andamento" ? "Em Andamento" : "Concluída"}
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

export default OrdensServico;

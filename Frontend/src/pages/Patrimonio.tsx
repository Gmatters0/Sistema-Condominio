import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Patrimonio = () => {
  const [patrimonios] = useState([
    { id: 1, nome: "Cortador de Grama", categoria: "Jardinagem", local: "Depósito A", status: "disponivel" },
    { id: 2, nome: "Cadeiras Plásticas (50un)", categoria: "Mobiliário", local: "Salão de Festas", status: "disponivel" },
    { id: 3, nome: "Aspirador Industrial", categoria: "Limpeza", local: "Depósito B", status: "manutencao" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Patrimônio</h1>
          <p className="text-muted-foreground mt-1">Gerencie os bens do condomínio</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Item
        </Button>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Itens Cadastrados</CardTitle>
          <CardDescription>Lista completa do patrimônio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {patrimonios.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Package className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.nome}</h4>
                    <p className="text-sm text-muted-foreground">{item.categoria} - {item.local}</p>
                  </div>
                </div>
                <Badge variant={item.status === "disponivel" ? "default" : "secondary"}>
                  {item.status === "disponivel" ? "Disponível" : "Manutenção"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patrimonio;

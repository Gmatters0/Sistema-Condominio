import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Unidades = () => {
  const [unidades] = useState([
    { id: 1, numero: "302", bloco: "A", tipo: "Apartamento", area: "85m²", status: "ocupado" },
    { id: 2, numero: "105", bloco: "B", tipo: "Apartamento", area: "65m²", status: "ocupado" },
    { id: 3, numero: "201", bloco: "A", tipo: "Apartamento", area: "95m²", status: "vago" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Unidades</h1>
          <p className="text-muted-foreground mt-1">Gerencie as unidades do condomínio</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Unidade
        </Button>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Unidades Cadastradas</CardTitle>
          <CardDescription>Lista completa de unidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unidades.map((unidade) => (
              <div key={unidade.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Bloco {unidade.bloco} - {unidade.tipo} {unidade.numero}</h4>
                    <p className="text-sm text-muted-foreground">Área: {unidade.area}</p>
                  </div>
                </div>
                <Badge variant={unidade.status === "ocupado" ? "default" : "secondary"}>
                  {unidade.status === "ocupado" ? "Ocupado" : "Vago"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unidades;

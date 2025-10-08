import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Moradores = () => {
  const [moradores] = useState([
    { id: 1, nome: "Carlos Silva", unidade: "Apt. 302", cpf: "123.456.789-00", status: "ativo" },
    { id: 2, nome: "Ana Santos", unidade: "Apt. 105", cpf: "987.654.321-00", status: "ativo" },
    { id: 3, nome: "Pedro Costa", unidade: "Apt. 201", cpf: "456.789.123-00", status: "inativo" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Moradores</h1>
          <p className="text-muted-foreground mt-1">Gerencie os moradores do condomínio</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Morador
        </Button>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Moradores Cadastrados</CardTitle>
          <CardDescription>Lista completa de moradores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moradores.map((morador) => (
              <div key={morador.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{morador.nome}</h4>
                    <p className="text-sm text-muted-foreground">{morador.unidade} - {morador.cpf}</p>
                  </div>
                </div>
                <Badge variant={morador.status === "ativo" ? "default" : "secondary"}>
                  {morador.status === "ativo" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Moradores;

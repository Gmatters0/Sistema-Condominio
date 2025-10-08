import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Prestadores = () => {
  const [prestadores] = useState([
    { id: 1, nome: "João Eletricista", servico: "Elétrica", telefone: "(11) 9999-9999", status: "ativo" },
    { id: 2, nome: "Maria Encanadora", servico: "Hidráulica", telefone: "(11) 8888-8888", status: "ativo" },
    { id: 3, nome: "Pedro Jardineiro", servico: "Jardinagem", telefone: "(11) 7777-7777", status: "inativo" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Prestadores</h1>
          <p className="text-muted-foreground mt-1">Gerencie os prestadores de serviço</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Prestador
        </Button>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Prestadores Cadastrados</CardTitle>
          <CardDescription>Lista de prestadores de serviço</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prestadores.map((prestador) => (
              <div key={prestador.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <UserCog className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{prestador.nome}</h4>
                    <p className="text-sm text-muted-foreground">{prestador.servico} - {prestador.telefone}</p>
                  </div>
                </div>
                <Badge variant={prestador.status === "ativo" ? "default" : "secondary"}>
                  {prestador.status === "ativo" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prestadores;

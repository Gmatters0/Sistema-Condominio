import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Avisos = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Avisos</h1>
          <p className="text-muted-foreground mt-1">Crie avisos para os moradores</p>
        </div>
        <Button className="gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Aviso
        </Button>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Criar Novo Aviso</CardTitle>
          <CardDescription>Preencha os dados do aviso</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Formulário de criação de avisos será implementado aqui</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Avisos;

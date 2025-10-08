import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const QuadroAvisos = () => {
  const avisos = [
    { id: 1, titulo: "Manutenção Programada", data: "10/01/2025", tipo: "importante" },
    { id: 2, titulo: "Assembleia Geral", data: "15/01/2025", tipo: "urgente" },
    { id: 3, titulo: "Nova Academia", data: "08/01/2025", tipo: "informativo" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quadro de Avisos</h1>
        <p className="text-muted-foreground mt-1">Avisos e comunicados do condomínio</p>
      </div>

      <div className="grid gap-4">
        {avisos.map((aviso) => (
          <Card key={aviso.id} className="border-0 shadow-custom">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{aviso.titulo}</CardTitle>
                </div>
                <Badge variant={aviso.tipo === "urgente" ? "destructive" : "default"}>
                  {aviso.tipo}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Data: {aviso.data}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuadroAvisos;

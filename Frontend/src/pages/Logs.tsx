import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock } from "lucide-react";

const Logs = () => {
  const logs = [
    { id: 1, acao: "Criação de Reserva", usuario: "admin@condominio.com", data: "10/01/2025 14:30", tela: "Reservas" },
    { id: 2, acao: "Nova OS Cadastrada", usuario: "admin@condominio.com", data: "10/01/2025 11:20", tela: "Ordens de Serviço" },
    { id: 3, acao: "Registro de Visitante", usuario: "portaria@condominio.com", data: "10/01/2025 09:15", tela: "Visitantes" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Log de Ações</h1>
        <p className="text-muted-foreground mt-1">Histórico de atividades do sistema</p>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Registro de Atividades</CardTitle>
          <CardDescription>Todas as ações realizadas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{log.acao}</h4>
                    <p className="text-sm text-muted-foreground">{log.usuario} - {log.tela}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {log.data}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;

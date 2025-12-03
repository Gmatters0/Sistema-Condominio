import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellRing, CalendarDays } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BASE_URL = "http://localhost:3000";

interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  flag: "Informativo" | "Urgente" | "Importante" | "Manutenção";
}

const QuadroAvisos = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/avisos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvisos(response.data);
      } catch (error) {
        console.error("Erro ao carregar quadro de avisos", error);
      }
    };
    fetchAvisos();
  }, [token]);

  const getBadgeColor = (flag: string) => {
    switch (flag) {
      case "Urgente": return "bg-red-500 hover:bg-red-600";
      case "Manutenção": return "bg-orange-500 hover:bg-orange-600";
      case "Importante": return "bg-blue-600 hover:bg-blue-700";
      default: return "bg-slate-500 hover:bg-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold">Quadro de Avisos</h1>
          <p className="text-muted-foreground">
            Fique por dentro das novidades do condomínio
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {avisos.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed">
            <BellRing className="w-12 h-12 mb-4 opacity-20" />
            <p>Não há avisos recentes.</p>
          </div>
        ) : (
          avisos.map((aviso) => (
            <Card key={aviso.id} className="border-0 shadow-custom hover:translate-y-[-2px] transition-transform duration-200">
              <CardHeader>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <Badge className={`${getBadgeColor(aviso.flag)} text-white border-0`}>
                    {aviso.flag}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="w-3 h-3 mr-1" />
                    {format(new Date(aviso.data), "dd/MM", { locale: ptBR })}
                  </div>
                </div>
                <CardTitle className="leading-tight">{aviso.titulo}</CardTitle>
                <CardDescription>
                  {format(new Date(aviso.data), "EEEE, HH:mm", { locale: ptBR })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {aviso.descricao}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default QuadroAvisos;
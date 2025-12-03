/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
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

const Avisos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const token = localStorage.getItem("token");

  const fetchAvisos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/avisos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvisos(response.data);
    } catch (error) {
      console.error("Erro ao buscar avisos", error);
    }
  };

  useEffect(() => {
    fetchAvisos();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este aviso?")) return;

    try {
      await axios.delete(`${BASE_URL}/avisos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Aviso removido",
        description: "O comunicado foi excluído com sucesso.",
      });
      fetchAvisos();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o aviso.",
      });
    }
  };

  const getBadgeVariant = (flag: string) => {
    switch (flag) {
      case "Urgente": return "destructive";
      case "Manutenção": return "warning"; // Se tiver configurado variant warning, senão use secondary
      case "Importante": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Avisos</h1>
          <p className="text-muted-foreground mt-1">
            Área administrativa para comunicados
          </p>
        </div>
        <Button
          className="gradient-primary hover:opacity-90"
          onClick={() => navigate("/admin/aviso-cadastro")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Aviso
        </Button>
      </div>

      <div className="grid gap-4">
        {avisos.length === 0 ? (
          <Card className="border-0 shadow-custom">
            <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Megaphone className="w-12 h-12 mb-4 opacity-20" />
              <p>Nenhum aviso publicado.</p>
            </CardContent>
          </Card>
        ) : (
          avisos.map((aviso) => (
            <Card key={aviso.id} className="border-0 shadow-custom">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{aviso.titulo}</CardTitle>
                    <Badge variant={getBadgeVariant(aviso.flag) as any}>
                      {aviso.flag}
                    </Badge>
                  </div>
                  <CardDescription>
                    Publicado em {format(new Date(aviso.data), "PPP 'às' HH:mm", { locale: ptBR })}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(aviso.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">
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

export default Avisos;
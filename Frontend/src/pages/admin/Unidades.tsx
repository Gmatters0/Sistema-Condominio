import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Tipo que reflete os dados retornados pela API
type Unidade = {
  id: number;
  bloco: string;
  apartamento: string;
  // O campo moradores é opcional, pois depende se a API está retornando a relação.
  // Usaremos isso para tentar definir o status (ocupado/vago)
  moradores?: any[];
};

const Unidades = () => {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnidades = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Unidade[]>('http://localhost:3000/unidades', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnidades(response.data);
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
        toast.error("Não foi possível carregar a lista de unidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnidades();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Unidades</h1>
          <p className="text-muted-foreground mt-1">Gerencie as unidades do condomínio</p>
        </div>
        <Link to={'/admin/unidades-cadastro'}>
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Unidade
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Unidades Cadastradas</CardTitle>
          <CardDescription>Lista completa de unidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading ? (
              // Esqueleto de carregamento (Skeleton)
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <Skeleton className="w-5 h-5 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-[70px] rounded-full" />
                </div>
              ))
            ) : unidades.length > 0 ? (
              unidades.map((unidade) => {
                const isOcupado = unidade.moradores && unidade.moradores.length > 0;

                return (
                  <div key={unidade.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-accent/10">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Bloco {unidade.bloco} - Apto {unidade.apartamento}</h4>
                        <p className="text-sm text-muted-foreground">ID: {unidade.id}</p>
                      </div>
                    </div>
                    <Badge variant={isOcupado ? "default" : "secondary"}>
                      {isOcupado ? "Ocupado" : "Vago"}
                    </Badge>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                <p>Nenhuma unidade cadastrada ainda.</p>
                <p className="text-sm">Clique em "Nova Unidade" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unidades;
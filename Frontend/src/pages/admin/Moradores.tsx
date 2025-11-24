import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Tipagem para representar a estrutura completa do morador vindo da API
type MoradorComUser = {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  unidade: {
    bloco: string;
    apartamento: string;
  };
  user: {
    id: number;
    email: string;
    status?: 'ativo' | 'inativo';
  };
};

const Moradores = () => {
  const [moradores, setMoradores] = useState<MoradorComUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoradores = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<MoradorComUser[]>('http://localhost:3000/moradores', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const moradoresOrdenados = response.data.sort((a, b) => {
          const compareNome = a.nome.localeCompare(b.nome);
          if (compareNome !== 0) return compareNome;

          return a.sobrenome.localeCompare(b.sobrenome);
        });

        setMoradores(moradoresOrdenados);
      } catch (error) {
        console.error("Erro ao buscar moradores:", error);
        toast.error("Não foi possível carregar a lista de moradores.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoradores();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Moradores</h1>
          <p className="text-muted-foreground mt-1">Gerencie os moradores do condomínio</p>
        </div>
        <Link to={'/admin/moradores-cadastro'}>
          <Button className="gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Morador
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Moradores Cadastrados</CardTitle>
          <CardDescription>Lista completa de moradores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-[70px] rounded-full" />
                </div>
              ))
            ) : moradores.length > 0 ? (
              moradores.map((morador) => (
                <div key={morador.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{`${morador.nome} ${morador.sobrenome}`}</h4>
                      <p className="text-sm text-muted-foreground">
                        {`Bloco ${morador.unidade.bloco} - Apto ${morador.unidade.apartamento}`} - CPF: {morador.cpf}
                      </p>
                    </div>
                  </div>
                  <Badge variant={"default"}>
                    Ativo
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                <p>Nenhum morador cadastrado ainda.</p>
                <p className="text-sm">Clique em "Novo Morador" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Moradores;

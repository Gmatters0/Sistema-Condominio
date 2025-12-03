import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { visitanteSchema, VisitanteFormData } from "@/utils/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const BASE_URL = "http://localhost:3000";

interface Unidade {
  id: number;
  bloco: string;
  apartamento: string;
}

const VisitanteCadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const form = useForm<VisitanteFormData>({
    resolver: zodResolver(visitanteSchema),
    defaultValues: {
      nome: "",
      unidadeId: "",
    },
  });

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/unidades`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUnidades(response.data);
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar",
          description: "Não foi possível carregar a lista de apartamentos.",
        });
      }
    };

    fetchUnidades();
  }, [toast, token]);

  const onSubmit = async (data: VisitanteFormData) => {
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/visitantes`,
        {
          ...data,
          unidadeId: Number(data.unidadeId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Sucesso!",
        description: "Visitante registrado com sucesso.",
      });

      navigate("/visitantes");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao registrar",
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/visitantes")}
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Novo Visitante</h1>
          <p className="text-muted-foreground">
            Registre a entrada de um novo visitante
          </p>
        </div>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Dados da Entrada</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unidadeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade / Apartamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o apartamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unidades && unidades.length > 0 ? (
                            unidades.map((unidade) => (
                              <SelectItem
                                key={unidade.id}
                                value={unidade.id.toString()}
                              >
                                Bloco {unidade.bloco} - Apt {unidade.apartamento}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground text-center">
                              Nenhuma unidade encontrada
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/visitantes")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="gradient-primary"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Registrando..." : "Registrar Entrada"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitanteCadastro;
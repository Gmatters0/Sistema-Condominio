import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Componente do formulário de cadastro de unidade
const NovaUnidadeForm = () => {
  // Um único estado para todos os dados do formulário
  const [formData, setFormData] = useState({
    bloco: '',
    apartamento: '',
  });

  // Estado para controlar o carregamento durante o envio do formulário
  const [loading, setLoading] = useState(false);

  // Validação para habilitar/desabilitar o botão de submit.
  // Retorna true apenas se todos os campos do formulário estiverem preenchidos.
  const isFormValid = useMemo(() => {
    return Object.values(formData).every(value => value.trim() !== '');
  }, [formData]);

  // Função para lidar com a mudança nos inputs de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:3000/unidades', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Unidade cadastrada com sucesso!");

      // Limpa o formulário após o sucesso
      setFormData({
        bloco: '',
        apartamento: '',
      });
    } catch (error) {
      console.error("Erro ao cadastrar unidade:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Falha ao cadastrar unidade.");
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Unidade</h1>
          <p className="text-muted-foreground mt-1">Preencha os dados para cadastrar uma nova unidade</p>
        </div>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Dados da Unidade</CardTitle>
          <CardDescription>Informe o bloco e o número do apartamento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="bloco">Bloco</Label>
                <Input
                  id="bloco"
                  name="bloco"
                  placeholder="Ex: A, B, 1, Torre Sul"
                  value={formData.bloco}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="apartamento">Apartamento</Label>
                <Input
                  id="apartamento"
                  name="apartamento"
                  placeholder="Ex: 101, 2002, 12B"
                  value={formData.apartamento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              {/* Ajuste a rota do Link conforme sua estrutura de rotas para a listagem de unidades */}
              <Link to={'/admin/unidades'}>
                <Button variant="outline">Voltar</Button>
              </Link>
              <Button type="submit" disabled={loading || !isFormValid} className="w-full md:w-auto self-end">
                {loading ? 'Cadastrando...' : 'Cadastrar Unidade'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovaUnidadeForm;
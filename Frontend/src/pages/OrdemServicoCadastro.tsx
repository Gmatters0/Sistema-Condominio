import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

type Prestador = {
  id: number;
  nome: string;
  especialidade: string;
};

const OrdemServicoCadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prestadoresOptions, setPrestadoresOptions] = useState<ComboboxOption[]>([]);

  const [formData, setFormData] = useState({
    titulo: '',
    local: '',
    prioridade: 'baixa',
    prestadorId: '',
  });

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Prestador[]>('http://localhost:3000/prestadores', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPrestadoresOptions(response.data.map(p => ({
          value: String(p.id),
          label: `${p.nome} - ${p.especialidade}`
        })));
      } catch (error) {
        console.error("Erro ao buscar prestadores:", error);
        toast.error("Erro ao carregar lista de prestadores.");
      }
    };
    fetchPrestadores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.titulo || !formData.local || !formData.prestadorId) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        prestadorId: Number(formData.prestadorId),
        // Não enviamos status aqui, o backend define como 'aberto'
      };

      await axios.post('http://localhost:3000/ordens-servico', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Ordem de serviço aberta com sucesso!");
      navigate('/ordens-servico');

    } catch (error) {
      console.error("Erro ao abrir OS:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Falha ao criar ordem de serviço.");
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
          <h1 className="text-3xl font-bold">Nova Ordem de Serviço</h1>
          <p className="text-muted-foreground mt-1">Registre uma solicitação de manutenção ou serviço</p>
        </div>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Detalhes da Solicitação</CardTitle>
          <CardDescription>Preencha as informações sobre o serviço necessário.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="titulo">Título do Serviço</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  placeholder="Ex: Troca de lâmpada do hall"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="local">Local</Label>
                <Input
                  id="local"
                  name="local"
                  placeholder="Ex: Bloco A - Térreo"
                  value={formData.local}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label>Prioridade</Label>
                <Select
                  value={formData.prioridade}
                  onValueChange={(val) => handleSelectChange('prioridade', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label>Prestador Responsável</Label>
                <Combobox
                  options={prestadoresOptions}
                  value={formData.prestadorId}
                  onChange={(value) => setFormData(prev => ({ ...prev, prestadorId: value }))}
                  triggerPlaceholder="Selecione o prestador..."
                  placeholder="Buscar prestador..."
                  emptyMessage="Nenhum prestador encontrado."
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Link to={'/ordens-servico'}>
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={loading} className="w-full md:w-auto self-end">
                {loading ? 'Salvando...' : 'Criar Ordem de Serviço'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdemServicoCadastro;
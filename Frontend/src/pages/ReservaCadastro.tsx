import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

// Tipos para os dados vindos da API
type AreaComum = {
  id: number;
  nome: string;
};

type Morador = {
  id: number;
  nome: string;
  sobrenome: string;
  unidade: {
    bloco: string;
    apartamento: string;
  };
};

const ReservaCadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estados para as listas de opções
  const [areasOptions, setAreasOptions] = useState<ComboboxOption[]>([]);
  const [moradoresOptions, setMoradoresOptions] = useState<ComboboxOption[]>([]);

  // Estado do formulário
  const [formData, setFormData] = useState({
    areaComumId: '',
    moradorId: '',
    data: '',
    horaInicio: '',
    horaFim: '',
  });

  // Busca dados iniciais (Áreas e Moradores)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Buscamos as duas listas em paralelo
        const [areasRes, moradoresRes] = await Promise.all([
          axios.get<AreaComum[]>('http://localhost:3000/areas-comuns', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get<Morador[]>('http://localhost:3000/moradores', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        // Formata Áreas para o Combobox
        setAreasOptions(areasRes.data.map(area => ({
          value: String(area.id),
          label: area.nome
        })));

        // Formata Moradores para o Combobox (Nome + Unidade para facilitar identificação)
        setMoradoresOptions(moradoresRes.data.map(morador => ({
          value: String(morador.id),
          label: `${morador.nome} ${morador.sobrenome} (Bl ${morador.unidade.bloco} - Ap ${morador.unidade.apartamento})`
        })));

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Falha ao carregar listas de áreas ou moradores.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações básicas de Frontend
    if (!formData.areaComumId || !formData.moradorId || !formData.data || !formData.horaInicio || !formData.horaFim) {
      toast.error("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (formData.horaInicio >= formData.horaFim) {
      toast.error("A hora de término deve ser maior que a hora de início.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Prepara o payload convertendo IDs para número
      const payload = {
        areaComumId: Number(formData.areaComumId),
        moradorId: Number(formData.moradorId),
        data: formData.data,
        horaInicio: formData.horaInicio,
        horaFim: formData.horaFim,
      };

      await axios.post('http://localhost:3000/reservas', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Reserva realizada com sucesso!");
      navigate('/admin/reservas'); // Redireciona para a listagem (que faremos a seguir)

    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      if (axios.isAxiosError(error) && error.response) {
        // Mensagem vinda do backend (ex: "Horário indisponível")
        toast.error(error.response.data.message || "Falha ao criar reserva.");
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
          <h1 className="text-3xl font-bold">Nova Reserva</h1>
          <p className="text-muted-foreground mt-1">Agende a utilização de uma área comum</p>
        </div>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Dados da Reserva</CardTitle>
          <CardDescription>Selecione a área, o responsável e o período desejado.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Seleção de Área Comum */}
              <div className="flex flex-col w-full gap-2">
                <Label>Área Comum</Label>
                <Combobox
                  options={areasOptions}
                  value={formData.areaComumId}
                  onChange={(value) => setFormData(prev => ({ ...prev, areaComumId: value }))}
                  triggerPlaceholder="Selecione a área..."
                  placeholder="Buscar área..."
                  emptyMessage="Nenhuma área encontrada."
                />
              </div>

              {/* Seleção de Morador */}
              <div className="flex flex-col w-full gap-2">
                <Label>Morador Responsável</Label>
                <Combobox
                  options={moradoresOptions}
                  value={formData.moradorId}
                  onChange={(value) => setFormData(prev => ({ ...prev, moradorId: value }))}
                  triggerPlaceholder="Selecione o morador..."
                  placeholder="Buscar morador por nome..."
                  emptyMessage="Nenhum morador encontrado."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Data */}
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="data">Data da Reserva</Label>
                <Input
                  id="data"
                  name="data"
                  type="date"
                  value={formData.data}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]} // Impede datas passadas
                />
              </div>

              {/* Hora Início */}
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="horaInicio">Hora de Início</Label>
                <Input
                  id="horaInicio"
                  name="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Hora Fim */}
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="horaFim">Hora de Término</Label>
                <Input
                  id="horaFim"
                  name="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Link to={'/reservas'}>
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={loading} className="w-full md:w-auto self-end">
                {loading ? 'Agendando...' : 'Confirmar Reserva'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservaCadastro;
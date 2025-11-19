import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { FormEvent, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { isValidEmail, isValidCPF, isValidPhone } from "@/utils/validations";

// Tipo para os dados da Unidade que vêm da API
type Unidade = {
  id: number;
  bloco: string;
  apartamento: string;
};

// Componente do formulário de cadastro
const NovoMoradorForm = () => {
  // Estado para as opções do combobox de unidades
  const [unidadeOptions, setUnidadeOptions] = useState<ComboboxOption[]>([]);

  // Um único estado para todos os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    telefone: '',
    unidadeId: '',
    email: '',
    senha: '',
  });

  // Estado para controlar o carregamento durante o envio do formulário
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return Object.values(formData).every(value => value.trim() !== '');
  }, [formData]);

  // Efeito para buscar as unidades da API quando o componente é montado
  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Unidade[]>('http://localhost:3000/unidades', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedOptions = response.data.map(unidade => ({
          value: String(unidade.id),
          label: `Bloco ${unidade.bloco} - Apto ${unidade.apartamento}`
        }));

        setUnidadeOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
        toast.error("Falha ao carregar unidades. Tente novamente.");
      }
    };

    fetchUnidades();
  }, []);

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
    if (!isFormValid) return; // Segurança extra

    if (!isFormValid) return;

    if (!isValidCPF(formData.cpf)) {
      toast.error("O CPF deve conter exatamente 11 dígitos.");
      return;
    }

    if (!isValidPhone(formData.telefone)) {
      toast.error("O telefone deve conter 10 ou 11 dígitos (com DDD).");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Por favor, insira um endereço de email válido.");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      telefone: formData.telefone.replace(/\D/g, ''),
      unidadeId: Number(formData.unidadeId),
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:3000/moradores', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Morador cadastrado com sucesso!");
      setFormData({
        nome: '',
        sobrenome: '',
        cpf: '',
        telefone: '',
        unidadeId: '',
        email: '',
        senha: '',
      });
    } catch (error) {
      console.error("Erro ao cadastrar morador:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Falha ao cadastrar morador.");
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
          <h1 className="text-3xl font-bold">Cadastro de Morador</h1>
          <p className="text-muted-foreground mt-1">Preencha os dados para cadastrar um novo morador</p>
        </div>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
          <CardDescription>Preencha os dados pessoais do morador</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Formulário agora chama a função handleSubmit */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} maxLength={14} required />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" type="tel" placeholder="(62) 99999-9999" value={formData.telefone} maxLength={15} onChange={handleChange} required />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Unidade</Label>
                <Combobox
                  options={unidadeOptions}
                  value={formData.unidadeId}
                  onChange={(value) => setFormData(prev => ({ ...prev, unidadeId: value }))}
                  triggerPlaceholder="Selecione a unidade"
                  placeholder="Buscar por bloco ou apto..."
                  emptyMessage="Nenhuma unidade encontrada."
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t">
              <CardTitle>Dados para Login</CardTitle>
              <CardDescription>Preencha os dados de login para o usuário do morador</CardDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="exemplo@email.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" name="senha" type="password" placeholder="••••••••" value={formData.senha} onChange={handleChange} required />
              </div>
            </div>
            <div className="flex justify-between">
              <Link to={'/admin/moradores'}>
                <Button>Voltar</Button>
              </Link>
              <Button type="submit" disabled={loading || !isFormValid} className="w-full md:w-auto self-end">
                {loading ? 'Cadastrando...' : 'Cadastrar Morador'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoMoradorForm;


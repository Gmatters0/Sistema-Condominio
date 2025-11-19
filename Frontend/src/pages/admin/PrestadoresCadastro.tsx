import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidCPF, isValidCNPJ, isValidPhone } from "@/utils/validations";

const PrestadoresCadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    documento: '', // CPF ou CNPJ
    telefone: '',
    email: '',
    especialidade: '', // Ex: Eletricista, Encanador
    empresa: '', // Opcional
  });

  // Validação simples: nome, documento, telefone e especialidade são obrigatórios
  const isFormValid = useMemo(() => {
    return (
      formData.nome.trim() !== '' &&
      formData.documento.trim() !== '' &&
      formData.telefone.trim() !== '' &&
      formData.especialidade.trim() !== ''
    );
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (!isFormValid) return;

    const docLimpo = formData.documento.replace(/\D/g, '');
    if (docLimpo.length !== 11 && docLimpo.length !== 14) {
      toast.error("O documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.");
      return;
    }

    if (!isValidPhone(formData.telefone)) {
      toast.error("O telefone deve conter 10 ou 11 dígitos (com DDD).");
      return;
    }

    if (formData.email && !isValidEmail(formData.email)) {
      toast.error("O email informado é inválido.");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      documento: formData.documento.replace(/\D/g, ''),
      telefone: formData.telefone.replace(/\D/g, ''),
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:3000/prestadores', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Prestador cadastrado com sucesso!");
      navigate('/admin/prestadores');

    } catch (error) {
      console.error("Erro ao cadastrar prestador:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Falha ao cadastrar prestador.");
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
          <h1 className="text-3xl font-bold">Cadastro de Prestador</h1>
          <p className="text-muted-foreground mt-1">Registre um novo prestador de serviço ou empresa</p>
        </div>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle>Dados do Prestador</CardTitle>
          <CardDescription>Preencha as informações de contato e especialidade</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Linha 1: Nome e Documento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Nome do profissional"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="documento">Documento (CPF/CNPJ)</Label>
                <Input
                  id="documento"
                  name="documento"
                  placeholder="000.000.000-00"
                  value={formData.documento}
                  onChange={handleChange}
                  maxLength={18}
                  required
                />
              </div>
            </div>

            {/* Linha 2: Especialidade e Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <Input
                  id="especialidade"
                  name="especialidade"
                  placeholder="Ex: Eletricista, Encanador, Limpeza..."
                  value={formData.especialidade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="empresa">Empresa (Opcional)</Label>
                <Input
                  id="empresa"
                  name="empresa"
                  placeholder="Nome da empresa terceirizada"
                  value={formData.empresa}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Linha 3: Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                  maxLength={15}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="email">Email (Opcional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contato@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Link to={'/admin/prestadores'}>
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={loading || !isFormValid} className="w-full md:w-auto self-end">
                {loading ? 'Cadastrando...' : 'Salvar Prestador'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrestadoresCadastro;
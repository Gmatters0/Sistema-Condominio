/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Users, Loader2, AlertCircle, Send, X } from "lucide-react";

interface User {
  id: number;
  email: string;
  nome: string;
  role: string;
}

interface Unidade {
  id: number;
  bloco: string;
  apartamento: string;
}

interface Morador {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  user: User;
  unidade: Unidade;
}

const Emails = () => {
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isComposing, setIsComposing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchDestinatarios = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      const response = await fetch("http://localhost:3000/moradores", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Falha ao buscar destinatários");

      const data = await response.json();
      setMoradores(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Preencha o assunto e a mensagem.");
      return;
    }

    setIsSending(true);
    setSuccessMsg(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/mail/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ assunto: subject, mensagem: message })
      });

      if (!response.ok) throw new Error("Falha ao enviar e-mails.");

      setSuccessMsg("Campanha enviada com sucesso para todos os moradores!");
      setSubject("");
      setMessage("");
      setIsComposing(false);
    } catch (err) {
      alert("Erro ao enviar e-mail. Verifique o console ou o backend.");
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchDestinatarios();
  }, []);

  const destinatariosValidos = moradores.filter(m => m.user?.email);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disparo de E-mails</h1>
          <p className="text-muted-foreground mt-1">Gerencie e envie comunicados para os moradores</p>
        </div>
        <Button variant="outline" onClick={fetchDestinatarios} disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Atualizar Lista"}
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md flex items-center">
          <Send className="w-4 h-4 mr-2" /> {successMsg}
        </div>
      )}

      {/* Área de Composição de E-mail (Condicional) */}
      {isComposing ? (
        <Card className="border-2 border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-4">
          <CardHeader>
            <CardTitle>Nova Mensagem</CardTitle>
            <CardDescription>Escreva o conteúdo do e-mail que será enviado para {destinatariosValidos.length} pessoas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assunto</label>
              <Input
                placeholder="Ex: Aviso de Manutenção"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mensagem</label>
              <Textarea
                className="min-h-[150px]"
                placeholder="Digite o conteúdo do comunicado..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsComposing(false)} disabled={isSending}>
              Cancelar
            </Button>
            <Button onClick={handleSendEmail} disabled={isSending} className="gradient-primary">
              {isSending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {isSending ? "Enviando..." : "Enviar Agora"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card de Ação Principal */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Nova Campanha</CardTitle>
                  <CardDescription>Envie um e-mail para todos os moradores cadastrados</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm font-medium">Resumo do público alvo:</p>
                <div className="text-2xl font-bold text-primary mt-1">
                  {destinatariosValidos.length} <span className="text-sm font-normal text-muted-foreground">destinatários potenciais</span>
                </div>
              </div>
              <Button
                className="w-full gradient-primary hover:opacity-90"
                disabled={isLoading || destinatariosValidos.length === 0}
                onClick={() => setIsComposing(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Criar Campanha
              </Button>
            </CardContent>
          </Card>

          {/* Card de Estatísticas */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Cobertura</CardTitle>
                  <CardDescription>Status dos cadastros de e-mail</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total de Moradores:</span>
                <span className="font-bold">{moradores.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Com E-mail Cadastrado:</span>
                <span className="text-green-600 font-bold">{destinatariosValidos.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sem E-mail:</span>
                <span className="text-red-600 font-bold">{moradores.length - destinatariosValidos.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lista de Destinatários (mantida igual) */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Destinatários</CardTitle>
          <CardDescription>Moradores que receberão os comunicados</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex items-center justify-center p-6 text-red-500 bg-red-50 rounded-md gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>E-mail (Usuário)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <div className="flex justify-center items-center gap-2 text-muted-foreground">
                          <Loader2 className="w-6 h-6 animate-spin" /> Carregando...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : moradores.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        Nenhum morador encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    moradores.map((morador) => (
                      <TableRow key={morador.id}>
                        <TableCell className="font-medium">
                          {morador.nome} {morador.sobrenome}
                        </TableCell>
                        <TableCell>
                          {morador.unidade
                            ? `Bl. ${morador.unidade.bloco} - Apt. ${morador.unidade.apartamento}`
                            : <span className="text-muted-foreground italic">Sem unidade</span>
                          }
                        </TableCell>
                        <TableCell>{morador.user?.email || "—"}</TableCell>
                        <TableCell>
                          {morador.user?.email ? (
                            <Badge variant="default" className="bg-green-600 hover:bg-green-700">Ativo</Badge>
                          ) : (
                            <Badge variant="destructive">Sem E-mail</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Emails;
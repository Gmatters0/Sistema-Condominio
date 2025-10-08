import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

const Emails = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Disparo de E-mails</h1>
        <p className="text-muted-foreground mt-1">Envie comunicados por e-mail</p>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>Novo E-mail em Massa</CardTitle>
              <CardDescription>Configure o envio de e-mails para os moradores</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button className="gradient-primary hover:opacity-90">Criar Campanha</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emails;

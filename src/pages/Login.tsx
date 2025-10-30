import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao Agro Controle",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Erro ao fazer login",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-2">
            <Sprout className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">Agro Controle</CardTitle>
          <CardDescription className="text-base">
            Sistema de Gestão Pecuária e Propriedades Rurais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
            
            <div className="text-center pt-4 border-t">
              <Link to="/install">
                <Button variant="outline" className="w-full gap-2">
                  <Smartphone className="w-4 h-4" />
                  Instalar App no Celular
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

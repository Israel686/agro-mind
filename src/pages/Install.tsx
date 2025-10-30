import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Download, CheckCircle, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-2">
            <Sprout className="w-12 h-12 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">Instalar Agro Controle</CardTitle>
          <CardDescription className="text-base">
            Instale o app no seu celular para acesso rápido e offline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isInstalled ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 p-4 bg-primary/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary" />
                <p className="font-medium text-primary">App já instalado!</p>
              </div>
              <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
                Ir para o Dashboard
              </Button>
            </div>
          ) : isInstallable ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Smartphone className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Acesso Rápido</p>
                    <p className="text-muted-foreground">
                      Acesse direto da tela inicial do celular
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Download className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Funciona Offline</p>
                    <p className="text-muted-foreground">Use o app mesmo sem internet</p>
                  </div>
                </div>
              </div>
              <Button onClick={handleInstall} className="w-full" size="lg">
                Instalar Agora
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-center mb-4">
                  Para instalar o app no seu celular:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="font-bold text-primary">iPhone:</span>
                    <p>Toque em Compartilhar → Adicionar à Tela de Início</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold text-primary">Android:</span>
                    <p>Menu do navegador → Instalar app / Adicionar à tela inicial</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
                Continuar no Navegador
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;

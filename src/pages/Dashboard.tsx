import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, AlertTriangle, Package } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total de Animais",
      value: "342",
      icon: Users,
      change: "+12 este mês",
      color: "text-primary",
    },
    {
      title: "Peso Médio",
      value: "485 kg",
      icon: TrendingUp,
      change: "+8kg desde último mês",
      color: "text-accent",
    },
    {
      title: "Alertas Pendentes",
      value: "5",
      icon: AlertTriangle,
      change: "Vacinação e check-ups",
      color: "text-destructive",
    },
    {
      title: "Movimentações",
      value: "23",
      icon: Package,
      change: "Últimos 7 dias",
      color: "text-secondary",
    },
  ];

  const recentAnimals = [
    { id: "A001", name: "Mimosa", peso: "520 kg", status: "Saudável" },
    { id: "A045", name: "Bela", peso: "480 kg", status: "Vacinado" },
    { id: "A123", name: "Estrela", peso: "465 kg", status: "Saudável" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua propriedade rural</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Animais Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnimals.map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{animal.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {animal.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{animal.peso}</p>
                    <p className="text-sm text-primary">{animal.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas e Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Vacinação Pendente</p>
                  <p className="text-sm text-muted-foreground">
                    3 animais precisam de vacinação esta semana
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Nova Movimentação</p>
                  <p className="text-sm text-muted-foreground">
                    2 animais foram transferidos para o Pasto B
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

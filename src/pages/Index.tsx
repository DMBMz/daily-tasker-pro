import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, CheckCircle2, Users, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // In a real app, you would check authentication status here
  // For demo purposes, we show the landing page

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Smartphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button onClick={() => navigate("/register")}>
              Cadastrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Gerencie suas{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              tarefas
            </span>{" "}
            facilmente
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            TaskFlow é o app mobile-first que torna o gerenciamento de tarefas 
            simples e eficiente. Organize, priorize e conquiste seus objetivos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-semibold shadow-glow"
              onClick={() => navigate("/register")}
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-lg"
              onClick={() => navigate("/dashboard")}
            >
              Ver Demo
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card border-0 shadow-card text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Organização Simples</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Crie, edite e organize suas tarefas com uma interface intuitiva 
                e design mobile-first.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Prioridades Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Defina prioridades e visualize facilmente o que é mais importante 
                para seu dia.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Colaboração</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Compartilhe projetos e colabore com sua equipe de forma eficiente 
                (em breve).
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-card rounded-2xl p-8 md:p-12 text-center shadow-card">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para ser mais produtivo?
          </h3>
          <p className="text-muted-foreground mb-8 text-lg max-w-lg mx-auto">
            Junte-se a milhares de usuários que já estão organizando suas vidas 
            com o TaskFlow.
          </p>
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg font-semibold shadow-glow"
            onClick={() => navigate("/register")}
          >
            Criar Conta Grátis
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;

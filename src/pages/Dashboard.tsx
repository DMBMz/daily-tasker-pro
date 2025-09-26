import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  User,
  Settings,
  LogOut,
  Shield
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        // Fallback to mock data for development
        setTasks([
          {
            id: "1",
            title: "Revisar relatório mensal",
            description: "Analisar os dados de performance do último mês e preparar apresentação",
            dueDate: "2024-09-25",
            priority: "high" as const,
            completed: false,
          },
          {
            id: "2", 
            title: "Reunião com equipe", 
            description: "Weekly sync com a equipe de desenvolvimento",
            dueDate: "2024-09-24",
            priority: "medium" as const,
            completed: false,
          },
          {
            id: "3",
            title: "Atualizar documentação",
            description: "Revisar e atualizar a documentação do projeto",
            dueDate: "2024-09-26",
            priority: "low" as const,
            completed: true,

          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Keep mock data for development
    } finally {
      setIsLoading(false);
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const highPriorityTasks = tasks.filter(task => task.priority === "high" && !task.completed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">TaskFlow</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                <Shield className="mr-2 h-4 w-4" />
                Painel Admin
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{pendingTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{completedTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-priority-high" />
                <div>
                  <p className="text-2xl font-bold">{highPriorityTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Alta prioridade</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Task Button */}
        <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
          <DialogTrigger asChild>
            <Button className="w-full h-14 text-base font-semibold shadow-glow" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </DialogContent>
        </Dialog>

        {/* Tasks List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Suas Tarefas</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Todas</DropdownMenuItem>
                <DropdownMenuItem>Pendentes</DropdownMenuItem>
                <DropdownMenuItem>Concluídas</DropdownMenuItem>
                <DropdownMenuItem>Por prioridade</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Carregando tarefas...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma tarefa encontrada</h3>
                <p className="text-muted-foreground mb-4">Comece criando sua primeira tarefa!</p>
                <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar primeira tarefa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <TaskForm onClose={() => setShowTaskForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
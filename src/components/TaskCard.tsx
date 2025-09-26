import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  MoreVertical, 
  Edit, 
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-priority-high border-priority-high/20 bg-priority-high/10";
      case "medium":
        return "text-priority-medium border-priority-medium/20 bg-priority-medium/10";
      case "low":
        return "text-priority-low border-priority-low/20 bg-priority-low/10";
      default:
        return "text-muted-foreground border-muted/20 bg-muted/10";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-3 h-3" />;
      case "medium":
        return <Clock className="w-3 h-3" />;
      case "low":
        return <CheckCircle2 className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoje";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Amanhã";
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  const handleToggleComplete = async () => {
    // TODO: Replace with your API call
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      
      if (response.ok) {
        toast({
          title: "Tarefa atualizada",
          description: task.completed ? "Tarefa marcada como pendente" : "Tarefa concluída!",
        });
        // Refresh the page or update local state
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a tarefa",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    // TODO: Implement edit modal or redirect to edit page
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade de edição será implementada",
    });
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    
    // TODO: Replace with your API call
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        toast({
          title: "Tarefa excluída",
          description: "A tarefa foi removida com sucesso",
        });
        // Refresh the page or update local state
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a tarefa",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={cn(
      "bg-gradient-card border-0 shadow-card transition-all duration-200",
      task.completed && "opacity-60"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
            aria-label={`Marcar tarefa "${task.title}" como ${task.completed ? 'pendente' : 'concluída'}`}
          />
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className={cn(
                "font-medium text-sm leading-tight",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 p-0 shrink-0 -mr-2"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {task.description && (
              <p className={cn(
                "text-xs text-muted-foreground leading-relaxed",
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs px-2 py-0.5", getPriorityColor(task.priority))}
                >
                  {getPriorityIcon(task.priority)}
                  <span className="ml-1 capitalize">{task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}</span>
                </Badge>
              </div>
              
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
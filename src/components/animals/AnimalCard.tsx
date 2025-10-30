import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, Weight } from "lucide-react";
import { Animal } from "@/pages/Animals";

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
}

export const AnimalCard = ({ animal, onEdit, onDelete }: AnimalCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{animal.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {animal.id}</p>
          </div>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {animal.status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{animal.weight} kg</span>
            <span className="text-muted-foreground">• {animal.sex}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Nasc: {new Date(animal.birthDate).toLocaleDateString("pt-BR")}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Localização: </span>
            <span className="font-medium">{animal.block}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(animal)} className="flex-1">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(animal.id)}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

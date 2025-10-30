import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { AnimalCard } from "@/components/animals/AnimalCard";
import { AnimalDialog } from "@/components/animals/AnimalDialog";

export interface Animal {
  id: string;
  name: string;
  weight: number;
  sex: "Macho" | "Fêmea";
  birthDate: string;
  status: string;
  block: string;
}

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: "A001",
      name: "Mimosa",
      weight: 520,
      sex: "Fêmea",
      birthDate: "2021-03-15",
      status: "Saudável",
      block: "Pasto A",
    },
    {
      id: "A045",
      name: "Bela",
      weight: 480,
      sex: "Fêmea",
      birthDate: "2021-07-22",
      status: "Vacinado",
      block: "Pasto B",
    },
    {
      id: "A123",
      name: "Estrela",
      weight: 465,
      sex: "Fêmea",
      birthDate: "2022-01-10",
      status: "Saudável",
      block: "Pasto A",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveAnimal = (animal: Animal) => {
    if (editingAnimal) {
      setAnimals(animals.map((a) => (a.id === animal.id ? animal : a)));
    } else {
      setAnimals([...animals, animal]);
    }
    setIsDialogOpen(false);
    setEditingAnimal(null);
  };

  const handleEditAnimal = (animal: Animal) => {
    setEditingAnimal(animal);
    setIsDialogOpen(true);
  };

  const handleDeleteAnimal = (id: string) => {
    setAnimals(animals.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestão do Rebanho</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe todos os animais da propriedade
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Cadastrar Animal
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Buscar por nome, ID ou bloco..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onEdit={handleEditAnimal}
            onDelete={handleDeleteAnimal}
          />
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum animal encontrado
        </div>
      )}

      <AnimalDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        animal={editingAnimal}
        onSave={handleSaveAnimal}
      />
    </div>
  );
};

export default Animals;

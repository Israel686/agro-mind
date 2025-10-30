import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Animal } from "@/pages/Animals";
import { useToast } from "@/hooks/use-toast";

interface AnimalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animal: Animal | null;
  onSave: (animal: Animal) => void;
}

export const AnimalDialog = ({ open, onOpenChange, animal, onSave }: AnimalDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Animal>({
    id: "",
    name: "",
    weight: 0,
    sex: "Fêmea",
    birthDate: "",
    status: "Saudável",
    block: "",
  });

  useEffect(() => {
    if (animal) {
      setFormData(animal);
    } else {
      setFormData({
        id: `A${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
        name: "",
        weight: 0,
        sex: "Fêmea",
        birthDate: "",
        status: "Saudável",
        block: "",
      });
    }
  }, [animal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.weight || !formData.birthDate || !formData.block) {
      toast({
        title: "Erro ao salvar",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: "✅ Sucesso",
      description: animal ? "Animal atualizado com sucesso" : "Animal cadastrado com sucesso",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{animal ? "Editar Animal" : "Cadastrar Novo Animal"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">ID do Animal *</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={!!animal}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sexo *</Label>
                <Select
                  value={formData.sex}
                  onValueChange={(value: "Macho" | "Fêmea") =>
                    setFormData({ ...formData, sex: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Macho">Macho</SelectItem>
                    <SelectItem value="Fêmea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saudável">Saudável</SelectItem>
                  <SelectItem value="Vacinado">Vacinado</SelectItem>
                  <SelectItem value="Isolado">Isolado</SelectItem>
                  <SelectItem value="Em Tratamento">Em Tratamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="block">Bloco/Pastagem *</Label>
              <Select
                value={formData.block}
                onValueChange={(value) => setFormData({ ...formData, block: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o bloco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pasto A">Pasto A</SelectItem>
                  <SelectItem value="Pasto B">Pasto B</SelectItem>
                  <SelectItem value="Pasto C">Pasto C</SelectItem>
                  <SelectItem value="Curral">Curral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

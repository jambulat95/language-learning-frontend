import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (file: File) => void;
  isLoading?: boolean;
}

export function ImportDialog({
  open,
  onOpenChange,
  onImport,
  isLoading,
}: ImportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenChange(value: boolean) {
    if (!value) {
      setSelectedFile(null);
    }
    onOpenChange(value);
  }

  function handleSubmit() {
    if (selectedFile) {
      onImport(selectedFile);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Импорт карточек из CSV</DialogTitle>
          <DialogDescription>
            Загрузите CSV-файл с колонками: front, back, example (необязательно).
            Поддерживаемые разделители: запятая, табуляция, точка с запятой.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.tsv,.txt"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="size-4" />
            {selectedFile ? selectedFile.name : "Выберите файл..."}
          </Button>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? "Импорт..." : "Импортировать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

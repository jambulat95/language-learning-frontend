import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { LanguageLevel } from "@/types";

const LEVELS: LanguageLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

interface SetsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  level: string;
  onLevelChange: (value: string) => void;
}

export function SetsFilters({
  search,
  onSearchChange,
  level,
  onLevelChange,
}: SetsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск наборов..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={level} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Все уровни" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все уровни</SelectItem>
          {LEVELS.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

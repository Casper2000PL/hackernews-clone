import { useNavigate } from "@tanstack/react-router";
import { ArrowUpIcon } from "lucide-react";
import { Order, SortBy } from "@/shared/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchParams {
  sortBy: SortBy;
  order: Order;
}

export function SortBar({ sortBy, order }: SearchParams) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-center justify-between">
      <Select
        value={sortBy}
        onValueChange={(sortBy: SortBy) =>
          navigate({
            to: ".",
            search: (prev: SearchParams) => ({
              ...prev,
              sortBy,
            }),
          })
        }
      >
        <SelectTrigger className="bg-background w-[180px] cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="points" className="cursor-pointer">
            Points
          </SelectItem>
          <SelectItem value="recent" className="cursor-pointer">
            Recent
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          navigate({
            to: ".",
            search: (prev: SearchParams) => ({
              ...prev,
              order: order === "asc" ? "desc" : "asc",
            }),
          });
        }}
        aria-label={order === "asc" ? "Sort Descending" : "Sort Ascending"}
      >
        <ArrowUpIcon
          className={cn(
            "size-4 transition-transform duration-300",
            order === "desc" && "rotate-180",
          )}
        />
      </Button>
    </div>
  );
}

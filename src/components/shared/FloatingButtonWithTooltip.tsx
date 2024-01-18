import { type LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@mood/components/ui/tooltip";
import { Button } from "../ui/button";
import { cn } from "@mood/utils";

export function FloatingButtonWithTooltip({
  tooltip,
  onClick,
  className,
  Icon,
  right,
  bottom,
}: {
  tooltip: string;
  onClick: () => void;
  className?: string;
  Icon: LucideIcon;
  right: number;
  bottom: number;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        asChild
        className={`fixed bottom-${bottom} right-${right}`}
      >
        <Button
          aria-label={tooltip}
          className={cn(
            `fixed h-16 w-16 animate-fade-in-95 rounded-full bg-slate-200 opacity-95 shadow-md transition-all duration-300 ease-in-out hover:-translate-x-3 hover:scale-105 hover:bg-current hover:bg-opacity-95 hover:shadow-xl dark:bg-slate-700`,
            `bottom-${bottom} right-${right}`,
            className,
          )}
          onClick={onClick}
        >
          <Icon className="size-7 stroke-primary stroke-1" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        className="mb-2 animate-fade-in-95 text-primary opacity-95 shadow-md"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

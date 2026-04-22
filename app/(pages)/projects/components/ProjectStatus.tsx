import { Badge } from "@ritwikdax/uicc";
import { Project } from "@/app/interfaces/entity";

interface ProjectStatusProps {
  status: Project["status"];
}

export default function ProjectStatus({ status }: ProjectStatusProps) {
  const statusConfig: Record<
    Project["status"],
    { label: string; color: "green" | "red" | "blue" | "orange" | "gray" }
  > = {
    open: { label: "Open", color: "green" },
    close: { label: "Closed", color: "gray" },
    reopen: { label: "Reopened", color: "blue" },
    withdrawn: { label: "Withdrawn", color: "red" },
    on_hold: { label: "On Hold", color: "orange" },
    unknown: { label: "Unknown", color: "gray" },
  };

  const config = statusConfig[status];

  return (
    <Badge size="2" color={config.color}>
      {config.label}
    </Badge>
  );
}

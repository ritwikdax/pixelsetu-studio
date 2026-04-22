import { Badge } from "@ritwikdax/uicc";
import { Project } from "@/app/interfaces/entity";

interface ProjectBookingCategoryProps {
  category: Project["bookingCategory"];
}

const CATEGORY_CONFIG: Record<
  Project["bookingCategory"],
  {
    label: string;
  }
> = {
  wedding: { label: "Wedding" },
  pre_wedding: { label: "Pre-Wedding" },
  post_wedding: { label: "Post-Wedding" },
  anniversary: { label: "Anniversary" },
  birthday: { label: "Birthday" },
  corporate_shoot: { label: "Corporate Shoot" },
  baby_bump: { label: "Baby Bump" },
  rice_ceremony: { label: "Rice Ceremony" },
  engagement: { label: "Engagement" },
  thread_ceremony: { label: "Thread Ceremony" },
  reception: { label: "Reception" },
  newborn_shoot: { label: "Newborn Shoot" },
  baby_shower: { label: "Baby Shower" },
  aiburo_vaat: { label: "Aiburo Vaat" },
  kids_shoot: { label: "Kids Shoot" },
  funeral: { label: "Funeral" },
  saadh: { label: "Saadh" },
  other: { label: "Other" },
};

export default function ProjectBookingCategory({
  category,
}: ProjectBookingCategoryProps) {
  const config = CATEGORY_CONFIG[category];

  if (!config) {
    return null;
  }

  return (
    <Badge size="2" variant="outline" color="gray">
      {config.label}
    </Badge>
  );
}

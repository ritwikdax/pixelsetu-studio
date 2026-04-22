"use client";
import { StandardCard } from "@ritwikdax/uicc";
import { FaBolt } from "react-icons/fa";
import {
  EnvelopeOpenIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ActionItemList } from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";
import { useAuthContextQuery } from "../queries/useAuthContext";

export default function UserActions() {
  const router = useRouter();

  return (
    <StandardCard title="Actions" icon={<FaBolt />}>
      <ActionItemList
        actionItems={[
          {
            id: "projects",
            label: "Projects",
            icon: <EnvelopeOpenIcon width="16" height="16" />,
            onClick: () => router.push("/projects"),
          },
          {
            id: "albums",
            label: "Albums",
            icon: <EnvelopeOpenIcon width="16" height="16" />,
            onClick: () => router.push("/albums"),
          },
          {
            id: "add-project",
            label: "Add Project",
            icon: <Pencil1Icon width="16" height="16" />,
            onClick: () => router.push("/projects/add"),
          },
        ]}
      />
    </StandardCard>
  );
}

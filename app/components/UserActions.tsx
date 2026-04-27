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
import { GrDocumentText } from "react-icons/gr";
import { RiAddBoxLine } from "react-icons/ri";
import { LuBookHeart } from "react-icons/lu";

export default function UserActions() {
  const router = useRouter();

  return (
    <StandardCard title="Actions" icon={<FaBolt />}>
      <ActionItemList
        actionItems={[
          {
            id: "projects",
            label: "Projects",
            icon: <GrDocumentText />,
            onClick: () => router.push("/projects"),
          },
          {
            id: "albums",
            label: "Albums",
            icon: <LuBookHeart/>,
            onClick: () => router.push("/albums"),
          },
          {
            id: "add-project",
            label: "Add Project",
            icon: <RiAddBoxLine/>,
            onClick: () => router.push("/projects/add"),
          },
        ]}
      />
    </StandardCard>
  );
}

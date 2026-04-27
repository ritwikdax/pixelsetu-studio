"use client";
import { Flex } from "@ritwikdax/uicc";
import SidePanelNavigation from "./SidePanelNavigation";
import TopNav from "./TopNav";
import { usePathname } from "next/navigation";
import { LuBookHeart } from "react-icons/lu";
import { TbCurrencyRupee } from "react-icons/tb";
import { RiAddBoxLine } from "react-icons/ri";
import { useHamburgerMenu } from "../hooks/useHamburgerMenu";
import { RiHome9Line } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { open } = useHamburgerMenu();
  return (
    <>
      <TopNav />
      <Flex direction="row">
        <SidePanelNavigation
          items={[
            {
              id: "1",
              label: "Home",
              icon: <RiHome9Line />,
              href: "/",
              isActive: pathname === "/",
            },
            {
              id: "2",
              label: "Projects",
              icon: <GrDocumentText />,
              href: "/projects",
              isActive: pathname === "/projects",
            },
            {
              id: "3",
              label: "Add New Project",
              icon: <RiAddBoxLine />,
              href: "/projects/add",
              isActive: pathname === "/projects/add",
            },
            {
              id: "4",
              label: "Albums",
              icon: <LuBookHeart />,
              href: "/albums",
              isActive: pathname === "/albums",
            },
            {
              id: "5",
              label: "Payments History",
              icon: <TbCurrencyRupee />,
              href: "/payments",
              isActive: pathname === "/payments",
            },
          ]}
        />
        <div
          className="w-full"
          style={{
            marginLeft: open ? "75px" : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          {children}
        </div>
      </Flex>
    </>
  );
}

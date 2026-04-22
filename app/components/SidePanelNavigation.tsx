import { useHamburgerMenu } from "../(pages)/projects/hooks/useHamburgerMenu";
import { Box, Flex, Tooltip, Text } from "@ritwikdax/uicc";
import Link from "next/link";

interface SidePanelNavigationProps {
  items: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    isActive?: boolean;
  }>;
}

function TooltipContent({ label }: { label: string }) {
  return (
    <Box
      style={{
        padding: "var(--space-2) var(--space-4)",
        minWidth: "80px",
        borderRadius: "var(--radius-2)",
      }}
    >
      <Text weight="medium" size="2">
        {label}
      </Text>
    </Box>
  );
}

export default function SidePanelNavigation({
  items,
}: SidePanelNavigationProps) {
  const { open } = useHamburgerMenu();

  return (
    <nav
      style={{
        position: "fixed",
        top: "60px",
        left: "0",
        height: "calc(100vh - 64px)",
        width: open ? "75px" : "0",
        transition: "width 0.3s ease, opacity 0.3s ease, padding 0.3s ease",
        opacity: open ? 1 : 0,
        overflow: "hidden",
        backgroundColor: "var(--gray-2)",
        borderRadius: "var(--radius-3)",
        padding: open ? "var(--space-3)" : "0",
        zIndex: 10,
      }}
    >
      <Flex direction="column" gap="2">
        {items.map((item) => (
          <Tooltip
            key={item.id}
            side="right"
            content={<TooltipContent label={item.label} />}
          >
            <Link href={item.href} style={{ textDecoration: "none" }}>
              <Box
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-2)",
                  cursor: "pointer",
                  backgroundColor: item.isActive
                    ? "var(--accent-3)"
                    : undefined,
                  transition: "background-color 0.2s ease",
                  color: item.isActive ? "var(--accent-11)" : undefined,
                  fontSize: "24px",
                }}
                className="hover-item"
              >
                {item.icon}
              </Box>
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </nav>
  );
}

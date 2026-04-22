"use client";
import { Popover, Button, Flex, Box, Text, MenuItem } from "@ritwikdax/uicc";
import { FiMoreVertical } from "react-icons/fi";

export interface MenuItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface ThreeDotActionsProps {
  items: MenuItem[];
  onItemClick: (value: string) => void;
}

export default function ThreeDotActions({
  items,
  onItemClick,
}: ThreeDotActionsProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          variant="ghost"
          aria-label="Actions menu"
          radius="full"
          onClick={(e) => e.stopPropagation()}
        >
          <FiMoreVertical size={20} />
        </Button>
      </Popover.Trigger>

      <Popover.Content align="end" style={{ minWidth: 200 }}>
        <Flex direction="column" gap="1" p="3">
          {items.map((item) => (
            <MenuItem
              key={item.value}
              icon={item.icon}
              label={item.label}
              onClick={(e) => {
                e.stopPropagation();
                if (!item.disabled) {
                  onItemClick(item.value);
                }
              }}
            />
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

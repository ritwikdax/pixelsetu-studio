"use client";
import {
  Badge,
  Box,
  Button,
  Flex,
  MenuItem,
  Popover,
  Text,
} from "@ritwikdax/uicc";
import { Album } from "@/app/interfaces/entity";
import SelectionStatus from "@/app/(pages)/albums/components/SelectionStatus";
import { FiChevronDown, FiMoreVertical } from "react-icons/fi";

interface AlbumCardProps {
  album: Album;
  onDownloadList?: () => void;
  onDownloadScript?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onClone?: () => void;
}

const statusConfig: Record<
  Album["status"],
  { label: string; color: "gray" | "blue" | "green" }
> = {
  not_started: { label: "Not Started", color: "gray" },
  in_progress: { label: "In Progress", color: "blue" },
  submitted: { label: "Submitted", color: "green" },
};

export default function AlbumCard({
  album,
  onDownloadList,
  onDownloadScript,
  onEdit,
  onDelete,
  onClone,
}: AlbumCardProps) {
  const { label, color } = statusConfig[album.status || "not_started"];

  return (
    <Box
      p="4"
      style={{
        border: "1px solid var(--gray-a5)",
        borderRadius: "var(--radius-3)",
      }}
    >
      <Flex direction="column" gap="5">
        {/* Header: name + status + kebab menu */}
        <Flex justify="between" align="center">
          <Flex align="center" gap="2">
            <Text size="3" weight="bold">
              {album.name}
            </Text>
            <Badge color={color} size="2">
              {label}
            </Badge>
          </Flex>

          <Popover.Root>
            <Popover.Trigger>
              <Button
                variant="ghost"
                color="gray"
                size="1"
                aria-label="Album actions"
              >
                <FiMoreVertical size={16} />
              </Button>
            </Popover.Trigger>
            <Popover.Content align="end" style={{ minWidth: 160 }}>
              <Flex direction="column" gap="1" p="2">
                <MenuItem label="Edit" onClick={() => onEdit?.()} />
                <MenuItem label="Delete" onClick={() => onDelete?.()} />
                <MenuItem label="Clone" onClick={() => onClone?.()} />
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>

        {/* Counter + Actions row */}
        <Flex justify="between" align="start">
          {/* Left: isSelectionAllowed + maxSelectionCount info */}
          <Flex
            direction="column"
            gap="2"
            justify="center"
            style={{ width: "fit-content" }}
          >
            <SelectionStatus isSelectionAllowed={album.isSelectionAllowed} />
            <Text size="4" weight="bold" color="gray">
              Max: {album.maxSelectionCount}
            </Text>
          </Flex>

          {/* Right: counter above actions */}
          <Flex direction="column" gap="5" align="center">
            <Flex direction="column" gap="1" align="center">
              <Text size="7" weight="bold" style={{ color: "var(--accent-9)" }}>
                {album.alreadySelectedCount ?? 0} / {album.maxSelectionCount}
              </Text>

              <Text size="1" color="gray">
                images selected for album / editing
              </Text>
            </Flex>

            <Popover.Root>
              <Popover.Trigger>
                <Button variant="outline" color="gray" size="2">
                  Actions <FiChevronDown />
                </Button>
              </Popover.Trigger>

              <Popover.Content align="end" style={{ minWidth: 180 }}>
                <Flex direction="column" gap="1" p="2">
                  <MenuItem
                    label="Download List"
                    onClick={() => onDownloadList?.()}
                  />
                  <MenuItem
                    label="Download Script"
                    onClick={() => onDownloadScript?.()}
                  />
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

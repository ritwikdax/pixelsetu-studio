import { Flex, Text } from "@ritwikdax/uicc";
import { ArchiveIcon } from "@radix-ui/react-icons";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      py="9"
      style={{ minHeight: "300px" }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--gray-a3)",
        }}
      >
        <ArchiveIcon width="32" height="32" color="var(--gray-a8)" />
      </Flex>
      <Flex
        direction="column"
        align="center"
        gap="1"
        style={{ maxWidth: "400px" }}
      >
        <Text size="4" weight="bold" align="center">
          {title}
        </Text>
        <Text size="2" color="gray" align="center" mt="5">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
}

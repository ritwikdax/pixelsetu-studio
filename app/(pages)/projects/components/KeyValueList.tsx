import { Flex, Text, Badge } from "@ritwikdax/uicc";

interface KeyValueListProps {
  data: Record<string, any>;
  size?: "1" | "2" | "3";
  labelWidth?: string;
  omitKeys?: string[];
  customRenderers?: Record<
    string,
    (value: any, key: string) => React.ReactNode
  >;
}

/**
 * Converts camelCase or snake_case to Title Case
 */
function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Renders a value based on its type
 */
function renderValue(value: any): React.ReactNode {
  if (value === null || value === undefined) {
    return (
      <Text color="gray" size="2">
        —
      </Text>
    );
  }

  if (typeof value === "boolean") {
    return (
      <Badge color={value ? "green" : "gray"} size="1">
        {value ? "Yes" : "No"}
      </Badge>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <Text color="gray" size="2">
          (empty)
        </Text>
      );
    }
    return (
      <Flex direction="column" gap="1">
        {value.map((item, index) => (
          <Text key={index} size="2">
            • {String(item)}
          </Text>
        ))}
      </Flex>
    );
  }

  if (typeof value === "object") {
    return (
      <Text size="2" color="gray">
        {JSON.stringify(value, null, 2)}
      </Text>
    );
  }

  if (typeof value === "string" && value.length === 0) {
    return (
      <Text color="gray" size="2">
        (empty)
      </Text>
    );
  }

  return (
    <Text size="2" weight="regular">
      {String(value)}
    </Text>
  );
}

export default function KeyValueList({
  data,
  size = "2",
  labelWidth = "200px",
  omitKeys = [],
  customRenderers = {},
}: KeyValueListProps) {
  const entries = Object.entries(data).filter(
    ([key]) => !omitKeys.includes(key),
  );

  if (entries.length === 0) {
    return (
      <Flex justify="center" align="center" p="4">
        <Text color="gray" size="2">
          No data to display
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="3">
      {entries.map(([key, value]) => (
        <Flex key={key} gap="4" align="start">
          <Flex style={{ minWidth: labelWidth, maxWidth: labelWidth }}>
            <Text size={size} weight="medium" color="gray">
              {formatKey(key)}
            </Text>
          </Flex>
          <Flex style={{ flex: 1 }}>
            {customRenderers[key]
              ? customRenderers[key](value, key)
              : renderValue(value)}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

import { Flex, Text } from "@ritwikdax/uicc";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

interface SelectionStatusProps {
  isSelectionAllowed: boolean;
}

export default function SelectionStatus({
  isSelectionAllowed,
}: SelectionStatusProps) {
  return (
    <Flex
      align="center"
      gap="1"
      style={{
        color: isSelectionAllowed ? "var(--green-11)" : "var(--gray-11)",
      }}
    >
      {isSelectionAllowed ? (
        <FiCheckCircle size={16} />
      ) : (
        <FiXCircle size={16} />
      )}
      <Text size="2" weight="medium" style={{ color: "inherit" }}>
        {isSelectionAllowed ? "Selection Allowed" : "Selection Not Allowed"}
      </Text>
    </Flex>
  );
}

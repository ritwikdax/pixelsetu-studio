"use client";
import { Box, Button, Flex, MenuItem, Popover, Text } from "@ritwikdax/uicc";
import { Payment } from "@/app/interfaces/entity";
import { FiMoreVertical } from "react-icons/fi";
import { FaMobileScreen, FaMoneyBillWave } from "react-icons/fa6";

interface PaymentCardProps {
  payment: Payment;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PaymentCard({
  payment,
  onEdit,
  onDelete,
}: PaymentCardProps) {
  const formattedDate = new Date(payment.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(payment.amount);

  return (
    <Box py="2">
      <Flex justify="between" align="center" gap="3">
        {/* Left: mode icon + label + date */}
        <Flex align="center" gap="3">
          <Flex
            align="center"
            justify="center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-full)",
              background: "var(--gray-a3)",
              color: "var(--gray-11)",
              flexShrink: 0,
            }}
          >
            {payment.mode === "online" ? (
              <FaMobileScreen size={14} />
            ) : (
              <FaMoneyBillWave size={16} />
            )}
          </Flex>
          <Flex direction="column" gap="0">
            <Text size="2" weight="medium">
              {payment.mode === "online" ? "Online" : "Cash"}
            </Text>
            <Text size="1" color="gray">
              {formattedDate}
            </Text>
          </Flex>
        </Flex>

        {/* Right: amount + kebab */}
        <Flex align="center" gap="3">
          <Text size="3" weight="bold" style={{ color: "var(--green-11)" }}>
            +{formattedAmount}
          </Text>
          <Popover.Root>
            <Popover.Trigger>
              <Button
                variant="ghost"
                color="gray"
                size="1"
                aria-label="Payment actions"
              >
                <FiMoreVertical size={16} />
              </Button>
            </Popover.Trigger>
            <Popover.Content align="end" style={{ minWidth: 160 }}>
              <Flex direction="column" gap="1" p="2">
                <MenuItem label="Edit" onClick={() => onEdit?.()} />
                <MenuItem label="Delete" onClick={() => onDelete?.()} />
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
      </Flex>
    </Box>
  );
}

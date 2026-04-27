"use client";
import { useProjectById } from "@/app/queries/useProjectById";
import { usePaymentsByProjectId } from "@/app/queries/usePaymentsByProjectId";
import {
  Button,
  Flex,
  Loading,
  Separator,
  StandardCard,
  Text,
} from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";
import { FaIndianRupeeSign } from "react-icons/fa6";
import PaymentCard from "@/app/components/PaymentCard";
import EmptyState from "@/app/components/EmptyState";
import { useDeletePaymentDialog } from "@/app/hooks/useDeletePaymentDialog";

export default function PaymentsList() {
  const { data: project, isLoading } = useProjectById();
  const { data: payments, isLoading: isPaymentsLoading } =
    usePaymentsByProjectId();
  const router = useRouter();
  const deletePaymentDialog = useDeletePaymentDialog();

  if (isLoading || isPaymentsLoading) {
    return <Loading />;
  }

  const totalReceived = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0;
  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalReceived);

  return (
    <StandardCard
      title="Payments"
      icon={<FaIndianRupeeSign />}
      action={
        <Button
          onClick={() => router.push(`/projects/${project?.id}/add-payment`)}
          variant="outline"
        >
          Add Payment
        </Button>
      }
    >
      <Flex direction="column" gap="4">
        {payments && payments.length > 0 && (
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              {payments.length} payment{payments.length !== 1 ? "s" : ""}
            </Text>
            <Text size="3" weight="bold">
              Total: {formattedTotal}
            </Text>
          </Flex>
        )}

        {payments?.length === 0 ? (
          <EmptyState
            title="No Payments"
            description="No payments history has been found against this project"
          />
        ) : (
          <Flex direction="column">
            {payments?.map((payment, index) => (
              <>
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onEdit={() =>
                    router.push(
                      `/projects/${project?.id}/edit-payment/${payment.id}`,
                    )
                  }
                  onDelete={() => deletePaymentDialog.show(payment.id)}
                />
                {index < payments.length - 1 && <Separator size="4" />}
              </>
            ))}
          </Flex>
        )}
      </Flex>
    </StandardCard>
  );
}

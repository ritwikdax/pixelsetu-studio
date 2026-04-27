"use client";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  AlertTitle,
  Button,
  DatePicker,
  FieldError,
  FieldLabel,
  Flex,
  Loading,
  StandardCard,
  Switch,
  Text,
  TextField,
} from "@ritwikdax/uicc";
import { RadioCards } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Payment } from "@/app/interfaces/entity";
import { useCreatePaymentMutation } from "@/app/mutations/useCreatePaymentMutation";
import { useUpdatePaymentMutation } from "@/app/mutations/useUpdatePaymentMutation";
import { usePaymentById } from "@/app/queries/usePaymentById";
import { useProjectById } from "../queries/useProjectById";
import {
  FaIndianRupeeSign,
  FaMobileScreen,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { dateFormatter } from "../utils";

type PaymentFormData = Pick<
  Payment,
  "amount" | "date" | "mode" | "projectId" | "projectName" | "notify"
>;

const PAYMENT_FORM_DEFAULT_VALUES: Partial<PaymentFormData> = {
  mode: "online",
  notify: true,
  date: new Date(),
};

interface PaymentFormProps {
  defaultValues?: Partial<PaymentFormData>;
  onSubmit: (data: PaymentFormData) => void | Promise<void>;
  isLoading?: boolean;
  isEditMode?: boolean;
}

function PaymentForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  isEditMode = false,
}: PaymentFormProps) {
  const router = useRouter();
  const { projectId } = useParams();
  const { data: project } = useProjectById();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({ defaultValues, mode: "onChange" });

  const handleFormSubmit = (data: PaymentFormData) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Flex direction="column" gap="5">
        {/* Project info banner */}
        {project && (
          <Alert severity="info">
            <AlertTitle>Project: {project.name}</AlertTitle>
            Payment will be recorded against this project.
          </Alert>
        )}

        {/* Hidden fields */}
        <input type="hidden" {...register("projectId")} />
        <input type="hidden" {...register("projectName")} />

        {/* Amount */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Amount (₹)" required />
          <TextField.Root
            size="3"
            type="number"
            placeholder="e.g. 5000"
            min={1}
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
              valueAsNumber: true,
            })}
            color={errors.amount ? "red" : undefined}
          />
          <FieldError message={errors.amount?.message} />
        </Flex>

        {/* Date */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Payment Date" required />
          <Controller
            name="date"
            control={control}
            rules={{ required: "Payment date is required" }}
            render={({ field }) => (
              <DatePicker
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date)}
                placeholder="Select payment date"
                maxDate={new Date()}
                dateFormat={dateFormatter}
              />
            )}
          />
          <FieldError message={errors.date?.message} />
        </Flex>

        {/* Mode */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Payment Mode" required />
          <Controller
            name="mode"
            control={control}
            rules={{ required: "Payment mode is required" }}
            render={({ field }) => (
              <RadioCards.Root
                value={field.value}
                onValueChange={field.onChange}
                columns="2"
                gap="3"
              >
                <RadioCards.Item value="online">
                  <Flex direction="column" gap="1">
                    <Flex align="center" gap="2">
                      <FaMobileScreen size={16} />
                      <Text size="2" weight="bold">
                        Online
                      </Text>
                    </Flex>
                    <Text size="1" color="gray">
                      Card, UPI, Net Banking
                    </Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item value="offline">
                  <Flex direction="column" gap="1">
                    <Flex align="center" gap="2">
                      <FaMoneyBillWave size={16} />
                      <Text size="2" weight="bold">
                        Cash
                      </Text>
                    </Flex>
                    <Text size="1" color="gray">
                      Cash or Cheque
                    </Text>
                  </Flex>
                </RadioCards.Item>
              </RadioCards.Root>
            )}
          />
          <FieldError message={errors.mode?.message} />
        </Flex>

        {/* Notify the user about the payment */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Notify Client" required />
          <Controller
            name="notify"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isEditMode}
              />
            )}
          />
        </Flex>

        {/* Submit */}
        <Flex justify="start" direction="row" gap="2" mt="4">
          <Button
            type="reset"
            size="3"
            variant="outline"
            color="gray"
            onClick={() => router.push(`/projects/${projectId}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="3"
            loading={isLoading || isSubmitting}
            disabled={
              isLoading || isSubmitting || Object.keys(errors).length > 0
            }
          >
            {isLoading || isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

interface ManagePaymentFormProps {
  mode: "create" | "edit";
}

export default function ManagePaymentForm({ mode }: ManagePaymentFormProps) {
  const createMutation = useCreatePaymentMutation();
  const updateMutation = useUpdatePaymentMutation();
  const { data, isLoading: isPaymentLoading } = usePaymentById();
  const { projectId } = useParams();
  const { data: project, isLoading: isProjectLoading } = useProjectById();

  if (mode === "edit" && (isPaymentLoading || isProjectLoading)) {
    return <Loading />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <StandardCard
        title={mode === "create" ? "Add Payment" : "Edit Payment"}
        icon={<FaIndianRupeeSign />}
      >
        <PaymentForm
          isLoading={
            mode === "create"
              ? createMutation.isPending
              : updateMutation.isPending
          }
          isEditMode={mode === "edit"}
          onSubmit={({
            amount,
            date,
            mode: paymentMode,
            notify,
            projectId: pid,
            projectName: pName,
          }) => {
            if (mode === "create") {
              createMutation.mutate({
                amount,
                date,
                mode: paymentMode,
                notify,
                projectId: pid,
                projectName: pName,
              });
            } else {
              updateMutation.mutate({
                amount,
                date,
                mode: paymentMode,
                notify,
              });
            }
          }}
          defaultValues={
            mode === "create"
              ? {
                  ...PAYMENT_FORM_DEFAULT_VALUES,
                  projectId: projectId as string,
                  projectName: project?.name,
                }
              : data
          }
        />
      </StandardCard>
    </div>
  );
}

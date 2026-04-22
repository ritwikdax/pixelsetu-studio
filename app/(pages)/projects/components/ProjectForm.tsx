"use client";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  DatePicker,
  FieldError,
  FieldLabel,
  Flex,
  Select,
  TextField,
} from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";
import { Project } from "@/app/interfaces/entity";
import { dateFormatter } from "@/app/utils";

type ProjectFormData = Omit<Project, "id">;

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => void | Promise<void>;
  isLoading?: boolean;
}

const BOOKING_CATEGORIES = [
  { label: "Wedding", value: "wedding" },
  { label: "Pre Wedding", value: "pre_wedding" },
  { label: "Post Wedding", value: "post_wedding" },
  { label: "Anniversary", value: "anniversary" },
  { label: "Birthday", value: "birthday" },
  { label: "Corporate Shoot", value: "corporate_shoot" },
  { label: "Baby Bump", value: "baby_bump" },
  { label: "Rice Ceremony", value: "rice_ceremony" },
  { label: "Engagement", value: "engagement" },
  { label: "Thread Ceremony", value: "thread_ceremony" },
  { label: "Reception", value: "reception" },
  { label: "Newborn Shoot", value: "newborn_shoot" },
  { label: "Baby Shower", value: "baby_shower" },
  { label: "Aiburo Vaat", value: "aiburo_vaat" },
  { label: "Kids Shoot", value: "kids_shoot" },
  { label: "Funeral", value: "funeral" },
  { label: "Saadh", value: "saadh" },
  { label: "Other", value: "other" },
];

const PROJECT_STATUSES = [
  { label: "Open", value: "open" },
  { label: "Close", value: "close" },
  { label: "Reopen", value: "reopen" },
  { label: "Withdrawn", value: "withdrawn" },
  { label: "On Hold", value: "on_hold" },
  { label: "Unknown", value: "unknown" },
];

export default function ProjectForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({ defaultValues, mode: "onChange" });
  const router = useRouter();

  const handleFormSubmit = (data: ProjectFormData) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Flex direction="column" gap="5">
        {/* Name */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Name" required />
          <TextField.Root
            size="3"
            type="text"
            placeholder="Project name"
            {...register("name", {
              required: "Project name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            color={errors.name ? "red" : undefined}
          />
          <FieldError message={errors.name?.message} />
        </Flex>

        {/* Display Name */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Display Name" required />
          <TextField.Root
            size="3"
            type="text"
            placeholder="Display name"
            {...register("displayName", {
              required: "Display name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            color={errors.displayName ? "red" : undefined}
          />
          <FieldError message={errors.displayName?.message} />
        </Flex>

        {/* Phone */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Phone" required />
          <TextField.Root
            size="3"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9\s\-().]{7,20}$/,
                message: "Enter a valid phone number",
              },
            })}
            color={errors.phone ? "red" : undefined}
          />
          <FieldError message={errors.phone?.message} />
        </Flex>

        {/* Email */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Email" required />
          <TextField.Root
            size="3"
            type="email"
            placeholder="client@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            color={errors.email ? "red" : undefined}
          />
          <FieldError message={errors.email?.message} />
        </Flex>

        {/* Quotation Amount */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Quotation Amount ₹" />
          <TextField.Root
            size="3"
            type="number"
            placeholder="0"
            {...register("quotationAmount", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Amount must be positive",
              },
              max: {
                value: 10000000,
                message: "Amount is too large",
              },
            })}
            color={errors.quotationAmount ? "red" : undefined}
          />
          <FieldError message={errors.quotationAmount?.message} />
        </Flex>

        {/* Booking Category */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Booking Category" required />
          <Controller
            name="bookingCategory"
            control={control}
            rules={{ required: "Booking category is required" }}
            render={({ field }) => (
              <Select.Root
                size="3"
                value={field.value ?? ""}
                onValueChange={(val) => {
                  field.onChange(val);
                }}
              >
                <Select.Trigger placeholder="Select category…" />
                <Select.Content>
                  {BOOKING_CATEGORIES.map((category) => (
                    <Select.Item key={category.value} value={category.value}>
                      {category.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
          <FieldError message={errors.bookingCategory?.message} />
        </Flex>

        {/* Date of Booking */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Date of Booking" required />
          <Controller
            name="dateOfBooking"
            control={control}
            rules={{ required: "Date of booking is required" }}
            render={({ field }) => (
              <DatePicker
                mode="month"
                dateFormat={(date) => {
                  return dateFormatter(date, { includeDay: false });
                }}
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date: Date | undefined) => {
                  field.onChange(date);
                }}
              />
            )}
          />
          <FieldError message={errors.dateOfBooking?.message} />
        </Flex>

        {/* Status */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Status" required />
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select.Root
                size="3"
                value={field.value ?? ""}
                onValueChange={(val) => {
                  field.onChange(val);
                }}
              >
                <Select.Trigger placeholder="Select status…" />
                <Select.Content>
                  {PROJECT_STATUSES.map((status) => (
                    <Select.Item key={status.value} value={status.value}>
                      {status.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
          <FieldError message={errors.status?.message} />
        </Flex>

        {/* Softcopy URL */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Softcopy URL" />
          <TextField.Root
            size="3"
            type="url"
            placeholder="https://example.com/softcopy"
            {...register("softcopyUrl", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Enter a valid URL",
              },
            })}
            color={errors.softcopyUrl ? "red" : undefined}
          />
          <FieldError message={errors.softcopyUrl?.message} />
        </Flex>

        {/* Submit */}
        <Flex justify="start" direction="row" gap="2" mt="4">
          <Button
            type="button"
            size="3"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="3"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting || isLoading ? "Waiting…" : "Save"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

# Core Principles

## React Best Practices

- Use **React functional components**
- Use **TypeScript with strict typing**
- Prefer **composition over inheritance**
- While styling the components, prefer using the styling solution provided by UICC. Avoid adding custom CSS unless absolutely necessary.
- Should use Radix UI componnets which all are available in UICC. Avoid using any other 3rd party component library.
- Tailwindcss should not be used for any kind of visual colour related styling, only use for layout and non colour related styling.

When creating a Form component from a given Interface structure, follow below code example

```tsx
"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  Button,
  FieldError,
  FieldLabel,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";

interface BusinessFormData {
  displayName: string;
  tagline?: string;
  businessEmail: string;
  phone: string;
  alternativePhone?: string;
  country: string;
}

interface BusinessFormProps {
  defaultValues?: Partial<BusinessFormData>;
  onSubmit: (data: BusinessFormData) => void | Promise<void>;
}

export default function BusinessForm({
  defaultValues,
  onSubmit,
}: BusinessFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<BusinessFormData>({ defaultValues, mode: "onChange" });
  const router = useRouter();

  const handleFormSubmit = (data: BusinessFormData) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Flex direction="column" gap="5">
        {/* ── Basic Information ── */}
        <Flex direction="column" gap="1">
          <Text size="3" weight="bold">
            Basic Information
          </Text>
        </Flex>

        {/* Display Name */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Display Name" required />
          <TextField.Root
            size="3"
            type="text"
            placeholder="Acme Corp"
            {...register("displayName", {
              required: "Display name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            color={errors.displayName ? "red" : undefined}
          />
          <FieldError message={errors.displayName?.message} />
        </Flex>

        {/* Tagline */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Tagline" />
          <TextArea
            size="3"
            placeholder="Your business tagline"
            rows={3}
            {...register("tagline")}
          />
        </Flex>

        {/* ── Contact ── */}
        <Flex direction="column" gap="1">
          <Text size="3" weight="bold">
            Contact
          </Text>
        </Flex>

        {/* Business Email */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Business Email" required />
          <TextField.Root
            size="3"
            type="email"
            placeholder="hello@acme.com"
            {...register("businessEmail", {
              required: "Business email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            color={errors.businessEmail ? "red" : undefined}
          />
          <FieldError message={errors.businessEmail?.message} />
        </Flex>

        {/* Phone */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Phone" required />
          <TextField.Root
            size="3"
            type="tel"
            placeholder="+1 (555) 000-0000"
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

        {/* Alternative Phone */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Alternative Phone" />
          <TextField.Root
            size="3"
            type="tel"
            placeholder="+1 (555) 000-0001"
            {...register("alternativePhone", {
              pattern: {
                value: /^\+?[0-9\s\-().]{7,20}$/,
                message: "Enter a valid phone number",
              },
            })}
            color={errors.alternativePhone ? "red" : undefined}
          />
          <FieldError message={errors.alternativePhone?.message} />
        </Flex>

        {/* Country */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Country" required />
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Autocomplete
                size="3"
                options={[]}
                placeholder="Select country…"
                value={field.value ?? ""}
                onValueChange={(val) => {
                  field.onChange(val);
                }}
              />
            )}
          />
          <FieldError message={errors.country?.message} />
        </Flex>

        {/* Submit */}
        <Flex justify="start" direction="row" gap="2" mt="4">
          <Button
            type="reset"
            size="3"
            variant="outline"
            color="gray"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="3"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? "Saving…" : "Save Business"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
```

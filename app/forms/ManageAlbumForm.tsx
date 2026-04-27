"use client";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  AlertTitle,
  Button,
  FieldError,
  FieldLabel,
  Flex,
  Loading,
  RangeSlider,
  StandardCard,
  Switch,
  Text,
  TextField,
} from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Album } from "@/app/interfaces/entity";
import { useCreateAlbumMutation } from "@/app/mutations/useCreateAlbumMutation";
import { useUpdateAlbumMutation } from "@/app/mutations/useUpdateAlbumMutation";
import { useAlbumById } from "@/app/queries/useAlbumById";
import { FaPlus } from "react-icons/fa6";
import { useProjectById } from "../queries/useProjectById";

type AlbumFormData = Pick<
  Album,
  | "name"
  | "isSelectionAllowed"
  | "maxSelectionCount"
  | "projectId"
  | "projectName"
>;

const ALBUM_FORM_DEFAULT_VALUES: Partial<AlbumFormData> = {
  name: "",
  isSelectionAllowed: true,
  maxSelectionCount: 200,
};

interface AlbumFormProps {
  defaultValues?: Partial<AlbumFormData>;
  onSubmit: (data: AlbumFormData) => void | Promise<void>;
  isLoading?: boolean;
}

function AlbumForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: AlbumFormProps) {
  const router = useRouter();
  const { projectId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AlbumFormData>({ defaultValues, mode: "onChange" });

  const isSelectionAllowed = watch("isSelectionAllowed");
  const { data: project } = useProjectById();

  const handleFormSubmit = (data: AlbumFormData) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Flex direction="column" gap="5">
        {project && !project.softcopyUrl && (
          <Alert severity="error">
            <AlertTitle>Missing Softcopy URL</AlertTitle>
            Please add softcopy URL in project details before creating albums.
          </Alert>
        )}

        {/* Project Details Where Album being added as info*/}
        {project && (
          <Alert severity="info">
            <AlertTitle>Project: {project.name}</AlertTitle>
            This new album will be associated with above mentioned project.
          </Alert>
        )}

        {/* Hidden fields */}
        <input type="hidden" {...register("projectId")} />
        <input type="hidden" {...register("projectName")} />

        {/* Album Name */}
        <Flex direction="column" gap="1">
          <FieldLabel label="Album Name" required />
          <TextField.Root
            size="3"
            type="text"
            placeholder="e.g. Wedding Day Highlights"
            {...register("name", {
              required: "Album name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            color={errors.name ? "red" : undefined}
          />
          <FieldError message={errors.name?.message} />
        </Flex>

        {/* Is Selection Allowed */}
        <Flex direction="row" align="center" gap="3">
          <FieldLabel label="Allow Selection" />
          <Controller
            name="isSelectionAllowed"
            control={control}
            render={({ field }) => (
              <Switch
                size="3"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Flex>

        {/* Max Selection Count */}
        <Flex direction="column" gap="2">
          <Flex justify="between" align="center">
            <FieldLabel label="Max Selection Count" />
            <Text size="2" color="gray">
              {watch("maxSelectionCount")}
            </Text>
          </Flex>
          <Controller
            name="maxSelectionCount"
            control={control}
            rules={{
              required: "Max selection count is required",
              min: { value: 1, message: "Must be at least 1" },
            }}
            render={({ field }) => (
              <RangeSlider
                size="2"
                min={0}
                max={500}
                step={10}
                value={[field.value]}
                onValueChange={(vals) => field.onChange(vals[0])}
                disabled={!isSelectionAllowed}
              />
            )}
          />
          <FieldError message={errors.maxSelectionCount?.message} />
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
            Save Album
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

interface ManageAlbumFormProps {
  mode: "create" | "edit";
}

export default function ManageAlbumForm({ mode }: ManageAlbumFormProps) {
  const createMutation = useCreateAlbumMutation();
  const updateMutation = useUpdateAlbumMutation();
  const { data, isLoading } = useAlbumById();
  const { projectId } = useParams();
  const { data: project } = useProjectById();

  if (mode === "edit" && isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <StandardCard
        title={mode === "create" ? "Add Album" : "Edit Album"}
        icon={<FaPlus />}
      >
        <AlbumForm
          isLoading={
            mode === "create"
              ? createMutation.isPending
              : updateMutation.isPending
          }
          onSubmit={({
            name,
            isSelectionAllowed,
            maxSelectionCount,
            projectId: pid,
            projectName: pName,
          }) => {
            if (mode === "create") {
              createMutation.mutate({
                name,
                isSelectionAllowed,
                maxSelectionCount,
                projectId: pid,
                projectName: pName,
              });
            } else {
              updateMutation.mutate({
                name,
                isSelectionAllowed,
                maxSelectionCount,
              });
            }
          }}
          defaultValues={
            mode === "create"
              ? {
                  ...ALBUM_FORM_DEFAULT_VALUES,
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

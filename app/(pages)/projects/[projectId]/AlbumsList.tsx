"use client";
import { useProjectById } from "@/app/queries/useProjectById";
import {
  Box,
  Button,
  Flex,
  Link,
  Loading,
  StandardCard,
  Text,
} from "@ritwikdax/uicc";
import KeyValueList from "../components/KeyValueList";
import { IoDocumentText } from "react-icons/io5";
import { dateFormatter, transform } from "@/app/utils";
import ProjectStatus from "../components/ProjectStatus";
import ProjectBookingCategory from "../components/ProjectBookingCategory";
import { useRouter } from "next/navigation";
import { useAlbumsByProjectId } from "@/app/queries/useAlbumsByProjectId";
import AlbumCard from "@/app/components/AlbumCard";
import EmptyState from "@/app/components/EmptyState";
import { useDeleteAlbumDialog } from "@/app/hooks/useDeleteAlbumDialog";

export default function AlbumsList() {
  const { data: project, isLoading } = useProjectById();
  const { data: albums } = useAlbumsByProjectId();
  const router = useRouter();
  const deleteAlbumDialog = useDeleteAlbumDialog();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <StandardCard
      title="Albums"
      icon={<IoDocumentText />}
      action={
        <Button
          onClick={() => router.push(`/projects/${project?.id}/add-album`)}
          variant="outline"
        >
          Add Album
        </Button>
      }
    >
      <Flex direction="column" gap="4">
        {albums?.length === 0 ? (
          <EmptyState
            title="No Albums"
            description="Please click on the 'Add Album' button to create your first album for this project."
          />
        ) : (
          albums?.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onEdit={() =>
                router.push(`/projects/${project?.id}/edit-album/${album.id}`)
              }
              onDelete={() => deleteAlbumDialog.show(album.id)}
            />
          ))
        )}
      </Flex>
    </StandardCard>
  );
}

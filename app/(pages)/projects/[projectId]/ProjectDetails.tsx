"use client";
import { useProjectById } from "@/app/queries/useProjectById";
import {
  Box,
  Button,
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

export default function ProjectDetails() {
  const { data: project, isLoading } = useProjectById();
  const router = useRouter();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <StandardCard
      title="Project Details"
      icon={<IoDocumentText />}
      action={
        <Button
          onClick={() => router.push(`/projects/edit/${project?.id}`)}
          variant="outline"
        >
          Edit
        </Button>
      }
    >
      <KeyValueList
        data={project || {}}
        omitKeys={["id", "createdAt", "updatedAt", "password"]}
        customRenderers={{
          dateOfBooking: (value) => {
            return (
              <Text>
                {dateFormatter(new Date(value), { includeDay: false })}
              </Text>
            );
          },
          status: (value) => {
            return <ProjectStatus status={value} />;
          },
          bookingCategory: (value) => {
            return <ProjectBookingCategory category={value} />;
          },
          softcopyUrl: (value) => {
            if (!value) {
              return (
                <Text>
                  {" - "}
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/projects/edit/${project?.id}`);
                    }}
                  >
                    Add
                  </Link>
                </Text>
              );
            }
            return (
              <a href={value} target="_blank" rel="noopener noreferrer">
                Download Softcopy
              </a>
            );
          },
        }}
      />
    </StandardCard>
  );
}

"use client";
import { useProjectFilter } from "@/app/hooks/useProjectFilter";
import FilterBar from "./components/FilterBar";
import ProjectsTable from "./components/ProjectsTable";
import { buildProjectsSearchParams } from "@/app/utils";

export default function ProjectsPage() {
  const [filter] = useProjectFilter();
  return (
    <>
      <FilterBar />
      {/* <pre>{JSON.stringify(filter, null, 2)}</pre>
      <pre>{buildProjectsSearchParams(filter)}</pre> */}
      <ProjectsTable />
    </>
  );
}

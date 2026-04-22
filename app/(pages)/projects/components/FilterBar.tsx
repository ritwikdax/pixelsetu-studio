"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Flex,
  Box,
  Text,
  DatePicker,
} from "@ritwikdax/uicc";
import { ProjectFilter } from "@/app/interfaces/app.type";
import { useForm } from "react-hook-form";

export interface FilterBarProps {
  onFiltersChange?: (filters: ProjectFilter) => void;
}

const QUICK_FILTERS = [
  { id: "last-10", label: "Last 10" },
  { id: "last-month", label: "Last Month" },
  { id: "softcopy-pending", label: "Softcopy: Pending" },
  { id: "status-done", label: "Status: Closed" },
  { id: "status-open", label: "Status: Open" },
];

const QUICK_FILTER_MAP: Record<string, Partial<ProjectFilter>> = {
  "last-10": {
    limit: 10,
  }, // This would be handled differently, likely on the backend
  "last-month": {
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  },
  "softcopy-pending": { softcopyUrl: undefined },
  "status-done": { status: "closed" },
  "status-open": { status: "open" },
};

export default function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { getValues, setValue } = useForm<ProjectFilter>({
    defaultValues: {
      searchTerm: "",
      status: undefined,
      bookingCategory: undefined,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setValue("searchTerm", value);
    onFiltersChange?.(getValues());
  };

  const toggleFilter = (filterId: string) => {
    const updated = selectedFilters.includes(filterId)
      ? selectedFilters.filter((id) => id !== filterId)
      : [...selectedFilters, filterId];
    setSelectedFilters(updated);
    onFiltersChange?.(getValues());
  };

  return (
    <Box
      style={{
        borderRadius: "var(--radius-2)",
        paddingBottom: "var(--space-5)",
      }}
    >
      <Flex direction="row" align="center" gap="4">
        <TextField.Root
          size="3"
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <DatePicker mode="month" />
        <Flex gap="2" wrap="wrap" align="center">
          <Text size="2" weight="medium" style={{ color: "var(--gray-11)" }}>
            Quick Filters:
          </Text>
          {QUICK_FILTERS.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              variant={
                selectedFilters.includes(filter.id) ? "solid" : "outline"
              }
              size="1"
            >
              {filter.label}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

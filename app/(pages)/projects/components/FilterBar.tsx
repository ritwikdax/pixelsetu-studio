"use client";
import { useState, useEffect, useRef } from "react";
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
import { dateFormatter } from "@/app/utils";
import { useProjectFilter } from "@/app/hooks/useProjectFilter";

const QUICK_FILTERS = [
  { id: "last-10", label: "Last 10" },
  { id: "softcopy-pending", label: "Softcopy: Pending" },
  { id: "status-open", label: "Status: Open" },
];

const QUICK_FILTER_MAP: Record<string, Partial<ProjectFilter>> = {
  "last-10": {
    limit: 10,
  }, // This would be handled differently, likely on the backend
  "softcopy-pending": { softcopyUrl: false },
  "status-done": { status: "closed" },
  "status-open": { status: "open" },
};

export default function FilterBar() {
  const [, setFilter] = useProjectFilter();
  const { getValues, setValue, watch, unregister } = useForm<ProjectFilter>({
    defaultValues: {
      byMonth: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    },
  });

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const searchQuery = watch("searchTerm") || "";
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Call onFiltersChange on mount with default values
  useEffect(() => {
    // onFiltersChange?.(getValues());
    setFilter(getValues());
  }, []);

  // Debounce search term changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      // Only trigger filter if search has 3+ characters or is empty (cleared)
      if (!searchQuery || searchQuery.length >= 3) {
        setFilter(getValues());
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    if (value.trim() === "") {
      unregister("searchTerm");
    } else {
      setValue("searchTerm", value);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setValue("byMonth", {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    } else {
      unregister("byMonth");
    }
    setFilter(getValues());
  };

  const toggleFilter = (filterId: string) => {
    const isCurrentlySelected = selectedFilters.includes(filterId);

    if (isCurrentlySelected) {
      // Remove filter
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId));

      // Unregister the corresponding form fields
      const filterConfig = QUICK_FILTER_MAP[filterId];
      if (filterConfig) {
        Object.keys(filterConfig).forEach((key) => {
          unregister(key as keyof ProjectFilter);
        });
      }
    } else {
      // Add filter
      setSelectedFilters([...selectedFilters, filterId]);

      // Apply the filter values
      const filterConfig = QUICK_FILTER_MAP[filterId];
      if (filterConfig) {
        Object.entries(filterConfig).forEach(([key, value]) => {
          setValue(key as keyof ProjectFilter, value as any);
        });
      }
    }

    // Call onFiltersChange with updated values
    setTimeout(() => {
      setFilter(getValues());
    }, 0);
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
        <DatePicker
          dateFormat={(date) => dateFormatter(date, { includeDay: false })}
          mode="month"
          defaultValue={new Date()}
          onChange={handleDateChange}
        />
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

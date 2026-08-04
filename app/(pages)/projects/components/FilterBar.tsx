"use client";

import { useCallback, useRef, useState } from "react";
import {
  TextField,
  Button,
  Flex,
  Box,
  Text,
  DatePicker,
} from "@ritwikdax/uicc";
import { ProjectFilter } from "@/app/interfaces/app.type";
import { dateFormatter } from "@/app/utils";
import { useProjectFilter } from "@/app/hooks/useProjectFilter";

const SEARCH_DEBOUNCE_MS = 500;
const MIN_SEARCH_LENGTH = 3;

const QUICK_FILTERS = [
  { id: "last-10", label: "Last 10" },
  { id: "softcopy-pending", label: "Softcopy: Pending" },
  { id: "status-open", label: "Status: Open" },
] as const;

const QUICK_FILTER_MAP: Record<
  (typeof QUICK_FILTERS)[number]["id"],
  Partial<ProjectFilter>
> = {
  "last-10": {
    limit: 10,
    sort: "-createdAt",
  },
  "softcopy-pending": { softcopyUrl: false },
  "status-open": { status: "open" },
};

function isQuickFilterActive(filter: ProjectFilter, filterId: string): boolean {
  const config = QUICK_FILTER_MAP[filterId as keyof typeof QUICK_FILTER_MAP];
  if (!config) return false;

  return Object.entries(config).every(
    ([key, value]) => filter[key as keyof ProjectFilter] === value,
  );
}

function removeQuickFilterFields(
  filter: ProjectFilter,
  filterId: string,
): ProjectFilter {
  const config = QUICK_FILTER_MAP[filterId as keyof typeof QUICK_FILTER_MAP];
  if (!config) return filter;

  const next = { ...filter };
  for (const key of Object.keys(config)) {
    delete next[key as keyof ProjectFilter];
  }
  return next;
}

function toMonthDate(filter: ProjectFilter): Date | undefined {
  const { month, year } = filter.byMonth ?? {};
  if (!month || !year) return undefined;
  return new Date(year, month - 1, 1);
}

export default function FilterBar() {
  const [filter, setFilter] = useProjectFilter();
  const [searchInput, setSearchInput] = useState(filter.searchTerm ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applySearchFilter = useCallback(
    (value: string) => {
      setFilter((prev) => {
        const next = { ...prev };
        const trimmed = value.trim();

        if (trimmed) {
          next.searchTerm = trimmed;
        } else {
          delete next.searchTerm;
        }

        return next;
      });
    },
    [setFilter],
  );

  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value || value.length >= MIN_SEARCH_LENGTH) {
      debounceRef.current = setTimeout(() => {
        applySearchFilter(value);
      }, SEARCH_DEBOUNCE_MS);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFilter((prev) => {
      const next = { ...prev };
      if (date) {
        next.byMonth = {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      } else {
        delete next.byMonth;
      }
      return next;
    });
  };

  const toggleFilter = (filterId: string) => {
    if (isQuickFilterActive(filter, filterId)) {
      setFilter((prev) => removeQuickFilterFields(prev, filterId));
      return;
    }

    const config = QUICK_FILTER_MAP[filterId as keyof typeof QUICK_FILTER_MAP];
    if (config) {
      setFilter((prev) => ({ ...prev, ...config }));
    }
  };

  const formatMonth = useCallback(
    (date: Date) => dateFormatter(date, { includeDay: false }),
    [],
  );

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
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <DatePicker
          dateFormat={formatMonth}
          mode="month"
          value={toMonthDate(filter)}
          onChange={handleDateChange}
        />
        <Flex gap="2" wrap="wrap" align="center">
          <Text size="2" weight="medium" style={{ color: "var(--gray-11)" }}>
            Quick Filters:
          </Text>
          {QUICK_FILTERS.map((quickFilter) => (
            <Button
              key={quickFilter.id}
              onClick={() => toggleFilter(quickFilter.id)}
              variant={
                isQuickFilterActive(filter, quickFilter.id) ? "solid" : "outline"
              }
              size="1"
            >
              {quickFilter.label}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

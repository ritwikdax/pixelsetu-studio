"use client";
import { Box, Loading, StandardCard } from "@ritwikdax/uicc";
import { PiGearSix } from "react-icons/pi";
import KeyValueList from "../projects/components/KeyValueList";
import { useMyDetails } from "@/app/queries";

export default function SettingsPage() {
  const { data, isLoading } = useMyDetails();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <StandardCard title="Settings" icon={<PiGearSix />}>
        <KeyValueList data={data?.data} />
      </StandardCard>
    </Box>
  );
}

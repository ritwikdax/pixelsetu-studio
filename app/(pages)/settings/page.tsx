"use client";
import { Flex, Loading, StandardCard } from "@ritwikdax/uicc";
import { PiGearSix } from "react-icons/pi";
import KeyValueList from "../projects/components/KeyValueList";
import { useAuthContextQuery } from "@/app/queries/useAuthContext";

export default function SettingsPage() {
  const { data, isLoading } = useAuthContextQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex direction="column" gap="4" mb="4">
      <StandardCard title="Users" icon={<PiGearSix />}>
        <KeyValueList data={data?.me} />
      </StandardCard>
      <StandardCard title="Organization" icon={<PiGearSix />}>
        <KeyValueList data={data?.org} />
      </StandardCard>
    </Flex>
  );
}

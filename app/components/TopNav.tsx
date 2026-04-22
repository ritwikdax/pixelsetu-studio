"use client";
import { OrgSwitcher, TopNav, ThemeSwitcher } from "@ritwikdax/uicc";
import Profile from "./Profile";
import { useSwitchActiveOrgMutation } from "../mutations/useSwitchActiveOrgMutation";
import { useAuthContextQuery } from "../queries/useAuthContext";
import MerchantLogo from "./MerchantLogo";
import { GiHamburgerMenu } from "react-icons/gi";
import HamburgerMenu from "./HamburgerMenu";

export default function TopNavBar() {
  const { data, isLoading } = useAuthContextQuery();
  const mt = useSwitchActiveOrgMutation();
  if (isLoading) return null;

  return (
    <TopNav
      leftContents={[<HamburgerMenu />, <MerchantLogo />]}
      rightContents={[
        <OrgSwitcher
          list={(data?.me?.effectiveOrgs as any) || []}
          onChange={(e) => {
            mt.mutate(e.id);
          }}
          selectedOne={{ id: data?.me?.activeOrgId || "" }}
        />,
        ,
        <ThemeSwitcher />,
        <Profile />,
      ]}
    />
  );
}

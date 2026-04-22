import { ProfileBadge } from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";
import { useMyDetails } from "../queries/useMyDetails";
import { useAuthContextQuery } from "../queries/useAuthContext";

export default function Profile() {
  const { data } = useAuthContextQuery();
  const router = useRouter();
  return (
    <ProfileBadge
      orgNamespace={data?.org?.namespace || "not_available"}
      isVerified={data?.me?.isVerified || true}
      avatarUrl={
        data?.me?.avatarUrl ||
        "https://avatars.githubusercontent.com/u/53152719?v=4&size=64"
      }
      name={data?.me?.firstName || "not_available"}
      email={data?.me?.email || "not_available"}
      onProfileMenuClicked={(action) => {
        if (action === "logout") {
          //logoutMutation.mutate();
        } else if (action === "settings") {
          router.push("/settings");
        }
      }}
    />
  );
}

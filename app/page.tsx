import TopNav from "./components/TopNav";
import UserActions from "./components/UserActions";
import { useMyDetails } from "./queries/useMyDetails";

export default async function Home() {
  return (
    <div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserActions />
        </div>
        {/* <div style={{ maxWidth: "800px" }}>
          <UserActions />
        </div> */}
      </div>
    </div>
  );
}

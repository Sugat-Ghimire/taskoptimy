import { SessionProvider } from "next-auth/react";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <SessionProvider>
      <div>
        <Dashboard />
      </div>
    </SessionProvider>
  );
}

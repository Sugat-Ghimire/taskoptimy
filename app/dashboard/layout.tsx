import { SignInRequest } from "@/components/SignInRequest";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="fixed bottom-14 right-0 p-4 flex flex-col-reverse gap-3">
        <SignInRequest />
      </div>
    </div>
  );
}

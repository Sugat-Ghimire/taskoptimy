import { Quicksand } from "next/font/google";
import { SignInRequest } from "@/components/SignInRequest";
const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={quicksand.className}>
      {children}
      <div className="fixed bottom-14 right-0 p-4 flex flex-col-reverse gap-3">
        <SignInRequest />
      </div>
    </div>
  );
}

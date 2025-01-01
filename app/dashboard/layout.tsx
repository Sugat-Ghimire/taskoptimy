import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={quicksand.className}>{children}</div>;
}

import { BottomNavigation } from "@/components/BottomNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Add padding-bottom to prevent content from being hidden by bottom nav */}
      <div style={{ paddingBottom: "100px" }}>{children}</div>
      <BottomNavigation />
    </>
  );
}

import { BottomNav } from "@/src/shared/components/layout/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        minHeight: "100vh",
        paddingBottom: "80px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: "scale(0.9)",
          transformOrigin: "top center",
          width: "100%",
          maxWidth: 420,
        }}
      >
        {children}
      </div>

      <BottomNav />
    </div>
  );
}

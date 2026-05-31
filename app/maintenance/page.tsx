import type { Metadata } from "next";
import MaintenanceScreen from "@/components/maintenance/MaintenanceScreen";

export const metadata: Metadata = {
  title: "In Production — Cinewacky",
  description:
    "Cinewacky is temporarily offline while we craft new documentaries and cinematic work.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}

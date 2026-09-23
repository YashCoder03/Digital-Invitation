import { Suspense } from "react";
import StandaloneBannerCreateClient from "@/components/banner/StandaloneBannerCreateClient";

export const metadata = { title: "Banner Creator | ShubhInvite" };

export default function StandaloneBannerCreatePage() {
  return (
    <Suspense fallback={null}>
      <StandaloneBannerCreateClient />
    </Suspense>
  );
}

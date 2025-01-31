"use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./output.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/dashboard/common/Loader";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Set loading state for unmount transition
    const timer = setTimeout(() => setIsLoading(false), 1000);

    // Redirect based on authentication and role
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role_id === null) {
      router.push("/");
    }

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [isAuthenticated, user, router]);

  // Render Loader if still loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <DefaultLayout>{children}</DefaultLayout>
        </div>
      </body>
    </html>
  );
}

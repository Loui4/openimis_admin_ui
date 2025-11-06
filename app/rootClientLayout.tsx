"use client";

import { useEffect } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import { usePathname, useRouter } from "next/navigation";
import AppLayout from "../components/appLayout";

export default function RootClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === "/";
  // ⚡ Run redirect in useEffect instead of render
  useEffect(() => {
    if (!user && !isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // You can render a placeholder while redirecting
  if (!user && !isAuthPage) {
    return <div>Redirecting...</div>;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuthPage ? children : <AppLayout user={user}>{children}</AppLayout>}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

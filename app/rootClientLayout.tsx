"use client";

import { useEffect, Suspense } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
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

  useEffect(() => {
    if (!user && !isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  if (!user && !isAuthPage) return <div>Redirecting...</div>;

  const loader = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={loader}>
          {isAuthPage ? (
            children
          ) : (
            <AppLayout user={user}>{children}</AppLayout>
          )}
        </Suspense>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

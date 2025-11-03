"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "../theme";
import { usePathname } from "next/navigation";
import AppLayout from "../components/appLayout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Paths that should NOT display the AppBar/Drawer
  const isAuthPage = pathname === "/";

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {isAuthPage ? children : <AppLayout>{children}</AppLayout>}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

// app/layout.tsx
import RootClientLayout from "./rootClientLayout";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side: check cookie / auth
  let currentUser = null;

  try {
    const { cookies } = await import("next/headers"); // only server-side
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      const { apiService } = await import("@/lib/apiService");
      currentUser = await apiService("users/me/profile", {
        method: "GET",
        withAuth: true,
      });
    }
  } catch (err) {
    currentUser = null;
  }

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <RootClientLayout user={currentUser}>{children}</RootClientLayout>
      </body>
    </html>
  );
}

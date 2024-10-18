import type { Metadata } from "next";
import "@/app/globals.scss";
import { inter } from "@/app/lib/fonts/fonts";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import SideMenu from '@/app/lib/components/SideMenu'

export const metadata: Metadata = {
  title: "Pomodoro App",
  description: "Web App for pomodoro timer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <AppRouterCacheProvider>
          <SideMenu />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

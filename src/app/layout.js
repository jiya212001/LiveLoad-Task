"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/util/Provider";
import { Toaster } from "react-hot-toast";
import PersistentDrawerLeft from "@/components/sidebar";
import { usePathname } from "next/navigation";
// import Common from "./auth/layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showDrawer, setShowDrawer] = useState(false);
  // const [common, setCommon] = useState(false);
  useEffect(() => {
    setShowDrawer(
      pathname === "/dashboard" ||
        pathname === "/individualUser" ||
        pathname === "/viewUser/id" ||
        pathname === "/settings"
    );
  }, [pathname]);

  // useEffect(() => {
  //   setCommon(
  //     pathname === "/auth/login" ||
  //       pathname === "/auth/forgotPassword" ||
  //       pathname === "/auth/signup"
  //   );
  // }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconLiveload.png" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-right" />
        {showDrawer && <PersistentDrawerLeft></PersistentDrawerLeft>}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

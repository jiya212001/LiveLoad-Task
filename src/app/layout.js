// "use client";
// import { useEffect, useState } from "react";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Provider from "@/util/Provider";
// import { Toaster } from "react-hot-toast";
// import PersistentDrawerLeft from "@/components/sidebar";
// import { usePathname } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   const [showDrawer, setShowDrawer] = useState(false);
//   useEffect(() => {
//     setShowDrawer(pathname === "/");
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/faviconLiveload.png" />
//       </head>
//       <body className={inter.className}>
//         <Toaster position="top-right" />
//         {showDrawer && <PersistentDrawerLeft>{children}</PersistentDrawerLeft>}

//         <Provider>{children}</Provider>
//       </body>
//     </html>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/util/Provider";
import { Toaster } from "react-hot-toast";
import PersistentDrawerLeft from "@/components/sidebar";
import { usePathname } from "next/navigation"; // Adjust the import path based on your setup

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setShowDrawer(
      pathname === "/dashboard" ||
        pathname === "/individualUser" ||
        pathname === "/viewUser/id"
    );
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconLiveload.png" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-right" />
        {showDrawer && <PersistentDrawerLeft>{children}</PersistentDrawerLeft>}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

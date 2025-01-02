import Navbar from "@/components/Navbar";
import React, { type ReactNode } from "react";

import RootProviders from "@/components/providers/RootProviders";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProviders>
          <Navbar/>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}

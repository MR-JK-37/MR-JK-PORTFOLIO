import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminGateway from "@/components/AdminGateway";

export const metadata: Metadata = {
  title: "MR!JK! | Full-Stack Engineer",
  description: "Building digital fortresses & interactive experiences for the modern web.",
  manifest: "/manifest.json",
  themeColor: "#00c8d4",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MR!JK!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scanline">
        <AdminProvider>
          <Navbar />
          <div style={{ minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </div>
          <Footer />
          <AdminGateway />
        </AdminProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

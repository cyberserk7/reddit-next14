import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/navbar";
import { ModalProvider } from "@/providers/modal-provider";
import LeftSidebar from "@/components/sidebar/left-sidebar";
import { getServerSession } from "next-auth";
import ClientUsernameModalSetter from "@/providers/username-modal-setter";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/providers/auth-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "sonner";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "This is a reddit clone app developed by Nilabjo Dey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const showModal = session?.user.username === null || session?.user.username === undefined;
  return (
    <AuthProvider>  
      <html lang="en">
        <body className={cn("bg-[#0B1416] text-white antialiased", inter.className)}>
          <ReactQueryProvider>
            {showModal && <ClientUsernameModalSetter />}
            <ModalProvider />
            <Toaster />
            <Navbar />
            <div className="w-full lg:max-w-[1500px] mx-auto h-[calc(100vh-4rem)] mt-[4rem] relative">
              <div className="hidden lg:block fixed h-full">
                <LeftSidebar />
              </div>
              <section className="lg:ml-60 pt-4 px-4 lg:pt-5 lg:px-10 h-full">
                {children}
              </section>
            </div>  
          </ReactQueryProvider>
        </body>
      </html>
    </AuthProvider>
    
  );
}

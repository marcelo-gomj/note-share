import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import SideHeader from "@/components/SideHeader";
import { UserContextProvider } from "@/contexts/UserContext";
import { ModalProvider } from "@/contexts/ModalContext";
import ModalContainer from "@/components/UserModalAccess/ModalContainer";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import NotificationsContainer from "@/components/Notifications/NotificationsContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes Share App",
  description: "Create your notes online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* <NotificationsProvider> */}
      <UserContextProvider>
        <ModalProvider>
          <body className={inter.className + ' flex h-[100vh] w-full max-w-[1500px] overflow-hidden'}>
            <SideHeader />

            <main
              className="flex pl-20 w-[100%] overflow-auto"
            >
              <div
                className="w-[70%] border-red"
              >
                {children}
              </div>
            </main>
            <ModalContainer />
            <NotificationsContainer />
          </body>


        </ModalProvider>
      </UserContextProvider>


      {/* </NotificationsProvider> */}
    </html>
  );
}

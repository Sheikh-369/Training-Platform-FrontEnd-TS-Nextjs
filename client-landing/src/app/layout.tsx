'use client'
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/authInitializer";
import { useAppDispatch } from "@/lib/store/hooks";
import { useEffect } from "react";
import { loadUserFromLocalStorage } from "@/lib/store/auth/auth-slice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body><Provider store={store}>
        <Toaster position="top-center" />
        <AuthInitializer />
        {children}
        </Provider>
      </body>
    </html>
  );
}



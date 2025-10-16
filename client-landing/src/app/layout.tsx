'use client'
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/authInitializer";


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



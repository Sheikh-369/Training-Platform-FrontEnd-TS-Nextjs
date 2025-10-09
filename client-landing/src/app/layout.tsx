// 'use client'
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Provider } from "react-redux";
// import store from "@/lib/store/store";
// import { Toaster } from "react-hot-toast";
// import AuthInitializer from "./components/authInitializer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-500`}
//       ><Provider store={store}>
//         <Toaster position="top-center" />
//         <AuthInitializer />
//         {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }



'use client'
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/authInitializer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-500">
          <Provider store={store}>
        <Toaster position="top-center" />
        <AuthInitializer />
        {children}
        </Provider>
      </body>
    </html>
  );
}


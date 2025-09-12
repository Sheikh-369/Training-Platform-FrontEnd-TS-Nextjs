'use client';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Provider } from 'react-redux';
import store from '@/lib/store/store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

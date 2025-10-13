'use client';
// import './globals.css';
import { Provider } from 'react-redux';
import store from '@/lib/store/store';
import Dashboard from '@/app/components/dashboard/dashboard';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Provider store={store}>
            <Dashboard>
                {children}
            </Dashboard>
          
        </Provider>
  );
}
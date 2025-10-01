// 'use client';
// import { GeistSans, GeistMono } from 'geist/font';
// import './globals.css';
// import { Provider } from 'react-redux';
// import store from '@/lib/store/store';

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
//       <body className="antialiased">
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }


'use client';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Provider, useDispatch } from 'react-redux';
import store from '@/lib/store/store';
import { useEffect } from 'react';
import { setAuthData } from '@/lib/store/auth/auth-slice';

function AuthDataLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData');
    if (savedAuthData) {
      dispatch(setAuthData(JSON.parse(savedAuthData)));
    }
  }, [dispatch]);

  return null; // no UI
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <Provider store={store}>
          <AuthDataLoader />
          {children}
        </Provider>
      </body>
    </html>
  );
}

// // components/AuthInitializer.tsx
// 'use client';

// import { useEffect } from "react";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { setUser } from "@/lib/store/auth/auth-slice";

// export default function AuthInitializer() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     if (token && user) {
//       dispatch(setUser(JSON.parse(user)));
//     }
//   }, [dispatch]);

//   return null; // no UI needed
// }


// components/AuthInitializer.tsx
'use client';

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/auth/auth-slice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        console.log("AuthInitializer running...", {
          token: localStorage.getItem("token"),
          user: localStorage.getItem("user"),
        });

      if (token && user) {
        const parsedUser = JSON.parse(user);
        dispatch(setUser(parsedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
    }
  }, [dispatch]);

  return null; // No UI
}


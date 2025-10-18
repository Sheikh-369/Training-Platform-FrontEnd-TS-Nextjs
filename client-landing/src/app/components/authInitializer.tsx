// // // components/AuthInitializer.tsx
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

//2dd try
// // components/AuthInitializer.tsx
// 'use client';

// import { useEffect } from "react";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { setUser } from "@/lib/store/auth/auth-slice";

// export default function AuthInitializer() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     try {
//       const token = localStorage.getItem("token");
//       const user = localStorage.getItem("user");
//         console.log("AuthInitializer running...", {
//           token: localStorage.getItem("token"),
//           user: localStorage.getItem("user"),
//         });

//       if (token && user) {
//         const parsedUser = JSON.parse(user);
//         dispatch(setUser(parsedUser));
//       }
//     } catch (error) {
//       console.error("Failed to load user from localStorage:", error);
//     }
//   }, [dispatch]);

//   return null; // No UI
// }


//3rd method
// 'use client';

// import { useEffect } from "react";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { setUser } from "@/lib/store/auth/auth-slice";
// import { ownerData } from "@/lib/store/owner/owner-slice"; // ✅ import this

// export default function AuthInitializer() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     if (token && user) {
//       const parsedUser = JSON.parse(user);
//       dispatch(setUser(parsedUser));

//       // ✅ Dispatch ownerData here
//       if (parsedUser.instituteNumber) {
//         dispatch(ownerData(parsedUser.instituteNumber));
//       }
//     }
//   }, [dispatch]);

//   return null;
// }



//4th
// 'use client';

// import { useEffect } from "react";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { setOwner } from "@/lib/store/owner/owner-slice";

// export default function AuthInitializer() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     try {
//       const token = localStorage.getItem("token");
//       const user = localStorage.getItem("user");

//       console.log("AuthInitializer running...", {
//         token,
//         user,
//       });

//       if (token && user) {
//         const parsedUser = JSON.parse(user);
//         dispatch(setOwner(parsedUser)); // ✅ now updates the correct slice
//       }
//     } catch (error) {
//       console.error("Failed to load user from localStorage:", error);
//     }
//   }, [dispatch]);

//   return null; // No UI
// }



//5th
'use client';

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/auth/auth-slice"; // ✅ Use correct slice

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      console.log("AuthInitializer running...", {
        token,
        user,
      });

      if (token && user) {
        const parsedUser = JSON.parse(user);
        dispatch(setUser(parsedUser)); // ✅ Correctly populates Redux auth.user
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
    }
  }, [dispatch]);

  return null;
}

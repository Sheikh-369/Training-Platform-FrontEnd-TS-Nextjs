// components/AuthInitializer.tsx
'use client';

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/auth/auth-slice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return null; // no UI needed
}

"use client";

import { useEffect } from "react";

import userStore from "@/lib/store/userStore";
import { UserType } from "@/lib/types/user";

const AuthProvider = ({
  hasSessionToken,
  user,
  children,
}: {
  hasSessionToken: boolean;
  user: UserType | null;
  children: React.ReactNode;
}) => {
  const { setAuth } = userStore();

  useEffect(() => {
    const isLoggedIn = hasSessionToken && !!user && !!user.id;
    setAuth(isLoggedIn, user);
  }, [hasSessionToken, user, setAuth]);

  return <>{children}</>;
};

export default AuthProvider;

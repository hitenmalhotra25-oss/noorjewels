import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "@/integrations/firebase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    session: user,
    user,
    loading,
    isAuthenticated: Boolean(user),
    signOut: () => signOut(auth),
  };
}

export function displayName(user: User | null) {
  if (!user) return "";

  return user.displayName || user.email || "Noor Member";
}

export function avatarUrl(user: User | null) {
  if (!user) return undefined;

  return user.photoURL || undefined;
}
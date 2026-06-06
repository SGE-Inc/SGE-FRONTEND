"use client";
import { useState } from "react";
import type { User } from "@/lib/mock-auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) return JSON.parse(stored);
    } catch {
      localStorage.removeItem("user");
    }
    return null;
  });

  const loading = false;

  const login = (newUser: User) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, login, logout };
}

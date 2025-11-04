"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const PRIVATE_ROUTES = ["/profile", "/notes"];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const isPrivateRoute = pathname
    ? PRIVATE_ROUTES.some((route) => pathname.startsWith(route))
    : false;

  useEffect(() => {
    const verify = async () => {
      try {
        const sessionUser = await checkSession(); 

        if (sessionUser) {
          const userData = await getMe();
          setUser(userData);
        } else if (isPrivateRoute) {
          clearAuth();
          router.replace("/sign-in");
        }
      } catch {
        if (isPrivateRoute) {
          clearAuth();
          router.replace("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [pathname, isPrivateRoute, router, setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}

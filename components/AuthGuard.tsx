"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          localStorage.setItem('redirectAfterLogin', currentPath);
        }
        router.push('/login');
      }
    };

    checkAuth();

    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [router]);

  if (isAuthenticated === null) {
    return (
      fallback || (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F5F5F5',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              در حال بارگذاری...
            </div>
          </div>
        </div>
      )
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}

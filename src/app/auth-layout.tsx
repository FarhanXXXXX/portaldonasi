// src/app/auth-layout.tsx
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto my-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
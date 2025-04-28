// src/app/login/page.tsx
'use client';

import AuthLayout from '../auth-layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import type { AuthError } from '@supabase/supabase-js';

interface LoginFormInputs {
  email: string;
}

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { error }: { error: AuthError | null } = await supabase.auth.signInWithOtp({
        email: data.email,
      });

      if (error) {
        throw error;
      }

      alert('Magic Link sent! Please check your email to log in.');
      router.push('/'); // Redirect ke halaman utama setelah login
    } catch (error: any) {
      console.error(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
          {/* Header */}
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-center text-sm text-gray-600">
            Enter your email to receive a magic link.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full flex justify-center items-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Send Magic Link
            </button>
          </form>

          {/* Link ke Halaman Register */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
              Register here
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
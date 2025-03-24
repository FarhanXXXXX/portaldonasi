// src/app/login/page.tsx
'use client';

import AuthLayout from '../auth-layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import type { AuthError } from '@supabase/supabase-js';

interface LoginFormInputs {
  email: string;
}

const LoginPage = () => {
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
    } catch (error: any) {
      console.error(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Magic Link
          </button>
        </form>

        {/* Link ke Halaman Register */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
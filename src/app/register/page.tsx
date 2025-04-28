// src/app/register/page.tsx
'use client';

import AuthLayout from '../auth-layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface RegisterFormInputs {
  name: string;
  email: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const { error }: { error: PostgrestError | null } = await supabase
        .from('profiles')
        .insert([{ name: data.name, email: data.email }]);

      if (error) {
        throw error;
      }

      alert('Registration successful!');
    } catch (error: any) {
      console.error(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
          {/* Header */}
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="text-center text-sm text-gray-600">
            Please fill in the details below to register.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

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
              className="w-full flex justify-center items-center rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-medium text-white hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* Link ke Halaman Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
              Login here
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
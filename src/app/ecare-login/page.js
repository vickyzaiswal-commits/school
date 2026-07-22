"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/apiRequest';

const EcareLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiRequest('users/login', { email, password });
      if (res.status == 200) {
        // Choose storage based on 'remember' checkbox
        const storage = remember ? localStorage : sessionStorage;

        const userObj = res.user;
        if (userObj) {
          try {
            storage.setItem('ecareUser', JSON.stringify(userObj));
            try { window.dispatchEvent(new Event('ecareUserChanged')); } catch (e) {}
          } catch (err) {
            console.warn('Failed to save user object:', err);
          }
        }

        // Optional: set an in-memory flag or global context here (not implemented)

        // Redirect to home/dashboard
        router.push('/');
      } else {
        setError(res?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center px-4 py-6 font-sans">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">

        {/* Left Sidebar - Green Panel */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-10 md:w-96 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-green-100 text-lg leading-relaxed">
              Sign in to access your parent portal and stay connected with your child's progress.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 bg-opacity-30 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Quick Response</h3>
                  <p className="text-green-100 text-sm">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 bg-opacity-30 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Support Hours</h3>
                  <p className="text-green-100 text-sm">Sun–Fri: 8AM–4PM<br />Saturday: 8AM–12PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-green-200 text-sm">
            <p>Need help? Call us directly at</p>
            <p className="text-xl font-bold text-white mt-1">+977 12345 67890</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-10 lg:p-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">eCare Login</h2>
            <p className="text-gray-600 mb-8">Enter your credentials to access the portal</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>Signing in...</>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                Contact the school
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcareLoginPage;
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import Link from 'next/link';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  
  useEffect(() => {
    async function verifyAdminStatus() {
      try {
        if (!loading) {
          if (!user) {
            router.push('/login');
            return;
          }
          
          // Get user email from Firebase using authenticated user
          const auth = getAuth(app);
          const currentUser = auth.currentUser;
          
          if (!currentUser) {
            router.push('/login');
            return;
          }
          
          const email = currentUser.email;
          
          // Check MongoDB for admin role
          try {
            const response = await fetch('/api/check-admin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            
            if (response.ok && data.isAdmin) {
              setIsAdmin(true);
            } else {
              console.log('Not an admin user');
              router.push('/'); // Redirect non-admins to homepage
            }
          } catch (error) {
            console.error('Error checking admin status:', error);
            router.push('/');
          }
        }
      } catch (error) {
        console.error("Error verifying admin status:", error);
        router.push('/');
      } finally {
        setCheckingAdmin(false);
      }
    }
    
    verifyAdminStatus();
  }, [user, loading, router]);

  if (loading || checkingAdmin) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="block px-6 py-3 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block px-6 py-3 hover:bg-gray-100">
            Products
          </Link>
          <Link href="/admin/accounts" className="block px-6 py-3 hover:bg-gray-100">
            Accounts
          </Link>
          <Link href="/admin/transactions" className="block px-6 py-3 hover:bg-gray-100">
            Transactions
          </Link>
          <Link href="/admin/analytics" className="block px-6 py-3 hover:bg-gray-100">
            Analytics
          </Link>
          <Link href="/admin/settings" className="block px-6 py-3 hover:bg-gray-100">
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
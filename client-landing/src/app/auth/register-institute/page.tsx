'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/hooks';
import InstituteRegister from '@/app/components/instituteRegister';
// import InstituteRegister from '@/components/InstituteRegister'; // ✅ import the form

export default function InstituteRegisterPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/global/login');
    }
  }, [user]);

  return user ? <InstituteRegister /> : null;
}


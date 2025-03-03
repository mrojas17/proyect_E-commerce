import { useAuth } from '@/context/authContext'
import { routes } from '@/routes/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const usePublic = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (isAuthenticated) {
        router.push(routes.home);
      }
    }, [isAuthenticated, router]);
  };
  

export default usePublic;
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const usePrivate = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading === false && !isAuthenticated) {
      router.push("/"); 
    }
  }, [isAuthenticated, loading, router]);
};

export default usePrivate;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'contractor' | 'agency' | 'ministry' | 'auditor' | 'oaia_admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
        return;
      }
      
      if (requiredRole && profile?.user_role !== requiredRole) {
        navigate('/');
        return;
      }
    }
  }, [user, profile, loading, navigate, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-oaia-blue"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && profile?.user_role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

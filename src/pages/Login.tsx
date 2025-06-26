
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const Login = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'contractor';
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate login
    toast.success('Login successful! Redirecting...');
    
    // Route to appropriate dashboard based on user type
    setTimeout(() => {
      window.location.href = `/dashboard/${userType}`;
    }, 1500);
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'contractor': return 'Contractor';
      case 'agency': return 'Government Agency';
      case 'ministry': return 'Ministry of Finance';
      case 'auditor': return 'Auditor General';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-oaia-light via-white to-oaia-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-oaia-gray">Sign in as {getUserTypeLabel(userType)}</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-oaia-blue">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="focus:ring-oaia-blue focus:border-oaia-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="focus:ring-oaia-blue focus:border-oaia-blue"
                />
              </div>
              
              <Button type="submit" className="w-full bg-oaia-blue hover:bg-oaia-blue/90">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-oaia-gray">
                Don't have an account?{' '}
                <Link to={`/signup?type=${userType}`} className="text-oaia-blue hover:text-oaia-orange font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-oaia-gray">
            Protected by bank-grade security. Your data is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

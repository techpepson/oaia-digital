
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const Signup = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organizationName || !formData.email || !formData.password || !formData.userType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    // Simulate signup
    toast.success('Account created successfully! Please check your email to verify your account.');
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-oaia-light via-white to-oaia-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Join OAIA</h1>
          <p className="mt-2 text-oaia-gray">Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-oaia-blue">Create Account</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to register with OAIA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, userType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="agency">Government Agency</SelectItem>
                    <SelectItem value="ministry">Ministry of Finance</SelectItem>
                    <SelectItem value="auditor">Auditor General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  type="text"
                  placeholder="Enter your organization name"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                  className="focus:ring-oaia-blue focus:border-oaia-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="focus:ring-oaia-blue focus:border-oaia-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="focus:ring-oaia-blue focus:border-oaia-blue"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                />
                <Label htmlFor="terms" className="text-sm text-oaia-gray">
                  I agree to the{' '}
                  <a href="#" className="text-oaia-blue hover:text-oaia-orange">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-oaia-blue hover:text-oaia-orange">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              
              <Button type="submit" className="w-full bg-oaia-blue hover:bg-oaia-blue/90">
                Create Account
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-oaia-gray">
                Already have an account?{' '}
                <Link to="/login" className="text-oaia-blue hover:text-oaia-orange font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-oaia-gray">
            Your information is protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'contractor';
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    organizationName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Details (conditional)
    businessType: '',
    primaryRegion: '',
    primaryAgency: '',
    
    agreeToTerms: false
  });

  const totalSteps = userType === 'contractor' ? 2 : 2; 
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (!formData.organizationName || !formData.email || !formData.phoneNumber || !formData.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (userType === 'contractor' && !formData.businessType) {
        toast.error('Please select your business type');
        return;
      }
      if (userType !== 'contractor' && !formData.agreeToTerms) {
        toast.error('Please agree to the terms and conditions');
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toast.success('Account created successfully! Redirecting to dashboard...');
    setTimeout(() => {
      window.location.href = `/dashboard/${userType}?onboarding=true`;
    }, 2000);
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
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Join OAIA</h1>
          <p className="mt-2 text-oaia-gray">Create your {getUserTypeLabel(userType)} account</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-oaia-gray mt-2 text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Signup Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-oaia-blue">
              {currentStep === 1 ? 'Basic Information' : 'Business Details'}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1 ? 'Enter your basic information' : 'Tell us about your business'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNext} className="space-y-4">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
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
                    <Label htmlFor="email">Email Address *</Label>
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
                    <Label htmlFor="phoneNumber">Contact Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter contact phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      className="focus:ring-oaia-blue focus:border-oaia-blue"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
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
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="focus:ring-oaia-blue focus:border-oaia-blue"
                    />
                  </div>
                </>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <>
                  {userType === 'contractor' ? (
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select 
                        onValueChange={(value) => setFormData({...formData, businessType: value})}
                        value={formData.businessType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="limited-company">Limited Company</SelectItem>
                          <SelectItem value="cooperative">Cooperative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="primaryRegion">Primary Region</Label>
                        <Select onValueChange={(value) => setFormData({...formData, primaryRegion: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="greater-accra">Greater Accra</SelectItem>
                            <SelectItem value="ashanti">Ashanti</SelectItem>
                            <SelectItem value="western">Western</SelectItem>
                            <SelectItem value="central">Central</SelectItem>
                            <SelectItem value="eastern">Eastern</SelectItem>
                            <SelectItem value="volta">Volta</SelectItem>
                            <SelectItem value="northern">Northern</SelectItem>
                            <SelectItem value="upper-east">Upper East</SelectItem>
                            <SelectItem value="upper-west">Upper West</SelectItem>
                            <SelectItem value="brong-ahafo">Brong Ahafo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryAgency">Primary Agency</Label>
                        <Select onValueChange={(value) => setFormData({...formData, primaryAgency: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary agency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ministry-health">Ministry of Health</SelectItem>
                            <SelectItem value="ministry-education">Ministry of Education</SelectItem>
                            <SelectItem value="ministry-transport">Ministry of Transport</SelectItem>
                            <SelectItem value="ministry-agriculture">Ministry of Agriculture</SelectItem>
                            <SelectItem value="ghana-highways">Ghana Highways Authority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

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
                </>
              )}
              
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1 bg-oaia-blue hover:bg-oaia-blue/90">
                  {currentStep === totalSteps ? 'Create Account' : 'Next'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-oaia-gray">
                Already have an account?{' '}
                <Link to={`/login?type=${userType}`} className="text-oaia-blue hover:text-oaia-orange font-medium">
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

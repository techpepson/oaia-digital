
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const userType = searchParams.get('type') || 'contractor';
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    
    // Step 3: Bank Details (contractors only)
    bankName: '',
    accountNumber: '',
    accountName: '',
    branchCode: '',
    branchName: '',
    
    agreeToTerms: false
  });

  const totalSteps = userType === 'contractor' ? 3 : 2;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (!loading && user) {
      navigate(`/dashboard/${userType}?onboarding=true`);
    }
  }, [user, loading, navigate, userType]);

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
      if (userType === 'contractor') {
        if (!formData.businessType) {
          toast.error('Please select your business type');
          return;
        }
        setCurrentStep(3);
      } else {
        if (!formData.agreeToTerms) {
          toast.error('Please agree to the terms and conditions');
          return;
        }
        handleSubmit();
      }
    } else if (currentStep === 3) {
      if (!formData.bankName || !formData.accountNumber || !formData.branchCode) {
        toast.error('Please fill in all bank details');
        return;
      }
      if (!formData.agreeToTerms) {
        toast.error('Please agree to the terms and conditions');
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const userData = {
        organization_name: formData.organizationName,
        phone_number: formData.phoneNumber,
        user_role: userType,
        business_type: formData.businessType || null,
        primary_region: formData.primaryRegion || null,
        primary_agency: formData.primaryAgency || null
      };

      const { error } = await signUp(formData.email, formData.password, userData);
      
      if (error) {
        console.error('Signup error:', error);
        
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please try signing in instead.');
        } else {
          toast.error('Signup failed: ' + error.message);
        }
      } else {
        toast.success('Account created successfully! Please check your email to confirm your account.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-oaia-blue"></div>
      </div>
    );
  }

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
              {currentStep === 1 ? 'Basic Information' : 
               currentStep === 2 ? 'Business Details' : 'Bank Details'}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1 ? 'Enter your basic information' :
               currentStep === 2 ? 'Tell us about your business' : 'Add your banking information'}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  </div>
                </>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <>
                  {userType === 'contractor' && (
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
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
                  )}

                  {userType !== 'contractor' && (
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

                  {userType !== 'contractor' && (
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
                  )}
                </>
              )}

              {/* Step 3: Bank Details (Contractors only) */}
              {currentStep === 3 && userType === 'contractor' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, bankName: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gcb">GCB Bank</SelectItem>
                        <SelectItem value="ecobank">Ecobank Ghana</SelectItem>
                        <SelectItem value="standard-chartered">Standard Chartered</SelectItem>
                        <SelectItem value="absa">Absa Bank Ghana</SelectItem>
                        <SelectItem value="access-bank">Access Bank Ghana</SelectItem>
                        <SelectItem value="fidelity">Fidelity Bank Ghana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter your account number"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      className="focus:ring-oaia-blue focus:border-oaia-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      type="text"
                      placeholder="Enter account name"
                      value={formData.accountName}
                      onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                      className="focus:ring-oaia-blue focus:border-oaia-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branchCode">Branch Code *</Label>
                      <Input
                        id="branchCode"
                        type="text"
                        placeholder="e.g., 001"
                        value={formData.branchCode}
                        onChange={(e) => setFormData({...formData, branchCode: e.target.value})}
                        className="focus:ring-oaia-blue focus:border-oaia-blue"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branchName">Branch Name *</Label>
                      <Input
                        id="branchName"
                        type="text"
                        placeholder="e.g., Accra Main"
                        value={formData.branchName}
                        onChange={(e) => setFormData({...formData, branchName: e.target.value})}
                        className="focus:ring-oaia-blue focus:border-oaia-blue"
                      />
                    </div>
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
                </>
              )}
              
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="flex-1 bg-oaia-blue hover:bg-oaia-blue/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : (currentStep === totalSteps ? 'Create Account' : 'Next')}
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

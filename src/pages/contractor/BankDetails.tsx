import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import ContractorSidebar from '@/components/ContractorSidebar';

type BankDetailsFormData = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchCode: string;
  branchName: string;
  agreeToTerms: boolean;
};

const BankDetails = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<BankDetailsFormData>({
    bankName: '',
    accountNumber: '',
    accountName: '',
    branchCode: '',
    branchName: '',
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.bankName || !formData.accountNumber || !formData.branchCode) {
      toast.error('Please fill in all required bank details');
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    // Here you would typically save the bank details to your backend
    console.log('Bank details submitted:', formData);
    
    toast.success('Bank details saved successfully!');
    // Navigate to dashboard or next step
    navigate('/dashboard/contractor?onboarding=true');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ContractorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-oaia-light via-white to-oaia-light flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-oaia-blue">
                Bank Details
              </CardTitle>
              <CardDescription className="text-center">
                Add your banking information for payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, bankName: value})}
                    value={formData.bankName}
                  >
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
                
                <Button type="submit" className="w-full bg-oaia-blue hover:bg-oaia-blue/90">
                  Save Bank Details
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  className="text-oaia-blue hover:text-oaia-orange"
                >
                  Back to Previous
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;

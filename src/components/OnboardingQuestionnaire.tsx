import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface OnboardingQuestionnaireProps {
  onComplete: (data: any) => void;
  onBack?: () => void;
}

const OnboardingQuestionnaire = ({ onComplete, onBack }: OnboardingQuestionnaireProps) => {
  const [formData, setFormData] = useState({
    yearsInBusiness: '',
    numberOfEmployees: '',
    annualRevenue: '',
    primaryServices: '',
    previousGovernmentContracts: false,
    previousContractDetails: '',
    taxIdentificationNumber: '',
    vatRegistered: false,
    vatNumber: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.yearsInBusiness || !formData.numberOfEmployees || !formData.annualRevenue || !formData.primaryServices) {
      toast.error('Please fill in all required fields');
      return;
    }
    onComplete(formData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-oaia-blue mb-2">Additional Information</h2>
        <p className="text-oaia-gray">Please provide some additional details about your business</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="yearsInBusiness">Years in Business *</Label>
            <Select 
              value={formData.yearsInBusiness} 
              onValueChange={(value) => handleChange('yearsInBusiness', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select years in business" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfEmployees">Number of Employees *</Label>
            <Select 
              value={formData.numberOfEmployees} 
              onValueChange={(value) => handleChange('numberOfEmployees', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="5-20">5-20</SelectItem>
                <SelectItem value="20-50">20-50</SelectItem>
                <SelectItem value="50+">50+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualRevenue">Annual Revenue (GHS) *</Label>
            <Select 
              value={formData.annualRevenue} 
              onValueChange={(value) => handleChange('annualRevenue', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select annual revenue range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100000">0 - 100,000</SelectItem>
                <SelectItem value="100000-500000">100,000 - 500,000</SelectItem>
                <SelectItem value="500000-2000000">500,000 - 2,000,000</SelectItem>
                <SelectItem value="2000000+">2,000,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxIdentificationNumber">Tax Identification Number (TIN)</Label>
            <Input
              id="taxIdentificationNumber"
              placeholder="Enter TIN"
              value={formData.taxIdentificationNumber}
              onChange={(e) => handleChange('taxIdentificationNumber', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vatRegistered" 
                checked={formData.vatRegistered}
                onCheckedChange={(checked) => {
                  handleChange('vatRegistered', checked);
                  if (!checked) handleChange('vatNumber', '');
                }}
              />
              <Label htmlFor="vatRegistered">VAT Registered</Label>
            </div>
            {formData.vatRegistered && (
              <Input
                id="vatNumber"
                placeholder="Enter VAT Number"
                value={formData.vatNumber}
                onChange={(e) => handleChange('vatNumber', e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="previousGovernmentContracts" 
                checked={formData.previousGovernmentContracts}
                onCheckedChange={(checked) => {
                  handleChange('previousGovernmentContracts', checked);
                  if (!checked) handleChange('previousContractDetails', '');
                }}
              />
              <Label htmlFor="previousGovernmentContracts">Previous Government Contracts</Label>
            </div>
            {formData.previousGovernmentContracts && (
              <Textarea
                placeholder="Please provide details of previous government contracts"
                value={formData.previousContractDetails}
                onChange={(e) => handleChange('previousContractDetails', e.target.value)}
                className="mt-2"
                rows={3}
              />
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="primaryServices">Primary Services/Products *</Label>
            <Textarea
              id="primaryServices"
              placeholder="Describe your primary services or products"
              value={formData.primaryServices}
              onChange={(e) => handleChange('primaryServices', e.target.value)}
              rows={3}
            />
            <p className="text-xs text-oaia-gray mt-1">Please provide a brief description of your main business activities</p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          {onBack && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
            >
              Back
            </Button>
          )}
          <div className="ml-auto">
            <Button type="submit" className="bg-oaia-blue hover:bg-oaia-blue/90">
              Continue to Document Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OnboardingQuestionnaire;

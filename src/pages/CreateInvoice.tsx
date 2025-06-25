
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const CreateInvoice = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  
  const requiredDocuments = [
    'Certificate of Incorporation',
    'Memorandum & Articles of Association',
    'Shareholding Structure',
    'Company Profile',
    'Directors ID Documents & Proof of Address',
    'Company Proof of Address',
    'Regulatory License (if applicable)',
    'Bank Statements or Financial Statements'
  ];

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    agency: '',
    contractReference: '',
    serviceDescription: '',
    amount: '',
    workPeriod: '',
    completionDate: ''
  });

  const handleDocumentUpload = (docName: string) => {
    if (!uploadedDocs.includes(docName)) {
      setUploadedDocs([...uploadedDocs, docName]);
      toast.success(`${docName} uploaded successfully`);
    }
  };

  const removeDocument = (docName: string) => {
    setUploadedDocs(uploadedDocs.filter(doc => doc !== docName));
    toast.info(`${docName} removed`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (!formData.invoiceNumber || !formData.agency || !formData.amount) {
        toast.error('Please fill in all required fields');
        return;
      }
      setCurrentStep(2);
    } else {
      if (uploadedDocs.length < 5) {
        toast.error('Please upload at least 5 required documents');
        return;
      }
      toast.success('Invoice submitted successfully! You will receive a confirmation email shortly.');
      setTimeout(() => {
        window.location.href = '/dashboard/contractor';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/contractor">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
          <p className="text-oaia-gray mt-1">Submit your invoice for government contract payment</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-oaia-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-20 h-1 ${currentStep >= 2 ? 'bg-oaia-blue' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-oaia-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm text-oaia-gray">
            Step {currentStep} of 2: {currentStep === 1 ? 'Invoice Details' : 'Document Upload'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue">Invoice Information</CardTitle>
                <CardDescription>
                  Provide details about your invoice and the services rendered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                    <Input
                      id="invoiceNumber"
                      placeholder="e.g., INV-2024-001"
                      value={formData.invoiceNumber}
                      onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                      className="focus:ring-oaia-blue focus:border-oaia-blue"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="agency">Government Agency *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, agency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ministry-health">Ministry of Health</SelectItem>
                        <SelectItem value="ministry-education">Ministry of Education</SelectItem>
                        <SelectItem value="ministry-transport">Ministry of Transport</SelectItem>
                        <SelectItem value="county-government">County Government</SelectItem>
                        <SelectItem value="ministry-agriculture">Ministry of Agriculture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contractReference">Contract Reference</Label>
                  <Input
                    id="contractReference"
                    placeholder="e.g., CON/2024/HEALTH/001"
                    value={formData.contractReference}
                    onChange={(e) => setFormData({...formData, contractReference: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Service Description *</Label>
                  <Textarea
                    id="serviceDescription"
                    placeholder="Describe the services or goods provided..."
                    value={formData.serviceDescription}
                    onChange={(e) => setFormData({...formData, serviceDescription: e.target.value})}
                    className="min-h-24"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Invoice Amount (KES) *</Label>
                    <Input
                      id="amount"
                      placeholder="e.g., 450000"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workPeriod">Work Period</Label>
                    <Input
                      id="workPeriod"
                      placeholder="e.g., January 2024"
                      value={formData.workPeriod}
                      onChange={(e) => setFormData({...formData, workPeriod: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Completion Date</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-oaia-blue hover:bg-oaia-blue/90">
                  Continue to Documents
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue">Required Documents</CardTitle>
                <CardDescription>
                  Upload all required company documents for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {requiredDocuments.map((docName, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-oaia-blue" />
                        <div>
                          <div className="font-medium text-gray-900">{docName}</div>
                          <div className="text-sm text-oaia-gray">
                            {docName.includes('Identification') ? 'Passports and proof of address (< 3 months)' :
                             docName.includes('Financial') ? '3 months bank statements or 6 months audited financials' :
                             'Required for compliance verification'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {uploadedDocs.includes(docName) ? (
                          <>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeDocument(docName)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDocumentUpload(docName)}
                            className="border-oaia-blue text-oaia-blue hover:bg-oaia-blue hover:text-white"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Document Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• All documents must be clear and legible</li>
                    <li>• Identification documents must be certified copies</li>
                    <li>• Proof of address documents must be less than 3 months old</li>
                    <li>• Financial statements must be less than 6 months old</li>
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Back to Details
                  </Button>
                  <Button type="submit" className="flex-1 bg-oaia-blue hover:bg-oaia-blue/90">
                    Submit Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;

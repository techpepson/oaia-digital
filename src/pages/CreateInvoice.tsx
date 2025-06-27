
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';
import { useCreateInvoice } from '@/hooks/useInvoices';
import { supabase } from '@/integrations/supabase/client';

const CreateInvoice = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const createInvoiceMutation = useCreateInvoice();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<string>('');
  const [advancePercentage, setAdvancePercentage] = useState<number>(0);
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  
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

  // Document type mapping for database
  const documentTypeMapping: Record<string, 'certificate_incorporation' | 'memorandum_articles' | 'shareholding_structure' | 'company_profile' | 'directors_id' | 'company_address_proof' | 'regulatory_license' | 'financial_statements'> = {
    'Certificate of Incorporation': 'certificate_incorporation',
    'Memorandum & Articles of Association': 'memorandum_articles',
    'Shareholding Structure': 'shareholding_structure',
    'Company Profile': 'company_profile',
    'Directors ID Documents & Proof of Address': 'directors_id',
    'Company Proof of Address': 'company_address_proof',
    'Regulatory License (if applicable)': 'regulatory_license',
    'Bank Statements or Financial Statements': 'financial_statements'
  };

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    agency: '',
    contractReference: '',
    serviceDescription: '',
    amount: '',
    workPeriod: '',
    completionDate: '',
    invoiceDate: '',
    dueDate: ''
  });

  const calculateAdvancePercentage = (terms: string, amount: string) => {
    const invoiceAmount = parseFloat(amount) || 0;
    let discountRate = 0;
    let percentage = 0;

    switch (terms) {
      case '30-days':
        discountRate = 15;
        percentage = 85;
        break;
      case '60-days':
        discountRate = 20;
        percentage = 80;
        break;
      case '90-days':
        discountRate = 25;
        percentage = 75;
        break;
      case '120-days':
        discountRate = 30;
        percentage = 70;
        break;
      default:
        percentage = 0;
    }

    setAdvancePercentage(percentage);
    setAdvanceAmount(invoiceAmount * (percentage / 100));
  };

  const handleDocumentUpload = async (docName: string) => {
    if (!user) return;

    // Simulate file upload
    const file = new File(['dummy content'], `${docName}.pdf`, { type: 'application/pdf' });
    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('compliance-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save document record with correct document_type
      const documentType = documentTypeMapping[docName];
      const { error: dbError } = await supabase
        .from('compliance_documents')
        .insert({
          user_id: user.id,
          document_type: documentType,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type
        });

      if (dbError) throw dbError;

      if (!uploadedDocs.includes(docName)) {
        setUploadedDocs([...uploadedDocs, docName]);
        toast.success(`${docName} uploaded successfully`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${docName}`);
    }
  };

  const removeDocument = (docName: string) => {
    setUploadedDocs(uploadedDocs.filter(doc => doc !== docName));
    toast.info(`${docName} removed`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (!formData.invoiceNumber || !formData.agency || !formData.amount || !formData.invoiceDate || !formData.dueDate) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (!paymentTerms) {
        toast.error('Please select payment terms');
        return;
      }
      setCurrentStep(2);
    } else {
      if (uploadedDocs.length < 5) {
        toast.error('Please upload at least 5 required documents');
        return;
      }

      if (!user) {
        toast.error('User not authenticated');
        return;
      }

      try {
        await createInvoiceMutation.mutateAsync({
          contractor_id: user.id,
          invoice_number: formData.invoiceNumber,
          contract_reference: formData.contractReference,
          service_description: formData.serviceDescription,
          amount: parseFloat(formData.amount),
          work_period: formData.workPeriod,
          completion_date: formData.completionDate || undefined,
          invoice_date: formData.invoiceDate,
          due_date: formData.dueDate,
          payment_terms: paymentTerms,
          advance_percentage: advancePercentage,
          advance_amount: advanceAmount,
          status: 'submitted' as const,
          submitted_at: new Date().toISOString()
        });

        navigate('/contractor/invoices');
      } catch (error) {
        console.error('Error creating invoice:', error);
        toast.error('Failed to create invoice');
      }
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
            <Button variant="outline" size="sm" onClick={() => signOut()}>
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
                    <Label htmlFor="amount">Invoice Amount (GHS) *</Label>
                    <Input
                      id="amount"
                      placeholder="e.g., 450000"
                      value={formData.amount}
                      onChange={(e) => {
                        setFormData({...formData, amount: e.target.value});
                        calculateAdvancePercentage(paymentTerms, e.target.value);
                      }}
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

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Input
                      id="completionDate"
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoiceDate">Invoice Date *</Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      value={formData.invoiceDate}
                      onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    />
                  </div>
                </div>

                {/* Payment Terms Selection */}
                <div className="space-y-4">
                  <Label>Do you know when this invoice is due for payment? *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['30-days', '60-days', '90-days', '120-days'].map((term) => (
                      <Button
                        key={term}
                        type="button"
                        variant={paymentTerms === term ? "default" : "outline"}
                        onClick={() => {
                          setPaymentTerms(term);
                          calculateAdvancePercentage(term, formData.amount);
                        }}
                        className={paymentTerms === term ? "bg-oaia-blue" : ""}
                      >
                        {term.replace('-', ' ').toUpperCase()}
                      </Button>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant={paymentTerms === 'not-applicable' ? "default" : "outline"}
                    onClick={() => {
                      setPaymentTerms('not-applicable');
                      setAdvancePercentage(0);
                      setAdvanceAmount(0);
                    }}
                    className={`w-full ${paymentTerms === 'not-applicable' ? "bg-gray-600" : ""}`}
                  >
                    Not Applicable / Don't Know
                  </Button>
                </div>

                {/* Advance Percentage Display */}
                {paymentTerms && paymentTerms !== 'not-applicable' && formData.amount && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-900">Advance Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-green-800">Payment Terms:</span>
                          <Badge className="bg-green-100 text-green-800">
                            {paymentTerms.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-green-800">Advance Percentage:</span>
                            <span className="font-bold text-green-900">{advancePercentage}%</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-3">
                            <div 
                              className="bg-green-600 h-3 rounded-full transition-all duration-300" 
                              style={{ width: `${advancePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-green-200">
                          <div>
                            <span className="text-sm text-green-700">Invoice Amount:</span>
                            <div className="font-bold text-green-900">GHS {parseFloat(formData.amount).toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-sm text-green-700">Advance Amount:</span>
                            <div className="font-bold text-green-900">GHS {advanceAmount.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
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
                  <Button 
                    type="submit" 
                    className="flex-1 bg-oaia-blue hover:bg-oaia-blue/90"
                    disabled={createInvoiceMutation.isPending}
                  >
                    {createInvoiceMutation.isPending ? 'Submitting...' : 'Submit Invoice'}
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

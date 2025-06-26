
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, CheckCircle, X, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: string;
}

const OnboardingModal = ({ isOpen, onClose, userType }: OnboardingModalProps) => {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const requiredDocuments = userType === 'contractor' ? [
    'Certificate of Incorporation',
    'Memorandum & Articles of Association', 
    'Shareholding Structure',
    'Company Profile',
    'Directors ID Documents & Proof of Address',
    'Company Proof of Address',
    'Tax Clearance Certificate',
    'VAT Registration Certificate',
    'Social Security Registration',
    'Bank Statements (Last 6 months)',
    'Audited Financial Statements',
    'Professional Indemnity Insurance',
    'Public Liability Insurance',
    'Regulatory License (if applicable)'
  ] : [
    'Government Agency Registration',
    'Authority Letter',
    'Official Contact Information',
    'Procurement Authorization',
    'Budget Allocation Documents'
  ];

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

  const handleSubmitDocuments = () => {
    if (uploadedDocs.length < Math.min(8, requiredDocuments.length)) {
      toast.error(`Please upload at least ${Math.min(8, requiredDocuments.length)} required documents`);
      return;
    }
    
    setCurrentStep(2);
    toast.success('Documents submitted successfully!');
  };

  const handleCompleteOnboarding = () => {
    toast.success('Onboarding completed! You can now access all features.');
    onClose();
  };

  const uploadProgress = (uploadedDocs.length / requiredDocuments.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-oaia-blue">
            Complete Your Onboarding
          </DialogTitle>
          <DialogDescription>
            Upload the required compliance documents to activate your account
          </DialogDescription>
        </DialogHeader>

        {currentStep === 1 ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Document Upload Progress</span>
                <span>{uploadedDocs.length} of {requiredDocuments.length} uploaded</span>
              </div>
              <Progress value={uploadProgress} className="h-3" />
            </div>

            {/* Information Card */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-800 space-y-2">
                  <p><strong>Important:</strong> All documents must be uploaded to proceed.</p>
                  <p><strong>Processing Time:</strong> Onboarding will be completed within 24-48 hours.</p>
                  <p><strong>Document Requirements:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>All documents must be clear and legible</li>
                    <li>Identification documents must be certified copies</li>
                    <li>Proof of address must be less than 3 months old</li>
                    <li>Financial statements must be less than 6 months old</li>
                    <li>Documents should be in PDF format (max 10MB each)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload Grid */}
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {requiredDocuments.map((docName, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-oaia-blue flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{docName}</div>
                      <div className="text-xs text-oaia-gray">
                        {docName.includes('ID') || docName.includes('Address') ? 'Certified copies required' :
                         docName.includes('Financial') || docName.includes('Bank') ? 'Recent statements (< 6 months)' :
                         docName.includes('Insurance') ? 'Valid policy documents' :
                         'Official company documents'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {uploadedDocs.includes(docName) ? (
                      <>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeDocument(docName)}
                          className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDocumentUpload(docName)}
                        className="border-oaia-blue text-oaia-blue hover:bg-oaia-blue hover:text-white text-xs"
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                onClick={handleSubmitDocuments}
                className="bg-oaia-blue hover:bg-oaia-blue/90"
                disabled={uploadedDocs.length < Math.min(8, requiredDocuments.length)}
              >
                Submit Documents ({uploadedDocs.length})
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Clock className="h-10 w-10 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Documents Submitted Successfully!</h3>
              <p className="text-oaia-gray mb-6">
                Your documents have been received and are being reviewed by our compliance team.
              </p>
            </div>

            <Card className="border-amber-200 bg-amber-50 max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="text-amber-800 space-y-2">
                  <p className="font-semibold">What happens next?</p>
                  <ul className="text-sm space-y-1">
                    <li>• Document review: 24-48 hours</li>
                    <li>• Email notification upon approval</li>
                    <li>• Full platform access activated</li>
                    <li>• Ready to submit invoices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-oaia-gray">
              You can continue using the platform with limited access until onboarding is complete.
            </p>

            <Button 
              onClick={handleCompleteOnboarding}
              className="bg-oaia-blue hover:bg-oaia-blue/90"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, CheckCircle, Plus, Banknote, Landmark } from "lucide-react";
import { toast } from "sonner";
import ContractorSidebar from "@/components/ContractorSidebar";

interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branch: string;
  currency: string;
  DOB: string;
  isDefault: boolean;
}

const CreateInvoice = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<{name: string; file: File}[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<string>("");
  const [advancePercentage, setAdvancePercentage] = useState<number>(0);
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankAccounts, setSelectedBankAccounts] = useState<string[]>([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState<string | null>(null);
  const [isAddingBankAccount, setIsAddingBankAccount] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState<Omit<BankAccount, 'id'>>({ 
    accountName: '',
    accountNumber: '',
    bankName: '',
    branch: '',
    currency: 'GHS',
    DOB: '',
    isDefault: false
  });

  // Invoice-specific required documents (only invoice-related docs)
  const requiredDocuments = [
    { name: "Invoice", description: "Detailed invoice document" },
    { name: "Award Contract", description: "Signed contract document" },
    { name: "Payment Certificate", description: "Approved payment certificate" },
  ];

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    contractName: "",
    agency: "",
    contractReference: "",
    serviceDescription: "",
    amount: "",
    workPeriod: "",
    completionDate: "",
    invoiceDate: "",
    dueDate: "",
  });

  // Format amount to handle commas and convert to number
  const formatAmount = (value: string): string => {
    // Remove all non-digit characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Format with commas for thousands
    if (numericValue) {
      const parts = numericValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
    }
    return '';
  };

  // Calculate amount without formatting
  const getNumericAmount = (formattedAmount: string): number => {
    return parseFloat(formattedAmount.replace(/,/g, '')) || 0;
  };

  const calculateAdvancePercentage = (terms: string, amount: string) => {
    const invoiceAmount = getNumericAmount(amount);
    let discountRate = 0;
    let percentage = 0;

    switch (terms) {
      case "30-days":
        discountRate = 15;
        percentage = 85;
        break;
      case "60-days":
        discountRate = 20;
        percentage = 80;
        break;
      case "90-days":
        discountRate = 25;
        percentage = 75;
        break;
      case "120-days":
        discountRate = 30;
        percentage = 70;
        break;
      default:
        percentage = 0;
    }

    setAdvancePercentage(percentage);
    setAdvanceAmount(invoiceAmount * (percentage / 100));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size should be less than 10MB");
        return;
      }
      
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        toast.error("Only PDF, JPG, and PNG files are allowed");
        return;
      }

      setUploadedDocs([...uploadedDocs, { name: docName, file }]);
      toast.success(`${docName} uploaded successfully`);
    }
  };

  const removeDocument = (index: number) => {
    const newDocs = [...uploadedDocs];
    const removed = newDocs.splice(index, 1);
    setUploadedDocs(newDocs);
    toast.info(`${removed[0].name} removed`);
  };

  const handleBankAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount = {
      ...newBankAccount,
      id: `acc-${Date.now()}`,
    };
    
    const updatedAccounts = [...bankAccounts, newAccount];
    setBankAccounts(updatedAccounts);
    setSelectedBankAccount(newAccount.id);
    setIsAddingBankAccount(false);
    setNewBankAccount({ 
      accountName: '',
      accountNumber: '',
      bankName: '',
      branch: '',
      currency: 'GHS',
      DOB: '',
      isDefault: false 
    });
    toast.success("Bank account added successfully");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ContractorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 md:p-6">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Invoice Submitted Successfully!</h2>
              <p className="text-gray-600 mb-8">Your invoice has been submitted and is being processed.</p>
              <Button asChild>
                <Link to="/dashboard/contractor">
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Progress Steps */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step ? "bg-oaia-blue text-white" : "bg-gray-200"
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-sm mt-2">
                      {step === 1 ? "Invoice Details" : step === 2 ? "Documents" : "Summary"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form Steps */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1
                      ? "Invoice Details"
                      : currentStep === 2
                      ? "Upload Required Documents"
                      : "Review & Submit"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1
                      ? "Enter the invoice and contract details"
                      : currentStep === 2
                      ? "Upload all required supporting documents"
                      : "Review your information before submission"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Step 1: Invoice Details */}
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contract Name */}
                      <div className="space-y-2">
                        <Label htmlFor="contractName">Contract Name *</Label>
                        <Input
                          id="contractName"
                          value={formData.contractName}
                          onChange={(e) =>
                            setFormData({ ...formData, contractName: e.target.value })
                          }
                          placeholder="e.g. Road Construction Project Phase 1"
                          required
                        />
                      </div>

                      {/* Invoice Number */}
                      <div className="space-y-2">
                        <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                        <Input
                          id="invoiceNumber"
                          value={formData.invoiceNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, invoiceNumber: e.target.value })
                          }
                          placeholder="e.g. INV-2023-001"
                          required
                        />
                      </div>

                      {/* Invoice Amount with proper formatting */}
                      <div className="space-y-2">
                        <Label htmlFor="amount">Invoice Amount (GHS) *</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">GHS</span>
                          </div>
                          <Input
                            id="amount"
                            type="text"
                            value={formData.amount}
                            onChange={(e) => {
                              // Remove existing commas and only allow numbers and decimal points
                              const value = e.target.value.replace(/,/g, '').replace(/[^0-9.]/g, '');
                              // Format the amount with commas
                              const formattedValue = formatAmount(value);
                              setFormData({ ...formData, amount: formattedValue });
                              
                              // Recalculate advance amount if payment terms are selected
                              if (paymentTerms) {
                                calculateAdvancePercentage(paymentTerms, formattedValue);
                              }
                            }}
                            placeholder="0.00"
                            className="pl-12"
                            required
                          />
                        </div>
                      </div>

                      {/* Other form fields... */}
                    </div>
                  )}

                  {/* Step 2: Document Upload */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        {requiredDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-5 w-5 text-oaia-blue" />
                              <div>
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-sm text-gray-500">{doc.description}</div>
                              </div>
                            </div>
                            {uploadedDocs.some(d => d.name === doc.name) ? (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocument(
                                    uploadedDocs.findIndex(d => d.name === doc.name)
                                  )}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="relative">
                                <Button asChild variant="outline">
                                  <Label className="cursor-pointer">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                    <input
                                      type="file"
                                      className="sr-only"
                                      onChange={(e) => handleDocumentUpload(e, doc.name)}
                                      accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                  </Label>
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Summary and Bank Account Selection */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      {/* Invoice Summary */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Invoice Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Contract Name:</span>
                            <span>{formData.contractName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Invoice Amount:</span>
                            <span>GHS {formData.amount}</span>
                          </div>
                          {paymentTerms && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Advance Payment ({advancePercentage}%):</span>
                                <span>GHS {advanceAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Amount Due:</span>
                                <span>GHS {(getNumericAmount(formData.amount) - advanceAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Bank Account Selection */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium">Bank Accounts for Payment</h3>
                            <p className="text-sm text-gray-500 mt-1">Select one or more bank accounts to receive payments</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsAddingBankAccount(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Account
                          </Button>
                        </div>

                        {isAddingBankAccount ? (
                          <Card>
                            <CardContent className="pt-6">
                              <form onSubmit={handleBankAccountSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="accountName">Account Name *</Label>
                                    <Input
                                      id="accountName"
                                      value={newBankAccount.accountName}
                                      onChange={(e) => setNewBankAccount({...newBankAccount, accountName: e.target.value})}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="accountNumber">Account Number *</Label>
                                    <Input
                                      id="accountNumber"
                                      value={newBankAccount.accountNumber}
                                      onChange={(e) => setNewBankAccount({...newBankAccount, accountNumber: e.target.value})}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="bankName">Bank Nam *</Label>
                                    <Input
                                      id="bankName"
                                      value={newBankAccount.bankName}
                                      onChange={(e) => setNewBankAccount({...newBankAccount, bankName: e.target.value})}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="branch">Branch</Label>
                                    <Input
                                      id="branch"
                                      value={newBankAccount.branch}
                                      onChange={(e) => setNewBankAccount({...newBankAccount, branch: e.target.value})}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="currency">Currency *</Label>
                                    <Select
                                      value={newBankAccount.currency}
                                      onValueChange={(value) => setNewBankAccount({...newBankAccount, currency: value})}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="GHS">GHS - Ghana Cedi</SelectItem>
                                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex items-end space-x-2">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="isDefault"
                                        checked={newBankAccount.isDefault}
                                        onChange={(e) => setNewBankAccount({...newBankAccount, isDefault: e.target.checked})}
                                        className="h-4 w-4 rounded border-gray-300 text-oaia-blue focus:ring-oaia-blue"
                                      />
                                      <Label htmlFor="isDefault" className="text-sm">
                                        Set as default account
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2 pt-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddingBankAccount(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button type="submit">Save Account</Button>
                                </div>
                              </form>
                            </CardContent>
                          </Card>
                        ) : (
                          <div className="space-y-4">
                            {bankAccounts.length > 0 ? (
                              <div className="grid gap-4">
                                {bankAccounts.map((account) => (
                                  <div
                                    key={account.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                      selectedBankAccounts.includes(account.id) ? 'border-oaia-blue bg-blue-50' : 'hover:bg-gray-50'
                                    }`}
                                    onClick={() => {
                                      if (selectedBankAccounts.includes(account.id)) {
                                        setSelectedBankAccounts(selectedBankAccounts.filter(id => id !== account.id));
                                      } else {
                                        setSelectedBankAccounts([...selectedBankAccounts, account.id]);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-full bg-oaia-blue/10">
                                          <Landmark className="h-5 w-5 text-oaia-blue" />
                                        </div>
                                        <div>
                                          <div className="font-medium">{account.accountName}</div>
                                          <div className="text-sm text-gray-500">
                                            {account.bankName} ••••{account.accountNumber.slice(-4)}
                                          </div>
                                        </div>
                                      </div>
                                      {account.isDefault && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                          Default
                                        </Badge>
                                      )}
                                      {selectedBankAccounts.includes(account.id) && (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                                <Banknote className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No bank accounts</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Add a bank account to receive payments.
                                </p>
                                <div className="mt-6">
                                  <Button
                                    type="button"
                                    onClick={() => setIsAddingBankAccount(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-oaia-blue hover:bg-oaia-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oaia-blue"
                                  >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                                    Add Bank Account
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Uploaded Documents Summary */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Uploaded Documents</h3>
                        {uploadedDocs.length > 0 ? (
                          <div className="space-y-2">
                            {uploadedDocs.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-5 w-5 text-oaia-blue" />
                                  <span className="text-sm">{doc.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDocument(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 mt-6 border-t">
                    <div>
                      {currentStep > 1 && (
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(currentStep - 1)}
                        >
                          Back
                        </Button>
                      )}
                    </div>
                    <div className="space-x-3">
                      {currentStep < 3 ? (
                        <Button
                          onClick={() => {
                            // Basic validation before proceeding
                            if (currentStep === 1) {
                              if (!formData.contractName || !formData.amount) {
                                toast.error("Please fill in all required fields");
                                return;
                              }
                            } else if (currentStep === 2 && uploadedDocs.length === 0) {
                              toast.error("Please upload at least one document");
                              return;
                            }
                            setCurrentStep(currentStep + 1);
                          }}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            if (selectedBankAccounts.length === 0) {
                              toast.error("Please select at least one bank account");
                              return;
                            }
                            toast.success("Invoice submitted successfully!");
                            setIsSubmitted(true);
                          }}
                          disabled={selectedBankAccounts.length === 0}
                        >
                          Submit Invoice
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

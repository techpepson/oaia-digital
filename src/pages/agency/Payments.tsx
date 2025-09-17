
// OAIA Digital - Agency Payments Management
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import AgencySidebar from '@/components/AgencySidebar';
import { 
  Search, 
  Filter, 
  CreditCard, 
  Eye, 
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Upload,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';

const Payments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('oa-to-contractor');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // OA to Contractor Payouts
  const oaToContractorPayouts = [
    {
      id: 'OA-PAY-001',
      invoiceId: 'INV-2024-002',
      contractor: 'BuildRight Ltd',
      project: 'Hospital Construction Phase 2',
      amount: 750000,
      currency: 'GHS',
      paymentDate: '2024-01-15',
      status: 'completed',
      method: 'bank_transfer',
      reference: 'OA-TXN-BRT-001',
      proofOfPayment: 'receipt_001.pdf'
    },
    {
      id: 'OA-PAY-002',
      invoiceId: 'INV-2024-005',
      contractor: 'CleanWater Solutions',
      project: 'Water Treatment Plant',
      amount: 210000,
      currency: 'GHS',
      paymentDate: '2024-01-14',
      status: 'processing',
      method: 'bank_transfer',
      reference: 'OA-TXN-CWS-002',
      proofOfPayment: null
    },
    {
      id: 'OA-PAY-003',
      invoiceId: 'INV-2024-008',
      contractor: 'Tech Infrastructure Ltd',
      project: 'Digital Health System',
      amount: 450000,
      currency: 'GHS',
      paymentDate: '2024-01-12',
      status: 'completed',
      method: 'bank_transfer',
      reference: 'OA-TXN-TIL-003',
      proofOfPayment: 'receipt_003.pdf'
    }
  ];

  // Agency to OA Payouts
  const agencyToOaPayouts = [
    {
      id: 'AGENCY-PAY-001',
      paymentType: 'project_funding',
      project: 'Hospital Construction Phase 2',
      amount: 2500000,
      currency: 'GHS',
      paymentDate: '2024-01-10',
      status: 'completed',
      method: 'treasury_transfer',
      reference: 'MOH-FUND-Q1-001',
      proofOfPayment: 'moh_payment_proof_001.pdf',
      invoicesCovered: 5
    },
    {
      id: 'AGENCY-PAY-002',
      paymentType: 'advance_recovery',
      project: 'Water Treatment Plant',
      amount: 800000,
      currency: 'GHS',
      paymentDate: '2024-01-08',
      status: 'pending',
      method: 'treasury_transfer',
      reference: 'MOH-FUND-Q1-002',
      proofOfPayment: null,
      invoicesCovered: 3
    },
    {
      id: 'AGENCY-PAY-003',
      paymentType: 'project_funding',
      project: 'Digital Health System',
      amount: 1200000,
      currency: 'GHS',
      paymentDate: '2024-01-05',
      status: 'completed',
      method: 'treasury_transfer',
      reference: 'MOH-FUND-Q1-003',
      proofOfPayment: 'moh_payment_proof_003.pdf',
      invoicesCovered: 2
    }
  ];

  const payments = [
    {
      id: 'PAY-2024-001',
      type: 'disbursement',
      invoiceId: 'INV-2024-002',
      contractor: 'BuildRight Ltd',
      amount: 750000,
      currency: 'GHS',
      paymentDate: '2024-01-15',
      status: 'completed',
      method: 'bank_transfer',
      reference: 'TXN-BRT-001'
    },
    {
      id: 'PAY-2024-002',
      type: 'advance',
      invoiceId: 'INV-2024-005',
      contractor: 'CleanWater Solutions',
      amount: 210000,
      currency: 'GHS',
      paymentDate: '2024-01-14',
      status: 'processing',
      method: 'bank_transfer',
      reference: 'TXN-CWS-002'
    },
    {
      id: 'FUND-2024-003',
      type: 'funding',
      invoiceId: null,
      contractor: 'Ministry of Finance',
      amount: 5000000,
      currency: 'GHS',
      paymentDate: '2024-01-13',
      status: 'completed',
      method: 'treasury_transfer',
      reference: 'FUND-MOH-Q1'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'disbursement': return 'bg-blue-100 text-blue-800';
      case 'advance': return 'bg-purple-100 text-purple-800';
      case 'funding': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'funding': return <ArrowDownRight className="h-4 w-4 text-green-600" />;
      default: return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <AgencySidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Logo showText={false} />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Payments & Disbursements</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">Ministry of Health</span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-oaia-green">GHS 1.41M</div>
                <div className="text-sm text-gray-900 mt-1">OA to Contractors</div>
                <div className="text-xs text-oaia-gray mt-1">Total paid out</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-oaia-blue">GHS 4.5M</div>
                <div className="text-sm text-gray-900 mt-1">Agency to OA</div>
                <div className="text-xs text-oaia-gray mt-1">Total funding provided</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">{oaToContractorPayouts.length + agencyToOaPayouts.length}</div>
                <div className="text-sm text-gray-900 mt-1">Total Transactions</div>
                <div className="text-xs text-oaia-gray mt-1">All payment records</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {[...oaToContractorPayouts, ...agencyToOaPayouts].filter(p => p.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-900 mt-1">Pending Payments</div>
                <div className="text-xs text-oaia-gray mt-1">Awaiting processing</div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Type Tabs */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue">Payment Categories</CardTitle>
              <CardDescription>
                View and manage different types of payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <Button
                  variant={activeTab === 'oa-to-contractor' ? 'default' : 'ghost'}
                  className={`flex-1 ${activeTab === 'oa-to-contractor' ? 'bg-oaia-blue text-white' : ''}`}
                  onClick={() => setActiveTab('oa-to-contractor')}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  OA to Contractors
                </Button>
                <Button
                  variant={activeTab === 'agency-to-oa' ? 'default' : 'ghost'}
                  className={`flex-1 ${activeTab === 'agency-to-oa' ? 'bg-oaia-blue text-white' : ''}`}
                  onClick={() => setActiveTab('agency-to-oa')}
                >
                  <ArrowDownRight className="h-4 w-4 mr-2" />
                  Agency to OA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="disbursement">Disbursements</SelectItem>
                    <SelectItem value="advance">Advances</SelectItem>
                    <SelectItem value="funding">Funding Received</SelectItem>
                  </SelectContent>
                </Select>

                <Input type="date" placeholder="From date" />
                <Input type="date" placeholder="To date" />
                
                <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Conditional Payment Tables */}
          {activeTab === 'oa-to-contractor' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <ArrowUpRight className="h-5 w-5 mr-2" />
                  OA to Contractor Payouts ({oaToContractorPayouts.length})
                </CardTitle>
                <CardDescription>
                  Payments made by OA to contractors for approved invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Contractor</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Proof of Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oaToContractorPayouts.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell className="font-medium text-oaia-blue">{payment.invoiceId}</TableCell>
                        <TableCell>{payment.contractor}</TableCell>
                        <TableCell className="text-sm">{payment.project}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {payment.currency} {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-oaia-gray">
                            <Calendar className="h-4 w-4 mr-1" />
                            {payment.paymentDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {payment.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                            {payment.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.proofOfPayment ? (
                            <div className="flex items-center text-green-600">
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="text-sm">Available</span>
                            </div>
                          ) : (
                            <span className="text-oaia-gray text-sm">Not uploaded</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {payment.proofOfPayment && (
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === 'agency-to-oa' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-oaia-blue flex items-center">
                      <ArrowDownRight className="h-5 w-5 mr-2" />
                      Agency to OA Payouts ({agencyToOaPayouts.length})
                    </CardTitle>
                    <CardDescription>
                      Funding payments made by agency to OA for project financing
                    </CardDescription>
                  </div>
                  <Button 
                    className="bg-oaia-blue hover:bg-oaia-blue/90"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Proof of Payment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Payment Type</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Invoices Covered</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Proof of Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agencyToOaPayouts.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>
                          <Badge className={payment.paymentType === 'project_funding' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                            {payment.paymentType.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{payment.project}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {payment.currency} {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-oaia-gray">
                            <Calendar className="h-4 w-4 mr-1" />
                            {payment.paymentDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{payment.invoicesCovered}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {payment.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {payment.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.proofOfPayment ? (
                            <div className="flex items-center text-green-600">
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="text-sm">Available</span>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-oaia-blue border-oaia-blue"
                              onClick={() => {
                                setSelectedPayment(payment);
                                setShowUploadModal(true);
                              }}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {payment.proofOfPayment && (
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Upload Proof of Payment Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-oaia-blue">
                Upload Proof of Payment
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedPayment(null);
                }}
              >
                ×
              </Button>
            </div>
            
            {selectedPayment && (
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Payment ID: <span className="font-medium">{selectedPayment.id}</span></p>
                <p className="text-sm text-gray-600">Project: <span className="font-medium">{selectedPayment.project}</span></p>
                <p className="text-sm text-gray-600">Amount: <span className="font-medium">{selectedPayment.currency} {selectedPayment.amount.toLocaleString()}</span></p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-oaia-blue transition-colors">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    // Handle file upload logic here
                    console.log('File selected:', e.target.files?.[0]);
                  }}
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedPayment(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-oaia-blue hover:bg-oaia-blue/90"
                onClick={() => {
                  // Handle upload logic here
                  console.log('Uploading proof of payment...');
                  setShowUploadModal(false);
                  setSelectedPayment(null);
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import { 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Search, 
  Download,
  AlertTriangle,
  Banknote,
  FileText,
  Eye
} from 'lucide-react';

const FundingManagement = () => {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [agencyFilter, setAgencyFilter] = useState('all');

  const fundingRequests = [
    {
      id: 'FR-2024-001',
      agency: 'GETFund',
      requestDate: '2024-01-15',
      amount: 'KES 5,200,000',
      invoiceCount: 12,
      priority: 'High',
      status: 'Pending Review',
      submittedBy: 'Dr. Sarah Mensah',
      description: 'Infrastructure development projects - Q1 2024',
      budgetCode: 'ED-2024-001',
      expectedDisbursement: '2024-01-20',
      documents: 3
    },
    {
      id: 'FR-2024-002',
      agency: 'NHIS',
      requestDate: '2024-01-14',
      amount: 'KES 3,800,000',
      invoiceCount: 8,
      priority: 'Medium',
      status: 'Approved',
      submittedBy: 'Mr. James Osei',
      description: 'Medical equipment procurement',
      budgetCode: 'HL-2024-003',
      expectedDisbursement: '2024-01-18',
      documents: 5
    },
    {
      id: 'FR-2024-003',
      agency: 'Road Fund',
      requestDate: '2024-01-13',
      amount: 'KES 7,500,000',
      invoiceCount: 15,
      priority: 'High',
      status: 'Under Review',
      submittedBy: 'Eng. Mary Asante',
      description: 'Highway maintenance and repairs',
      budgetCode: 'TR-2024-005',
      expectedDisbursement: '2024-01-25',
      documents: 8
    },
    {
      id: 'FR-2024-004',
      agency: 'Ministry of Education',
      requestDate: '2024-01-12',
      amount: 'KES 2,100,000',
      invoiceCount: 6,
      priority: 'Low',
      status: 'Funded',
      submittedBy: 'Prof. Kwame Nyong',
      description: 'School infrastructure upgrades',
      budgetCode: 'ED-2024-002',
      expectedDisbursement: '2024-01-16',
      documents: 4
    },
    {
      id: 'FR-2024-005',
      agency: 'NHIS',
      requestDate: '2024-01-11',
      amount: 'KES 1,900,000',
      invoiceCount: 4,
      priority: 'Medium',
      status: 'Rejected',
      submittedBy: 'Dr. Akosua Frimpong',
      description: 'IT system upgrades',
      budgetCode: 'HL-2024-004',
      expectedDisbursement: '-',
      documents: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800';
      case 'Funded':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    setSelectedRequests(
      selectedRequests.length === fundingRequests.length 
        ? [] 
        : fundingRequests.map(req => req.id)
    );
  };

  const filteredRequests = fundingRequests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesAgency = agencyFilter === 'all' || request.agency === agencyFilter;
    return matchesStatus && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-oaia-light">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard/ministry">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">Ministry of Finance - Funding Management</span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Funding Management</h1>
          <p className="text-oaia-gray mt-1">Review, approve, and track agency funding requests</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {fundingRequests.filter(r => r.status === 'Pending Review').length}
              </div>
              <div className="text-sm text-oaia-gray">Requests</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {fundingRequests.filter(r => r.status === 'Approved').length}
              </div>
              <div className="text-sm text-oaia-gray">KES 3.8M total value</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Requested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">KES 20.5M</div>
              <div className="text-sm text-oaia-gray">This month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Banknote className="h-4 w-4 mr-1" />
                Funded Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">KES 2.1M</div>
              <div className="text-sm text-oaia-gray">Disbursed this week</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Funded">Funded</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    <SelectItem value="GETFund">GETFund</SelectItem>
                    <SelectItem value="NHIS">NHIS</SelectItem>
                    <SelectItem value="Road Fund">Road Fund</SelectItem>
                    <SelectItem value="Ministry of Education">Ministry of Education</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search requests..." className="w-64" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" disabled={selectedRequests.length === 0}>
                  Bulk Approve ({selectedRequests.length})
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funding Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">Funding Requests</CardTitle>
            <CardDescription>
              All agency funding requests requiring MoF review and approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Expected Disbursement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedRequests.includes(request.id)}
                          onCheckedChange={() => handleSelectRequest(request.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono font-medium">{request.id}</TableCell>
                      <TableCell>{request.agency}</TableCell>
                      <TableCell className="font-medium">{request.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>{request.invoiceCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{request.submittedBy}</div>
                          <div className="text-gray-500">{request.requestDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {request.expectedDisbursement}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === 'Pending Review' && (
                            <>
                              <Button size="sm" variant="ghost" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {request.status === 'Approved' && (
                            <Button size="sm" variant="ghost" className="text-blue-600">
                              <Banknote className="h-4 w-4" />
                            </Button>
                          )}
                          {request.priority === 'High' && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundingManagement;

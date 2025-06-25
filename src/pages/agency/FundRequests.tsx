
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import AgencySidebar from '@/components/AgencySidebar';
import { 
  Search, 
  Filter, 
  FileText, 
  Eye, 
  Plus,
  Calendar,
  Send,
  Clock
} from 'lucide-react';

const FundRequests = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewRequest, setShowNewRequest] = useState(false);

  const fundRequests = [
    {
      id: 'FR-2024-001',
      requestDate: '2024-01-15',
      amount: 2500000,
      currency: 'KES',
      purpose: 'Approved invoices payment batch #1',
      invoicesCount: 5,
      status: 'approved',
      approvedDate: '2024-01-16',
      disbursementDate: '2024-01-17',
      notes: 'Urgent payment required for hospital construction project'
    },
    {
      id: 'FR-2024-002',
      requestDate: '2024-01-14',
      amount: 1800000,
      currency: 'KES',
      purpose: 'Road maintenance projects payment',
      invoicesCount: 3,
      status: 'pending',
      approvedDate: null,
      disbursementDate: null,
      notes: 'Quarterly road maintenance invoice settlement'
    },
    {
      id: 'FR-2024-003',
      requestDate: '2024-01-13',
      amount: 900000,
      currency: 'KES',
      purpose: 'IT services and equipment procurement',
      invoicesCount: 2,
      status: 'processing',
      approvedDate: '2024-01-14',
      disbursementDate: null,
      notes: 'Technology upgrade for health facilities'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitRequest = () => {
    console.log('Submitting new fund request');
    setShowNewRequest(false);
    // Handle fund request submission
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
              <h1 className="text-xl font-semibold text-gray-900">Fund Requests</h1>
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
                <div className="text-2xl font-bold text-oaia-green">12</div>
                <div className="text-sm text-gray-900 mt-1">Approved Requests</div>
                <div className="text-xs text-oaia-gray mt-1">This quarter</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-oaia-blue">KES 18.2M</div>
                <div className="text-sm text-gray-900 mt-1">Total Requested</div>
                <div className="text-xs text-oaia-gray mt-1">This quarter</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-900 mt-1">Pending Approval</div>
                <div className="text-xs text-oaia-gray mt-1">Awaiting MoF review</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">5 days</div>
                <div className="text-sm text-gray-900 mt-1">Avg. Processing Time</div>
                <div className="text-xs text-oaia-gray mt-1">From request to disbursement</div>
              </CardContent>
            </Card>
          </div>

          {/* New Fund Request Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowNewRequest(true)}
                className="bg-oaia-blue hover:bg-oaia-blue/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Fund Request
              </Button>
            </div>
          </div>

          {/* New Fund Request Form */}
          {showNewRequest && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-oaia-blue flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Create New Fund Request
                </CardTitle>
                <CardDescription>
                  Request disbursement from MoF/Treasury for approved invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Request Amount (KES)</Label>
                      <Input id="amount" type="number" placeholder="Enter amount" />
                    </div>
                    
                    <div>
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input id="purpose" placeholder="Brief description of fund request" />
                    </div>
                    
                    <div>
                      <Label htmlFor="invoices">Number of Invoices</Label>
                      <Input id="invoices" type="number" placeholder="Number of invoices to be paid" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Provide additional context or justification"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setShowNewRequest(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitRequest} className="bg-oaia-blue hover:bg-oaia-blue/90">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter Fund Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Input type="date" placeholder="From date" />
                <Input type="date" placeholder="To date" />
              </div>
            </CardContent>
          </Card>

          {/* Fund Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Fund Requests ({fundRequests.length})
              </CardTitle>
              <CardDescription>
                Track fund requests submitted to Ministry of Finance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fundRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-oaia-gray">
                          <Calendar className="h-4 w-4 mr-1" />
                          {request.requestDate}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {request.currency} {request.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{request.purpose}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {request.invoicesCount} invoices
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.approvedDate ? (
                          <div className="flex items-center text-sm text-oaia-gray">
                            <Calendar className="h-4 w-4 mr-1" />
                            {request.approvedDate}
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-oaia-gray">
                            <Clock className="h-4 w-4 mr-1" />
                            Pending
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundRequests;

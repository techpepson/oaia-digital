
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
  Menu, 
  X, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download,
  AlertTriangle,
  Calendar
} from 'lucide-react';

const PendingInvoices = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contractorFilter, setContractorFilter] = useState('all');

  const pendingInvoices = [
    {
      id: 'INV-2024-001',
      contractor: 'ABC Construction Ltd',
      amount: 450000,
      currency: 'KES',
      service: 'Road Maintenance',
      contract: 'CNT-2024-001',
      submittedDate: '2024-01-15',
      dueDate: '2024-01-25',
      priority: 'high',
      status: 'pending_review',
      documents: 3
    },
    {
      id: 'INV-2024-004',
      contractor: 'Tech Solutions Inc',
      amount: 180000,
      currency: 'KES',
      service: 'IT Services',
      contract: 'CNT-2024-004',
      submittedDate: '2024-01-14',
      dueDate: '2024-01-24',
      priority: 'medium',
      status: 'pending_approval',
      documents: 2
    },
    {
      id: 'INV-2024-007',
      contractor: 'Green Energy Co',
      amount: 320000,
      currency: 'KES',
      service: 'Solar Installation',
      contract: 'CNT-2024-007',
      submittedDate: '2024-01-13',
      dueDate: '2024-01-23',
      priority: 'urgent',
      status: 'pending_review',
      documents: 5
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review': return 'bg-blue-100 text-blue-800';
      case 'pending_approval': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (invoiceId: string) => {
    console.log(`Approving invoice ${invoiceId}`);
    // Handle approval logic
  };

  const handleReject = (invoiceId: string) => {
    console.log(`Rejecting invoice ${invoiceId}`);
    // Handle rejection logic
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
              <h1 className="text-xl font-semibold text-gray-900">Pending Invoices</h1>
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
          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-oaia-blue flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search invoices..."
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
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={contractorFilter} onValueChange={setContractorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by contractor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contractors</SelectItem>
                    <SelectItem value="abc">ABC Construction Ltd</SelectItem>
                    <SelectItem value="tech">Tech Solutions Inc</SelectItem>
                    <SelectItem value="green">Green Energy Co</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Pending Invoices ({pendingInvoices.length})
              </CardTitle>
              <CardDescription>
                Review and approve contractor invoices awaiting your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Contract</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.contractor}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{invoice.contract}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(invoice.priority)}>
                          {invoice.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-oaia-gray">
                          <Calendar className="h-4 w-4 mr-1" />
                          {invoice.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-oaia-green hover:bg-oaia-green/90"
                            onClick={() => handleApprove(invoice.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(invoice.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
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

export default PendingInvoices;

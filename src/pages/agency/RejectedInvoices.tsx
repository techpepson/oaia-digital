
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
  XCircle, 
  Eye, 
  MessageSquare,
  Calendar,
  AlertCircle
} from 'lucide-react';

const RejectedInvoices = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reasonFilter, setReasonFilter] = useState('all');

  const rejectedInvoices = [
    {
      id: 'INV-2024-006',
      contractor: 'FastBuild Corp',
      amount: 890000,
      currency: 'KES',
      service: 'Road Construction',
      contract: 'CNT-2024-006',
      rejectedDate: '2024-01-14',
      rejectedBy: 'Eng. David Mutiso',
      reason: 'incomplete_documentation',
      reasonDetails: 'Missing delivery certificates and quality assurance reports',
      canResubmit: true
    },
    {
      id: 'INV-2024-008',
      contractor: 'QuickFix Ltd',
      amount: 150000,
      currency: 'KES',
      service: 'Maintenance Services',
      contract: 'CNT-2024-008',
      rejectedDate: '2024-01-13',
      rejectedBy: 'Mary Kamau',
      reason: 'budget_exceeded',
      reasonDetails: 'Invoice amount exceeds remaining contract budget allocation',
      canResubmit: false
    },
    {
      id: 'INV-2024-009',
      contractor: 'PowerTech Solutions',
      amount: 320000,
      currency: 'KES',
      service: 'Electrical Installation',
      contract: 'CNT-2024-009',
      rejectedDate: '2024-01-12',
      rejectedBy: 'Eng. Sarah Njoki',
      reason: 'scope_mismatch',
      reasonDetails: 'Services invoiced do not match approved contract scope',
      canResubmit: true
    }
  ];

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'incomplete_documentation': return 'bg-yellow-100 text-yellow-800';
      case 'budget_exceeded': return 'bg-red-100 text-red-800';
      case 'scope_mismatch': return 'bg-orange-100 text-orange-800';
      case 'quality_issues': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatReason = (reason: string) => {
    return reason.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
              <h1 className="text-xl font-semibold text-gray-900">Rejected Invoices</h1>
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
                Filter Rejected Invoices
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
                
                <Select value={reasonFilter} onValueChange={setReasonFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reasons</SelectItem>
                    <SelectItem value="incomplete_documentation">Incomplete Documentation</SelectItem>
                    <SelectItem value="budget_exceeded">Budget Exceeded</SelectItem>
                    <SelectItem value="scope_mismatch">Scope Mismatch</SelectItem>
                    <SelectItem value="quality_issues">Quality Issues</SelectItem>
                  </SelectContent>
                </Select>

                <Input type="date" placeholder="From date" />
                <Input type="date" placeholder="To date" />
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-900 mt-1">Total Rejected</div>
                <div className="text-xs text-oaia-gray mt-1">This month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-900 mt-1">Can Resubmit</div>
                <div className="text-xs text-oaia-gray mt-1">67% recovery rate</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-oaia-blue">KES 4.2M</div>
                <div className="text-sm text-gray-900 mt-1">Rejected Value</div>
                <div className="text-xs text-oaia-gray mt-1">Total amount</div>
              </CardContent>
            </Card>
          </div>

          {/* Rejected Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-500" />
                Rejected Invoices ({rejectedInvoices.length})
              </CardTitle>
              <CardDescription>
                Review rejected invoices and their rejection reasons
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
                    <TableHead>Rejected Date</TableHead>
                    <TableHead>Rejected By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Can Resubmit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.contractor}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-oaia-gray">
                          <Calendar className="h-4 w-4 mr-1" />
                          {invoice.rejectedDate}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.rejectedBy}</TableCell>
                      <TableCell>
                        <Badge className={getReasonColor(invoice.reason)}>
                          {formatReason(invoice.reason)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {invoice.canResubmit ? (
                          <Badge className="bg-green-100 text-green-800">Yes</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Details
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

export default RejectedInvoices;

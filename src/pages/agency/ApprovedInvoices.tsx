
// OAIA Digital - Agency Approved Invoices
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
  CheckCircle, 
  Eye, 
  Download,
  Calendar,
  FileText,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const ApprovedInvoices = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const approvedInvoices = [
    {
      id: 'INV-2024-002',
      contractor: 'BuildRight Ltd',
      amount: 750000,
      currency: 'GHS',
      service: 'Hospital Construction',
      contract: 'CNT-2024-002',
      approvedDate: '2024-01-12',
      approvedBy: 'Dr. Jane Mwangi',
      paymentStatus: 'paid',
      paymentDate: '2024-01-15'
    },
    {
      id: 'INV-2024-003',
      contractor: 'MedSupply Co',
      amount: 280000,
      currency: 'GHS',
      service: 'Medical Equipment',
      contract: 'CNT-2024-003',
      approvedDate: '2024-01-11',
      approvedBy: 'Dr. Peter Kiprotich',
      paymentStatus: 'pending_payment',
      paymentDate: null
    },
    {
      id: 'INV-2024-005',
      contractor: 'CleanWater Solutions',
      amount: 420000,
      currency: 'GHS',
      service: 'Water System Installation',
      contract: 'CNT-2024-005',
      approvedDate: '2024-01-10',
      approvedBy: 'Eng. Mary Wanjiku',
      paymentStatus: 'processing',
      paymentDate: null
    }
  ];

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending_payment': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
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
              <h1 className="text-xl font-semibold text-gray-900">Approved Invoices</h1>
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
                Filter Approved Invoices
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
                    <SelectValue placeholder="Payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending_payment">Pending Payment</SelectItem>
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
                <div className="text-2xl font-bold text-oaia-green">24</div>
                <div className="text-sm text-gray-900 mt-1">Total Approved</div>
                <div className="text-xs text-oaia-gray mt-1">This month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-oaia-blue">GHS 12.4M</div>
                <div className="text-sm text-gray-900 mt-1">Total Value</div>
                <div className="text-xs text-oaia-gray mt-1">Approved amount</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">18</div>
                <div className="text-sm text-gray-900 mt-1">Paid Invoices</div>
                <div className="text-xs text-oaia-gray mt-1">75% completion rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Approved Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Approved Invoices ({approvedInvoices.length})
              </CardTitle>
              <CardDescription>
                Track approved invoices and their payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('id')} className="p-0 h-auto font-medium">
                        Invoice ID {getSortIcon('id')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('contractor')} className="p-0 h-auto font-medium">
                        Contractor {getSortIcon('contractor')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('service')} className="p-0 h-auto font-medium">
                        Service {getSortIcon('service')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('amount')} className="p-0 h-auto font-medium">
                        Amount {getSortIcon('amount')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('approvedDate')} className="p-0 h-auto font-medium">
                        Approved Date {getSortIcon('approvedDate')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('approvedBy')} className="p-0 h-auto font-medium">
                        Approved By {getSortIcon('approvedBy')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('paymentStatus')} className="p-0 h-auto font-medium">
                        Payment Status {getSortIcon('paymentStatus')}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('paymentDate')} className="p-0 h-auto font-medium">
                        Payment Date {getSortIcon('paymentDate')}
                      </Button>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedInvoices.map((invoice) => (
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
                          {invoice.approvedDate}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.approvedBy}</TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(invoice.paymentStatus)}>
                          {invoice.paymentStatus.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {invoice.paymentDate ? (
                          <div className="flex items-center text-sm text-oaia-gray">
                            <Calendar className="h-4 w-4 mr-1" />
                            {invoice.paymentDate}
                          </div>
                        ) : (
                          <span className="text-sm text-oaia-gray">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Export
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

export default ApprovedInvoices;

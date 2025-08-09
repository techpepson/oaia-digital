
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
  ArrowDownRight
} from 'lucide-react';

const Payments = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

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
                <div className="text-2xl font-bold text-oaia-green">GHS 12.4M</div>
                <div className="text-sm text-gray-900 mt-1">Total Disbursed</div>
                <div className="text-xs text-oaia-gray mt-1">This month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-oaia-blue">GHS 2.1M</div>
                <div className="text-sm text-gray-900 mt-1">Advances Paid</div>
                <div className="text-xs text-oaia-gray mt-1">Pending recovery</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">18</div>
                <div className="text-sm text-gray-900 mt-1">Payments Processed</div>
                <div className="text-xs text-oaia-gray mt-1">This month</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-900 mt-1">Pending Payments</div>
                <div className="text-xs text-oaia-gray mt-1">Awaiting processing</div>
              </CardContent>
            </Card>
          </div>

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

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment History ({payments.length})
              </CardTitle>
              <CardDescription>
                Track all payments, disbursements, and funding transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Contractor/Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(payment.type)}
                          <Badge className={getTypeColor(payment.type)}>
                            {payment.type.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.invoiceId ? (
                          <span className="font-medium">{payment.invoiceId}</span>
                        ) : (
                          <span className="text-oaia-gray">-</span>
                        )}
                      </TableCell>
                      <TableCell>{payment.contractor}</TableCell>
                      <TableCell className="font-medium">
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
                          {payment.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {payment.reference}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
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

export default Payments;

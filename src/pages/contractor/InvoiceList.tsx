
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import { Search, Filter, Download, Eye, Menu, X, Calendar, DollarSign } from 'lucide-react';

const InvoiceList = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agencyFilter, setAgencyFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const invoices = [
    { id: 'INV001', amount: 'KES 450,000', status: 'pending', agency: 'Ministry of Health', date: '2024-01-15', project: 'Medical Equipment Supply', advance: 'KES 225,000' },
    { id: 'INV002', amount: 'KES 280,000', status: 'approved', agency: 'Ministry of Education', date: '2024-01-12', project: 'School Infrastructure', advance: 'KES 140,000' },
    { id: 'INV003', amount: 'KES 120,000', status: 'processing', agency: 'County Government', date: '2024-01-10', project: 'Road Maintenance', advance: 'KES 60,000' },
    { id: 'INV004', amount: 'KES 350,000', status: 'paid', agency: 'Ministry of Transport', date: '2024-01-08', project: 'Transport Services', advance: 'KES 175,000' },
    { id: 'INV005', amount: 'KES 180,000', status: 'pending', agency: 'Ministry of Health', date: '2024-01-05', project: 'Healthcare Supplies', advance: 'KES 90,000' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesAgency = agencyFilter === 'all' || invoice.agency === agencyFilter;
    return matchesSearch && matchesStatus && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <ContractorSidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
              <Link to="/">
                <Logo showText={false} />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">Welcome back, John Doe</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Invoices</h1>
              <p className="text-oaia-gray mt-1">Track and manage all your submitted invoices</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link to="/create-invoice">
                <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                  Submit New Invoice
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-blue">{invoices.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-oaia-green">KES 1.38M</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-oaia-gray">Pending Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">KES 630K</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">Invoice Management</CardTitle>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-oaia-gray" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Agency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    <SelectItem value="Ministry of Health">Ministry of Health</SelectItem>
                    <SelectItem value="Ministry of Education">Ministry of Education</SelectItem>
                    <SelectItem value="County Government">County Government</SelectItem>
                    <SelectItem value="Ministry of Transport">Ministry of Transport</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-40">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="last3Months">Last 3 Months</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Advance</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.project}</TableCell>
                      <TableCell>{invoice.agency}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.advance}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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

export default InvoiceList;

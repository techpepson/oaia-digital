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
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  FolderOpen
} from 'lucide-react';

const PendingInvoices = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contractorFilter, setContractorFilter] = useState('all');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

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



  const pendingInvoices = [
    {
      id: 'INV-2024-001',
      contractor: 'ABC Construction Ltd',
      amount: 450000,
      currency: 'GHS',
      service: 'Road Maintenance',
      contract: 'CNT-2024-001',
      project: 'Highway Infrastructure Development',
      projectId: 'PROJ-001',
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
      currency: 'GHS',
      service: 'IT Services',
      contract: 'CNT-2024-004',
      project: 'Digital Health System',
      projectId: 'PROJ-002',
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
      currency: 'GHS',
      service: 'Solar Installation',
      contract: 'CNT-2024-007',
      project: 'Renewable Energy Initiative',
      projectId: 'PROJ-003',
      submittedDate: '2024-01-13',
      dueDate: '2024-01-23',
      priority: 'urgent',
      status: 'pending_review',
      documents: 5
    },
    {
      id: 'INV-2024-008',
      contractor: 'BuildCorp Ltd',
      amount: 280000,
      currency: 'GHS',
      service: 'Road Construction',
      contract: 'CNT-2024-008',
      project: 'Highway Infrastructure Development',
      projectId: 'PROJ-001',
      submittedDate: '2024-01-12',
      dueDate: '2024-01-22',
      priority: 'high',
      status: 'pending_review',
      documents: 4
    },
    {
      id: 'INV-2024-009',
      contractor: 'MedTech Solutions',
      amount: 150000,
      currency: 'GHS',
      service: 'Medical Equipment',
      contract: 'CNT-2024-009',
      project: 'Digital Health System',
      projectId: 'PROJ-002',
      submittedDate: '2024-01-11',
      dueDate: '2024-01-21',
      priority: 'medium',
      status: 'pending_approval',
      documents: 3
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

  // Group invoices by project
  const groupedInvoices = pendingInvoices.reduce((groups, invoice) => {
    const projectId = invoice.projectId;
    if (!groups[projectId]) {
      groups[projectId] = {
        project: invoice.project,
        projectId: projectId,
        invoices: []
      };
    }
    groups[projectId].invoices.push(invoice);
    return groups;
  }, {} as Record<string, { project: string; projectId: string; invoices: typeof pendingInvoices }>);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getProjectStats = (invoices: typeof pendingInvoices) => {
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const urgentCount = invoices.filter(inv => inv.priority === 'urgent').length;
    return { totalAmount, urgentCount, totalCount: invoices.length };
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

          {/* Project-Grouped Invoices */}
          <div className="space-y-6">
            {Object.values(groupedInvoices).map((projectGroup) => {
              const stats = getProjectStats(projectGroup.invoices);
              const isExpanded = expandedProjects.includes(projectGroup.projectId);
              
              return (
                <Card key={projectGroup.projectId} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleProject(projectGroup.projectId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-oaia-blue" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-oaia-blue" />
                        )}
                        <FolderOpen className="h-5 w-5 text-oaia-orange" />
                        <div>
                          <CardTitle className="text-lg text-oaia-blue">
                            {projectGroup.project}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Project ID: {projectGroup.projectId}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-oaia-blue">{stats.totalCount}</div>
                          <div className="text-oaia-gray">Invoices</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">
                            GHS {stats.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-oaia-gray">Total Value</div>
                        </div>
                        {stats.urgentCount > 0 && (
                          <div className="text-center">
                            <div className="font-semibold text-red-600">{stats.urgentCount}</div>
                            <div className="text-oaia-gray">Urgent</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="pt-0">
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
                              <Button variant="ghost" onClick={() => handleSort('contract')} className="p-0 h-auto font-medium">
                                Contract {getSortIcon('contract')}
                              </Button>
                            </TableHead>
                            <TableHead>
                              <Button variant="ghost" onClick={() => handleSort('priority')} className="p-0 h-auto font-medium">
                                Priority {getSortIcon('priority')}
                              </Button>
                            </TableHead>
                            <TableHead>
                              <Button variant="ghost" onClick={() => handleSort('status')} className="p-0 h-auto font-medium">
                                Status {getSortIcon('status')}
                              </Button>
                            </TableHead>
                            <TableHead>
                              <Button variant="ghost" onClick={() => handleSort('dueDate')} className="p-0 h-auto font-medium">
                                Due Date {getSortIcon('dueDate')}
                              </Button>
                            </TableHead>
                             <TableHead>Actions</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {projectGroup.invoices.map((invoice) => (
                             <TableRow key={invoice.id} className="hover:bg-gray-50">
                               <TableCell className="font-medium">{invoice.id}</TableCell>
                               <TableCell>{invoice.contractor}</TableCell>
                               <TableCell>{invoice.service}</TableCell>
                               <TableCell className="font-semibold text-green-600">
                                 GHS {invoice.amount.toLocaleString()}
                               </TableCell>
                               <TableCell>{invoice.contract}</TableCell>
                               <TableCell>
                                 <Badge 
                                   variant="outline" 
                                   className={`${getPriorityColor(invoice.priority)} border-current`}
                                 >
                                   {invoice.priority}
                                 </Badge>
                               </TableCell>
                               <TableCell>
                                 <Badge 
                                   variant="outline" 
                                   className={`${getStatusColor(invoice.status)} border-current`}
                                 >
                                   {invoice.status}
                                 </Badge>
                               </TableCell>
                               <TableCell className="text-sm text-oaia-gray">
                                 {invoice.dueDate}
                               </TableCell>
                               <TableCell>
                                 <div className="flex space-x-2">
                                   <Button 
                                     size="sm" 
                                     variant="outline" 
                                     className="text-oaia-blue border-oaia-blue hover:bg-oaia-blue hover:text-white"
                                   >
                                     Review
                                   </Button>
                                   <Button 
                                     size="sm" 
                                     className="bg-green-600 hover:bg-green-700 text-white"
                                     onClick={() => handleApprove(invoice.id)}
                                   >
                                     Approve
                                   </Button>
                                   <Button 
                                     size="sm" 
                                     variant="outline" 
                                     className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                                     onClick={() => handleReject(invoice.id)}
                                   >
                                     Reject
                                   </Button>
                                 </div>
                               </TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                       </Table>
                     </CardContent>
                   )}
                 </Card>
               );
             })}
           </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PendingInvoices;

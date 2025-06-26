
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Logo from '@/components/Logo';
import AgencySidebar from '@/components/AgencySidebar';
import { 
  FolderOpen, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Eye,
  Download,
  Plus
} from 'lucide-react';

const Contracts = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contractorFilter, setContractorFilter] = useState('all');

  const contracts = [
    {
      id: 'CON-2024-001',
      title: 'Hospital Construction Phase 2',
      contractor: 'ABC Construction Ltd',
      value: 'KES 15,000,000',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: 'active',
      progress: 68,
      milestones: [
        { id: 1, title: 'Foundation Work', amount: 'KES 3,000,000', status: 'completed', dueDate: '2024-03-15' },
        { id: 2, title: 'Structural Framework', amount: 'KES 5,000,000', status: 'completed', dueDate: '2024-06-15' },
        { id: 3, title: 'Roofing & Walls', amount: 'KES 4,000,000', status: 'in-progress', dueDate: '2024-09-15' },
        { id: 4, title: 'Interior Finishing', amount: 'KES 3,000,000', status: 'pending', dueDate: '2024-12-15' }
      ]
    },
    {
      id: 'CON-2024-002',
      title: 'Road Maintenance Project',
      contractor: 'Tech Solutions Inc',
      value: 'KES 8,500,000',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      status: 'completed',
      progress: 100,
      milestones: [
        { id: 1, title: 'Initial Assessment', amount: 'KES 1,000,000', status: 'completed', dueDate: '2024-03-01' },
        { id: 2, title: 'Road Repairs', amount: 'KES 5,500,000', status: 'completed', dueDate: '2024-06-01' },
        { id: 3, title: 'Final Inspection', amount: 'KES 2,000,000', status: 'completed', dueDate: '2024-08-01' }
      ]
    },
    {
      id: 'CON-2024-003',
      title: 'Solar Installation Project',
      contractor: 'Green Energy Co',
      value: 'KES 12,000,000',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'active',
      progress: 35,
      milestones: [
        { id: 1, title: 'Site Preparation', amount: 'KES 2,000,000', status: 'completed', dueDate: '2024-04-01' },
        { id: 2, title: 'Equipment Procurement', amount: 'KES 6,000,000', status: 'in-progress', dueDate: '2024-08-01' },
        { id: 3, title: 'Installation', amount: 'KES 3,000,000', status: 'pending', dueDate: '2024-12-01' },
        { id: 4, title: 'Testing & Commissioning', amount: 'KES 1,000,000', status: 'pending', dueDate: '2025-02-28' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-gray-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesContractor = contractorFilter === 'all' || contract.contractor === contractorFilter;
    
    return matchesSearch && matchesStatus && matchesContractor;
  });

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
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Contracts & Projects</h1>
                <p className="text-sm text-oaia-gray">Manage active contracts and project milestones</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-oaia-blue hover:bg-oaia-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </Button>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
                    <Input
                      placeholder="Search contracts, contractors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={contractorFilter} onValueChange={setContractorFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by contractor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contractors</SelectItem>
                      <SelectItem value="ABC Construction Ltd">ABC Construction Ltd</SelectItem>
                      <SelectItem value="Tech Solutions Inc">Tech Solutions Inc</SelectItem>
                      <SelectItem value="Green Energy Co">Green Energy Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contracts List */}
          <div className="space-y-6">
            {filteredContracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-oaia-blue flex items-center">
                        <FolderOpen className="h-5 w-5 mr-2" />
                        {contract.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {contract.id} • {contract.contractor}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(contract.status)}>
                        {contract.status.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <div className="font-semibold text-oaia-blue">{contract.value}</div>
                        <div className="text-sm text-oaia-gray">{contract.progress}% Complete</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Contract Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Contract Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-oaia-gray">
                          <Calendar className="h-4 w-4 mr-2" />
                          Start: {contract.startDate}
                        </div>
                        <div className="flex items-center text-oaia-gray">
                          <Calendar className="h-4 w-4 mr-2" />
                          End: {contract.endDate}
                        </div>
                        <div className="flex items-center text-oaia-gray">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Total Value: {contract.value}
                        </div>
                      </div>
                      <div className="mt-4 space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Progress</h4>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-oaia-blue h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${contract.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-oaia-gray">{contract.progress}% completed</p>
                    </div>

                    {/* Milestones */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Key Milestones</h4>
                      <div className="space-y-2">
                        {contract.milestones.slice(0, 3).map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              {getMilestoneStatusIcon(milestone.status)}
                              <span className="text-gray-700">{milestone.title}</span>
                            </div>
                            <span className="text-oaia-gray">{milestone.amount}</span>
                          </div>
                        ))}
                        {contract.milestones.length > 3 && (
                          <div className="text-xs text-oaia-blue cursor-pointer hover:underline">
                            +{contract.milestones.length - 3} more milestones
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;

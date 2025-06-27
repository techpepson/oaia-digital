import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  Eye,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";

const BudgetReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [reportType, setReportType] = useState("expenditure");

  // Sample data for reports
  const monthlyExpenditure = [
    { month: "Jan", budgeted: 5000000, actual: 4200000, variance: 800000 },
    { month: "Feb", budgeted: 4500000, actual: 4100000, variance: 400000 },
    { month: "Mar", budgeted: 6000000, actual: 5800000, variance: 200000 },
    { month: "Apr", budgeted: 5500000, actual: 5200000, variance: 300000 },
    { month: "May", budgeted: 7000000, actual: 6500000, variance: 500000 },
    { month: "Jun", budgeted: 6500000, actual: 6200000, variance: 300000 },
  ];

  const cashflowProjection = [
    { month: "Jul", inflow: 8000000, outflow: 6200000, balance: 1800000 },
    { month: "Aug", inflow: 7500000, outflow: 6800000, balance: 700000 },
    { month: "Sep", inflow: 9000000, outflow: 7200000, balance: 1800000 },
    { month: "Oct", inflow: 8500000, outflow: 7500000, balance: 1000000 },
    { month: "Nov", inflow: 10000000, outflow: 8200000, balance: 1800000 },
    { month: "Dec", inflow: 9500000, outflow: 8800000, balance: 700000 },
  ];

  const agencyBudgetData = [
    {
      name: "GETFund",
      allocated: 50000000,
      utilized: 39000000,
      remaining: 11000000,
      color: "#1E40AF",
    },
    {
      name: "NHIS",
      allocated: 40000000,
      utilized: 26000000,
      remaining: 14000000,
      color: "#EA580C",
    },
    {
      name: "Road Fund",
      allocated: 60000000,
      utilized: 51000000,
      remaining: 9000000,
      color: "#16A34A",
    },
    {
      name: "Education",
      allocated: 35000000,
      utilized: 25200000,
      remaining: 9800000,
      color: "#DC2626",
    },
  ];

  const reportTemplates = [
    {
      id: "RPT-001",
      name: "Monthly Expenditure Summary",
      description: "Detailed breakdown of monthly spending by agency",
      category: "Expenditure",
      frequency: "Monthly",
      lastGenerated: "2024-01-15",
      format: "PDF, Excel",
    },
    {
      id: "RPT-002",
      name: "Budget Variance Analysis",
      description: "Comparison of budgeted vs actual spending",
      category: "Budget",
      frequency: "Quarterly",
      lastGenerated: "2024-01-10",
      format: "PDF, Excel",
    },
    {
      id: "RPT-003",
      name: "Cashflow Forecast",
      description: "Projected cash inflows and outflows",
      category: "Cashflow",
      frequency: "Weekly",
      lastGenerated: "2024-01-14",
      format: "PDF, Excel, CSV",
    },
    {
      id: "RPT-004",
      name: "Agency Performance Dashboard",
      description: "Key performance indicators by agency",
      category: "Performance",
      frequency: "Monthly",
      lastGenerated: "2024-01-12",
      format: "PDF, Dashboard",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Expenditure":
        return "bg-blue-100 text-blue-800";
      case "Budget":
        return "bg-green-100 text-green-800";
      case "Cashflow":
        return "bg-purple-100 text-purple-800";
      case "Performance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-oaia-light">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard/ministry">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-oaia-gray">
              Ministry of Finance - Budget Reports
            </span>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Budget Reports & Analytics
          </h1>
          <p className="text-oaia-gray mt-1">
            Generate comprehensive financial reports and forecasts
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">GHS 185M</div>
              <div className="text-sm text-oaia-green">FY 2024 allocation</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Utilized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-green">
                GHS 141.2M
              </div>
              <div className="text-sm text-oaia-gray">76.3% of budget</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                Variance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">GHS 2.5M</div>
              <div className="text-sm text-oaia-gray">Under budget</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-oaia-gray flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-oaia-blue">GHS 1.8M</div>
              <div className="text-sm text-oaia-green">Avg monthly surplus</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="Q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="Q4-2023">Q4 2023</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select agency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agencies</SelectItem>
                  <SelectItem value="getfund">GETFund</SelectItem>
                  <SelectItem value="nhis">NHIS</SelectItem>
                  <SelectItem value="roadfund">Road Fund</SelectItem>
                  <SelectItem value="education">
                    Ministry of Education
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenditure">Expenditure</SelectItem>
                  <SelectItem value="budget">Budget Variance</SelectItem>
                  <SelectItem value="cashflow">Cashflow</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Expenditure vs Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">
                Monthly Expenditure vs Budget
              </CardTitle>
              <CardDescription>
                Actual spending compared to budgeted amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyExpenditure}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        `GHS ${(value as number).toLocaleString()}`
                      }
                    />
                    <Bar dataKey="budgeted" fill="#1E40AF" name="Budgeted" />
                    <Bar dataKey="actual" fill="#16A34A" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cashflow Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-oaia-blue">
                Cashflow Projection
              </CardTitle>
              <CardDescription>
                Projected inflows, outflows, and balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashflowProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        `GHS ${(value as number).toLocaleString()}`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="inflow"
                      stroke="#16A34A"
                      name="Inflow"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="outflow"
                      stroke="#DC2626"
                      name="Outflow"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#1E40AF"
                      name="Balance"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agency Budget Utilization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-oaia-blue">
              Agency Budget Utilization
            </CardTitle>
            <CardDescription>
              Budget allocation and utilization by agency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {agencyBudgetData.map((agency) => (
                <div key={agency.name} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {agency.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Allocated: GHS {(agency.allocated / 1000000).toFixed(1)}
                        M
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-oaia-blue">
                        {((agency.utilized / agency.allocated) * 100).toFixed(
                          1
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-500">
                        GHS {(agency.utilized / 1000000).toFixed(1)}M utilized
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${(agency.utilized / agency.allocated) * 100}%`,
                        backgroundColor: agency.color,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>
                      Remaining: GHS {(agency.remaining / 1000000).toFixed(1)}M
                    </span>
                    <span>Target: 80% by year end</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-oaia-blue">
                  Report Templates
                </CardTitle>
                <CardDescription>
                  Pre-configured reports for regular financial analysis
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button>Create Custom Report</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {template.description}
                      </p>
                    </div>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>Frequency: {template.frequency}</span>
                    <span>Last: {template.lastGenerated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Format: {template.format}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetReports;

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  ExternalLink,
  Mail,
  Phone,
  Building,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Eye,
  Trash2,
  Edit,
  Users,
  DollarSign,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Realistic client mock data
const mockClients = [
  {
    id: "1",
    name: "TechCorp Solutions",
    website: "techcorp.com",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    industry: "Technology",
    logo: null,
    initials: "TC",
    color: "bg-blue-500",
    totalAudits: 12,
    avgScore: 78,
    scoreChange: "+5",
    trend: "up",
    lastAudit: "2024-01-15",
    monthlyRevenue: 2400,
    status: "active",
  },
  {
    id: "2",
    name: "Green Earth Organics",
    website: "greenearth.co",
    email: "hello@greenearth.co",
    phone: "+1 (555) 234-5678",
    industry: "E-commerce",
    logo: null,
    initials: "GE",
    color: "bg-emerald-500",
    totalAudits: 8,
    avgScore: 65,
    scoreChange: "+12",
    trend: "up",
    lastAudit: "2024-01-18",
    monthlyRevenue: 1800,
    status: "active",
  },
  {
    id: "3",
    name: "Metro Financial Group",
    website: "metrofinancial.com",
    email: "info@metrofinancial.com",
    phone: "+1 (555) 345-6789",
    industry: "Finance",
    logo: null,
    initials: "MF",
    color: "bg-purple-500",
    totalAudits: 15,
    avgScore: 82,
    scoreChange: "+3",
    trend: "up",
    lastAudit: "2024-01-20",
    monthlyRevenue: 3200,
    status: "active",
  },
  {
    id: "4",
    name: "Coastal Realty Partners",
    website: "coastalrealty.net",
    email: "team@coastalrealty.net",
    phone: "+1 (555) 456-7890",
    industry: "Real Estate",
    logo: null,
    initials: "CR",
    color: "bg-amber-500",
    totalAudits: 6,
    avgScore: 71,
    scoreChange: "-2",
    trend: "down",
    lastAudit: "2024-01-10",
    monthlyRevenue: 1500,
    status: "active",
  },
  {
    id: "5",
    name: "Wellness Medical Center",
    website: "wellnessmedical.org",
    email: "admin@wellnessmedical.org",
    phone: "+1 (555) 567-8901",
    industry: "Healthcare",
    logo: null,
    initials: "WM",
    color: "bg-red-500",
    totalAudits: 10,
    avgScore: 74,
    scoreChange: "+8",
    trend: "up",
    lastAudit: "2024-01-22",
    monthlyRevenue: 2100,
    status: "active",
  },
  {
    id: "6",
    name: "Urban Eats Restaurant",
    website: "urbaneats.menu",
    email: "hello@urbaneats.menu",
    phone: "+1 (555) 678-9012",
    industry: "Food & Beverage",
    logo: null,
    initials: "UE",
    color: "bg-orange-500",
    totalAudits: 4,
    avgScore: 58,
    scoreChange: "+15",
    trend: "up",
    lastAudit: "2024-01-08",
    monthlyRevenue: 900,
    status: "active",
  },
  {
    id: "7",
    name: "Summit Legal Associates",
    website: "summitlegal.law",
    email: "contact@summitlegal.law",
    phone: "+1 (555) 789-0123",
    industry: "Legal",
    logo: null,
    initials: "SL",
    color: "bg-slate-600",
    totalAudits: 7,
    avgScore: 69,
    scoreChange: "+4",
    trend: "up",
    lastAudit: "2024-01-12",
    monthlyRevenue: 1650,
    status: "paused",
  },
  {
    id: "8",
    name: "Creative Studio X",
    website: "creativestudiox.com",
    email: "team@creativestudiox.com",
    phone: "+1 (555) 890-1234",
    industry: "Creative Agency",
    logo: null,
    initials: "CS",
    color: "bg-pink-500",
    totalAudits: 9,
    avgScore: 76,
    scoreChange: "+6",
    trend: "up",
    lastAudit: "2024-01-19",
    monthlyRevenue: 2000,
    status: "active",
  },
];

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.website.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockClients.reduce((acc, c) => acc + c.monthlyRevenue, 0);
  const avgScore = Math.round(mockClients.reduce((acc, c) => acc + c.avgScore, 0) / mockClients.length);
  const totalAudits = mockClients.reduce((acc, c) => acc + c.totalAudits, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader 
        title="Clients" 
        subtitle="Manage your client accounts and track their performance" 
      />
      
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">{mockClients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-2xl font-bold">{avgScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Audits</p>
                  <p className="text-2xl font-bold">{totalAudits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === null ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(null)}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "paused" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("paused")}
              >
                Paused
              </Button>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        {/* Clients Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Client</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead className="text-center">Audits</TableHead>
                  <TableHead className="text-center">Avg. Score</TableHead>
                  <TableHead className="text-center">Change</TableHead>
                  <TableHead>Last Audit</TableHead>
                  <TableHead className="text-center">Revenue</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={client.logo || undefined} />
                          <AvatarFallback className={cn("text-white text-sm font-semibold", client.color)}>
                            {client.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{client.name}</p>
                          <a 
                            href={`https://${client.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                          >
                            {client.website}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.industry}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">{client.totalAudits}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "font-bold",
                          client.avgScore >= 75 ? "bg-emerald-100 text-emerald-700" :
                          client.avgScore >= 60 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}
                      >
                        {client.avgScore}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "flex items-center justify-center gap-1 font-medium",
                        client.trend === "up" ? "text-emerald-600" : "text-red-600"
                      )}>
                        {client.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {client.scoreChange}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(client.lastAudit).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-emerald-600">
                      ${client.monthlyRevenue}/mo
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={client.status === "active" ? "default" : "secondary"}
                        className={cn(
                          client.status === "active" 
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" 
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <FileText className="h-4 w-4" />
                            Run Audit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            Send Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <Card className="mt-4">
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No clients found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search query" : "Add your first client to get started"}
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Client
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Clients;

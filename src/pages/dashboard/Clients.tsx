import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Realistic client mock data
const mockClients = [
  {
    id: "1",
    name: "TechCorp Solutions",
    website: "techcorp.com",
    email: "contact@techcorp.com",
    industry: "Technology",
    initials: "TC",
    color: "bg-blue-600",
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
    industry: "E-commerce",
    initials: "GE",
    color: "bg-emerald-600",
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
    industry: "Finance",
    initials: "MF",
    color: "bg-purple-600",
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
    industry: "Real Estate",
    initials: "CR",
    color: "bg-amber-600",
    totalAudits: 6,
    avgScore: 71,
    scoreChange: "-2",
    trend: "down",
    lastAudit: "2024-01-10",
    monthlyRevenue: 1500,
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
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="relative z-10 w-full">
        <DashboardHeader
          title="My Clients"
          subtitle="Manage and track performance for all your client accounts"
        />

        <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in-up">
          {/* Stats Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Total Clients", value: mockClients.length, color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: DollarSign, label: "Portfolio Value", value: `$${totalRevenue.toLocaleString()}`, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Target, label: "Aggregate Score", value: avgScore, color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: FileText, label: "System Audits", value: totalAudits, color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((stat, i) => (
              <div key={i} className="glass-card border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                <div className={cn("absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40", stat.bg)}></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <Input
                  placeholder="Filter by name, URL, or industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-slate-900/50 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
              <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10 w-full md:w-auto">
                {["All", "Active", "Paused"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status === "All" ? null : status.toLowerCase())}
                    className={cn(
                      "flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                      (status === "All" && filterStatus === null) || filterStatus === status.toLowerCase()
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <Button className="w-full xl:w-auto gap-3 h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 font-bold uppercase tracking-widest text-xs">
              <Plus className="h-4 w-4" /> Add New Client
            </Button>
          </div>

          {/* Clients Matrix */}
          <div className="glass-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/[0.02] border-b border-white/5 hover:bg-transparent">
                    <TableHead className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client</TableHead>
                    <TableHead className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry</TableHead>
                    <TableHead className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Audits</TableHead>
                    <TableHead className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Score</TableHead>
                    <TableHead className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Trend</TableHead>
                    <TableHead className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Revenue</TableHead>
                    <TableHead className="px-8 py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</TableHead>
                    <TableHead className="px-8 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-inner", client.color)}>
                            {client.initials}
                          </div>
                          <div>
                            <p className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">{client.name}</p>
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                              {client.website} <ExternalLink className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-5">
                        <Badge className="bg-white/5 border border-white/10 text-slate-400 font-bold tracking-wide uppercase text-[9px]">
                          {client.industry}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-center font-mono text-slate-400">{client.totalAudits}</TableCell>
                      <TableCell className="px-8 py-5 text-center">
                        <div className={cn(
                          "inline-flex items-center justify-center w-10 h-8 rounded-lg font-black text-sm border",
                          client.avgScore >= 75 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            client.avgScore >= 60 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                              "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        )}>
                          {client.avgScore}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-center">
                        <span className={cn(
                          "flex items-center justify-center gap-1 text-xs font-bold",
                          client.trend === "up" ? "text-emerald-400" : "text-rose-400"
                        )}>
                          {client.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {client.scoreChange}
                        </span>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-center font-bold text-slate-200">
                        ${client.monthlyRevenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-8 py-5 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          client.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                            : "bg-slate-800 text-slate-500 border-white/5"
                        )}>
                          {client.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card border-white/10 text-slate-200">
                            <DropdownMenuItem className="gap-3 focus:bg-white/5 cursor-pointer py-2.5">
                              <Eye className="h-4 w-4 text-blue-400" /> View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 focus:bg-white/5 cursor-pointer py-2.5">
                              <FileText className="h-4 w-4 text-emerald-400" /> Dispatch Audit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 focus:bg-white/5 cursor-pointer py-2.5">
                              <Edit className="h-4 w-4 text-slate-400" /> Modify Node
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 focus:bg-white/5 cursor-pointer py-2.5 text-rose-400 focus:text-rose-400">
                              <Trash2 className="h-4 w-4" /> Decommission
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Empty Context */}
          {filteredClients.length === 0 && (
            <div className="glass-card border border-white/10 border-dashed rounded-3xl py-20 text-center animate-pulse">
              <Users className="h-16 w-16 text-slate-700 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-slate-400 mb-2">No Managed Nodes Identified</h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">Initialization of new client data required to populate this interface.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;

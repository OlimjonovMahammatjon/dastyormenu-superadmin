import { useState } from 'react';
import { mockSupportTickets, mockSystemLogs } from '../../lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AlertCircle, CheckCircle, Clock, Info, AlertTriangle } from 'lucide-react';

const priorityColors = {
  Low: 'bg-gray-100 text-gray-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700'
};

const priorityLabels = {
  Low: 'Past',
  Medium: 'O\'rta',
  High: 'Yuqori'
};

const ticketStatusColors = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Resolved: 'bg-green-100 text-green-700'
};

const ticketStatusLabels = {
  Open: 'Ochiq',
  'In Progress': 'Jarayonda',
  Resolved: 'Hal qilindi'
};

const logTypeIcons = {
  Info: Info,
  Warning: AlertTriangle,
  Error: AlertCircle
};

const logTypeColors = {
  Info: 'text-blue-600',
  Warning: 'text-yellow-600',
  Error: 'text-red-600'
};

const logTypeLabels = {
  Info: 'Ma\'lumot',
  Warning: 'Ogohlantirish',
  Error: 'Xatolik'
};

export default function Support() {
  const [tickets] = useState(mockSupportTickets);
  const [logs] = useState(mockSystemLogs);

  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className="p-8 space-y-6 bg-slate-50 dark:bg-[#121828] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Yordam va Tizim Jurnallari</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Yordam so'rovlari va tizim holatini kuzating</p>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Ochiq So'rovlar</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{openTickets}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0f1419] border-slate-200 dark:border-[#1e2530]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Jarayonda</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{inProgressTickets}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#0f1419] border-slate-200 dark:border-[#1e2530]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Hal Qilindi</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{resolvedTickets}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Yordam So'rovlari</TabsTrigger>
          <TabsTrigger value="logs">Tizim Jurnallari</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Yordam So'rovlari</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>So'rov ID</TableHead>
                    <TableHead>Restoran</TableHead>
                    <TableHead>Mavzu</TableHead>
                    <TableHead>Muhimlik</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Yaratilgan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="font-medium">{ticket.restaurantName}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge
                          className={priorityColors[ticket.priority]}
                          variant="secondary"
                        >
                          {priorityLabels[ticket.priority]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={ticketStatusColors[ticket.status]}
                          variant="secondary"
                        >
                          {ticketStatusLabels[ticket.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.createdAt).toLocaleString('uz-UZ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Tizim Holati Jurnallari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => {
                  const Icon = logTypeIcons[log.type];
                  return (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-[#2a3441] bg-white dark:bg-[#121828] hover:bg-slate-50 dark:hover:bg-[#1a2332] transition-colors"
                    >
                      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${logTypeColors[log.type]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{log.message}</p>
                          <Badge variant="outline" className="flex-shrink-0">
                            {logTypeLabels[log.type]}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {new Date(log.timestamp).toLocaleString('uz-UZ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

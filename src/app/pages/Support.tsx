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

const ticketStatusColors = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Resolved: 'bg-green-100 text-green-700'
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

export default function Support() {
  const [tickets] = useState(mockSupportTickets);
  const [logs] = useState(mockSystemLogs);

  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support & System Logs</h1>
        <p className="text-gray-500 mt-1">Monitor support tickets and system health</p>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{openTickets}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressTickets}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{resolvedTickets}</p>
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
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
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
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={ticketStatusColors[ticket.status]}
                          variant="secondary"
                        >
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => {
                  const Icon = logTypeIcons[log.type];
                  return (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${logTypeColors[log.type]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-gray-900">{log.message}</p>
                          <Badge variant="outline" className="flex-shrink-0">
                            {log.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(log.timestamp).toLocaleString()}
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

import { useState } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Button } from '../components/Button'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface AccessLog {
  id: string
  employeeId: string
  action: string
  ip: string
  timestamp: string
  risk: string
}

const mockAccessLogs: AccessLog[] = [
  {
    id: 'LOG-001',
    employeeId: 'EMP-001',
    action: 'Failed Login',
    ip: '192.168.1.100',
    timestamp: '2024-03-15 14:30:00',
    risk: '3 failed logins'
  },
  {
    id: 'LOG-002',
    employeeId: 'EMP-002',
    action: 'Mass Refund',
    ip: '192.168.1.101',
    timestamp: '2024-03-15 13:15:00',
    risk: 'Mass refund approvals'
  },
  {
    id: 'LOG-003',
    employeeId: 'EMP-003',
    action: 'Camera Disabled',
    ip: '192.168.1.102',
    timestamp: '2024-03-15 12:45:00',
    risk: 'Disabled camera'
  }
]

const mockBehaviorData = [
  { name: 'Mon', value: 5 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 7 },
  { name: 'Thu', value: 4 },
  { name: 'Fri', value: 6 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 1 }
]

const tableColumns = [
  { key: 'id', header: 'Log ID' },
  { key: 'employeeId', header: 'Employee ID' },
  { key: 'action', header: 'Action' },
  { key: 'ip', header: 'IP Address' },
  { key: 'timestamp', header: 'Timestamp' },
  { 
    key: 'risk', 
    header: 'Risk',
    render: (log: AccessLog) => (
      <Badge
        variant={
          log.risk.includes('Mass')
            ? 'danger'
            : log.risk.includes('failed')
            ? 'warning'
            : 'info'
        }
      >
        {log.risk}
      </Badge>
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          Investigate
        </Button>
        <Button variant="primary" size="sm">
          Flag
        </Button>
        <Button variant="secondary" size="sm">
          Block
        </Button>
      </div>
    ),
  },
]

export function Insiders() {
  const [logs] = useState<AccessLog[]>(mockAccessLogs)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Insider Threat Detection</h1>
        <Button>
          Generate Report
        </Button>
      </div>

      {/* Suspicious Behavior Chart */}
      <Card>
        <h2 className="text-xl font-semibold text-text mb-6">Suspicious Behavior Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockBehaviorData}>
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--text-secondary)' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Access Logs Table */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text">Access Logs</h2>
          <div className="flex gap-4">
            <input
              type="text"
              className="input"
              placeholder="Search logs..."
            />
            <select className="input">
              <option value="">All Actions</option>
              <option value="login">Login</option>
              <option value="refund">Refund</option>
              <option value="camera">Camera</option>
            </select>
            <select className="input">
              <option value="">All Risks</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
        <Table columns={tableColumns} data={logs} />
      </Card>

      {/* Correlation Graph */}
      <Card>
        <h2 className="text-xl font-semibold text-text mb-6">Access Correlation</h2>
        <div className="h-96 bg-background rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-center h-full text-text-secondary">
            Network graph visualization coming soon...
          </div>
        </div>
      </Card>
    </div>
  )
} 
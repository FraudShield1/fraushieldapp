import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface Case {
  id: string
  title: string
  type: string
  status: 'open' | 'in_progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  assignedTo: string
  createdAt: string
  updatedAt: string
  riskScore: number
  tags: string[]
}

const mockCases: Case[] = [
  {
    id: 'CASE-001',
    title: 'Suspicious Multiple Returns',
    type: 'Refund Fraud',
    status: 'open',
    priority: 'high',
    assignedTo: 'John Smith',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z',
    riskScore: 85,
    tags: ['refund', 'high-risk', 'urgent']
  },
  {
    id: 'CASE-002',
    title: 'IP Geolocation Mismatch',
    type: 'Location Fraud',
    status: 'in_progress',
    priority: 'medium',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-03-14T15:20:00Z',
    updatedAt: '2024-03-15T09:15:00Z',
    riskScore: 65,
    tags: ['location', 'proxy', 'investigation']
  }
]

const mockCaseTrends = [
  { date: '2024-03-10', cases: 12 },
  { date: '2024-03-11', cases: 15 },
  { date: '2024-03-12', cases: 18 },
  { date: '2024-03-13', cases: 14 },
  { date: '2024-03-14', cases: 16 },
  { date: '2024-03-15', cases: 20 }
]

const mockCaseTypes = [
  { name: 'Fraud', value: 45 },
  { name: 'Suspicious', value: 30 },
  { name: 'Investigation', value: 25 }
]

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1']

export function Cases() {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all')
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [cases] = useState<Case[]>(mockCases)

  const filteredCases = activeTab === 'all'
    ? mockCases
    : mockCases.filter(case_ => case_.status === activeTab)

  const tableColumns = [
    {
      key: 'title',
      header: 'Title'
    },
    {
      key: 'type',
      header: 'Type'
    },
    {
      key: 'status',
      header: 'Status'
    },
    {
      key: 'priority',
      header: 'Priority'
    },
    {
      key: 'assignedTo',
      header: 'Assigned To'
    },
    {
      key: 'createdAt',
      header: 'Created At'
    },
    {
      key: 'updatedAt',
      header: 'Updated At'
    },
    {
      key: 'riskScore',
      header: 'Risk Score'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fraud Cases</h1>
        <Button>Create New Case</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Total Cases</h3>
          <p className="text-2xl font-bold">{mockCases.length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Open Cases</h3>
          <p className="text-2xl font-bold">{mockCases.filter(c => c.status === 'open').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">High Priority</h3>
          <p className="text-2xl font-bold">{mockCases.filter(c => c.priority === 'high').length}</p>
        </Card>
      </div>

      <Card>
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            All
          </Button>
          <Button
            variant={activeTab === 'open' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('open')}
          >
            Open
          </Button>
          <Button
            variant={activeTab === 'in_progress' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('in_progress')}
          >
            In Progress
          </Button>
          <Button
            variant={activeTab === 'resolved' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('resolved')}
          >
            Resolved
          </Button>
        </div>

        <div className="space-y-4">
          {filteredCases.map(case_ => (
            <div
              key={case_.id}
              className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 cursor-pointer"
              onClick={() => setSelectedCase(case_)}
            >
              <div>
                <h3 className="font-medium">{case_.title}</h3>
                <p className="text-sm text-text-secondary">{case_.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    case_.priority === 'high'
                      ? 'danger'
                      : case_.priority === 'medium'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {case_.priority}
                </Badge>
                <Badge
                  variant={
                    case_.status === 'open'
                      ? 'success'
                      : case_.status === 'in_progress'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {case_.status.replace('_', ' ')}
                </Badge>
                <div className="text-sm text-text-secondary">
                  Risk: {case_.riskScore}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Table columns={tableColumns} data={cases} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Case Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCaseTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cases" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Case Types Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCaseTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {mockCaseTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Order } from '../types'
import { mockOrders, mockStats, mockDailyFlaggedOrders, mockFraudReasons, mockRiskDistribution } from '../utils/mockData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Integration data
const integrationData = {
  stripe: {
    totalTransactions: 1250,
    fraudScore: 2.4,
    riskLevel: 'low' as const,
    lastSync: '2 minutes ago'
  },
  shopify: {
    totalOrders: 850,
    riskOrders: 45,
    riskLevel: 'medium' as const,
    lastSync: '5 minutes ago'
  },
  maxmind: {
    totalIPs: 2500,
    highRiskIPs: 12,
    riskLevel: 'low' as const,
    lastSync: 'Just now'
  },
  fingerprint: {
    totalDevices: 1800,
    suspiciousDevices: 8,
    riskLevel: 'low' as const,
    lastSync: '1 minute ago'
  }
}

const tableColumns = [
  { key: 'id', header: 'Order ID' },
  { key: 'customerName', header: 'Customer' },
  { key: 'date', header: 'Date' },
  { 
    key: 'compensationType', 
    header: 'Compensation Type',
    render: (order: Order) => (
      <Badge
        variant={
          order.compensationType === 'Chargeback'
            ? 'danger'
            : order.compensationType === 'Refund'
            ? 'warning'
            : 'success'
        }
      >
        {order.compensationType}
      </Badge>
    )
  },
  { 
    key: 'compensationAmount', 
    header: 'Amount',
    render: (order: Order) => `€${order.compensationAmount.toFixed(2)}`
  },
  { 
    key: 'rootCause', 
    header: 'Root Cause',
    render: (order: Order) => (
      <Badge
        variant={
          order.rootCause.includes('Social Engineering') || order.rootCause.includes('EBA')
            ? 'danger'
            : order.rootCause.includes('Unknown')
            ? 'warning'
            : 'secondary'
        }
      >
        {order.rootCause}
      </Badge>
    )
  },
  { 
    key: 'fraudScore', 
    header: 'Fraud Probability',
    render: (order: Order) => (
      <Badge
        variant={
          order.fraudScore > 80
            ? 'danger'
            : order.fraudScore > 60
            ? 'warning'
            : 'success'
        }
      >
        {order.fraudScore}%
      </Badge>
    )
  },
  { key: 'resolutionSummary', header: 'Resolution Summary' }
]

const mockDailyData = [
  { date: "2024-03-10", amount: 1200 },
  { date: "2024-03-11", amount: 1500 },
  { date: "2024-03-12", amount: 800 },
  { date: "2024-03-13", amount: 2000 },
  { date: "2024-03-14", amount: 1800 },
  { date: "2024-03-15", amount: 2500 },
];

const mockFraudReasons = [
  { name: "Identity Theft", value: 35 },
  { name: "Payment Fraud", value: 25 },
  { name: "Account Takeover", value: 20 },
  { name: "Friendly Fraud", value: 15 },
  { name: "Other", value: 5 },
];

export function Dashboard() {
  const [orders] = useState<Order[]>(mockOrders)
  const [stats] = useState(mockStats)
  const [dailyData] = useState(mockDailyFlaggedOrders)
  const [fraudReasons] = useState(mockFraudReasons)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Compensation Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="secondary">Export to CSV</Button>
          <Button variant="primary">Push to Review Queue</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-sm ${stat.change.isPositive ? 'text-success' : 'text-danger'}`}>
                    {stat.change.isPositive ? '↑' : '↓'} {Math.abs(stat.change.value)}%
                  </span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </div>
              <div className="text-2xl">
                {stat.icon ? <stat.icon className="w-6 h-6" /> : '📊'}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Integration Status */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Integration Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(integrationData).map(([key, data]) => (
            <div key={key} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold capitalize">{key}</h3>
                  <p className="text-sm text-gray-500">Last sync: {data.lastSync}</p>
                </div>
                <Badge
                  variant={
                    data.riskLevel === 'low'
                      ? 'success'
                      : data.riskLevel === 'medium'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {data.riskLevel}
                </Badge>
              </div>
              <div className="mt-2 space-y-1">
                {Object.entries(data)
                  .filter(([k]) => k !== 'riskLevel' && k !== 'lastSync')
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Compensation Trend */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Daily Compensation Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Root Cause Distribution */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Compensation Root Causes</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fraudReasons}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {fraudReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Compensations Table */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Compensations</h2>
          <div className="flex gap-4">
            <input
              type="text"
              className="input"
              placeholder="Search by Order ID or Tracking..."
            />
            <select className="input">
              <option value="">All Couriers</option>
              <option value="DHL">DHL</option>
              <option value="FedEx">FedEx</option>
              <option value="UPS">UPS</option>
            </select>
            <select className="input">
              <option value="">All Countries</option>
              <option value="DE">Germany</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
            <select className="input">
              <option value="">All Refund Types</option>
              <option value="Claim">Claim</option>
              <option value="RTS">RTS</option>
              <option value="LIT">LIT</option>
              <option value="Override">Override</option>
            </select>
          </div>
        </div>
        <Table columns={tableColumns} data={orders} />
      </Card>
    </div>
  )
} 
import { useState } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Button } from '../components/Button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Chargeback {
  id: string
  email: string
  orderId: string
  processor: string
  reason: string
  riskScore: number
}

const mockChargebacks: Chargeback[] = [
  {
    id: 'CB-001',
    email: 'customer1@example.com',
    orderId: 'ORD-001',
    processor: 'Stripe',
    reason: 'Item Not Received',
    riskScore: 85
  },
  {
    id: 'CB-002',
    email: 'customer2@example.com',
    orderId: 'ORD-002',
    processor: 'PayPal',
    reason: 'Unauthorized Transaction',
    riskScore: 75
  },
  {
    id: 'CB-003',
    email: 'customer3@example.com',
    orderId: 'ORD-003',
    processor: 'Stripe',
    reason: 'Quality Issue',
    riskScore: 45
  }
]

const mockChargebackData = [
  { name: 'US', value: 45 },
  { name: 'UK', value: 25 },
  { name: 'CA', value: 15 },
  { name: 'AU', value: 10 },
  { name: 'Other', value: 5 }
]

const mockPaymentMethodData = [
  { name: 'Card', value: 60 },
  { name: 'PayPal', value: 25 },
  { name: 'Bank', value: 15 }
]

const tableColumns = [
  { key: 'id', header: 'Chargeback ID' },
  { key: 'email', header: 'Email' },
  { key: 'orderId', header: 'Order ID' },
  { key: 'processor', header: 'Processor' },
  { key: 'reason', header: 'Reason' },
  { 
    key: 'riskScore', 
    header: 'Risk Score',
    render: (chargeback: Chargeback) => (
      <Badge
        variant={
          chargeback.riskScore > 80
            ? 'danger'
            : chargeback.riskScore > 60
            ? 'warning'
            : 'success'
        }
      >
        {chargeback.riskScore}%
      </Badge>
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          View Details
        </Button>
        <Button variant="primary" size="sm">
          Flag User
        </Button>
        <Button variant="secondary" size="sm">
          Dispute
        </Button>
      </div>
    ),
  },
]

export function Chargebacks() {
  const [chargebacks] = useState<Chargeback[]>(mockChargebacks)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Chargeback Monitoring</h1>
        <Button>
          Export Report
        </Button>
      </div>

      {/* Chargeback Rate Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-text mb-6">Chargebacks by Country</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChargebackData}>
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
                <Bar dataKey="value" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-text mb-6">Chargebacks by Payment Method</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPaymentMethodData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockPaymentMethodData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--primary-${index + 1})`} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Chargeback Table */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text">Chargeback List</h2>
          <div className="flex gap-4">
            <input
              type="text"
              className="input"
              placeholder="Search chargebacks..."
            />
            <select className="input">
              <option value="">All Processors</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>
            <select className="input">
              <option value="">All Reasons</option>
              <option value="not-received">Item Not Received</option>
              <option value="unauthorized">Unauthorized Transaction</option>
              <option value="quality">Quality Issue</option>
            </select>
            <select className="input">
              <option value="">All Risk Levels</option>
              <option value="high">High Risk ({'>'}80%)</option>
              <option value="medium">Medium Risk (60-80%)</option>
              <option value="low">Low Risk ({'<'}60%)</option>
            </select>
          </div>
        </div>
        <Table columns={tableColumns} data={chargebacks} />
      </Card>
    </div>
  )
} 
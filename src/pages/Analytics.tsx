import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const mockFraudTrends = [
  { date: '2024-03-10', cases: 12, prevented: 8 },
  { date: '2024-03-11', cases: 15, prevented: 10 },
  { date: '2024-03-12', cases: 8, prevented: 6 },
  { date: '2024-03-13', cases: 20, prevented: 15 },
  { date: '2024-03-14', cases: 18, prevented: 12 },
  { date: '2024-03-15', cases: 25, prevented: 18 }
]

const mockFraudTypes = [
  { name: 'Payment Fraud', value: 35 },
  { name: 'Account Takeover', value: 25 },
  { name: 'Identity Theft', value: 20 },
  { name: 'Friendly Fraud', value: 15 },
  { name: 'Other', value: 5 }
]

const mockRiskDistribution = [
  { name: 'High Risk', value: 15 },
  { name: 'Medium Risk', value: 45 },
  { name: 'Low Risk', value: 40 }
]

const mockPatternEffectiveness = [
  { name: 'IP Geolocation', value: 92 },
  { name: 'Device Fingerprint', value: 88 },
  { name: 'Behavior Analysis', value: 85 },
  { name: 'Transaction History', value: 82 }
]

const mockFraudRateData = [
  { date: '2024-03-10', fraudRate: 0.12 },
  { date: '2024-03-11', fraudRate: 0.15 },
  { date: '2024-03-12', fraudRate: 0.08 },
  { date: '2024-03-13', fraudRate: 0.20 },
  { date: '2024-03-14', fraudRate: 0.18 },
  { date: '2024-03-15', fraudRate: 0.25 }
]

const COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5']

export function Analytics() {
  const [selectedMetric, setSelectedMetric] = useState("fraudRate")
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="secondary">Export Report</Button>
          <Button>Schedule Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Total Fraud Cases</h3>
          <p className="text-2xl font-bold">98</p>
          <p className="text-sm text-success">+12% from last period</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Prevented Losses</h3>
          <p className="text-2xl font-bold">$45,678</p>
          <p className="text-sm text-success">+8% from last period</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Detection Rate</h3>
          <p className="text-2xl font-bold">94.7%</p>
          <p className="text-sm text-success">+2.3% from last period</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Avg. Resolution Time</h3>
          <p className="text-2xl font-bold">2.5h</p>
          <p className="text-sm text-danger">+0.5h from last period</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Fraud Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockFraudRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="fraudRate"
                stroke="#8884d8"
                name="Fraud Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Fraud Types Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockFraudTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockFraudTypes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Risk Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockRiskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockRiskDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Pattern Effectiveness</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPatternEffectiveness}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockPatternEffectiveness.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">False Positive Rate</h3>
            <p className="text-2xl font-bold">2.3%</p>
            <p className="text-sm text-success">-0.5% from last period</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">Detection Latency</h3>
            <p className="text-2xl font-bold">45ms</p>
            <p className="text-sm text-success">-5ms from last period</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">Pattern Coverage</h3>
            <p className="text-2xl font-bold">98.5%</p>
            <p className="text-sm text-success">+0.5% from last period</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 
import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Case {
  id: string
  title: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'high' | 'medium' | 'low'
  assignedTo: string
  createdAt: string
}

const mockCases: Case[] = [
  {
    id: '1',
    title: 'Suspicious Transaction Pattern',
    status: 'open',
    priority: 'high',
    assignedTo: 'John Doe',
    createdAt: '2024-03-15',
  },
  {
    id: 'CASE-001',
    title: 'Suspicious Multiple Returns',
    status: 'open',
    priority: 'high',
    assignedTo: 'John Smith',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'CASE-002',
    title: 'IP Geolocation Mismatch',
    status: 'in_progress',
    priority: 'medium',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-03-14T15:20:00Z',
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
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fraud Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Case Overview</h2>
          <div className="space-y-4">
            {mockCases.map((case_) => (
              <div
                key={case_.id}
                className="border-b pb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
                onClick={() => setSelectedCase(case_)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{case_.title}</h3>
                  <Badge
                    variant={
                      case_.priority === 'high'
                        ? 'error'
                        : case_.priority === 'medium'
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {case_.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Assigned to: {case_.assignedTo}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {case_.createdAt}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface TrackingOrder {
  id: string
  trackingNumber: string
  courier: string
  country: string
  date: string
  fraudScore: number
  status: 'Refunded' | 'Pending' | 'Under Review'
  refundMethod: 'Claim' | 'RTS' | 'LIT' | 'Override'
  refundAmount: number
  proxyUsed: boolean
  addressMismatch: boolean
  highRiskZip: boolean
  regionHop: boolean
  multipleClaims: boolean
  damageReport: boolean
  sopOverride: {
    approved: boolean
    approver?: string
  }
  trackingEvents: {
    timestamp: string
    status: string
    location?: string
    risk?: 'high' | 'medium' | 'low'
  }[]
}

// Mock data
const mockOrders: TrackingOrder[] = [
  {
    id: 'ORD-001',
    trackingNumber: 'TRK123456789',
    courier: 'DHL',
    country: 'DE',
    date: '2024-03-15',
    fraudScore: 85,
    status: 'Refunded',
    refundMethod: 'Claim',
    refundAmount: 299.99,
    proxyUsed: true,
    addressMismatch: true,
    highRiskZip: true,
    regionHop: true,
    multipleClaims: true,
    damageReport: false,
    sopOverride: {
      approved: true,
      approver: 'John Smith'
    },
    trackingEvents: [
      { timestamp: '2024-03-15 10:00', status: 'Pickup', location: 'Berlin, DE' },
      { timestamp: '2024-03-15 11:30', status: 'Transit', location: 'Hamburg, DE', risk: 'high' },
      { timestamp: '2024-03-15 13:00', status: 'Delivered', location: 'Munich, DE' }
    ]
  },
  // Add more mock orders...
]

const mockAnalytics = {
  courierStats: [
    { name: 'DHL', value: 45 },
    { name: 'FedEx', value: 30 },
    { name: 'UPS', value: 25 }
  ],
  refundTrends: [
    { date: '2024-03-10', value: 12 },
    { date: '2024-03-11', value: 8 },
    { date: '2024-03-12', value: 15 },
    { date: '2024-03-13', value: 10 },
    { date: '2024-03-14', value: 18 },
    { date: '2024-03-15', value: 14 }
  ],
  refundTypeVsScore: [
    { type: 'Claim', score: 85 },
    { type: 'RTS', score: 45 },
    { type: 'LIT', score: 65 },
    { type: 'Override', score: 75 }
  ]
}

export function TrackingAnomalies() {
  const [orders] = useState<TrackingOrder[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<TrackingOrder | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const tableColumns = [
    { key: 'id', header: 'Order ID' },
    { key: 'trackingNumber', header: 'Tracking Number' },
    { key: 'courier', header: 'Courier' },
    { key: 'country', header: 'Country' },
    { key: 'date', header: 'Date' },
    { 
      key: 'fraudScore', 
      header: 'Fraud Score',
      render: (order: TrackingOrder) => (
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
    { 
      key: 'status', 
      header: 'Status',
      render: (order: TrackingOrder) => (
        <Badge
          variant={
            order.status === 'Refunded'
              ? 'success'
              : order.status === 'Pending'
              ? 'warning'
              : 'secondary'
          }
        >
          {order.status}
        </Badge>
      )
    },
    { key: 'refundMethod', header: 'Refund Method' },
    { 
      key: 'refundAmount', 
      header: 'Amount',
      render: (order: TrackingOrder) => `€${order.refundAmount.toFixed(2)}`
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (order: TrackingOrder) => (
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => {
            setSelectedOrder(order)
            setIsDetailModalOpen(true)
          }}
        >
          🔍 View
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tracking Anomalies</h1>
        <div className="flex gap-4">
          <Button variant="secondary">Export to CSV</Button>
          <Button variant="primary">Push to Review Queue</Button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Couriers by Refunds */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Top Couriers by Refunds</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalytics.courierStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Refund Trends */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Refund Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAnalytics.refundTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Compensation Orders</h2>
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
            </select>
          </div>
        </div>
        <Table columns={tableColumns} data={orders} />
      </Card>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <Modal
          isOpen={isDetailModalOpen}
          title="Order Details"
          onClose={() => {
            setIsDetailModalOpen(false)
            setSelectedOrder(null)
          }}
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Tracking Events</h3>
              <div className="mt-2 space-y-2">
                {selectedOrder.trackingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                    <span className="font-medium">{event.status}</span>
                    {event.location && (
                      <span className="text-sm text-gray-500">({event.location})</span>
                    )}
                    {event.risk && (
                      <Badge
                        variant={
                          event.risk === 'high'
                            ? 'danger'
                            : event.risk === 'medium'
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {event.risk}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
} 
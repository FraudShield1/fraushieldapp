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
  const [filters, setFilters] = useState({
    courier: '',
    country: '',
    fraudScore: [0, 100],
    refundType: '',
    proxyUsed: false,
    addressMismatch: false,
    highRiskZip: false,
    regionHop: false,
    multipleClaims: false
  })

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

  const handleFilterChange = (newFilters: any) => {
    // Implement filter logic here
    console.log('Filters updated:', newFilters)
    setFilters(newFilters)
  }

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

      {/* Order Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        title="Order Details"
        onClose={() => setIsDetailModalOpen(false)}
        actions={[
          {
            label: 'Close',
            onClick: () => setIsDetailModalOpen(false),
            variant: 'secondary'
          }
        ]}
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Snapshot */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Snapshot</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">{selectedOrder.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Courier</p>
                  <p className="font-medium">{selectedOrder.courier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Refund Type</p>
                  <p className="font-medium">{selectedOrder.refundMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">€{selectedOrder.refundAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Risk Flags */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Risk Flags</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant={selectedOrder.proxyUsed ? 'danger' : 'success'}>
                    {selectedOrder.proxyUsed ? 'Proxy Used' : 'No Proxy'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedOrder.addressMismatch ? 'danger' : 'success'}>
                    {selectedOrder.addressMismatch ? 'Address Mismatch' : 'Address Match'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedOrder.highRiskZip ? 'danger' : 'success'}>
                    {selectedOrder.highRiskZip ? 'High Risk ZIP' : 'Safe ZIP'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedOrder.regionHop ? 'danger' : 'success'}>
                    {selectedOrder.regionHop ? 'Region Hop Detected' : 'No Region Hop'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedOrder.multipleClaims ? 'danger' : 'success'}>
                    {selectedOrder.multipleClaims ? 'Multiple Claims' : 'Single Claim'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>
              <div className="space-y-2">
                {selectedOrder.trackingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-500">{event.timestamp}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{event.status}</span>
                        {event.location && (
                          <span className="text-sm text-gray-500">({event.location})</span>
                        )}
                        {event.risk && (
                          <Badge variant={event.risk === 'high' ? 'danger' : 
                                         event.risk === 'medium' ? 'warning' : 'success'}>
                            {event.risk}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Log */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Document Log</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Damage Report</p>
                  <Badge variant={selectedOrder.damageReport ? 'success' : 'danger'}>
                    {selectedOrder.damageReport ? 'Uploaded' : 'Not Uploaded'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">SOP Override</p>
                  <Badge variant={selectedOrder.sopOverride.approved ? 'warning' : 'success'}>
                    {selectedOrder.sopOverride.approved 
                      ? `Approved by ${selectedOrder.sopOverride.approver}`
                      : 'No Override'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 
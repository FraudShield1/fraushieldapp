import { useState } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { useToast } from '../contexts/ToastContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface FingerprintRecord {
  id: string
  timestamp: string
  ip: string
  port: number
  ttl: number
  mss: number
  window: number
  flags: string
  os: string
  risk: number
  ipInfo?: {
    asn: string
    country: string
    range: string
    type: string
    flagged: boolean
  }
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF4444', '#FF0000']

// Mock data for development
const mockFingerprints: FingerprintRecord[] = [
  {
    id: 'FP-001',
    timestamp: '2024-03-15T10:30:00Z',
    ip: '185.222.211.42',
    port: 443,
    ttl: 64,
    mss: 1460,
    window: 65535,
    flags: 'SYN,ACK',
    os: 'Linux 5.15',
    risk: 25,
    ipInfo: {
      asn: 'AS9009 M247 Europe SRL',
      country: 'Netherlands',
      range: '185.222.208.0/21',
      type: 'Hosting',
      flagged: true
    }
  },
  {
    id: 'FP-002',
    timestamp: '2024-03-15T10:31:00Z',
    ip: '192.168.1.100',
    port: 80,
    ttl: 128,
    mss: 1380,
    window: 65535,
    flags: 'SYN',
    os: 'Windows 10',
    risk: 45,
    ipInfo: {
      asn: 'AS1234 Example ISP',
      country: 'US',
      range: '192.168.1.0/24',
      type: 'Residential',
      flagged: false
    }
  },
  {
    id: 'FP-003',
    timestamp: '2024-03-15T10:32:00Z',
    ip: '10.0.0.5',
    port: 443,
    ttl: 64,
    mss: 1150,
    window: 65535,
    flags: 'SYN,ACK',
    os: 'Unknown',
    risk: 85,
    ipInfo: {
      asn: 'AS5678 Private Network',
      country: 'Unknown',
      range: '10.0.0.0/8',
      type: 'Private',
      flagged: true
    }
  }
]

const mockRiskDistribution = [
  { score: '0-20', count: 150 },
  { score: '21-40', count: 200 },
  { score: '41-60', count: 100 },
  { score: '61-80', count: 50 },
  { score: '81-100', count: 25 }
]

const mockOSDistribution = [
  { os: 'Windows', count: 300 },
  { os: 'Linux', count: 200 },
  { os: 'MacOS', count: 100 },
  { os: 'Unknown', count: 50 }
]

export function Fingerprint() {
  const [selectedRecord, setSelectedRecord] = useState<FingerprintRecord | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    risk: '',
    os: '',
    flagged: ''
  })
  const { showToast } = useToast()

  const handleView = (record: FingerprintRecord) => {
    setSelectedRecord(record)
    setIsViewModalOpen(true)
  }

  const handleBlock = (record: FingerprintRecord) => {
    showToast('IP blocked successfully', 'success')
  }

  const handleWhitelist = (record: FingerprintRecord) => {
    showToast('IP whitelisted successfully', 'success')
  }

  const getMSSBadge = (mss: number) => {
    if (mss < 1200) {
      return <Badge variant="warning">{mss}</Badge>
    } else if (mss === 1380 || mss === 1460) {
      return <Badge variant="success">{mss}</Badge>
    } else {
      return <Badge variant="secondary">{mss}</Badge>
    }
  }

  const tableColumns = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'ip', header: 'IP Address' },
    { key: 'port', header: 'Port' },
    { key: 'ttl', header: 'TTL' },
    { 
      key: 'mss', 
      header: 'MSS',
      render: (record: FingerprintRecord) => getMSSBadge(record.mss)
    },
    { key: 'window', header: 'Window Size' },
    { key: 'flags', header: 'Flags' },
    { key: 'os', header: 'OS' },
    { 
      key: 'risk', 
      header: 'Risk Score',
      render: (record: FingerprintRecord) => (
        <Badge
          variant={
            record.risk > 80
              ? 'danger'
              : record.risk > 60
              ? 'warning'
              : 'success'
          }
        >
          {record.risk}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (record: FingerprintRecord) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleView(record)}>
            View
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleBlock(record)}>
            Block
          </Button>
          <Button variant="success" size="sm" onClick={() => handleWhitelist(record)}>
            Whitelist
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">TCP Fingerprint Detection</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Total Fingerprints (Last 24h)</h3>
          <p className="text-3xl font-bold">475</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">High Risk Detections</h3>
          <p className="text-3xl font-bold">12</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Blocked IPs</h3>
          <p className="text-3xl font-bold">8</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text">TCP Fingerprints</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  className="input"
                  placeholder="Search by IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="input"
                  value={filters.risk}
                  onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
                >
                  <option value="">All Risk Levels</option>
                  <option value="low">Low (0-40)</option>
                  <option value="medium">Medium (41-60)</option>
                  <option value="high">High (61-100)</option>
                </select>
                <select 
                  className="input"
                  value={filters.os}
                  onChange={(e) => setFilters({ ...filters, os: e.target.value })}
                >
                  <option value="">All OS</option>
                  <option value="windows">Windows</option>
                  <option value="linux">Linux</option>
                  <option value="macos">MacOS</option>
                </select>
                <Button variant="secondary">Export CSV</Button>
              </div>
            </div>
            <Table columns={tableColumns} data={mockFingerprints} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-medium text-text-secondary mb-4">Risk Score Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockRiskDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="score" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-text-secondary mb-4">OS Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockOSDistribution}
                    dataKey="count"
                    nameKey="os"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {mockOSDistribution.map((_, index) => (
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

      {/* View Fingerprint Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedRecord(null)
        }}
        title="Fingerprint Details"
        actions={[
          {
            label: 'Close',
            onClick: () => {
              setIsViewModalOpen(false)
              setSelectedRecord(null)
            }
          }
        ]}
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">TCP Information</h4>
                <div className="space-y-2">
                  <p><span className="text-text-secondary">IP:</span> {selectedRecord.ip}</p>
                  <p><span className="text-text-secondary">Port:</span> {selectedRecord.port}</p>
                  <p><span className="text-text-secondary">TTL:</span> {selectedRecord.ttl}</p>
                  <p><span className="text-text-secondary">MSS:</span> {getMSSBadge(selectedRecord.mss)}</p>
                  <p><span className="text-text-secondary">Window Size:</span> {selectedRecord.window}</p>
                  <p><span className="text-text-secondary">Flags:</span> {selectedRecord.flags}</p>
                  <p><span className="text-text-secondary">OS:</span> {selectedRecord.os}</p>
                  <p><span className="text-text-secondary">Risk Score:</span> {selectedRecord.risk}</p>
                </div>
              </div>
              {selectedRecord.ipInfo && (
                <div>
                  <h4 className="font-medium mb-2">IP Intelligence</h4>
                  <div className="space-y-2">
                    <p><span className="text-text-secondary">ASN:</span> {selectedRecord.ipInfo.asn}</p>
                    <p><span className="text-text-secondary">Country:</span> {selectedRecord.ipInfo.country}</p>
                    <p><span className="text-text-secondary">Range:</span> {selectedRecord.ipInfo.range}</p>
                    <p><span className="text-text-secondary">Type:</span> {selectedRecord.ipInfo.type}</p>
                    <p>
                      <span className="text-text-secondary">Status:</span>{' '}
                      <Badge variant={selectedRecord.ipInfo.flagged ? 'danger' : 'success'}>
                        {selectedRecord.ipInfo.flagged ? 'Suspicious' : 'Trusted'}
                      </Badge>
                    </p>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Check WHOIS / Abuse DB
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 
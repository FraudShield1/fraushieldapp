import { useState, useEffect } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Order } from '../types'
import { mockOrders } from '../utils/mockData'

interface IPInfo {
  ip: string
  isp: string
  asn: string
  country: string
  city: string
  reverseDNS: string
}

interface FingerprintResult {
  proxyDetected: boolean
  proxyType: 'HTTP' | 'SOCKS5' | 'TOR' | 'Residential' | 'Datacenter' | 'None'
  confidence: 'Low' | 'Medium' | 'High'
  anomaly: string
  tcpWindowSize: number
  ttl: number
  tcpOptions: string[]
  osGuess: string
  synDelay: number
  knownSignature: boolean
  riskLabel: 'Clean Device' | 'Proxy Detected' | 'Fraudulent Pattern'
}

let handleScanIP: (ip: string) => Promise<void>

const tableColumns = [
  { key: 'id', header: 'Order ID' },
  { key: 'customerName', header: 'Customer' },
  { key: 'date', header: 'Date' },
  { key: 'shippingCountry', header: 'Country' },
  { key: 'deviceType', header: 'Device' },
  { key: 'ipAddress', header: 'IP Address' },
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
  {
    key: 'actions',
    header: 'Actions',
    render: (order: Order) => (
      <Button 
        variant="primary" 
        size="sm"
        onClick={() => handleScanIP(order.ipAddress)}
      >
        Scan IP
      </Button>
    ),
  },
]

export function TCPFingerprint() {
  const [orders] = useState<Order[]>(mockOrders)
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<FingerprintResult | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [scoreRange, setScoreRange] = useState('')

  handleScanIP = async (ip: string) => {
    setIsScanning(true)
    setError(null)
    
    try {
      // Mock API call to backend TCP scanner
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock result
      setScanResult({
        proxyDetected: true,
        proxyType: 'Residential',
        confidence: 'High',
        anomaly: 'TCP TTL mismatch',
        tcpWindowSize: 65280,
        ttl: 64,
        tcpOptions: ['MSS', 'SACK', 'Timestamps'],
        osGuess: 'Linux / Android',
        synDelay: 5,
        knownSignature: true,
        riskLabel: 'Proxy Detected'
      })

      // Fetch IP info
      const response = await fetch(`https://ipinfo.io/${ip}/json`)
      const data = await response.json()
      setIpInfo({
        ip: data.ip,
        isp: data.org,
        asn: data.asn?.asn || 'Unknown',
        country: data.country,
        city: data.city,
        reverseDNS: data.hostname || 'Unknown'
      })
    } catch (err) {
      setError('Scan failed. Please try again.')
      console.error('Scan error:', err)
    } finally {
      setIsScanning(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = !selectedCountry || order.shippingCountry === selectedCountry
    const matchesScore = !scoreRange || 
      (scoreRange === 'high' && order.fraudScore > 80) ||
      (scoreRange === 'medium' && order.fraudScore >= 60 && order.fraudScore <= 80) ||
      (scoreRange === 'low' && order.fraudScore < 60)
    
    return matchesSearch && matchesCountry && matchesScore
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Compensation History Scanner</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Compensation History Table */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Compensation History</h2>
          <div className="flex gap-4">
            <input
              type="text"
              className="input"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select 
              className="input"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="CA">CA</option>
            </select>
            <select 
              className="input"
              value={scoreRange}
              onChange={(e) => setScoreRange(e.target.value)}
            >
              <option value="">All Scores</option>
              <option value="high">High Risk ({'>'}80%)</option>
              <option value="medium">Medium Risk (60-79%)</option>
              <option value="low">Low Risk ({'<'}60%)</option>
            </select>
          </div>
        </div>
        <Table columns={tableColumns} data={filteredOrders} />
      </Card>

      {/* Scan Results */}
      {scanResult && ipInfo && (
        <>
          {/* IP Info Card */}
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Target IP Information</h2>
                <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
                  Edit IP
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">IP Address</p>
                  <p className="font-medium">{ipInfo.ip}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ISP</p>
                  <p className="font-medium">{ipInfo.isp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ASN</p>
                  <p className="font-medium">{ipInfo.asn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{ipInfo.city}, {ipInfo.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reverse DNS</p>
                  <p className="font-medium">{ipInfo.reverseDNS}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* System Detection Results */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">System Detection Results</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Proxy/VPN Detection</p>
                <div className="flex items-center gap-2">
                  {scanResult.proxyDetected ? (
                    <Badge variant="danger">Detected</Badge>
                  ) : (
                    <Badge variant="success">Not Detected</Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Proxy Type</p>
                <p className="font-medium">{scanResult.proxyType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Confidence Level</p>
                <Badge variant={scanResult.confidence === 'High' ? 'danger' : 
                               scanResult.confidence === 'Medium' ? 'warning' : 'secondary'}>
                  {scanResult.confidence}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Anomaly</p>
                <p className="font-medium">{scanResult.anomaly}</p>
              </div>
            </div>
          </Card>

          {/* Fingerprint Details */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Fingerprint Details</h2>
            <Table
              columns={[
                { key: 'field', header: 'Field' },
                { key: 'value', header: 'Value' }
              ]}
              data={[
                { field: 'TCP Window Size', value: scanResult.tcpWindowSize.toString() },
                { field: 'TTL', value: scanResult.ttl.toString() },
                { field: 'TCP Options', value: scanResult.tcpOptions.join(', ') },
                { field: 'OS Guess', value: scanResult.osGuess },
                { field: 'SYN Delay', value: `${scanResult.synDelay}ms` },
                { field: 'Known Signature', value: scanResult.knownSignature ? 'Match' : 'No Match' }
              ]}
            />
          </Card>

          {/* Verdict */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Final Verdict</h2>
            <div className="flex items-center gap-2">
              {scanResult.riskLabel === 'Clean Device' ? (
                <Badge variant="success">✅ Clean Device</Badge>
              ) : scanResult.riskLabel === 'Proxy Detected' ? (
                <Badge variant="warning">⚠️ Proxy Detected</Badge>
              ) : (
                <Badge variant="danger">❌ Fraudulent Pattern Detected</Badge>
              )}
            </div>
          </Card>

          {/* Analytics Summary */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Analytics Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Detection Accuracy</p>
                <p className="font-medium">94.7%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Scan Timestamp</p>
                <p className="font-medium">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Edit IP Modal */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit IP Address"
        onClose={() => setIsEditModalOpen(false)}
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsEditModalOpen(false),
            variant: 'secondary'
          },
          {
            label: 'Update IP',
            onClick: () => {
              if (ipInfo) {
                handleScanIP(ipInfo.ip)
              }
              setIsEditModalOpen(false)
            }
          }
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter IP Address
            </label>
            <input
              type="text"
              value={ipInfo?.ip || ''}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-sm text-gray-500">
            Note: This IP is from the selected order and cannot be modified.
          </p>
        </div>
      </Modal>
    </div>
  )
} 
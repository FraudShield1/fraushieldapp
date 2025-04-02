import { useState } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useToast } from '../contexts/ToastContext'

interface KYCVerification {
  id: string
  customerId: string
  status: 'verified' | 'pending' | 'failed'
  timestamp: string
  riskScore: number
  documentType: string
  checks: string[]
}

const mockVerifications: KYCVerification[] = [
  {
    id: 'KYC-001',
    customerId: 'CUST-001',
    status: 'verified',
    timestamp: '2024-03-15T10:30:00',
    riskScore: 85,
    documentType: 'Passport',
    checks: ['Document', 'Face Match', 'Address']
  },
  {
    id: 'KYC-002',
    customerId: 'CUST-002',
    status: 'pending',
    timestamp: '2024-03-15T11:15:00',
    riskScore: 60,
    documentType: 'Driver License',
    checks: ['Document']
  },
  {
    id: 'KYC-003',
    customerId: 'CUST-003',
    status: 'failed',
    timestamp: '2024-03-15T12:00:00',
    riskScore: 30,
    documentType: 'National ID',
    checks: ['Document', 'Face Match']
  }
]

const mockRiskData = [
  { date: '2024-03-10', score: 75 },
  { date: '2024-03-11', score: 82 },
  { date: '2024-03-12', score: 78 },
  { date: '2024-03-13', score: 85 },
  { date: '2024-03-14', score: 88 },
  { date: '2024-03-15', score: 85 }
]

export function KYC() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const { showToast } = useToast()

  const handleRequestDemo = () => {
    setIsDemoModalOpen(true)
  }

  const handleGenerateApiKey = () => {
    setIsApiKeyModalOpen(true)
    showToast('API key generated successfully', 'success')
  }

  const scrollToIntegration = () => {
    document.getElementById('integration-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-text mb-4">Verify Customers. Minimize Risk.</h1>
        <p className="text-xl text-text-secondary mb-6">
          Integrated KYC checks to validate user identities before fraud happens.
        </p>
        <Button onClick={scrollToIntegration} variant="primary" size="lg">
          Start KYC Integration
        </Button>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-2">Reduce Chargebacks</h3>
          <p className="text-text-secondary">
            Stop fraud before orders are placed with comprehensive identity verification.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Stay Compliant</h3>
          <p className="text-text-secondary">
            Meet GDPR, AML, and industry KYC requirements with automated verification.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Trust Your Customers</h3>
          <p className="text-text-secondary">
            Strengthen onboarding and prevent abuse with verified identities.
          </p>
        </Card>
      </div>

      {/* Feature Highlights */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Feature Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Identity Document Verification</h3>
                <p className="text-sm text-text-secondary">
                  Automatically verify passports, national IDs, driver's licenses
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Liveness & Face Match</h3>
                <p className="text-sm text-text-secondary">
                  Check if the user is real with live selfies matched to ID photo
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Address & Geolocation Check</h3>
                <p className="text-sm text-text-secondary">
                  Validate user-submitted address against IP geolocation
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Bank / Payment Method Verification</h3>
                <p className="text-sm text-text-secondary">
                  Detect stolen credit cards or disposable emails
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Risk Scoring</h3>
                <p className="text-sm text-text-secondary">
                  Return a fraud score based on identity mismatches and watchlist hits
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Audit Trail</h3>
                <p className="text-sm text-text-secondary">
                  Record every check securely and make it GDPR / compliance friendly
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Integration Methods */}
      <div id="integration-section">
        <h2 className="text-2xl font-bold mb-6">Integration Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">API Integration</h3>
            <pre className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
              <code>{`// Example API Request
POST /api/v1/kyc/verify
{
  "customerId": "CUST-001",
  "documentType": "passport",
  "documentData": {
    "number": "P123456789",
    "expiryDate": "2025-12-31"
  }
}`}</code>
            </pre>
            <Button onClick={handleGenerateApiKey} className="mt-4">
              Generate API Key
            </Button>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-4">JS Widget</h3>
            <pre className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
              <code>{`<!-- KYC Widget -->
<script src="https://fraudshield.com/kyc-widget.js"></script>
<div id="kyc-verification"></div>`}</code>
            </pre>
            <Button variant="secondary" className="mt-4">
              Copy Code
            </Button>
          </Card>
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-2">Retail</h3>
            <p className="text-text-secondary">
              Flag suspicious high-ticket orders with comprehensive identity verification.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Marketplaces</h3>
            <p className="text-text-secondary">
              Require seller ID verification before payouts to prevent fraud.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Subscription Services</h3>
            <p className="text-text-secondary">
              Check real identity to stop trial abuse and ensure legitimate subscriptions.
            </p>
          </Card>
        </div>
      </div>

      {/* Dashboard Integration */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard Integration</h2>
        <Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Real-time KYC Monitoring</h3>
              <p className="text-text-secondary mb-4">
                All KYC checks and fraud scores will be displayed in your FraudShield Dashboard alongside your real-time orders.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockRiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#00f2ff" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Verifications</h3>
              <div className="space-y-4">
                {mockVerifications.map((verification) => (
                  <div key={verification.id} className="p-4 bg-secondary/5 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Customer {verification.customerId}</h4>
                        <p className="text-sm text-text-secondary">
                          {verification.documentType} • {verification.timestamp}
                        </p>
                      </div>
                      <Badge
                        variant={
                          verification.status === 'verified'
                            ? 'success'
                            : verification.status === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {verification.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex gap-1 flex-wrap">
                        {verification.checks.map((check) => (
                          <Badge key={check} variant="secondary">
                            {check}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleRequestDemo} variant="primary" size="lg">
          Request KYC Setup
        </Button>
        <Button variant="secondary" size="lg">
          Schedule Integration
        </Button>
      </div>

      {/* Demo Request Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Request KYC Demo"
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsDemoModalOpen(false)
          },
          {
            label: 'Submit Request',
            onClick: () => {
              showToast('Demo request submitted successfully', 'success')
              setIsDemoModalOpen(false)
            },
            variant: 'primary'
          }
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input type="text" className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Use Case</label>
            <select className="input w-full">
              <option>Retail</option>
              <option>Marketplace</option>
              <option>Subscription Service</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea className="input w-full h-32" />
          </div>
        </div>
      </Modal>

      {/* API Key Modal */}
      <Modal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        title="API Key Generated"
        actions={[
          {
            label: 'Close',
            onClick: () => setIsApiKeyModalOpen(false)
          }
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your API Key</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input flex-1 font-mono"
                value="sk_live_1234567890abcdef"
                readOnly
              />
              <Button variant="secondary">Copy</Button>
            </div>
          </div>
          <div className="bg-secondary/10 p-4 rounded-lg">
            <p className="text-sm">
              Keep this API key secure and never share it publicly. You can regenerate it at any time.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
} 
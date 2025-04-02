import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { useState } from 'react'

interface Integration {
  id: string
  name: string
  type: 'payment' | 'shipping' | 'analytics' | 'identity'
  status: 'active' | 'inactive' | 'error'
  lastSync: string
  health: 'healthy' | 'warning' | 'critical'
  config: {
    apiKey?: string
    endpoint?: string
    webhook?: string
  }
}

const mockIntegrations: Integration[] = [
  {
    id: 'INT-001',
    name: 'Stripe Payment Gateway',
    type: 'payment',
    status: 'active',
    lastSync: '2024-03-15T14:30:00Z',
    health: 'healthy',
    config: {
      apiKey: 'sk_live_...',
      endpoint: 'https://api.stripe.com/v1'
    }
  },
  {
    id: 'INT-002',
    name: 'MaxMind GeoIP',
    type: 'identity',
    status: 'active',
    lastSync: '2024-03-15T14:25:00Z',
    health: 'warning',
    config: {
      apiKey: 'maxmind_...',
      endpoint: 'https://geoip.maxmind.com'
    }
  }
]

export function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Integrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Available Integrations</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Payment Gateway</h3>
                <p className="text-sm text-gray-500">Connect your payment processor</p>
              </div>
              <Button>Connect</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">E-commerce Platform</h3>
                <p className="text-sm text-gray-500">Link your online store</p>
              </div>
              <Button>Connect</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 
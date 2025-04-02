import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'

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
  const [activeTab, setActiveTab] = useState<'all' | 'payment' | 'shipping' | 'analytics' | 'identity'>('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations = activeTab === 'all'
    ? mockIntegrations
    : mockIntegrations.filter(integration => integration.type === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <Button>Add New Integration</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Total Integrations</h3>
          <p className="text-2xl font-bold">{mockIntegrations.length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Active</h3>
          <p className="text-2xl font-bold">{mockIntegrations.filter(i => i.status === 'active').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Healthy</h3>
          <p className="text-2xl font-bold">{mockIntegrations.filter(i => i.health === 'healthy').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Last Sync</h3>
          <p className="text-sm">{new Date(mockIntegrations[0].lastSync).toLocaleString()}</p>
        </Card>
      </div>

      <Card>
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            All
          </Button>
          <Button
            variant={activeTab === 'payment' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </Button>
          <Button
            variant={activeTab === 'shipping' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('shipping')}
          >
            Shipping
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
          <Button
            variant={activeTab === 'identity' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('identity')}
          >
            Identity
          </Button>
        </div>

        <div className="space-y-4">
          {filteredIntegrations.map(integration => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 cursor-pointer"
              onClick={() => setSelectedIntegration(integration)}
            >
              <div>
                <h3 className="font-medium">{integration.name}</h3>
                <p className="text-sm text-text-secondary">{integration.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    integration.status === 'active'
                      ? 'success'
                      : integration.status === 'inactive'
                      ? 'secondary'
                      : 'danger'
                  }
                >
                  {integration.status}
                </Badge>
                <Badge
                  variant={
                    integration.health === 'healthy'
                      ? 'success'
                      : integration.health === 'warning'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {integration.health}
                </Badge>
                <div className="text-sm text-text-secondary">
                  Last sync: {new Date(integration.lastSync).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 
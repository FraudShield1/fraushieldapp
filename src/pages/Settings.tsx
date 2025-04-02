import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { IntegrationCard } from '../components/IntegrationCard'

// Integration categories and their integrations
const integrations = {
  payments: [
    {
      name: 'Stripe',
      description: 'Payment processing and fraud detection',
      icon: '💳',
      type: 'payment' as const,
      status: 'active' as const,
      lastSync: '2 minutes ago',
      apiKey: 'sk_live_...',
      webhookEnabled: true
    },
    {
      name: 'PayPal',
      description: 'Alternative payment processing',
      icon: '🔵',
      type: 'payment' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    },
    {
      name: 'MaxMind',
      description: 'IP geolocation and fraud detection',
      icon: '🌍',
      type: 'risk' as const,
      status: 'active' as const,
      lastSync: '5 minutes ago',
      apiKey: 'maxmind_...',
      webhookEnabled: true
    }
  ],
  ecommerce: [
    {
      name: 'Shopify',
      description: 'E-commerce platform integration',
      icon: '🛍️',
      type: 'ecom' as const,
      status: 'active' as const,
      lastSync: '1 minute ago',
      apiKey: 'shopify_...',
      webhookEnabled: true
    },
    {
      name: 'WooCommerce',
      description: 'WordPress e-commerce integration',
      icon: '🛒',
      type: 'ecom' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    },
    {
      name: 'Magento',
      description: 'Enterprise e-commerce platform',
      icon: '🏢',
      type: 'ecom' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    }
  ],
  shipping: [
    {
      name: 'DHL',
      description: 'Shipping and tracking integration',
      icon: '📦',
      type: 'ecom' as const,
      status: 'active' as const,
      lastSync: '3 minutes ago',
      apiKey: 'dhl_...',
      webhookEnabled: true
    },
    {
      name: 'FedEx',
      description: 'Express shipping integration',
      icon: '✈️',
      type: 'ecom' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    },
    {
      name: 'UPS',
      description: 'Global shipping integration',
      icon: '🚚',
      type: 'ecom' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    }
  ],
  analytics: [
    {
      name: 'Google Analytics',
      description: 'Website analytics and tracking',
      icon: '📊',
      type: 'analytics' as const,
      status: 'active' as const,
      lastSync: 'Just now',
      apiKey: 'ga_...',
      webhookEnabled: true
    },
    {
      name: 'Mixpanel',
      description: 'User behavior analytics',
      icon: '📈',
      type: 'analytics' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    },
    {
      name: 'Segment',
      description: 'Customer data platform',
      icon: '🔗',
      type: 'analytics' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    }
  ],
  documentation: [
    {
      name: 'Confluence',
      description: 'Documentation and knowledge base',
      icon: '📚',
      type: 'docs' as const,
      status: 'active' as const,
      lastSync: '1 hour ago',
      apiKey: 'confluence_...',
      webhookEnabled: true
    },
    {
      name: 'Notion',
      description: 'Team documentation platform',
      icon: '📝',
      type: 'docs' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    },
    {
      name: 'GitHub',
      description: 'Code repository and documentation',
      icon: '💻',
      type: 'docs' as const,
      status: 'active' as const,
      lastSync: '30 minutes ago',
      apiKey: 'github_...',
      webhookEnabled: true
    }
  ],
  security: [
    {
      name: 'Auth0',
      description: 'Authentication and authorization',
      icon: '🔐',
      type: 'risk' as const,
      status: 'active' as const,
      lastSync: 'Just now',
      apiKey: 'auth0_...',
      webhookEnabled: true
    },
    {
      name: 'Okta',
      description: 'Identity management',
      icon: '👤',
      type: 'risk' as const,
      status: 'error' as const,
      lastSync: 'Never',
      apiKey: '',
      webhookEnabled: false
    },
    {
      name: 'Cloudflare',
      description: 'DDoS protection and security',
      icon: '🛡️',
      type: 'risk' as const,
      status: 'active' as const,
      lastSync: '5 minutes ago',
      apiKey: 'cloudflare_...',
      webhookEnabled: true
    }
  ]
}

export function Settings() {
  const [selectedCategory, setSelectedCategory] = useState<string>('payments')

  const handleConnect = (integration: string) => {
    console.log('Connecting to:', integration)
  }

  const handleDisconnect = (integration: string) => {
    console.log('Disconnecting from:', integration)
  }

  const handleTest = (integration: string) => {
    console.log('Testing connection to:', integration)
  }

  const handleWebhookToggle = (integrationId: string) => {
    // ... implementation ...
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integration Settings</h1>
        <Button variant="primary">Sync All Now</Button>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Object.keys(integrations).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations[selectedCategory as keyof typeof integrations].map((integration) => (
          <IntegrationCard
            key={integration.name}
            {...integration}
            onConnect={() => handleConnect(integration.name)}
            onDisconnect={() => handleDisconnect(integration.name)}
            onTest={() => handleTest(integration.name)}
            onToggleWebhook={(enabled) => handleWebhookToggle(integration.name)}
          />
        ))}
      </div>

      {/* Integration Status Summary */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Integration Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg">
            <h3 className="font-semibold text-success">Connected</h3>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-gray-500">Active integrations</p>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg">
            <h3 className="font-semibold text-warning">Needs Attention</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-500">Sync issues detected</p>
          </div>
          <div className="p-4 bg-danger/10 rounded-lg">
            <h3 className="font-semibold text-danger">Disconnected</h3>
            <p className="text-2xl font-bold">10</p>
            <p className="text-sm text-gray-500">Available to connect</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 
import { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'

interface IntegrationCardProps {
  name: string
  description: string
  icon: string
  type: 'payment' | 'ecom' | 'risk' | 'docs' | 'analytics'
  status: 'active' | 'warning' | 'error'
  lastSync?: string
  onConnect: () => void
  onDisconnect: () => void
  onTest: () => void
  onToggleWebhook: (enabled: boolean) => void
}

export function IntegrationCard({
  name,
  description,
  icon,
  type,
  status,
  lastSync,
  onConnect,
  onDisconnect,
  onTest,
  onToggleWebhook
}: IntegrationCardProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [webhookEnabled, setWebhookEnabled] = useState(false)

  const handleConnect = () => {
    setIsConnected(true)
    onConnect()
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    onDisconnect()
  }

  const handleTest = () => {
    onTest()
  }

  const handleWebhookToggle = (enabled: boolean) => {
    setWebhookEnabled(enabled)
    onToggleWebhook(enabled)
  }

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <Badge
          variant={
            status === 'active'
              ? 'success'
              : status === 'warning'
              ? 'warning'
              : 'danger'
          }
        >
          {status}
        </Badge>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant={isConnected ? 'danger' : 'primary'}
            onClick={isConnected ? handleDisconnect : handleConnect}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
          {isConnected && (
            <Button variant="secondary" onClick={handleTest}>
              Test Connection
            </Button>
          )}
        </div>

        {isConnected && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="input flex-1"
                placeholder="Enter API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button variant="secondary" onClick={() => setApiKey('')}>
                Clear
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`webhook-${name}`}
                  checked={webhookEnabled}
                  onChange={(e) => handleWebhookToggle(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={`webhook-${name}`} className="text-sm">
                  Enable Webhooks
                </label>
              </div>
              {lastSync && (
                <span className="text-sm text-gray-500">
                  Last sync: {lastSync}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
} 
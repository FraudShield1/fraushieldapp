import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { Badge } from './Badge'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'Patterns', path: '/patterns', icon: '🔍' },
  { name: 'SOPs', path: '/sops', icon: '📋' },
  { name: 'Cases', path: '/cases', icon: '📁' },
  { name: 'Chargebacks', path: '/chargebacks', icon: '💳' },
  { name: 'Warranty', path: '/warranty', icon: '🛡️' },
  { name: 'Tracking Anomalies', path: '/tracking-anomalies', icon: '🚚' },
  { name: 'TCP Fingerprint', path: '/tcp-fingerprint', icon: '🔍' },
  { name: 'Insiders', path: '/insiders', icon: '👥' },
  { name: 'Users', path: '/users', icon: '👤' },
  { name: 'Settings', path: '/settings', icon: '⚙️' }
]

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="mr-4"
                >
                  {isSidebarCollapsed ? '☰' : '←'}
                </Button>
                <span className="text-xl font-bold text-primary">FraudShield</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="mr-2"
                >
                  🔍
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="mr-2"
                >
                  🔔
                  <Badge variant="danger" className="ml-1">3</Badge>
                </Button>
                <Button variant="secondary" size="sm">
                  👤
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-card p-4 rounded-lg shadow-lg">
              <input
                type="text"
                className="input w-full"
                placeholder="Search orders, users, cases, patterns, SOPs..."
              />
              <div className="mt-4 text-sm text-text-secondary">
                Press ESC to close
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {isNotificationsOpen && (
        <div className="fixed right-0 top-16 w-80 bg-card border-l border-border h-[calc(100vh-4rem)] z-40">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="p-3 bg-danger/10 rounded-lg">
                <p className="font-medium">High Risk Order Detected</p>
                <p className="text-sm text-text-secondary">Order #12345 has a fraud score of 95</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <p className="font-medium">Pattern Update Available</p>
                <p className="text-sm text-text-secondary">New version of "Multiple Returns" pattern</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="font-medium">Case Resolved</p>
                <p className="text-sm text-text-secondary">Case #789 has been marked as legitimate</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-secondary/10'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {!isSidebarCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
} 
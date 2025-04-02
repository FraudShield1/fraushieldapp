import { useState, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { Badge } from './Badge'
import { HomeIcon, ChartBarIcon, FolderIcon, ChartPieIcon, CreditCardIcon, UsersIcon, FingerPrintIcon, ShieldCheckIcon, CogIcon, DocumentTextIcon, NewspaperIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface LayoutProps {
  children: ReactNode
}

interface NavItem {
  name: string
  path: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
  { name: 'Cases', path: '/cases', icon: FolderIcon },
  { name: 'Patterns', path: '/patterns', icon: ChartPieIcon },
  { name: 'Chargebacks', path: '/chargebacks', icon: CreditCardIcon },
  { name: 'Users', path: '/users', icon: UsersIcon },
  { name: 'TCP Fingerprint', path: '/tcp-fingerprint', icon: FingerPrintIcon },
  { name: 'KYC', path: '/kyc', icon: ShieldCheckIcon },
  { name: 'Settings', path: '/settings', icon: CogIcon },
  { name: 'SOPs', path: '/sops', icon: DocumentTextIcon },
  { name: 'Warranty', path: '/warranty', icon: ShieldCheckIcon },
  { name: 'Blog', path: '/blog', icon: NewspaperIcon },
  { name: 'Insiders', path: '/insiders', icon: UserGroupIcon },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary/5 backdrop-blur-xl border-r border-secondary/10 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-secondary/10">
            <h1 className="text-xl font-bold text-text">FraudShield</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-secondary/5 hover:text-text'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-200 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-secondary/5 backdrop-blur-xl border-b border-secondary/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
          <div className="flex items-center space-x-4">
            <Badge variant="success">Active</Badge>
            <Button variant="ghost" size="sm">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
} 
import { useState, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { Badge } from './Badge'
import { HomeIcon, ChartBarIcon, ClipboardDocumentListIcon, DocumentMagnifyingGlassIcon, FingerPrintIcon, UsersIcon, UserGroupIcon, DocumentTextIcon, ArrowPathIcon, PuzzlePieceIcon, ExclamationTriangleIcon, NewspaperIcon, ShieldCheckIcon, IdentificationIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

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
  { name: 'Cases', path: '/cases', icon: ClipboardDocumentListIcon },
  { name: 'Patterns', path: '/patterns', icon: DocumentMagnifyingGlassIcon },
  { name: 'TCP Fingerprint', path: '/tcp-fingerprint', icon: FingerPrintIcon },
  { name: 'Users', path: '/users', icon: UsersIcon },
  { name: 'Insiders', path: '/insiders', icon: UserGroupIcon },
  { name: 'SOPs', path: '/sops', icon: DocumentTextIcon },
  { name: 'Chargebacks', path: '/chargebacks', icon: ArrowPathIcon },
  { name: 'Integrations', path: '/integrations', icon: PuzzlePieceIcon },
  { name: 'Tracking Anomalies', path: '/tracking-anomalies', icon: ExclamationTriangleIcon },
  { name: 'Blog', path: '/blog', icon: NewspaperIcon },
  { name: 'Warranty', path: '/warranty', icon: ShieldCheckIcon },
  { name: 'KYC', path: '/kyc', icon: IdentificationIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-xl font-bold text-text">FraudShield</h1>
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text hover:bg-surface-hover'
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

      {/* Main content */}
      <div className={`flex flex-col min-h-screen transition-all duration-200 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-surface border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <span className="sr-only">Toggle sidebar</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <div className="flex items-center space-x-4">
            <Badge variant="success">Active</Badge>
            <Button variant="ghost" size="sm">
              <span className="sr-only">User menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 
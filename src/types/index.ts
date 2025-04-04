export interface Order {
  id: string
  customerName: string
  email: string
  shippingCountry: string
  deviceType: string
  proxyUsed: boolean
  fraudScore: number
  riskLabels: string[]
  status: 'Flagged' | 'Clear' | 'Under Review'
  ipAddress: string
  date: string
  compensationType: 'Refund' | 'Replacement' | 'Chargeback'
  compensationAmount: number
  rootCause: 'Empty Box (EBA)' | 'Lost in Transit' | 'Returned — Legitimate' | 'Defective / Warranty' | 'Unknown – Needs Review' | 'Social Engineering Suspected'
  resolutionSummary: string
}

export interface NavigationItem {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href: string
}

export interface StatsData {
  title: string
  value: string | number
  change: {
    value: number
    isPositive: boolean
  }
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface KYCRecord {
  id: string
  customerName: string
  email: string
  status: 'pending' | 'verified' | 'failed'
  riskScore: number
  submissionDate: string
  documentType: 'ID' | 'Passport' | 'Driver License'
  country: string
  documentPreview?: string
  selfiePreview?: string
  verificationResults?: {
    provider: string
    score: number
    matches: boolean
    geoMismatch: boolean
  }
  sessionMetadata?: {
    browser: string
    fingerprint: string
    ip: string
  }
  internalNotes?: string
} 
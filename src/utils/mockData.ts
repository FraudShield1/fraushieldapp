import { Order, StatsData, ChartData } from '../types'

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    email: 'j***@example.com',
    shippingCountry: 'US',
    deviceType: 'Desktop',
    proxyUsed: true,
    fraudScore: 85,
    riskLabels: ['High Returner', 'Proxy Detected'],
    status: 'Flagged',
    ipAddress: '192.168.1.100',
    date: '2024-03-15',
    compensationType: 'Refund',
    compensationAmount: 299.99,
    rootCause: 'Empty Box (EBA)',
    resolutionSummary: 'Customer reported empty box, investigation pending'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    email: 'j***@example.com',
    shippingCountry: 'CA',
    deviceType: 'Mobile',
    proxyUsed: false,
    fraudScore: 15,
    riskLabels: [],
    status: 'Clear',
    ipAddress: '10.0.0.123',
    date: '2024-03-14',
    compensationType: 'Replacement',
    compensationAmount: 149.99,
    rootCause: 'Defective / Warranty',
    resolutionSummary: 'Product malfunction confirmed, replacement shipped'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    email: 'm***@example.com',
    shippingCountry: 'UK',
    deviceType: 'Desktop',
    proxyUsed: true,
    fraudScore: 92,
    riskLabels: ['Velocity Alert', 'Proxy Detected'],
    status: 'Flagged',
    ipAddress: '172.16.0.1',
    date: '2024-03-13',
    compensationType: 'Chargeback',
    compensationAmount: 199.99,
    rootCause: 'Social Engineering Suspected',
    resolutionSummary: 'Multiple similar claims from same IP, investigation ongoing'
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Williams',
    email: 's***@example.com',
    shippingCountry: 'AU',
    deviceType: 'Mobile',
    proxyUsed: false,
    fraudScore: 8,
    riskLabels: [],
    status: 'Clear',
    ipAddress: '203.0.113.1',
    date: '2024-03-12',
    compensationType: 'Refund',
    compensationAmount: 79.99,
    rootCause: 'Returned — Legitimate',
    resolutionSummary: 'Product returned in original condition'
  },
  {
    id: 'ORD-005',
    customerName: 'David Brown',
    email: 'd***@example.com',
    shippingCountry: 'DE',
    deviceType: 'Desktop',
    proxyUsed: true,
    fraudScore: 78,
    riskLabels: ['High Returner'],
    status: 'Under Review',
    ipAddress: '198.51.100.1',
    date: '2024-03-11',
    compensationType: 'Replacement',
    compensationAmount: 399.99,
    rootCause: 'Lost in Transit',
    resolutionSummary: 'Package lost during shipping, replacement issued'
  },
  {
    id: 'ORD-006',
    customerName: 'Emma Davis',
    email: 'e***@example.com',
    shippingCountry: 'FR',
    deviceType: 'Mobile',
    proxyUsed: false,
    fraudScore: 12,
    riskLabels: [],
    status: 'Clear',
    ipAddress: '192.0.2.1',
    date: '2024-03-10',
    compensationType: 'Refund',
    compensationAmount: 129.99,
    rootCause: 'Unknown – Needs Review',
    resolutionSummary: 'Customer reported issues, needs further investigation'
  },
]

export const mockStats: StatsData[] = [
  {
    title: 'Total Orders Compensated',
    value: '1,234',
    change: {
      value: 12.5,
      isPositive: true,
    },
  },
  {
    title: 'Avg. Compensation per Order',
    value: '€245.50',
    change: {
      value: 5.2,
      isPositive: false,
    },
  },
  {
    title: 'High-Risk Compensation %',
    value: '7.2%',
    change: {
      value: 2.1,
      isPositive: true,
    },
  },
  {
    title: 'Serial Refunder Risk',
    value: '3.8%',
    change: {
      value: 1.5,
      isPositive: true,
    },
  },
]

export const mockDailyFlaggedOrders: ChartData[] = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 8 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 10 },
  { name: 'Fri', value: 18 },
  { name: 'Sat', value: 14 },
  { name: 'Sun', value: 9 },
]

export const mockFraudReasons: ChartData[] = [
  { name: 'Empty Box (EBA)', value: 35, color: '#ef4444' },
  { name: 'Lost in Transit', value: 25, color: '#f59e0b' },
  { name: 'Legitimate Returns', value: 20, color: '#3b82f6' },
  { name: 'Defective/Warranty', value: 15, color: '#10b981' },
  { name: 'Social Engineering', value: 5, color: '#8b5cf6' },
]

export const mockRiskDistribution: ChartData[] = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
] 
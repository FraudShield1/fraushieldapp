import { KYCRecord } from '../types'

const mockKYCData: KYCRecord[] = [
  {
    id: 'KYC-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    status: 'verified',
    riskScore: 25,
    submissionDate: '2024-03-15',
    documentType: 'Passport',
    country: 'US',
    verificationResults: {
      provider: 'Sumsub',
      score: 95,
      matches: true,
      geoMismatch: false
    },
    sessionMetadata: {
      browser: 'Chrome 122.0',
      fingerprint: 'abc123',
      ip: '192.168.1.1'
    },
    internalNotes: 'Customer verified successfully'
  },
  {
    id: 'KYC-002',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    status: 'pending',
    riskScore: 65,
    submissionDate: '2024-03-16',
    documentType: 'ID',
    country: 'UK'
  },
  {
    id: 'KYC-003',
    customerName: 'Bob Wilson',
    email: 'bob@example.com',
    status: 'failed',
    riskScore: 85,
    submissionDate: '2024-03-17',
    documentType: 'Driver License',
    country: 'CA',
    verificationResults: {
      provider: 'Veriff',
      score: 45,
      matches: false,
      geoMismatch: true
    }
  }
]

export const kycService = {
  async getKYCRecords(filters?: {
    status?: string
    riskRange?: string
    country?: string
    dateRange?: string
    searchTerm?: string
  }): Promise<KYCRecord[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let filteredData = [...mockKYCData]

    if (filters?.status) {
      filteredData = filteredData.filter(record => record.status === filters.status)
    }

    if (filters?.riskRange) {
      filteredData = filteredData.filter(record => {
        const score = record.riskScore
        switch (filters.riskRange) {
          case 'low':
            return score <= 40
          case 'medium':
            return score > 40 && score <= 60
          case 'high':
            return score > 60
          default:
            return true
        }
      })
    }

    if (filters?.country) {
      filteredData = filteredData.filter(record => record.country === filters.country)
    }

    if (filters?.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      filteredData = filteredData.filter(record =>
        record.customerName.toLowerCase().includes(searchLower) ||
        record.email.toLowerCase().includes(searchLower)
      )
    }

    return filteredData
  },

  async getKYCStats(): Promise<{
    totalChecks: number
    verificationRate: number
    averageRiskScore: number
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const totalChecks = mockKYCData.length
    const verifiedChecks = mockKYCData.filter(record => record.status === 'verified').length
    const averageRiskScore = Math.round(
      mockKYCData.reduce((sum, record) => sum + record.riskScore, 0) / totalChecks
    )

    return {
      totalChecks,
      verificationRate: Math.round((verifiedChecks / totalChecks) * 100),
      averageRiskScore
    }
  },

  async submitKYC(data: {
    customerName: string
    email: string
    customerId: string
    documentType: string
    documentFile: File
    selfieFile: File
  }): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate random verification result
    const isVerified = Math.random() > 0.3
    const riskScore = Math.floor(Math.random() * 100)

    return {
      success: true,
      message: isVerified
        ? 'KYC verification completed successfully'
        : 'KYC verification failed - document mismatch detected'
    }
  },

  async updateKYCStatus(
    id: string,
    status: 'verified' | 'failed',
    notes?: string
  ): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const record = mockKYCData.find(r => r.id === id)
    if (!record) {
      return {
        success: false,
        message: 'KYC record not found'
      }
    }

    record.status = status
    if (notes) {
      record.internalNotes = notes
    }

    return {
      success: true,
      message: `KYC status updated to ${status}`
    }
  },

  async getRiskDistribution(): Promise<Array<{ score: string; count: number }>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return [
      { score: '0-20', count: 150 },
      { score: '21-40', count: 200 },
      { score: '41-60', count: 100 },
      { score: '61-80', count: 50 },
      { score: '81-100', count: 25 }
    ]
  },

  async getGeoMismatches(): Promise<Array<{ country: string; count: number }>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return [
      { country: 'US', count: 15 },
      { country: 'UK', count: 8 },
      { country: 'CA', count: 12 },
      { country: 'AU', count: 5 }
    ]
  }
} 
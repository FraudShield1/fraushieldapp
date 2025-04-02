import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { useToast } from '../contexts/ToastContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { kycService } from '../services/kyc'
import { KYCRecord } from '../types'

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF4444', '#FF0000']

export function KYC() {
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    riskRange: '',
    country: '',
    dateRange: ''
  })
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const newKYCFormRef = useRef<HTMLFormElement>(null)

  // Queries
  const { data: kycRecords = [], isLoading: isLoadingRecords } = useQuery({
    queryKey: ['kycRecords', filters, searchTerm],
    queryFn: () => kycService.getKYCRecords({ ...filters, searchTerm })
  })

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['kycStats'],
    queryFn: kycService.getKYCStats
  })

  const { data: riskDistribution, isLoading: isLoadingRisk } = useQuery({
    queryKey: ['riskDistribution'],
    queryFn: kycService.getRiskDistribution
  })

  const { data: geoMismatches, isLoading: isLoadingGeo } = useQuery({
    queryKey: ['geoMismatches'],
    queryFn: kycService.getGeoMismatches
  })

  // Mutations
  const submitMutation = useMutation({
    mutationFn: kycService.submitKYC,
    onSuccess: () => {
      showToast('KYC check submitted successfully', 'success')
      setIsNewModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['kycRecords'] })
      queryClient.invalidateQueries({ queryKey: ['kycStats'] })
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: 'verified' | 'failed'; notes?: string }) =>
      kycService.updateKYCStatus(id, status, notes),
    onSuccess: () => {
      showToast('KYC status updated successfully', 'success')
      setIsViewModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['kycRecords'] })
      queryClient.invalidateQueries({ queryKey: ['kycStats'] })
    }
  })

  const handleView = (record: KYCRecord) => {
    setSelectedRecord(record)
    setIsViewModalOpen(true)
  }

  const handleRecheck = (record: KYCRecord) => {
    showToast('KYC recheck initiated', 'success')
  }

  const handleFlag = (record: KYCRecord) => {
    showToast('Record flagged for review', 'warning')
  }

  const handleSubmitKYC = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    submitMutation.mutate({
      customerName: formData.get('customerName') as string,
      email: formData.get('email') as string,
      customerId: formData.get('customerId') as string,
      documentType: formData.get('documentType') as string,
      documentFile: formData.get('documentFile') as File,
      selfieFile: formData.get('selfieFile') as File
    })
  }

  const handleUpdateStatus = (status: 'verified' | 'failed') => {
    if (selectedRecord) {
      updateStatusMutation.mutate({
        id: selectedRecord.id,
        status,
        notes: selectedRecord.internalNotes
      })
    }
  }

  const tableColumns = [
    { key: 'customerName', header: 'Customer Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'KYC Status',
      render: (record: KYCRecord) => (
        <Badge
          variant={
            record.status === 'verified'
              ? 'success'
              : record.status === 'failed'
              ? 'danger'
              : 'warning'
          }
        >
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </Badge>
      )
    },
    { 
      key: 'riskScore', 
      header: 'Risk Score',
      render: (record: KYCRecord) => (
        <Badge
          variant={
            record.riskScore > 80
              ? 'danger'
              : record.riskScore > 60
              ? 'warning'
              : 'success'
          }
        >
          {record.riskScore}
        </Badge>
      )
    },
    { key: 'submissionDate', header: 'Submission Date' },
    { key: 'documentType', header: 'Document Type' },
    {
      key: 'actions',
      header: 'Actions',
      render: (record: KYCRecord) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleView(record)}>
            View
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleRecheck(record)}>
            Recheck
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleFlag(record)}>
            Flag
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">KYC Verification Panel</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setIsSettingsModalOpen(true)}>
            Settings
          </Button>
          <Button onClick={() => setIsNewModalOpen(true)}>
            New KYC Check
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Total KYC Checks (This Month)</h3>
          <p className="text-3xl font-bold">{isLoadingStats ? '...' : stats?.totalChecks}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Verification Rate</h3>
          <p className="text-3xl font-bold">{isLoadingStats ? '...' : `${stats?.verificationRate}%`}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-4">Average Risk Score</h3>
          <p className="text-3xl font-bold">{isLoadingStats ? '...' : stats?.averageRiskScore}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text">KYC Records</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  className="input"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="input"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Statuses</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select 
                  className="input"
                  value={filters.riskRange}
                  onChange={(e) => setFilters({ ...filters, riskRange: e.target.value })}
                >
                  <option value="">All Risk Levels</option>
                  <option value="low">Low (0-40)</option>
                  <option value="medium">Medium (41-60)</option>
                  <option value="high">High (61-100)</option>
                </select>
                <Button variant="secondary">Export CSV</Button>
              </div>
            </div>
            <Table 
              columns={tableColumns} 
              data={kycRecords} 
              isLoading={isLoadingRecords}
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-medium text-text-secondary mb-4">Risk Score Distribution</h3>
            <div className="h-[300px]">
              {isLoadingRisk ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-text-secondary">Loading...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-text-secondary mb-4">Geo Mismatches by Country</h3>
            <div className="h-[300px]">
              {isLoadingGeo ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-text-secondary">Loading...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geoMismatches}
                      dataKey="count"
                      nameKey="country"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {geoMismatches?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* View KYC Record Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedRecord(null)
        }}
        title="KYC Record Details"
        actions={[
          {
            label: 'Close',
            onClick: () => {
              setIsViewModalOpen(false)
              setSelectedRecord(null)
            }
          },
          {
            label: 'Approve',
            onClick: () => handleUpdateStatus('verified'),
            variant: 'primary'
          },
          {
            label: 'Reject',
            onClick: () => handleUpdateStatus('failed'),
            variant: 'danger'
          }
        ]}
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="space-y-2">
                  <p><span className="text-text-secondary">Name:</span> {selectedRecord.customerName}</p>
                  <p><span className="text-text-secondary">Email:</span> {selectedRecord.email}</p>
                  <p><span className="text-text-secondary">Country:</span> {selectedRecord.country}</p>
                  <p><span className="text-text-secondary">Document Type:</span> {selectedRecord.documentType}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Verification Details</h4>
                <div className="space-y-2">
                  <p><span className="text-text-secondary">Status:</span> {selectedRecord.status}</p>
                  <p><span className="text-text-secondary">Risk Score:</span> {selectedRecord.riskScore}</p>
                  <p><span className="text-text-secondary">Submission Date:</span> {selectedRecord.submissionDate}</p>
                </div>
              </div>
            </div>

            {selectedRecord.verificationResults && (
              <div>
                <h4 className="font-medium mb-2">Verification Results</h4>
                <div className="space-y-2">
                  <p><span className="text-text-secondary">Provider:</span> {selectedRecord.verificationResults.provider}</p>
                  <p><span className="text-text-secondary">Score:</span> {selectedRecord.verificationResults.score}</p>
                  <p><span className="text-text-secondary">Document Match:</span> {selectedRecord.verificationResults.matches ? 'Yes' : 'No'}</p>
                  <p><span className="text-text-secondary">Geo Mismatch:</span> {selectedRecord.verificationResults.geoMismatch ? 'Yes' : 'No'}</p>
                </div>
              </div>
            )}

            {selectedRecord.sessionMetadata && (
              <div>
                <h4 className="font-medium mb-2">Session Metadata</h4>
                <div className="space-y-2">
                  <p><span className="text-text-secondary">Browser:</span> {selectedRecord.sessionMetadata.browser}</p>
                  <p><span className="text-text-secondary">IP Address:</span> {selectedRecord.sessionMetadata.ip}</p>
                  <p><span className="text-text-secondary">Fingerprint:</span> {selectedRecord.sessionMetadata.fingerprint}</p>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Internal Notes</h4>
              <textarea
                className="input w-full h-32"
                value={selectedRecord.internalNotes || ''}
                onChange={(e) => {
                  if (selectedRecord) {
                    setSelectedRecord({
                      ...selectedRecord,
                      internalNotes: e.target.value
                    })
                  }
                }}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* New KYC Check Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="New KYC Check"
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsNewModalOpen(false)
          },
          {
            label: 'Submit',
            onClick: () => newKYCFormRef.current?.submit(),
            variant: 'primary',
            disabled: submitMutation.isPending
          }
        ]}
      >
        <form ref={newKYCFormRef} onSubmit={handleSubmitKYC} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Customer Name</label>
            <input type="text" name="customerName" className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Customer ID</label>
            <input type="text" name="customerId" className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Document Type</label>
            <select name="documentType" className="input w-full" required>
              <option value="Passport">Passport</option>
              <option value="ID">ID Card</option>
              <option value="Driver License">Driver License</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Document</label>
            <input type="file" name="documentFile" className="input w-full" accept="image/*" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Selfie</label>
            <input type="file" name="selfieFile" className="input w-full" accept="image/*" required />
          </div>
        </form>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="KYC Settings"
        actions={[
          {
            label: 'Close',
            onClick: () => setIsSettingsModalOpen(false)
          },
          {
            label: 'Save Changes',
            onClick: () => showToast('Settings saved successfully', 'success'),
            variant: 'primary'
          }
        ]}
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">API Credentials</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">Sumsub API Key</label>
                <input type="password" className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Veriff API Key</label>
                <input type="password" className="input w-full" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Risk Thresholds</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">High Risk Threshold</label>
                <input type="number" className="input w-full" defaultValue={80} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Medium Risk Threshold</label>
                <input type="number" className="input w-full" defaultValue={60} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Automation Settings</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                <span className="text-sm">Auto-reject if document mismatch</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Webhook Configuration</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">Webhook URL</label>
                <input type="url" className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Secret Key</label>
                <input type="password" className="input w-full" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
} 
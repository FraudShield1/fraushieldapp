import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Table } from '../components/Table'
import { Badge } from '../components/Badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Modal } from '../components/Modal'
import { useToast } from '../contexts/ToastContext'

interface SOP {
  id: string
  name: string
  version: string
  status: 'active' | 'testing' | 'deprecated'
  patterns: string[]
  steps: string
  lastModified: string
  modifiedBy: string
}

const mockSOPs: SOP[] = [
  {
    id: 'SOP-001',
    name: 'Payment Fraud Investigation',
    version: '2.1',
    status: 'active',
    patterns: ['Multiple Returns', 'IP Geolocation'],
    steps: '# Payment Fraud Investigation\n\n1. Review transaction details\n2. Check customer history\n3. Verify IP location\n4. Document findings',
    lastModified: '2024-03-15T14:30:00Z',
    modifiedBy: 'John Smith'
  },
  {
    id: 'SOP-002',
    name: 'Account Takeover Response',
    version: '1.5',
    status: 'testing',
    patterns: ['Login Anomaly', 'Device Fingerprint'],
    steps: '# Account Takeover Response\n\n1. Verify account ownership\n2. Review recent activity\n3. Check security settings\n4. Update security measures',
    lastModified: '2024-03-14T09:15:00Z',
    modifiedBy: 'Sarah Johnson'
  }
]

const mockAnalytics = [
  { date: '2024-01', incidents: 120 },
  { date: '2024-02', incidents: 150 },
  { date: '2024-03', incidents: 180 }
]

export function SOPs() {
  const [activeTab, setActiveTab] = useState<'library' | 'creator' | 'patching' | 'analytics'>('library')
  const [selectedSOP, setSelectedSOP] = useState<SOP | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [editedSOP, setEditedSOP] = useState<SOP | null>(null)
  const { showToast } = useToast()

  const handleEdit = (sop: SOP) => {
    setSelectedSOP(sop)
    setEditedSOP({ ...sop })
    setIsEditModalOpen(true)
  }

  const handleAction = (sop: SOP) => {
    setSelectedSOP(sop)
    setIsActionModalOpen(true)
  }

  const handleSave = () => {
    if (editedSOP) {
      // In a real app, this would call an API
      showToast('SOP updated successfully', 'success')
      setIsEditModalOpen(false)
      setEditedSOP(null)
    }
  }

  const handleDuplicate = () => {
    if (selectedSOP) {
      // In a real app, this would call an API
      showToast('SOP duplicated successfully', 'success')
      setIsActionModalOpen(false)
    }
  }

  const handleArchive = () => {
    if (selectedSOP) {
      // In a real app, this would call an API
      showToast('SOP archived successfully', 'success')
      setIsActionModalOpen(false)
    }
  }

  const handleDownload = () => {
    if (selectedSOP) {
      // In a real app, this would generate and download a PDF
      showToast('SOP downloaded successfully', 'success')
      setIsActionModalOpen(false)
    }
  }

  const tableColumns = [
    { key: 'title', header: 'SOP Title' },
    { 
      key: 'tags', 
      header: 'Tags',
      render: (sop: SOP) => (
        <div className="flex gap-1 flex-wrap">
          {sop.patterns.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      )
    },
    { key: 'dateModified', header: 'Date Modified' },
    {
      key: 'linkedPatterns',
      header: 'Linked Patterns',
      render: (sop: SOP) => sop.patterns.join(', ')
    },
    {
      key: 'status',
      header: 'Status',
      render: (sop: SOP) => (
        <Badge 
          variant={sop.status === 'active' ? 'success' : sop.status === 'testing' ? 'warning' : 'secondary'}
        >
          {sop.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (sop: SOP) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(sop)}>
            Edit
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleAction(sop)}>
            Actions
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Standard Operating Procedures</h1>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'library' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('library')}
          >
            Library
          </Button>
          <Button 
            variant={activeTab === 'creator' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('creator')}
          >
            Creator
          </Button>
          <Button 
            variant={activeTab === 'patching' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('patching')}
          >
            Patching
          </Button>
          <Button 
            variant={activeTab === 'analytics' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
        </div>
      </div>

      {activeTab === 'library' && (
        <Card>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search SOPs..."
                className="input"
              />
              <select className="input">
                <option value="">All Tags</option>
                <option value="verification">Verification</option>
                <option value="returns">Returns</option>
              </select>
              <select className="input">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="patch">Patch Needed</option>
              </select>
            </div>
            <Button>Create New SOP</Button>
          </div>
          <Table 
            columns={tableColumns}
            data={mockSOPs}
          />
        </Card>
      )}

      {activeTab === 'creator' && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">SOP Creator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Version</label>
              <input type="text" className="input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="input w-full">
                <option>Active</option>
                <option>Testing</option>
                <option>Deprecated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Steps</label>
              <textarea className="input w-full h-32" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary">Save Draft</Button>
              <Button>Publish</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'patching' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Auto-Patching Panel</h2>
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <h3 className="font-medium mb-2">Pattern Updates Detected</h3>
                <p className="text-text-secondary mb-2">Pattern PAT-002 was updated. 3 SOPs need patching:</p>
                <ul className="list-disc list-inside text-text-secondary">
                  <li>SOP-001: High-Risk Order Verification</li>
                  <li>SOP-004: Customer Verification Protocol</li>
                  <li>SOP-007: Order Review Guidelines</li>
                </ul>
                <Button className="mt-4">Auto-Patch Affected SOPs</Button>
              </div>
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Patch History</h2>
            <Table
              columns={[
                { key: 'date', header: 'Date' },
                { key: 'pattern', header: 'Pattern' },
                { key: 'sops', header: 'Affected SOPs' },
                { key: 'status', header: 'Status' }
              ]}
              data={[
                {
                  date: '2024-03-15',
                  pattern: 'PAT-001',
                  sops: '2 SOPs',
                  status: 'Completed'
                }
              ]}
            />
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">SOP Effectiveness</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#00f2ff" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold mb-4">SOP Coverage</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSOPs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="status" fill="#00f2ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditedSOP(null)
        }}
        title="Edit SOP"
        actions={[
          {
            label: 'Cancel',
            onClick: () => {
              setIsEditModalOpen(false)
              setEditedSOP(null)
            }
          },
          {
            label: 'Save Changes',
            onClick: handleSave,
            variant: 'primary'
          }
        ]}
      >
        {editedSOP && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="input w-full"
                value={editedSOP.name}
                onChange={e =>
                  setEditedSOP({ ...editedSOP, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Version</label>
              <input
                type="text"
                className="input w-full"
                value={editedSOP.version}
                onChange={e =>
                  setEditedSOP({ ...editedSOP, version: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="input w-full"
                value={editedSOP.status}
                onChange={e =>
                  setEditedSOP({
                    ...editedSOP,
                    status: e.target.value as SOP['status']
                  })
                }
              >
                <option value="active">Active</option>
                <option value="testing">Testing</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Steps</label>
              <textarea
                className="input w-full h-32"
                value={editedSOP.steps}
                onChange={e =>
                  setEditedSOP({ ...editedSOP, steps: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Action Modal */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title="SOP Actions"
        actions={[
          {
            label: 'Close',
            onClick: () => setIsActionModalOpen(false)
          }
        ]}
      >
        {selectedSOP && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Duplicate SOP</span>
              <Button variant="secondary" size="sm" onClick={handleDuplicate}>
                Duplicate
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Archive SOP</span>
              <Button variant="secondary" size="sm" onClick={handleArchive}>
                Archive
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Download as PDF</span>
              <Button variant="secondary" size="sm" onClick={handleDownload}>
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 
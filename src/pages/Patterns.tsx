import { useState } from 'react'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Table } from '../components/Table'
import { Button } from '../components/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Modal } from '../components/Modal'
import { useToast } from '../contexts/ToastContext'

interface Pattern {
  id: string
  name: string
  ruleSet: string
  severity: number
  tags: string[]
  triggers: number
  lastModified: string
  version: number
  fraudCategory: 'Refund' | 'Chargeback' | 'IP'
  description: string
  type: 'regex' | 'logic' | 'ml'
  status: 'active' | 'testing' | 'deprecated'
  definition: string
  modifiedBy: string
  effectiveness: number
}

interface SimulationResult {
  orderId: string
  fraudScore: number
  matchedPatterns: string[]
  recommendedSOPs: string[]
}

const mockPatterns: Pattern[] = [
  {
    id: 'PAT-001',
    name: 'High-Risk IP Detection',
    ruleSet: 'IF IP = Proxy + shipping ≠ billing + delivery < 3d → HIGH',
    severity: 85,
    tags: ['IP', 'Proxy', 'Shipping'],
    triggers: 145,
    lastModified: '2024-03-15',
    version: 2,
    fraudCategory: 'IP',
    description: 'Detects high-risk IP activities',
    type: 'logic',
    status: 'active',
    definition: 'IF IP = Proxy + shipping ≠ billing + delivery < 3d THEN HIGH',
    modifiedBy: 'John Doe',
    effectiveness: 85
  },
  {
    id: 'PAT-002',
    name: 'Refund Abuse Pattern',
    ruleSet: 'IF refunds > 3 in 30d + different cards used → HIGH',
    severity: 90,
    tags: ['Refund', 'Payment'],
    triggers: 89,
    lastModified: '2024-03-14',
    version: 1,
    fraudCategory: 'Refund',
    description: 'Detects refund abuse',
    type: 'logic',
    status: 'active',
    definition: 'IF refunds > 3 in 30d + different cards used THEN HIGH',
    modifiedBy: 'Jane Smith',
    effectiveness: 90
  }
]

const mockTriggers = [
  { week: '2024-W10', triggers: 120 },
  { week: '2024-W11', triggers: 150 },
  { week: '2024-W12', triggers: 180 }
]

const mockCategories = [
  { name: 'Refund', value: 45 },
  { name: 'Chargeback', value: 35 },
  { name: 'IP', value: 20 }
]

const COLORS = ['#00f2ff', '#0088FE', '#00C49F']

export function Patterns() {
  const [patterns] = useState(mockPatterns)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false)
  const [editedPattern, setEditedPattern] = useState<Pattern | null>(null)
  const { showToast } = useToast()

  const handleEdit = (pattern: Pattern) => {
    setSelectedPattern(pattern)
    setEditedPattern({ ...pattern })
    setIsEditModalOpen(true)
  }

  const handleSimulate = (pattern: Pattern) => {
    setSelectedPattern(pattern)
    setIsSimulationModalOpen(true)
  }

  const handleSave = () => {
    if (editedPattern) {
      // In a real app, this would call an API
      showToast('Pattern updated successfully', 'success')
      setIsEditModalOpen(false)
      setEditedPattern(null)
    }
  }

  const handleRunSimulation = () => {
    if (selectedPattern) {
      // In a real app, this would run a simulation
      showToast('Simulation completed successfully', 'success')
      setIsSimulationModalOpen(false)
    }
  }

  const tableColumns = [
    { key: 'id', header: 'Pattern ID' },
    { key: 'name', header: 'Name' },
    { 
      key: 'ruleSet', 
      header: 'Rule Set Summary',
      render: (pattern: Pattern) => (
        <div className="max-w-md truncate">
          {pattern.ruleSet}
        </div>
      )
    },
    { 
      key: 'severity', 
      header: 'Severity Score',
      render: (pattern: Pattern) => (
        <Badge
          variant={
            pattern.severity > 80
              ? 'danger'
              : pattern.severity > 60
              ? 'warning'
              : 'success'
          }
        >
          {pattern.severity}
        </Badge>
      )
    },
    { 
      key: 'tags', 
      header: 'Tags',
      render: (pattern: Pattern) => (
        <div className="flex gap-1 flex-wrap">
          {pattern.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )
    },
    { key: 'triggers', header: '# of Triggers' },
    { key: 'lastModified', header: 'Last Modified' },
    {
      key: 'actions',
      header: 'Actions',
      render: (pattern: Pattern) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(pattern)}>
            Edit
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleSimulate(pattern)}>
            Simulate
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">Pattern Detection Lab</h1>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'library' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('library')}
          >
            Library
          </Button>
          <Button 
            variant={activeTab === 'builder' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('builder')}
          >
            Builder
          </Button>
          <Button 
            variant={activeTab === 'simulation' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('simulation')}
          >
            Simulation
          </Button>
          <Button 
            variant={activeTab === 'versions' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('versions')}
          >
            Versions
          </Button>
        </div>
      </div>

      {activeTab === 'library' && (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text">Pattern Library</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  className="input"
                  placeholder="Search patterns..."
                />
                <select className="input">
                  <option value="">All Categories</option>
                  <option value="refund">Refund</option>
                  <option value="chargeback">Chargeback</option>
                  <option value="ip">IP</option>
                </select>
                <select className="input">
                  <option value="">All Severities</option>
                  <option value="high">High ({'>'}80)</option>
                  <option value="medium">Medium (60-80)</option>
                  <option value="low">Low ({'<'}60)</option>
                </select>
              </div>
            </div>
            <Table columns={tableColumns} data={patterns} />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Pattern Triggers</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTriggers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="triggers" stroke="#00f2ff" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold mb-4">Fraud Categories</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <Card>
          <h2 className="text-xl font-semibold mb-6">Pattern Builder</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pattern Name</label>
                <input type="text" className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="input w-full">
                  <option>Refund</option>
                  <option>Chargeback</option>
                  <option>IP</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rule Builder</label>
              <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
                <div className="flex gap-2">
                  <select className="input flex-1">
                    <option>IP Address</option>
                    <option>Shipping Address</option>
                    <option>Order Value</option>
                    <option>Previous Orders</option>
                  </select>
                  <select className="input flex-1">
                    <option>equals</option>
                    <option>contains</option>
                    <option>greater than</option>
                    <option>less than</option>
                  </select>
                  <input type="text" className="input flex-1" placeholder="Value" />
                  <Button variant="secondary">Add Condition</Button>
                </div>

                <div className="flex gap-2">
                  <select className="input w-24">
                    <option>AND</option>
                    <option>OR</option>
                  </select>
                  <select className="input flex-1">
                    <option>Delivery Time</option>
                    <option>Payment Method</option>
                    <option>Device ID</option>
                  </select>
                  <select className="input flex-1">
                    <option>equals</option>
                    <option>contains</option>
                    <option>greater than</option>
                    <option>less than</option>
                  </select>
                  <input type="text" className="input flex-1" placeholder="Value" />
                  <Button variant="secondary">Add Condition</Button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Severity Score</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                className="w-full" 
                style={{ accentColor: 'var(--primary)' }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="secondary">Save Draft</Button>
              <Button>Publish Pattern</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'simulation' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-6">Pattern Simulation</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Upload Orders</label>
                  <input type="file" accept=".csv" className="input w-full" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Select Patterns</label>
                  <select className="input w-full" multiple>
                    {patterns.map(pattern => (
                      <option key={pattern.id} value={pattern.id}>
                        {pattern.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button>Run Simulation</Button>
            </div>
          </Card>

          {/* simulationResults.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold mb-4">Simulation Results</h2>
              <Table
                columns={[
                  { key: 'orderId', header: 'Order ID' },
                  { 
                    key: 'fraudScore', 
                    header: 'Fraud Score',
                    render: (result: SimulationResult) => (
                      <Badge
                        variant={
                          result.fraudScore > 80
                            ? 'danger'
                            : result.fraudScore > 60
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {result.fraudScore}
                      </Badge>
                    )
                  },
                  { 
                    key: 'matchedPatterns', 
                    header: 'Matched Patterns',
                    render: (result: SimulationResult) => result.matchedPatterns.join(', ')
                  },
                  {
                    key: 'recommendedSOPs',
                    header: 'Recommended SOPs',
                    render: (result: SimulationResult) => result.recommendedSOPs.join(', ')
                  }
                ]}
                data={simulationResults}
              />
            </Card>
          ) */}
        </div>
      )}

      {activeTab === 'versions' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-6">Pattern Version History</h2>
            <Table
              columns={[
                { key: 'version', header: 'Version' },
                { key: 'date', header: 'Date' },
                { key: 'author', header: 'Author' },
                { key: 'changes', header: 'Changes' },
                {
                  key: 'actions',
                  header: 'Actions',
                  render: () => (
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">View</Button>
                      <Button variant="secondary" size="sm">Rollback</Button>
                    </div>
                  )
                }
              ]}
              data={[
                {
                  version: 'v2.0',
                  date: '2024-03-15',
                  author: 'John Doe',
                  changes: 'Updated IP detection logic'
                },
                {
                  version: 'v1.0',
                  date: '2024-03-01',
                  author: 'Jane Smith',
                  changes: 'Initial version'
                }
              ]}
            />
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditedPattern(null)
        }}
        title="Edit Pattern"
        actions={[
          {
            label: 'Cancel',
            onClick: () => {
              setIsEditModalOpen(false)
              setEditedPattern(null)
            }
          },
          {
            label: 'Save Changes',
            onClick: handleSave,
            variant: 'primary'
          }
        ]}
      >
        {editedPattern && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="input w-full"
                value={editedPattern.name}
                onChange={e =>
                  setEditedPattern({ ...editedPattern, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="input w-full"
                value={editedPattern.description}
                onChange={e =>
                  setEditedPattern({ ...editedPattern, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                className="input w-full"
                value={editedPattern.type}
                onChange={e =>
                  setEditedPattern({
                    ...editedPattern,
                    type: e.target.value as Pattern['type']
                  })
                }
              >
                <option value="regex">Regex</option>
                <option value="logic">Logic</option>
                <option value="ml">Machine Learning</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="input w-full"
                value={editedPattern.status}
                onChange={e =>
                  setEditedPattern({
                    ...editedPattern,
                    status: e.target.value as Pattern['status']
                  })
                }
              >
                <option value="active">Active</option>
                <option value="testing">Testing</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Definition</label>
              <textarea
                className="input w-full h-32 font-mono"
                value={editedPattern.definition}
                onChange={e =>
                  setEditedPattern({ ...editedPattern, definition: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Simulation Modal */}
      <Modal
        isOpen={isSimulationModalOpen}
        onClose={() => setIsSimulationModalOpen(false)}
        title="Pattern Simulation"
        actions={[
          {
            label: 'Close',
            onClick: () => setIsSimulationModalOpen(false)
          },
          {
            label: 'Run Simulation',
            onClick: handleRunSimulation,
            variant: 'primary'
          }
        ]}
      >
        {selectedPattern && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Simulation Settings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Dataset Size</span>
                  <select className="input w-32">
                    <option>1,000 records</option>
                    <option>5,000 records</option>
                    <option>10,000 records</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time Range</span>
                  <select className="input w-32">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Expected Results</h4>
              <div className="bg-secondary/10 p-4 rounded">
                <p className="text-sm">
                  This simulation will analyze the pattern's effectiveness against the selected dataset
                  and provide detailed metrics including:
                </p>
                <ul className="mt-2 text-sm list-disc list-inside">
                  <li>True Positive Rate</li>
                  <li>False Positive Rate</li>
                  <li>Detection Accuracy</li>
                  <li>Processing Time</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 
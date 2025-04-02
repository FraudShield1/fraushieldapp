import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import { Table } from '../components/Table'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'analyst' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  permissions: string[]
}

interface ActivityLog {
  id: string
  user: string
  action: string
  timestamp: string
  details: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-15T10:30:00Z',
    permissions: ['manage_users', 'view_analytics', 'edit_patterns']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'analyst',
    status: 'active',
    lastLogin: '2024-03-15T09:15:00Z',
    permissions: ['view_analytics', 'edit_patterns']
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-03-14T15:45:00Z',
    permissions: ['view_analytics']
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'analyst',
    status: 'pending',
    lastLogin: '2024-03-15T11:20:00Z',
    permissions: ['view_analytics', 'edit_patterns']
  }
]

const mockActivityLog: ActivityLog[] = [
  {
    id: 'LOG-001',
    user: 'John Smith',
    action: 'Created new pattern',
    timestamp: '2024-03-15T14:30:00Z',
    details: 'Multiple Returns Pattern v2.0'
  },
  {
    id: 'LOG-002',
    user: 'Sarah Johnson',
    action: 'Updated user permissions',
    timestamp: '2024-03-15T13:45:00Z',
    details: 'Added analytics access for Mike Wilson'
  },
  {
    id: 'LOG-003',
    user: 'Mike Wilson',
    action: 'Viewed analytics dashboard',
    timestamp: '2024-03-14T09:15:00Z',
    details: 'Accessed fraud trends report'
  }
]

export function Users() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'analyst' | 'viewer'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')
  const [users] = useState<User[]>(mockUsers)
  const [activityLog] = useState<ActivityLog[]>(mockActivityLog)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditModalOpen(false)
  }

  const handleConfirmDelete = () => {
    // TODO: Implement delete functionality
    setIsDeleteModalOpen(false)
  }

  const userColumns = [
    {
      key: 'name',
      header: 'Name',
      accessor: (user: User) => user.name
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (user: User) => user.email
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (user: User) => (
        <Badge variant={user.role === 'admin' ? 'danger' : user.role === 'analyst' ? 'warning' : 'secondary'}>
          {user.role}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (user: User) => (
        <Badge variant={user.status === 'active' ? 'success' : user.status === 'inactive' ? 'danger' : 'warning'}>
          {user.status}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      accessor: (user: User) => new Date(user.lastLogin).toLocaleString()
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEdit(user)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(user)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]

  const activityColumns = [
    {
      key: 'timestamp',
      header: 'Time',
      accessor: (log: ActivityLog) => new Date(log.timestamp).toLocaleString()
    },
    {
      key: 'user',
      header: 'User',
      accessor: (log: ActivityLog) => log.user
    },
    {
      key: 'action',
      header: 'Action',
      accessor: (log: ActivityLog) => log.action
    },
    {
      key: 'details',
      header: 'Details',
      accessor: (log: ActivityLog) => log.details
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>Add New User</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Total Users</h3>
          <p className="text-2xl font-bold">{users.length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Active Users</h3>
          <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Pending Users</h3>
          <p className="text-2xl font-bold">{users.filter(u => u.status === 'pending').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Inactive Users</h3>
          <p className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border rounded-lg"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="analyst">Analyst</option>
              <option value="viewer">Viewer</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table columns={userColumns} data={filteredUsers} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
        <Table columns={activityColumns} data={activityLog} />
      </Card>

      <Modal
        isOpen={isEditModalOpen}
        title="Edit User"
        onClose={() => setIsEditModalOpen(false)}
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsEditModalOpen(false),
            variant: 'secondary'
          },
          {
            label: 'Save Changes',
            onClick: handleSave
          }
        ]}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                defaultValue={selectedUser.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg"
                defaultValue={selectedUser.email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Role
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                defaultValue={selectedUser.role}
              >
                <option value="admin">Admin</option>
                <option value="analyst">Analyst</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                defaultValue={selectedUser.status}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete User"
        onClose={() => setIsDeleteModalOpen(false)}
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsDeleteModalOpen(false),
            variant: 'secondary'
          },
          {
            label: 'Delete',
            onClick: handleConfirmDelete,
            variant: 'danger'
          }
        ]}
      >
        {selectedUser && (
          <div className="space-y-4">
            <p>Are you sure you want to delete user {selectedUser.name}?</p>
            <p className="text-sm text-text-secondary">
              This action cannot be undone. All user data and permissions will be permanently removed.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
} 
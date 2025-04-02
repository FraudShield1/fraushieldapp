import { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'analyst' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  permissions: string[]
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

export function Users() {
  const [users] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'analyst' | 'viewer'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')

  const filteredUsers = mockUsers.filter(user => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>Add New User</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Total Users</h3>
          <p className="text-2xl font-bold">{mockUsers.length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Active Users</h3>
          <p className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'active').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Pending Users</h3>
          <p className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'pending').length}</p>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-2">Inactive Users</h3>
          <p className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'inactive').length}</p>
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
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Last Login</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.role === 'admin' ? 'danger' : user.role === 'analyst' ? 'warning' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.status === 'active' ? 'success' : user.status === 'inactive' ? 'danger' : 'warning'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{new Date(user.lastLogin).toLocaleString()}</td>
                  <td className="py-3 px-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
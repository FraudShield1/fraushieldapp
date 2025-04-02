import { Card } from '../components/Card'

export function Warranty() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Warranty Claims</h1>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Claims</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Order #12345</h3>
                <p className="text-sm text-gray-500 mt-1">Product: Premium Widget</p>
                <span className="text-xs text-gray-400">Claimed on March 15, 2024</span>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                Pending Review
              </span>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Order #12344</h3>
                <p className="text-sm text-gray-500 mt-1">Product: Deluxe Package</p>
                <span className="text-xs text-gray-400">Claimed on March 14, 2024</span>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Approved
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 
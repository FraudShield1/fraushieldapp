import { useState } from 'react'
import { Card } from '../components/Card'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  readTime: string
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Modern Fraud Patterns in E-commerce',
    excerpt: 'Learn about the latest fraud patterns and how to protect your business from emerging threats.',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    category: 'Fraud Prevention',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Best Practices for Chargeback Prevention',
    excerpt: 'Discover effective strategies to reduce chargebacks and protect your revenue.',
    author: 'Michael Chen',
    date: '2024-03-14',
    category: 'Chargebacks',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Insider Threats: A Growing Concern',
    excerpt: 'How to identify and prevent insider threats in your organization.',
    author: 'David Smith',
    date: '2024-03-13',
    category: 'Insider Threats',
    readTime: '6 min read'
  }
]

export function Blog() {
  const [posts] = useState<BlogPost[]>(mockBlogPosts)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Blog</h1>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="border-b pb-4">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-xs text-gray-400">{post.readTime}</span>
                <span className="text-xs text-gray-400">By {post.author}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 
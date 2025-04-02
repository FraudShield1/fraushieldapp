import { Card } from "../components/Card";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Modern Fraud Patterns",
    excerpt: "Learn about the latest trends in fraud detection and prevention...",
    date: "2024-03-15",
    author: "John Doe",
    readTime: "5 min read",
  },
  {
    id: '2',
    title: 'Best Practices for Chargeback Prevention',
    excerpt: 'Discover effective strategies to reduce chargebacks and protect your revenue.',
    author: 'Michael Chen',
    date: '2024-03-14',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Insider Threats: A Growing Concern',
    excerpt: 'How to identify and prevent insider threats in your organization.',
    author: 'David Smith',
    date: '2024-03-13',
    readTime: '6 min read'
  }
];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fraud Prevention Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPosts.map((post) => (
          <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.author}</span>
              <span>{post.readTime}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 
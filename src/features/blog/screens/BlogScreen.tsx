'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getImageUrl } from '@/utils/helpers'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  image: string
  readTime: number
  tags: string[]
}

const BlogScreen: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  const categories = ['All', 'Ayurveda', 'Health Tips', 'Wellness', 'Nutrition', 'Lifestyle']

  // Mock blog posts
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Ancient Wisdom of Ayurveda in Modern Times',
      excerpt: 'Discover how ancient Ayurvedic principles can enhance your modern lifestyle and promote holistic wellness.',
      content: 'Full article content here...',
      author: 'Dr. Ayurveda Expert',
      publishedAt: '2024-12-10',
      category: 'Ayurveda',
      image: 'blog-ayurveda.jpg',
      readTime: 5,
      tags: ['Ayurveda', 'Traditional Medicine', 'Wellness']
    },
    {
      id: '2',
      title: '10 Natural Ways to Boost Your Immunity',
      excerpt: 'Learn about natural herbs and practices that can strengthen your immune system and keep you healthy.',
      content: 'Full article content here...',
      author: 'Health Expert',
      publishedAt: '2024-12-08',
      category: 'Health Tips',
      image: 'blog-immunity.jpg',
      readTime: 7,
      tags: ['Immunity', 'Natural Health', 'Prevention']
    },
    {
      id: '3',
      title: 'The Benefits of Neem for Skin Care',
      excerpt: 'Explore the amazing benefits of neem for your skin and how to incorporate it into your daily routine.',
      content: 'Full article content here...',
      author: 'Skin Care Specialist',
      publishedAt: '2024-12-05',
      category: 'Wellness',
      image: 'blog-neem.jpg',
      readTime: 4,
      tags: ['Neem', 'Skin Care', 'Natural Beauty']
    },
    {
      id: '4',
      title: 'Ayurvedic Diet: Eating According to Your Dosha',
      excerpt: 'Understanding your body type and eating the right foods for optimal health and digestion.',
      content: 'Full article content here...',
      author: 'Nutrition Expert',
      publishedAt: '2024-12-03',
      category: 'Nutrition',
      image: 'blog-diet.jpg',
      readTime: 8,
      tags: ['Diet', 'Dosha', 'Nutrition', 'Ayurveda']
    },
    {
      id: '5',
      title: 'Stress Management Through Ayurvedic Practices',
      excerpt: 'Learn effective Ayurvedic techniques to manage stress and maintain mental balance in daily life.',
      content: 'Full article content here...',
      author: 'Wellness Coach',
      publishedAt: '2024-12-01',
      category: 'Lifestyle',
      image: 'blog-stress.jpg',
      readTime: 6,
      tags: ['Stress Management', 'Mental Health', 'Meditation']
    },
    {
      id: '6',
      title: 'The Power of Turmeric in Ayurvedic Medicine',
      excerpt: 'Discover the incredible healing properties of turmeric and its role in traditional Ayurvedic treatments.',
      content: 'Full article content here...',
      author: 'Dr. Ayurveda Expert',
      publishedAt: '2024-11-28',
      category: 'Ayurveda',
      image: 'blog-turmeric.jpg',
      readTime: 5,
      tags: ['Turmeric', 'Healing', 'Anti-inflammatory']
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts)
      setFilteredPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory))
    }
  }, [selectedCategory, posts])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wellness Blog</h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">
            Discover the wisdom of Ayurveda and learn how to live a healthier, more balanced life
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/default-blog.jpg'
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readTime} min read
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-green-100">
            Subscribe to our newsletter for the latest wellness tips and Ayurvedic insights
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="px-6 py-3 bg-white text-green-500 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogScreen
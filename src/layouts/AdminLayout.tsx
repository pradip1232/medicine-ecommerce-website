'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Categories', href: '/admin/categories', icon: '📂' },
    { name: 'Reviews', href: '/admin/reviews', icon: '⭐' },
    { name: 'Newsletter', href: '/admin/newsletter', icon: '📧' },
    { name: 'Contact Messages', href: '/admin/contact', icon: '💬' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-amber-900 text-white">
          <h1 className="text-xl font-bold">Sanjeevika Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    A
                  </div>
                  <span className="hidden md:block">Admin User</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
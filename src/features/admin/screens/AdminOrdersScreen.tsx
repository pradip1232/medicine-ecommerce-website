'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { formatCurrency } from '@/utils/helpers'

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: {
    line1: string
    city: string
    state: string
    pinCode: string
  }
  createdAt: string
  updatedAt: string
}

const AdminOrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  const statusOptions = [
    'All Status',
    'Pending',
    'Confirmed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ]

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210'
      },
      items: [
        { name: 'Neem Face Wash', quantity: 2, price: 106 },
        { name: 'Aloe Vera Gel', quantity: 1, price: 175 }
      ],
      totalAmount: 387,
      status: 'pending',
      paymentStatus: 'pending',
      shippingAddress: {
        line1: '123 Main Street',
        city: 'New Delhi',
        state: 'Delhi',
        pinCode: '110001'
      },
      createdAt: '2024-12-14T10:30:00Z',
      updatedAt: '2024-12-14T10:30:00Z'
    },
    {
      id: '2',
      orderNumber: 'ORD002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 9876543211'
      },
      items: [
        { name: 'Brahmi Badam Sharbat', quantity: 1, price: 194 }
      ],
      totalAmount: 208,
      status: 'shipped',
      paymentStatus: 'paid',
      shippingAddress: {
        line1: '456 Oak Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001'
      },
      createdAt: '2024-12-13T15:45:00Z',
      updatedAt: '2024-12-14T09:15:00Z'
    },
    {
      id: '3',
      orderNumber: 'ORD003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+91 9876543212'
      },
      items: [
        { name: 'Hair Care Oil', quantity: 3, price: 175 },
        { name: 'Dant Shuddhi Toothpaste', quantity: 2, price: 106 }
      ],
      totalAmount: 737,
      status: 'delivered',
      paymentStatus: 'paid',
      shippingAddress: {
        line1: '789 Pine Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pinCode: '560001'
      },
      createdAt: '2024-12-12T11:20:00Z',
      updatedAt: '2024-12-13T16:30:00Z'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter && statusFilter !== 'All Status') {
      filtered = filtered.filter(order =>
        order.status.toLowerCase() === statusFilter.toLowerCase()
      )
    }

    setFilteredOrders(filtered)
  }, [searchTerm, statusFilter, orders])

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    )
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as Order['status'], updatedAt: new Date().toISOString() }
        : order
    ))
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders and shipping</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search orders, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status === 'All Status' ? '' : status}>
                {status}
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items.length} item(s)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        View
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false)
          setSelectedOrder(null)
        }}
        title={`Order Details - ${selectedOrder?.orderNumber}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  {selectedOrder.shippingAddress.line1}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.pinCode}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <p className="text-base font-medium text-gray-900">Total</p>
                      <p className="text-base font-medium text-gray-900">
                        {formatCurrency(selectedOrder.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Status</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Status</p>
                    <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Status</p>
                    <div className="mt-1">{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedOrder.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AdminOrdersScreen
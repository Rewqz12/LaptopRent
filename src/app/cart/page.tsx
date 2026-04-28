'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useRentalStore } from '@/stores/rentalStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ShoppingCart,
  Trash2,
  Calendar,
  Truck,
  Store,
  CreditCard,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, removeItem, getTotalPrice, getDepositTotal, clearCart } = useCartStore();
  const { createRental } = useRentalStore();

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = items.filter((i) => i.deliveryMethod === 'delivery').length * 15;
  const subtotal = getTotalPrice();
  const deposit = getDepositTotal();
  const total = subtotal + deposit + deliveryFee;

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Create rentals
    if (user) {
      createRental(user.id, items);
    }
    
    setIsProcessing(false);
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
  };

  const handleSuccessClose = () => {
    clearCart();
    setShowSuccessDialog(false);
    router.push('/dashboard/rentals');
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mb-6 text-gray-600">
              Browse our catalog and add laptops to your cart
            </p>
            <Link href="/catalog">
              <Button className="bg-blue-600">Browse Laptops</Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/catalog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-600">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Laptop Image */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-3xl">💻</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.laptop.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                        <Badge variant="secondary">{item.laptop.brand}</Badge>
                        <span>•</span>
                        <span>{item.laptop.ram} RAM</span>
                        <span>•</span>
                        <span>{item.laptop.storage}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            {formatDate(item.startDate.toISOString())} -{' '}
                            {formatDate(item.endDate.toISOString())}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.deliveryMethod === 'delivery' ? (
                            <>
                              <Truck className="h-4 w-4 text-gray-400" />
                              <span>Delivery</span>
                            </>
                          ) : (
                            <>
                              <Store className="h-4 w-4 text-gray-400" />
                              <span>Pickup</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.totalPrice)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.duration} days
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Deposit</span>
                    <span>{formatCurrency(deposit)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-blue-600">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium">Payment Method</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('credit-card')}
                      className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${
                        paymentMethod === 'credit-card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="flex-1 text-left">Credit Card</span>
                      {paymentMethod === 'credit-card' && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </button>
                    <button
                      onClick={() => setPaymentMethod('debit-card')}
                      className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${
                        paymentMethod === 'debit-card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="flex-1 text-left">Debit Card</span>
                      {paymentMethod === 'debit-card' && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowConfirmDialog(true)}
                >
                  Proceed to Checkout
                </Button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  By proceeding, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>
              Please review your order details before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit</span>
                  <span>{formatCurrency(deposit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="capitalize">{paymentMethod.replace('-', ' ')}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Charge</span>
                    <span className="text-blue-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-blue-600"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm & Pay'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleSuccessClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Order Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Your rental has been successfully processed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-center text-gray-600">
              You will receive a confirmation email shortly. Your laptop will be
              delivered on the scheduled date.
            </p>
          </div>
          <Button className="w-full bg-blue-600" onClick={handleSuccessClose}>
            View My Rentals
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}

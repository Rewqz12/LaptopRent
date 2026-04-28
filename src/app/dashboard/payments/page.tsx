'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { useRentalStore } from '@/stores/rentalStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CreditCard, ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';

export default function PaymentsPage() {
  const { user } = useAuthStore();
  const { getUserPayments } = useRentalStore();

  const payments = getUserPayments(user?.id || '');

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'rental':
        return <ArrowUpRight className="h-5 w-5 text-red-600" />;
      case 'deposit':
        return <Wallet className="h-5 w-5 text-blue-600" />;
      case 'extension':
        return <ArrowUpRight className="h-5 w-5 text-orange-600" />;
      case 'refund':
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPaymentColor = (type: string) => {
    switch (type) {
      case 'rental':
        return 'bg-red-100';
      case 'deposit':
        return 'bg-blue-100';
      case 'extension':
        return 'bg-orange-100';
      case 'refund':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getPaymentLabel = (type: string) => {
    switch (type) {
      case 'rental':
        return 'Rental Payment';
      case 'deposit':
        return 'Security Deposit';
      case 'extension':
        return 'Extension';
      case 'refund':
        return 'Refund';
      default:
        return type;
    }
  };

  const totalSpent = payments
    .filter((p) => p.type === 'rental' || p.type === 'extension')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalDeposits = payments
    .filter((p) => p.type === 'deposit')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalRefunds = payments
    .filter((p) => p.type === 'refund')
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
        <p className="mt-1 text-gray-600">
          View all your transactions and payment history
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Deposits</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(totalDeposits)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Refunds</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalRefunds)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <ArrowDownLeft className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>

            {payments.length > 0 ? (
              <div className="space-y-4">
                {payments
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${getPaymentColor(
                            payment.type
                          )}`}
                        >
                          {getPaymentIcon(payment.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {getPaymentLabel(payment.type)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(payment.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            payment.type === 'refund'
                              ? 'text-green-600'
                              : 'text-gray-900'
                          }`}
                        >
                          {payment.type === 'refund' ? '+' : '-'}
                          {formatCurrency(payment.amount)}
                        </p>
                        <Badge
                          variant={
                            payment.status === 'completed'
                              ? 'success'
                              : payment.status === 'pending'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <CreditCard className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900">
                  No transactions yet
                </h3>
                <p className="text-gray-600">
                  Your payment history will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

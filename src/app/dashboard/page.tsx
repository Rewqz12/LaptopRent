'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { useRentalStore } from '@/stores/rentalStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate, getDaysRemaining, getRentalStatus } from '@/lib/utils';
import {
  Laptop,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Shield,
  Calendar,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { getUserRentals, getActiveRentals } = useRentalStore();

  const userRentals = getUserRentals(user?.id || '');
  const activeRentals = getActiveRentals(user?.id || '');

  const stats = [
    {
      title: 'Active Rentals',
      value: activeRentals.length,
      icon: Laptop,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Rentals',
      value: userRentals.length,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Days Rented',
      value: userRentals.reduce((acc, r) => acc + r.duration, 0),
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Total Spent',
      value: formatCurrency(
        userRentals.reduce((acc, r) => acc + r.totalPrice, 0)
      ),
      icon: Clock,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-1 text-gray-600">
          Here is what is happening with your rentals
        </p>
      </motion.div>

      {/* Verification Alert */}
      {user?.verificationStatus !== 'approved' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card
            className={`border-l-4 ${
              user?.verificationStatus === 'unverified'
                ? 'border-l-orange-500'
                : user?.verificationStatus === 'pending'
                ? 'border-l-yellow-500'
                : 'border-l-red-500'
            }`}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    user?.verificationStatus === 'unverified'
                      ? 'bg-orange-100'
                      : user?.verificationStatus === 'pending'
                      ? 'bg-yellow-100'
                      : 'bg-red-100'
                  }`}
                >
                  <Shield
                    className={`h-6 w-6 ${
                      user?.verificationStatus === 'unverified'
                        ? 'text-orange-600'
                        : user?.verificationStatus === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user?.verificationStatus === 'unverified'
                      ? 'Complete Your Verification'
                      : user?.verificationStatus === 'pending'
                      ? 'Verification Pending'
                      : 'Verification Rejected'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {user?.verificationStatus === 'unverified'
                      ? 'Verify your identity to start renting laptops'
                      : user?.verificationStatus === 'pending'
                      ? 'Your verification is being reviewed'
                      : 'Please resubmit your verification documents'}
                  </p>
                </div>
              </div>
              {user?.verificationStatus === 'unverified' && (
                <Link href="/dashboard/verification">
                  <Button className="bg-blue-600">Verify Now</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Active Rentals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Active Rentals</h2>
          <Link href="/dashboard/rentals">
            <Button variant="ghost" className="text-blue-600">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {activeRentals.length > 0 ? (
          <div className="grid gap-4">
            {activeRentals.slice(0, 3).map((rental) => {
              const daysRemaining = getDaysRemaining(rental.endDate);
              const status = getRentalStatus(rental.endDate);

              return (
                <Card key={rental.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                        <span className="text-2xl">💻</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {rental.laptop.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Due: {formatDate(rental.endDate)}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            variant={
                              status === 'late'
                                ? 'destructive'
                                : status === 'due-soon'
                                ? 'warning'
                                : 'success'
                            }
                          >
                            {status === 'late'
                              ? `Late by ${Math.abs(daysRemaining)} days`
                              : status === 'due-soon'
                              ? `${daysRemaining} days left`
                              : 'On Track'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(rental.totalPrice)}
                      </p>
                      <Link href="/dashboard/rentals">
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Laptop className="mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No active rentals
              </h3>
              <p className="mb-4 text-gray-600">
                Browse our catalog and rent your first laptop
              </p>
              <Link href="/catalog">
                <Button className="bg-blue-600">Browse Laptops</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/catalog">
            <Card className="cursor-pointer transition-colors hover:bg-gray-50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Laptop className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">Rent a Laptop</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/rentals">
            <Card className="cursor-pointer transition-colors hover:bg-gray-50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Extend Rental</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/support">
            <Card className="cursor-pointer transition-colors hover:bg-gray-50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium">Report Issue</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/profile">
            <Card className="cursor-pointer transition-colors hover:bg-gray-50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <span className="font-medium">Update Profile</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

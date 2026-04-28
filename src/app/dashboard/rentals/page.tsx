'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { useRentalStore } from '@/stores/rentalStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency, formatDate, getDaysRemaining } from '@/lib/utils';
import { Laptop, Calendar, Clock, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';

export default function RentalsPage() {
  const { user } = useAuthStore();
  const { getUserRentals, extendRental, returnRental } = useRentalStore();
  const [selectedRental, setSelectedRental] = useState<string | null>(null);
  const [extendDays, setExtendDays] = useState(7);
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);

  const rentals = getUserRentals(user?.id || '');

  const getStatusBadge = (status: string, endDate: string) => {
    const daysRemaining = getDaysRemaining(endDate);

    switch (status) {
      case 'active':
        if (daysRemaining < 0) {
          return <Badge variant="destructive">Overdue</Badge>;
        } else if (daysRemaining <= 2) {
          return <Badge variant="warning">Due Soon</Badge>;
        }
        return <Badge variant="success">Active</Badge>;
      case 'returned':
        return <Badge variant="secondary">Returned</Badge>;
      case 'late':
        return <Badge variant="destructive">Late</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleExtend = () => {
    if (selectedRental) {
      extendRental(selectedRental, extendDays);
      setShowExtendDialog(false);
      setSelectedRental(null);
    }
  };

  const handleReturn = () => {
    if (selectedRental) {
      returnRental(selectedRental);
      setShowReturnDialog(false);
      setSelectedRental(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
        <p className="mt-1 text-gray-600">
          Manage your active and past laptop rentals
        </p>
      </motion.div>

      {/* Rentals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="space-y-4"
      >
        {rentals.length > 0 ? (
          rentals.map((rental) => {
            const daysRemaining = getDaysRemaining(rental.endDate);

            return (
              <Card key={rental.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Laptop Info */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <span className="text-4xl">💻</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {rental.laptop.name}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {getStatusBadge(rental.status, rental.endDate)}
                          <Badge variant="outline">{rental.laptop.brand}</Badge>
                        </div>
                        <div className="mt-3 grid gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(rental.startDate)} -{' '}
                              {formatDate(rental.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{rental.duration} days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col items-start gap-4 lg:items-end">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(rental.totalPrice)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Deposit: {formatCurrency(rental.deposit)}
                        </p>
                      </div>

                      {rental.status === 'active' && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRental(rental.id);
                              setShowExtendDialog(true);
                            }}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Extend
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedRental(rental.id);
                              setShowReturnDialog(true);
                            }}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Return
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Countdown Timer for Active Rentals */}
                  {rental.status === 'active' && daysRemaining >= 0 && (
                    <div className="mt-4 rounded-lg bg-blue-50 p-4">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">
                          {daysRemaining === 0
                            ? 'Due today!'
                            : `${daysRemaining} day${
                                daysRemaining > 1 ? 's' : ''
                              } remaining`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Overdue Warning */}
                  {rental.status === 'active' && daysRemaining < 0 && (
                    <div className="mt-4 rounded-lg bg-red-50 p-4">
                      <div className="flex items-center gap-2 text-red-800">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">
                          Overdue by {Math.abs(daysRemaining)} days. Please
                          return immediately.
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Laptop className="mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No rentals yet
              </h3>
              <p className="mb-6 text-center text-gray-600">
                You have not rented any laptops yet. Browse our catalog to get
                started.
              </p>
              <Button className="bg-blue-600">Browse Laptops</Button>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Extend Dialog */}
      <Dialog open={showExtendDialog} onOpenChange={setShowExtendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extend Rental</DialogTitle>
            <DialogDescription>
              Choose how many days you want to extend your rental period.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setExtendDays(Math.max(1, extendDays - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <div className="text-center">
                <div className="text-3xl font-bold">{extendDays}</div>
                <div className="text-sm text-gray-500">days</div>
              </div>
              <button
                onClick={() => setExtendDays(extendDays + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-600">Additional cost</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(
                  extendDays *
                    (rentals.find((r) => r.id === selectedRental)?.laptop
                      .dailyPrice || 0)
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowExtendDialog(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-blue-600" onClick={handleExtend}>
              Confirm Extension
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Return Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Laptop</DialogTitle>
            <DialogDescription>
              Are you sure you want to return this laptop? Your security deposit
              will be refunded within 3-5 business days.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowReturnDialog(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-blue-600" onClick={handleReturn}>
              Confirm Return
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

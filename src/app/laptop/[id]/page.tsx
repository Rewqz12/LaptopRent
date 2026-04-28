'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { laptops } from '@/data/laptops';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Battery,
  Scale,
  Usb,
  Calendar,
  ShoppingCart,
  ArrowLeft,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function LaptopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { addItem } = useCartStore();
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const laptop = laptops.find((l) => l.id === params.id);

  if (!laptop) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Laptop not found</h1>
          <Link href="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const calculatePrice = () => {
    const duration = calculateDuration();
    if (duration >= 30) {
      const months = Math.floor(duration / 30);
      const remainingDays = duration % 30;
      return months * laptop.monthlyPrice + remainingDays * laptop.dailyPrice;
    }
    return duration * laptop.dailyPrice;
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (user?.verificationStatus !== 'approved') {
      setShowVerificationDialog(true);
      return;
    }

    if (!startDate || !endDate) {
      return;
    }

    addItem(
      laptop,
      new Date(startDate),
      new Date(endDate),
      deliveryMethod
    );

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleRentNow = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (user?.verificationStatus !== 'approved') {
      setShowVerificationDialog(true);
      return;
    }

    if (!startDate || !endDate) {
      return;
    }

    addItem(
      laptop,
      new Date(startDate),
      new Date(endDate),
      deliveryMethod
    );

    router.push('/cart');
  };

  const duration = calculateDuration();
  const totalPrice = calculatePrice();
  const deposit = laptop.monthlyPrice * 0.5;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/catalog"
            className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="flex aspect-square items-center justify-center">
                <span className="text-9xl">💻</span>
              </div>
              <div className="absolute left-4 top-4">
                <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                  {laptop.brand}
                </Badge>
              </div>
              <div className="absolute right-4 top-4">
                <Badge
                  variant={laptop.stock > 0 ? 'success' : 'destructive'}
                  className="backdrop-blur-sm"
                >
                  {laptop.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-gray-100 transition-colors hover:bg-gray-200"
                >
                  <span className="text-2xl">💻</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-3">
                {laptop.category}
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {laptop.name}
              </h1>
              <p className="text-gray-600">{laptop.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(laptop.dailyPrice)}
                </span>
                <span className="text-gray-500">/day</span>
              </div>
              <div className="text-gray-400">|</div>
              <div>
                <span className="text-xl font-semibold text-gray-700">
                  {formatCurrency(laptop.monthlyPrice)}
                </span>
                <span className="text-gray-500">/month</span>
              </div>
            </div>

            {/* Rental Configuration */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Configure Your Rental
                </h3>

                {/* Date Selection */}
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full rounded-md border border-gray-300 px-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full rounded-md border border-gray-300 px-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                        deliveryMethod === 'delivery'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      🚚 Delivery (+$15)
                    </button>
                    <button
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                        deliveryMethod === 'pickup'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      🏪 Pickup (Free)
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                {duration > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 space-y-2 rounded-lg bg-gray-50 p-4"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Rental ({duration} day{duration > 1 ? 's' : ''})
                      </span>
                      <span className="font-medium">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-medium">
                        {formatCurrency(deposit)}
                      </span>
                    </div>
                    {deliveryMethod === 'delivery' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">{formatCurrency(15)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-blue-600">
                          {formatCurrency(
                            totalPrice +
                              deposit +
                              (deliveryMethod === 'delivery' ? 15 : 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!startDate || !endDate || laptop.stock === 0}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleRentNow}
                    disabled={!startDate || !endDate || laptop.stock === 0}
                  >
                    Rent Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Specifications</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <SpecItem icon={Cpu} label="Processor" value={laptop.cpu} />
                  <SpecItem icon={MemoryStick} label="RAM" value={laptop.ram} />
                  <SpecItem
                    icon={HardDrive}
                    label="Storage"
                    value={laptop.storage}
                  />
                  <SpecItem icon={Monitor} label="Screen" value={laptop.specs.screen} />
                  <SpecItem icon={Battery} label="Battery" value={laptop.specs.battery} />
                  <SpecItem icon={Scale} label="Weight" value={laptop.specs.weight} />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Usb className="h-4 w-4" />
                    <span className="font-medium">Ports:</span>
                    <span>{laptop.specs.ports.join(', ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to rent laptops.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Link href="/login" className="flex-1">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button className="w-full bg-blue-600">Create Account</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Verification Required
            </DialogTitle>
            <DialogDescription>
              Please complete your identity verification before renting. This
              helps us ensure the security of our equipment.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <Link href="/dashboard/verification">
              <Button className="w-full bg-blue-600">
                Complete Verification
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );
}

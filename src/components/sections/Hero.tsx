'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const benefits = [
    'No long-term contracts',
    'Free delivery & pickup',
    '24/7 technical support',
    'Flexible rental periods',
  ];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-white">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-500"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 2.5, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-purple-500"
        />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Now serving 50+ cities nationwide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Rent Premium Laptops{' '}
              <span className="text-blue-600">On-Demand</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Get access to high-performance laptops for work, gaming, and creative projects. 
              Flexible daily and monthly rates with no long-term commitment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8 grid gap-3 sm:grid-cols-2"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/catalog">
                <Button
                  size="lg"
                  className="group bg-blue-600 px-8 hover:bg-blue-700"
                >
                  Browse Laptops
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 px-8"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Laptop Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="hidden items-center justify-center lg:flex"
          >
            <div className="relative">
              {/* Laptop Frame */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-t-2xl border-8 border-gray-800 bg-gray-900 shadow-2xl">
                  <div className="aspect-[16/10] w-[500px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-white">
                        <div className="mb-4 text-6xl font-bold">💻</div>
                        <div className="text-xl font-semibold">LaptopRent</div>
                        <div className="text-sm opacity-80">Premium Rentals</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-4 rounded-b-lg bg-gray-700 shadow-xl" />
                <div className="mx-auto h-2 w-32 rounded-b-lg bg-gray-600" />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-16 top-20 rounded-xl border bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Instant Approval</div>
                    <div className="text-xs text-gray-500">Rent in minutes</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-8 bottom-32 rounded-xl border bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-lg">🚀</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Same Day</div>
                    <div className="text-xs text-gray-500">Delivery available</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

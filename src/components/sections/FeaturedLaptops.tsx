'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { laptops } from '@/data/laptops';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Cpu, HardDrive, MemoryStick, ArrowRight } from 'lucide-react';

export default function FeaturedLaptops() {
  // Get first 6 laptops for featured section
  const featuredLaptops = laptops.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Laptops
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Choose from our curated collection of high-performance laptops, 
            perfect for any task from office work to gaming and creative design.
          </p>
        </motion.div>

        {/* Laptop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredLaptops.map((laptop) => (
            <motion.div key={laptop.id} variants={cardVariants}>
              <Link href={`/laptop/${laptop.id}`}>
                <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="flex h-full items-center justify-center">
                      <span className="text-6xl">💻</span>
                    </div>
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                        {laptop.brand}
                      </Badge>
                    </div>
                    <div className="absolute right-4 top-4">
                      <Badge
                        variant={
                          laptop.stock > 0 ? 'success' : 'destructive'
                        }
                        className="backdrop-blur-sm"
                      >
                        {laptop.stock > 0 ? 'Available' : 'Out of Stock'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {laptop.name}
                    </h3>

                    {/* Specs */}
                    <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Cpu className="h-4 w-4" />
                        <span className="truncate">{laptop.cpu.split(' ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MemoryStick className="h-4 w-4" />
                        <span>{laptop.ram}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <HardDrive className="h-4 w-4" />
                        <span className="truncate">{laptop.storage}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(laptop.dailyPrice)}
                          <span className="text-sm font-normal text-gray-500">
                            /day
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          or {formatCurrency(laptop.monthlyPrice)}/month
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/catalog">
            <Button
              size="lg"
              variant="outline"
              className="group border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View All Laptops
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

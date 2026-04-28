'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Truck, RotateCcw } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Choose Your Laptop',
    description:
      'Browse our extensive catalog of premium laptops. Filter by brand, specs, and category to find the perfect match for your needs.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Calendar,
    title: 'Select Rental Period',
    description:
      'Choose your rental duration - from a single day to several months. Get better rates for longer rental periods.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Truck,
    title: 'Get It Delivered',
    description:
      'We deliver the laptop to your doorstep or pick it up from our location. Same-day delivery available in select areas.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: RotateCcw,
    title: 'Return When Done',
    description:
      'When your rental period ends, simply pack the laptop and we will pick it up. Extend anytime if you need more time.',
    color: 'bg-orange-100 text-orange-600',
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
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
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Renting a laptop has never been easier. Follow these simple steps 
            and get your device delivered within hours.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection Line (Desktop) */}
          <div className="absolute left-1/2 top-24 hidden h-1 w-3/4 -translate-x-1/2 bg-gray-200 lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white lg:left-auto lg:right-0 lg:top-0 lg:translate-x-0">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color}`}
                  >
                    <step.icon className="h-10 w-10" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

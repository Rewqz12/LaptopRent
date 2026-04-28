'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Headphones,
  Wallet,
  Clock,
  Award,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description:
      'All our laptops come with comprehensive insurance coverage. Rent with peace of mind knowing you are protected.',
  },
  {
    icon: Zap,
    title: 'Latest Technology',
    description:
      'Access the newest models from top brands. We regularly update our inventory with the latest releases.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our technical support team is available round the clock to assist you with any issues or questions.',
  },
  {
    icon: Wallet,
    title: 'Flexible Pricing',
    description:
      'Choose from daily, weekly, or monthly rates. The longer you rent, the more you save.',
  },
  {
    icon: Clock,
    title: 'Quick Delivery',
    description:
      'Same-day delivery available in most cities. Get your laptop when you need it, without the wait.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description:
      'Every laptop is thoroughly tested and sanitized before delivery. Only the best for our customers.',
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="bg-gray-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Why Choose LaptopRent?
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            We are committed to providing the best laptop rental experience. 
            Here is what sets us apart from the competition.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group rounded-xl bg-gray-800 p-6 transition-all duration-300 hover:bg-gray-700"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { laptops, brands, ramOptions, storageOptions, categories } from '@/data/laptops';
import { Laptop } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedRam, setSelectedRam] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter laptops
  const filteredLaptops = useMemo(() => {
    setIsLoading(true);
    
    const filtered = laptops.filter((laptop) => {
      const matchesSearch =
        searchQuery === '' ||
        laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.cpu.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand =
        selectedBrand === 'All' || laptop.brand === selectedBrand;
      const matchesRam =
        selectedRam === 'All' || laptop.ram === selectedRam;
      const matchesStorage =
        selectedStorage === 'All' || laptop.storage === selectedStorage;
      const matchesCategory =
        selectedCategory === 'All' || laptop.category === selectedCategory;
      const matchesPrice =
        laptop.dailyPrice >= priceRange[0] &&
        laptop.dailyPrice <= priceRange[1];

      return (
        matchesSearch &&
        matchesBrand &&
        matchesRam &&
        matchesStorage &&
        matchesCategory &&
        matchesPrice
      );
    });

    // Simulate loading delay for smooth transitions
    setTimeout(() => setIsLoading(false), 300);
    return filtered;
  }, [
    searchQuery,
    selectedBrand,
    selectedRam,
    selectedStorage,
    selectedCategory,
    priceRange,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All');
    setSelectedRam('All');
    setSelectedStorage('All');
    setSelectedCategory('All');
    setPriceRange([0, 2000]);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedBrand !== 'All' ||
    selectedRam !== 'All' ||
    selectedStorage !== 'All' ||
    selectedCategory !== 'All' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 2000;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Laptop Catalog
            </h1>
            <p className="text-gray-600">
              Browse our collection of {laptops.length}+ premium laptops available for rent
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:w-64 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search laptops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* RAM Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  RAM
                </label>
                <Select value={selectedRam} onValueChange={setSelectedRam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select RAM" />
                  </SelectTrigger>
                  <SelectContent>
                    {ramOptions.map((ram) => (
                      <SelectItem key={ram} value={ram}>
                        {ram}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Storage Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Storage
                </label>
                <Select
                  value={selectedStorage}
                  onValueChange={setSelectedStorage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageOptions.map((storage) => (
                      <SelectItem key={storage} value={storage}>
                        {storage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <span className="text-sm text-gray-600">
                {filteredLaptops.length} results
              </span>
            </div>

            {/* Results Count (Desktop) */}
            <div className="mb-4 hidden items-center justify-between lg:flex">
              <span className="text-sm text-gray-600">
                Showing {filteredLaptops.length} laptop
                {filteredLaptops.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Laptop Grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="aspect-[4/3]" />
                      <CardContent className="p-5">
                        <Skeleton className="mb-2 h-6 w-3/4" />
                        <Skeleton className="mb-4 h-4 w-1/2" />
                        <Skeleton className="h-8 w-1/3" />
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : filteredLaptops.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredLaptops.map((laptop, index) => (
                    <motion.div
                      key={laptop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <LaptopCard laptop={laptop} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16"
                >
                  <Search className="mb-4 h-12 w-12 text-gray-300" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    No laptops found
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function LaptopCard({ laptop }: { laptop: Laptop }) {
  return (
    <Link href={`/laptop/${laptop.id}`}>
      <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image Placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="flex h-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-6xl">💻</span>
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
              {laptop.stock > 0 ? 'Available' : 'Out of Stock'}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {laptop.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
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

          {/* GPU */}
          <div className="mb-4 text-sm text-gray-500">
            <span className="font-medium">GPU:</span> {laptop.gpu}
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(laptop.dailyPrice)}
                <span className="text-sm font-normal text-gray-500">/day</span>
              </div>
              <div className="text-sm text-gray-500">
                or {formatCurrency(laptop.monthlyPrice)}/month
              </div>
            </div>
            <Button
              size="sm"
              className="bg-blue-600 opacity-0 transition-opacity group-hover:opacity-100"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

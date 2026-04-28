'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, Upload, User, Phone, MapPin, Users } from 'lucide-react';

export default function VerificationPage() {
  const { user, updateVerification } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    updateVerification({
      phone: formData.phone,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship,
      },
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getStatusContent = () => {
    switch (user?.verificationStatus) {
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          title: 'Verification Approved',
          message:
            'Your identity has been verified. You can now rent laptops without any restrictions.',
          badge: 'Approved',
          badgeVariant: 'success' as const,
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          title: 'Verification Pending',
          message:
            'Your verification is being reviewed. This usually takes 1-2 business days.',
          badge: 'Pending',
          badgeVariant: 'warning' as const,
        };
      case 'rejected':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          title: 'Verification Rejected',
          message:
            'Your verification was rejected. Please review and resubmit with correct information.',
          badge: 'Rejected',
          badgeVariant: 'destructive' as const,
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          title: 'Verification Required',
          message:
            'Complete the verification process to start renting laptops.',
          badge: 'Unverified',
          badgeVariant: 'secondary' as const,
        };
    }
  };

  const status = getStatusContent();

  if (isSubmitted || user?.verificationStatus === 'pending') {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Identity Verification</h1>
          <p className="mt-1 text-gray-600">
            Verify your identity to rent laptops
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                <Clock className="h-10 w-10 text-yellow-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Verification Submitted
              </h2>
              <p className="max-w-md text-center text-gray-600">
                Thank you for submitting your verification. Our team is reviewing
                your documents and will get back to you within 1-2 business days.
              </p>
              <div className="mt-6">
                <Badge variant="warning">Pending Review</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Identity Verification</h1>
        <p className="mt-1 text-gray-600">
          Verify your identity to rent laptops
        </p>
      </motion.div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${status.bgColor}`}>
              <status.icon className={`h-7 w-7 ${status.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">{status.title}</h3>
                <Badge variant={status.badgeVariant}>{status.badge}</Badge>
              </div>
              <p className="text-sm text-gray-600">{status.message}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification Form */}
      {user?.verificationStatus !== 'approved' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ID Upload Section */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Upload className="h-5 w-5 text-blue-600" />
                    ID Verification
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-400">
                      <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700">
                        Upload ID Front
                      </p>
                      <p className="text-xs text-gray-500">
                        Driver&apos;s License or Passport
                      </p>
                    </div>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-400">
                      <User className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700">
                        Selfie with ID
                      </p>
                      <p className="text-xs text-gray-500">
                        Hold your ID next to your face
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="mr-1 inline h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">
                        <MapPin className="mr-1 inline h-4 w-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Main St, City, State"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Users className="h-5 w-5 text-blue-600" />
                    Emergency Contact
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Full Name</Label>
                      <Input
                        id="emergencyContactName"
                        name="emergencyContactName"
                        placeholder="John Doe"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                      <Input
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelationship">
                        Relationship
                      </Label>
                      <Input
                        id="emergencyContactRelationship"
                        name="emergencyContactRelationship"
                        placeholder="Spouse, Parent, Friend"
                        value={formData.emergencyContactRelationship}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between border-t pt-6">
                  <p className="text-sm text-gray-500">
                    By submitting, you agree to our verification terms
                  </p>
                  <Button
                    type="submit"
                    className="bg-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Verification'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

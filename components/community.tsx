'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Heart, MessageCircle } from 'lucide-react';

export default function Community() {
  const stats = [
    { icon: Users, label: 'Active Students', value: '50K+' },
    { icon: Heart, label: 'Mental Health Improved', value: '78%' },
    { icon: MessageCircle, label: 'Conversations Daily', value: '100K+' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              You&apos;re Not Alone
            </h2>
            <p className="text-lg text-foreground/60 mb-8">
              Connect with a thriving community of students supporting each other. Share experiences, celebrate wins, and grow together in a safe, moderated space.
            </p>

            {/* Stats */}
            <div className="space-y-6 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
              <p className="text-sm text-primary/90">
                <span className="font-semibold">Community Guidelines:</span> All conversations are moderated by mental health professionals to ensure a safe, supportive environment.
              </p>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-card p-2">
              <Image
                src="/community-bg.jpg"
                alt="NeuroLink Community"
                width={500}
                height={500}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

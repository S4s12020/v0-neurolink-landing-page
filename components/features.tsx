'use client';

import { motion } from 'framer-motion';
import { Brain, MessageCircle, TrendingUp, Shield, Activity, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'Smart Conversations',
      description: 'AI that understands context and provides personalized support tailored to your situation',
    },
    {
      icon: MessageCircle,
      title: 'Guided Sessions',
      description: 'Evidence-based therapeutic techniques delivered in interactive sessions',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your mental health journey with detailed insights and progress reports',
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'End-to-end encrypted conversations with zero data sharing or tracking',
    },
    {
      icon: Activity,
      title: 'Wellness Tools',
      description: 'Breathing exercises, meditation guides, and daily coping strategies',
    },
    {
      icon: Zap,
      title: 'Crisis Support',
      description: 'Immediate access to crisis resources and emergency contact options',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need for comprehensive mental health support in one intuitive platform
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border border-border bg-card/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 cursor-pointer group ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 group-hover:text-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your account in less than a minute with just your email',
    },
    {
      number: '02',
      title: 'Start Conversation',
      description: 'Share what&apos;s on your mind in a safe, confidential space',
    },
    {
      number: '03',
      title: 'Get Support',
      description: 'Receive personalized guidance and therapeutic techniques',
    },
    {
      number: '04',
      title: 'Track Progress',
      description: 'Monitor your mental health improvements over time',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Get started in four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="hidden md:flex absolute top-12 -right-3 transform translate-x-full items-center justify-center"
                >
                  <ArrowRight className="w-6 h-6 text-primary" />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="h-full p-8 rounded-2xl border border-border bg-background hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/60">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

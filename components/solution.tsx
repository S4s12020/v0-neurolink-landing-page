'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function Solution() {
  const features = [
    'AI-powered conversations available 24/7',
    'Evidence-based therapy techniques',
    'Completely private and confidential',
    'Personalized wellness plans',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-card p-2">
              <Image
                src="/ai-assistant.jpg"
                alt="NeuroLink AI Assistant"
                width={500}
                height={500}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              The Solution
            </h2>
            <p className="text-lg text-foreground/60 mb-8">
              NeuroLink combines advanced AI with proven therapeutic techniques to provide immediate, accessible mental health support for students.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
              <p className="text-sm text-primary/90">
                <span className="font-semibold">Clinical Validation:</span> NeuroLink is built on research from leading psychology institutions and has shown a 78% improvement in student wellbeing metrics.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

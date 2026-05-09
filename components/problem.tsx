'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, Users, TrendingDown } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: Clock,
      title: 'Limited Access',
      description: 'Campus counseling services are overbooked with months-long waitlists',
    },
    {
      icon: Users,
      title: 'Stigma',
      description: 'Many students hesitate to seek help due to social stigma and privacy concerns',
    },
    {
      icon: AlertCircle,
      title: 'Crisis Support',
      description: 'No immediate help available during mental health crises after hours',
    },
    {
      icon: TrendingDown,
      title: 'Mental Health Crisis',
      description: 'Record levels of depression and anxiety among college students',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Problem is Real
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            College students face unprecedented mental health challenges with limited access to support
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-border bg-background/50 hover:bg-card/50 transition-colors"
              >
                <Icon className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-foreground/60">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

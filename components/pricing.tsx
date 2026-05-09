'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

export default function Pricing() {
  const { openDemo } = useModal();

  const handlePricingAction = (cta: string) => {
    if (cta === 'Contact Sales') {
      openDemo();
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for trying NeuroLink',
      features: [
        'Unlimited AI conversations',
        '1 check-in per week',
        'Basic wellness tools',
        'Community access (read-only)',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: 'Student Plus',
      price: '$9.99',
      period: '/month',
      description: 'Most popular for college students',
      features: [
        'Unlimited AI conversations',
        'Daily guided sessions',
        'Personalized wellness plans',
        'Full community access',
        'Progress tracking dashboard',
        'Crisis support 24/7',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Campus Pro',
      price: 'Custom',
      description: 'For universities and institutions',
      features: [
        'Site license for all students',
        'Dedicated support team',
        'Admin dashboard',
        'Usage analytics',
        'Integration support',
        'Custom features available',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Student-Friendly Pricing
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Start free, upgrade anytime. All plans include our core AI support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`rounded-2xl border relative overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-card/50 md:scale-105'
                  : 'border-border bg-card/50'
              }`}
            >
              {/* Badge */}
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              )}

              <div className="p-8">
                {plan.highlighted && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-foreground/60 ml-2">{plan.period}</span>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mb-8"
                >
                  <Button
                    onClick={() => handlePricingAction(plan.cta)}
                    className={`w-full rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      plan.highlighted
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-foreground/10 hover:bg-foreground/20 text-foreground'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/60">
            All plans include a 14-day free trial. Cancel anytime, no questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

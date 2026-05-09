'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useModal } from '@/lib/modal-context';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { openSignIn } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Product', href: '#product' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">NeuroLink</span>
          </Link>

          {/* Nav Items - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={handleNavClick(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-foreground/70 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md px-2 py-1 transition-all"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <motion.button
              onClick={openSignIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium text-foreground/70 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-4 py-2 transition-all"
            >
              Sign In
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                Start Free
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-card transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-border"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={handleNavClick(item.href)}
                whileHover={{ x: 4 }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-card/50 rounded-lg transition-all"
              >
                {item.label}
              </motion.button>
            ))}
            <div className="pt-2 space-y-2 border-t border-border mt-2">
              <motion.button
                onClick={openSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-card/50 rounded-lg transition-all"
              >
                Sign In
              </motion.button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                Start Free
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

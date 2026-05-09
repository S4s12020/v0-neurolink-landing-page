import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Problem from '@/components/problem';
import Solution from '@/components/solution';
import Features from '@/components/features';
import HowItWorks from '@/components/how-it-works';
import Testimonials from '@/components/testimonials';
import Community from '@/components/community';
import Pricing from '@/components/pricing';
import FAQ from '@/components/faq';
import CTA from '@/components/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Community />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

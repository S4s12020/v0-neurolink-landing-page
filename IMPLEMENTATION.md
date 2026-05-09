# NeuroLink - Premium SaaS Landing Page

## Project Overview
A modern, fully responsive landing page for NeuroLink, an AI-powered mental health support platform designed for college students. Built with React 19, Next.js 16, Tailwind CSS, and Framer Motion.

## Design System

### Color Palette
- **Background**: #0F172A (Dark blue)
- **Primary**: #7C3AED (Soft purple)
- **Secondary**: #38BDF8 (Sky blue)
- **Neutral**: #1E293B, #334155, #F1F5F9

### Typography
- **Font Family**: Geist (sans-serif) for all text
- **Headings**: Bold weights with gradient effects
- **Body**: Regular weight with optimal line-height

### Theme
- Dark mode by default with smooth transitions
- Gradient accents on primary elements
- Subtle hover effects and interactive states

## Components Built

### 1. **Navbar** (`components/navbar.tsx`)
- Fixed navigation with smooth animations
- Logo with gradient background
- Navigation links with staggered entrance animation
- Sign in and Start Free CTA buttons
- Responsive mobile menu support

### 2. **Hero** (`components/hero.tsx`)
- Full-height hero section with gradient backgrounds
- Animated badge highlighting AI capabilities
- Large, gradient text headline
- Supporting copy with trust indicators
- Dual CTA buttons (primary and secondary)
- University logos showcase

### 3. **Problem** (`components/problem.tsx`)
- 4-column grid showcasing student mental health challenges
- Icons from Lucide React for visual hierarchy
- Hover effects on problem cards
- Animation on scroll with staggered timing

### 4. **Solution** (`components/solution.tsx`)
- 2-column layout with image and content
- Feature list with checkmark icons
- Clinical validation callout box
- Generated hero image for visual impact

### 5. **Features** (`components/features.tsx`)
- 6-feature bento grid layout
- Icons with hover color transitions
- Some features span multiple grid columns
- Interactive hover states with border changes

### 6. **How It Works** (`components/how-it-works.tsx`)
- 4-step visual process timeline
- Numbered steps with gradient backgrounds
- Arrow connectors between steps (desktop only)
- Each step has title and description

### 7. **Testimonials** (`components/testimonials.tsx`)
- 3-card testimonial grid
- Star ratings for each testimonial
- Quote format with author attribution
- University affiliations for credibility

### 8. **Community** (`components/community.tsx`)
- 2-column layout with image and stats
- Key metrics (users, improvement %, daily conversations)
- Icons paired with statistics
- Community guidelines callout
- Generated community image

### 9. **Pricing** (`components/pricing.tsx`)
- 3-tier pricing structure (Starter, Student Plus, Campus Pro)
- Highlighted middle tier with subtle scale effect
- Feature checklist for each plan
- Professional pricing layout with CTA

### 10. **FAQ** (`components/faq.tsx`)
- Accordion-style FAQ section
- 6 common questions about the product
- Smooth expand/collapse animations
- Chevron icon rotation on toggle

### 11. **CTA** (`components/cta.tsx`)
- Full-width call-to-action section
- Gradient background with floating accent balls
- Large headline with supporting copy
- Dual CTA buttons
- Trust message at bottom

### 12. **Footer** (`components/footer.tsx`)
- Multi-column footer layout
- Brand section with description
- Product, Company, and Legal link sections
- Social media icons
- Copyright information

## Interactive Features

### Animations
- **Entrance Animations**: Components fade and slide in on scroll with Framer Motion
- **Hover States**: Cards, buttons, and links have smooth transitions
- **Staggered Timing**: Sequential animations for visual rhythm
- **Scroll-triggered Animations**: Using `whileInView` for performance

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)
- Flexible grid layouts that adapt to screen size
- Touch-friendly button sizing

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Images**: Next.js Image component with optimization

## Color Token System
All colors defined as CSS custom properties in `globals.css`:
- Semantic color tokens (background, foreground, primary, secondary)
- Chart colors for data visualization
- Sidebar-specific colors for component theming
- Consistent dark mode implementation

## Key Features

✅ Fully responsive design  
✅ Smooth scroll animations  
✅ Dark mode by default  
✅ Accessibility-friendly (semantic HTML, ARIA labels)  
✅ Performance optimized (lazy loading, image optimization)  
✅ SEO-friendly metadata  
✅ Professional gradient accents  
✅ Interactive hover states  
✅ Smooth page transitions  

## Generated Assets
- `public/hero-bg.jpg` - Abstract gradient hero background
- `public/ai-assistant.jpg` - AI assistant illustration
- `public/community-bg.jpg` - Community meeting image

## File Structure
```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx (Updated with dark mode)
│   ├── page.tsx (Main landing page)
│   └── globals.css (Design tokens)
├── components/
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── problem.tsx
│   ├── solution.tsx
│   ├── features.tsx
│   ├── how-it-works.tsx
│   ├── testimonials.tsx
│   ├── community.tsx
│   ├── pricing.tsx
│   ├── faq.tsx
│   ├── cta.tsx
│   └── footer.tsx
├── public/
│   ├── hero-bg.jpg
│   ├── ai-assistant.jpg
│   └── community-bg.jpg
└── package.json (includes framer-motion)
```

## Next Steps for Enhancement
- Connect to authentication system
- Implement actual pricing/payment
- Add blog section
- Create user dashboard
- Build mobile app
- Add email signup integration

# 미스터홈클린 Website Design Guidelines

## Design Approach
**Reference-Based Design**: This project replicates the exact structure and visual language of 윤슬클린 (https://xn--sy2b97nbxdr4l.com/), adapting all content for 미스터홈클린 while maintaining identical layout, section order, and component architecture.

## Typography System

**Font Family**: 
- Primary: 'Noto Sans KR', sans-serif (Google Fonts)
- Fallback: -apple-system, 'Malgun Gothic', sans-serif

**Hierarchy**:
- Main Hero Headline: text-5xl to text-6xl, font-bold (48-60px)
- Section Headings: text-3xl to text-4xl, font-bold (30-36px)
- Subsection Titles: text-xl to text-2xl, font-semibold (20-24px)
- Body Text: text-base to text-lg (16-18px), font-normal
- Small Text/Captions: text-sm (14px)
- CTA Buttons: text-lg, font-semibold (18px)

## Layout & Spacing System

**Container Widths**:
- Full-width sections: w-full
- Content containers: max-w-7xl mx-auto (1280px max)
- Text-focused areas: max-w-4xl

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Section padding: py-16 to py-24 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8, gap-12, gap-16
- Inner padding: p-6, p-8, p-12
- Margins: mb-4, mb-8, mb-12 for vertical rhythm

## Section-by-Section Layout

### Section 1: Hero Banner
- Full viewport height (min-h-screen) with large background image
- Centered content with max-w-4xl container
- Primary headline + subheadline + dual CTAs
- Logo placement: top-left or centered above headline
- Overlay treatment for text readability

### Section 2: Contact CTA
- Full-width banner style with prominent phone number and KakaoTalk ID
- Two-column layout on desktop (lg:grid-cols-2), stacked on mobile
- Large, clickable contact buttons with icons
- Sticky positioning option for mobile accessibility

### Section 3: Professional Credibility
- Centered text block with max-w-3xl
- Large, impactful statement with supporting paragraph
- Optional stats display (3-4 columns) showing key metrics

### Section 4: 9 Strengths ('왜 미스터홈클린 일까요?')
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each strength card with icon, heading, description
- Consistent card treatment with padding p-8
- Icon size: w-16 h-16 or w-12 h-12

### Section 5: Target Customers (4 Personas)
- Four-column grid on desktop (lg:grid-cols-4), 2 columns on tablet (md:grid-cols-2)
- Large illustrative icons above each persona
- Short, punchy headlines with brief descriptions
- Equal-height cards

### Section 6: Main Services (4 Services)
- Two-by-two grid (lg:grid-cols-2) or four-column (lg:grid-cols-4)
- Each service card with image, title, description, and "Learn More" link
- Image aspect ratio: 16:9 or 4:3
- Hover effects for interactivity

### Section 7: Detailed Work Scope Checklist
- Multi-column layout for different areas (주방, 화장실, 베란다, 창문)
- Checklist items with checkmark icons
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Clear visual grouping per area

### Section 8: Additional Costs (8 Items)
- Two or three-column grid (lg:grid-cols-2 or lg:grid-cols-3)
- Alert-style cards with warning icon
- Consistent formatting for all 8 scenarios
- Clear, scannable layout

### Section 9: Closing CTA
- Full-width section with centered content
- Large, motivational headline
- Repeated contact information with enhanced visibility
- Primary action button(s)

### Section 10: Footer
- Multi-column layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Company info, quick links, contact details, social media
- Small text for legal information
- Copyright notice at bottom

## Component Library

**Navigation Bar**:
- Sticky header with logo (left) and menu items (right)
- Horizontal menu: 홈클리닝, 오피스클리닉, 특수클리닉, 외창클리닉
- Mobile: Hamburger menu with slide-out drawer
- Height: h-16 to h-20

**Buttons**:
- Primary CTA: Prominent size (px-8 py-4), rounded-lg
- Secondary buttons: px-6 py-3, rounded-md
- Ghost/outline variants for less emphasis
- Icon + text combinations where appropriate
- Blurred backgrounds when overlaying images

**Cards**:
- Rounded corners: rounded-lg or rounded-xl
- Subtle shadows for depth
- Padding: p-6 to p-8
- Hover states: subtle scale transform or shadow increase

**Icons**:
- Use Heroicons via CDN for all standard icons
- Size: w-6 h-6 (standard), w-8 h-8 (medium), w-12 h-12 (large)
- Consistent stroke width throughout

**Forms** (Contact/Quote Forms):
- Full-width inputs with adequate spacing (mb-4 to mb-6)
- Labels above inputs
- Placeholder text for guidance
- Submit button: full-width on mobile, auto-width on desktop

## Images

**Hero Section**:
- Large, high-quality background image showing clean, bright interior or cleaning team in action
- Aspect ratio: 16:9 or wider
- Position: center or top-center
- Overlay: subtle gradient or semi-transparent layer for text readability

**Service Section Images**:
- Four images showing different cleaning scenarios (home, office, special, window cleaning)
- Aspect ratio: 4:3 or 1:1
- Professional photography with bright, clean environments

**Strength/Feature Icons**:
- Simple, line-based icons for the 9 strengths
- Consistent style across all icons
- Placeholder: <!-- ICON: [description] -->

**Target Customer Icons**:
- Four illustrative icons representing different customer types
- Friendly, approachable style

**Before/After Images** (if included):
- Side-by-side comparison layout
- Clear labeling
- Equal sizing

**Logo**:
- Header: medium size (h-8 to h-12)
- Footer: smaller version (h-6 to h-8)
- Maintain aspect ratio

## Interaction & Animation

**Minimal Animation Approach**:
- Smooth scroll behavior for anchor links
- Subtle fade-in on scroll for sections (optional)
- Button hover: slight scale or brightness change
- Card hover: gentle shadow increase
- NO complex animations or parallax effects

**Mobile Responsiveness**:
- Hamburger menu with smooth slide-in transition
- Collapsible sections for long content
- Touch-friendly button sizes (minimum 44x44px)
- Optimized image loading for mobile

## Accessibility

- Semantic HTML5 structure throughout
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- ARIA labels for icon-only buttons
- Sufficient contrast ratios for all text
- Keyboard navigation support
- Focus states visible on all interactive elements

## Content Strategy

- Korean language throughout with professional, trustworthy tone
- Short, scannable paragraphs
- Bullet points and checklists for easy comprehension
- Clear calls-to-action with action verbs
- Phone numbers and contact info prominently displayed multiple times
- Trust indicators: certifications, guarantees, direct operation messaging
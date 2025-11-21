# 미스터홈클린 Website

## Overview

This is a professional cleaning service website for 미스터홈클린 (Mister Home Clean), a premium cleaning company in South Korea. The application is built as a modern full-stack web application with a React frontend and Express backend. The site is designed to replicate the visual language and structure of 윤슬클린 (https://xn--sy2b97nbxdr4l.com/) while adapting all content for 미스터홈클린.

The primary purpose is to showcase the company's cleaning services, build credibility, and enable potential customers to submit consultation requests. The site emphasizes Korean typography (Noto Sans KR), professional presentation, and straightforward user interaction for service inquiries.

## Recent Changes

**November 21, 2025:**
- Implemented Netlify Functions for serverless deployment with Aligo SMS integration
  - Consultation form submissions trigger automatic SMS to owner's phone (070-7106-1658)
  - SMS contains all consultation details: name, phone, service type, and message
  - No database storage required - SMS serves as notification and record
  - Environment variables: ALIGO_API_KEY, ALIGO_USER_ID, ALIGO_SENDER, OWNER_PHONE
  - Cost: 8.4원 per SMS (Aligo API)
- Added comprehensive deployment guide (NETLIFY_DEPLOYMENT.md)
  - GitHub → Netlify deployment workflow
  - Environment variable configuration
  - Troubleshooting guide
- Strengths section updated: reduced from 9 to 6 cards
  - Removed: "본사 대표 직접 현장 투입", "24시간 상담 가능", "무료 부가 서비스"
  - Updated A/S card: "확실한 A/S 보증" with 14-day guarantee
- Work scope refined: "바닥 물걸레질" → "전체바닥청소" in 거실/방 card
- Review section CTA changed: "지금 바로 상담받기" button now directly calls 070-7106-1658

**November 18, 2024:**
- Transformed Customer Reviews section from grid to interactive slider
  - Slider displays one large review image at a time (max-w-2xl) with `object-contain` to prevent text cutoff
  - Previous/Next navigation buttons with keyboard arrow key support (Left/Right arrows)
  - 10 clickable indicator dots for direct navigation to any review
  - Click-to-enlarge modal shows full-size images in dialog (max-w-4xl)
  - Accessibility features: aria-labels on all controls, keyboard navigation (Enter/Space to open modal)
  - Images use white background to ensure full visibility of text content
  - Review counter displays current position (e.g., "3 / 10")
- Images converted to WebP format for faster loading (85% quality, 800x800px max)
- Positioned between Work Scope and Additional Costs sections
- Added "고객리뷰" navigation link in both desktop and mobile menus
- Integrated custom 미스터홈클린 logo (blue character with yellow stars design)
  - Logo displayed in header (h-14) and footer (h-10)
- All review images stored in `attached_assets/review-*.webp` format

## Website Structure

The site consists of 11 main sections:
1. **Hero Section**: Full-screen banner with call-to-action
2. **Contact CTA**: Phone and KakaoTalk contact buttons
3. **Professional Credibility**: Trust-building statement
4. **9 Strengths** (#strengths): Grid of company advantages
5. **Target Customers** (#personas): 4 customer profile cards
6. **Main Services** (#services): 4 service categories with images
7. **Work Scope** (#work-scope): Detailed cleaning checklist
8. **Customer Reviews** (#reviews): 10 before/after review images (WebP format)
9. **Additional Costs** (#pricing): 8 potential extra charges
10. **Closing CTA**: Final contact encouragement
11. **Footer**: Company information and links

## User Preferences

**Communication:**
- Preferred communication style: Simple, everyday language.

**Data Management:**
- Consultation data storage: NOT required
- SMS notification contains all necessary information
- User prefers to manage consultation requests manually via SMS
- No database persistence needed in production

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture

**UI Component System**
- shadcn/ui component library (New York style variant) based on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component aliases configured for clean imports (`@/components`, `@/lib`, `@/hooks`)
- Comprehensive UI component library including forms, dialogs, toasts, and data display components

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and API interactions
- React Hook Form with Zod validation for form handling
- Custom hooks for responsive behavior and toast notifications

**Design System**
- Custom Tailwind configuration with Korean design sensibilities
- Extended color system using HSL values with CSS variables for theming
- Custom spacing, border radius, and shadow tokens
- Typography system optimized for Korean text (Noto Sans KR font family)
- Reference-based design following established visual patterns from similar service websites

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- ESM (ES Modules) for modern JavaScript module system
- TypeScript for type safety across the stack

**API Design**
- RESTful API endpoints under `/api` namespace
- Consultation submission endpoint (`POST /api/consultations`)
- Consultation retrieval endpoints (`GET /api/consultations`, `GET /api/consultations/:id`)
- JSON request/response format with validation

**Data Validation**
- Zod schemas for runtime type validation on both client and server
- Shared schema definitions between frontend and backend via `shared/schema.ts`
- drizzle-zod integration for automatic schema generation from database models

**Development Features**
- Request/response logging middleware
- Vite integration for HMR in development
- Static file serving in production

### Data Storage

**Database Configuration**
- Drizzle ORM for type-safe database interactions
- PostgreSQL dialect configured (requires DATABASE_URL environment variable)
- Schema-first approach with migrations generated in `/migrations` directory

**Database Schema**
- **users table**: Simple authentication structure with username/password (currently unused in active features)
- **consultations table**: Stores customer consultation requests with fields for name, phone, service type, message, and creation timestamp
- UUID primary keys using PostgreSQL's gen_random_uuid()

**Storage Abstraction**
- IStorage interface defining data access methods
- MemStorage implementation for in-memory development/testing (currently active)
- Designed to be swappable with database-backed implementation

### External Dependencies

**Core Technologies**
- **Neon Database (@neondatabase/serverless)**: Serverless PostgreSQL driver for production database connectivity
- **Drizzle ORM (drizzle-orm, drizzle-kit)**: Type-safe ORM and migration toolkit
- **React Query (@tanstack/react-query)**: Server state management
- **React Hook Form & Zod**: Form validation and schema validation

**UI Framework**
- **Radix UI (@radix-ui/react-*)**: Unstyled, accessible component primitives for dialogs, dropdowns, forms, navigation, and more
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component patterns using Radix UI and Tailwind

**Build & Development Tools**
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type system for both frontend and backend
- **esbuild**: Backend bundler for production builds
- **PostCSS & Autoprefixer**: CSS processing

**Additional Libraries**
- **class-variance-authority (CVA)**: Component variant styling utility
- **clsx & tailwind-merge**: CSS class name utilities
- **cmdk**: Command palette component
- **date-fns**: Date manipulation
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library
- **nanoid**: Unique ID generation
- **vaul**: Drawer component primitives
- **Wouter**: Lightweight routing

**Fonts**
- Google Fonts integration for Noto Sans KR (Korean typography)

**Session Management**
- connect-pg-simple configured for PostgreSQL-backed sessions (infrastructure ready but authentication not actively implemented)

### Deployment Architecture

**Production Deployment (Netlify)**
- **Platform**: Netlify with Serverless Functions
- **Build Configuration**: Defined in `netlify.toml`
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`
  - Node.js version: 20
- **SMS Integration**: Aligo API for consultation notifications
  - Endpoint: `/.netlify/functions/consultations`
  - Sends SMS to owner's phone (070-7106-1658) with consultation details
  - Cost: 8.4원 per SMS
- **Environment Variables** (required):
  - `ALIGO_API_KEY`: Aligo API key for SMS service
  - `ALIGO_USER_ID`: Aligo user ID
  - `ALIGO_SENDER`: Sender phone number (07071061658, no hyphens)
  - `OWNER_PHONE`: Owner's phone number for receiving SMS (070-7106-1658)
  - `NODE_ENV`: Set to `production`
- **Data Persistence**: None - SMS-only notification system
  - Consultation submissions are validated but not stored
  - Owner receives SMS with all consultation details
  - Manual management of consultation requests

**Local Development**
- Express.js server on port 5000
- MemStorage for temporary data (lost on server restart)
- API routes under `/api` namespace
- Vite HMR for frontend development

**Routing Configuration**
- `/api/*` → Redirects to `/.netlify/functions/:splat` (Netlify production)
- `/*` → Redirects to `/index.html` (SPA routing support)

**Documentation**
- `NETLIFY_DEPLOYMENT.md`: Complete deployment guide with Aligo setup instructions
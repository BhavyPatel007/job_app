# DataMind Jobs - Professional Job Portal

## Overview

DataMind Jobs is a modern, full-stack job portal application built with React.js, Express.js, and PostgreSQL. The platform connects job seekers with employers through a professional, SEO-optimized interface designed for Google AdSense approval. It features comprehensive job search capabilities, application management, career resources through a blog system, and company profiles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React.js with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with Radix UI components for consistent, accessible design
- **Component Library**: Custom shadcn/ui components with extensive UI primitives
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for a robust Node.js server
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **File Upload**: Multer middleware for handling file uploads (resumes, cover letters, documents)
- **API Design**: RESTful API endpoints with proper error handling and validation
- **Development Setup**: Hot module replacement and runtime error overlay for development

### Database Design
- **Primary Database**: PostgreSQL with proper relational schema design
- **Key Tables**: Users, Companies, Jobs, Job Applications, Blog Posts, Contact Messages
- **Relationships**: Proper foreign key relationships between entities
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Connection**: Neon serverless PostgreSQL with WebSocket support

### Authentication & Authorization
- **Session-Based Auth**: Server-side sessions stored in PostgreSQL
- **User Management**: Basic user registration and login system
- **Security**: Proper password handling and session management

### File Management
- **Upload Handling**: Local file system storage for uploaded documents
- **File Validation**: Type and size restrictions for security
- **Supported Formats**: PDF, DOC, DOCX, and image files for resumes and portfolios

### SEO & Performance Optimization
- **Meta Tags**: Proper HTML meta structure for search engine optimization
- **AdSense Ready**: Designated advertisement spaces throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Performance**: Optimized bundle sizes and lazy loading capabilities

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React
- **drizzle-orm**: Type-safe ORM for PostgreSQL operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database

### UI and Styling
- **@radix-ui/***: Comprehensive collection of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### Form and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **eslint**: Code linting and quality enforcement
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

### Database and Backend
- **express**: Web application framework for Node.js
- **multer**: File upload middleware
- **connect-pg-simple**: PostgreSQL session store
- **ws**: WebSocket library for database connections

### Utilities
- **date-fns**: Date manipulation and formatting
- **embla-carousel-react**: Carousel component for featured content
- **cmdk**: Command palette component
- **nanoid**: Unique ID generation

The application is designed as a monorepo with shared types and schemas between frontend and backend, ensuring type safety across the entire stack. The architecture supports scalability with proper separation of concerns and modular component design.
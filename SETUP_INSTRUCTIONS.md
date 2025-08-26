# DataMind Jobs - Setup & Run Instructions

## Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Database (Already Done in Replit)
The PostgreSQL database is already configured and seeded with sample data in this Replit environment.

### Step 3: Run the Project

#### Option A: Using npm run dev (Recommended)
```bash
npm run dev
```

#### Option B: If you get NODE_ENV error on Windows
If you see the error `'NODE_ENV' is not recognized as an internal or external command`, run:
```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

### Step 4: Access the Website
Once running, the website will be available at:
- **Development**: `http://localhost:5000`
- **In Replit**: Click the browser preview or use the provided URL

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema changes
npm run db:push

# Seed database with sample data
npm run db:seed

# Type checking
npm check
```

## Project Features

### ✅ Complete Job Portal
- **Job Search & Filtering**: Search by keywords, location, job type, salary range
- **Job Applications**: Upload resume, cover letter, and certificates
- **Company Profiles**: Detailed company information and job listings
- **Blog System**: Career advice and professional development content

### ✅ Professional Design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design suitable for Google AdSense
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **AdSense Ready**: Designated advertisement spaces throughout

### ✅ Technical Stack
- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **File Upload**: Multer for handling resumes and documents
- **Forms**: React Hook Form with Zod validation

## Sample Data Included

The database is pre-populated with:
- **5 Companies**: TechCorp Solutions, DataMind Analytics, etc.
- **6 Job Listings**: Various positions from entry to senior level
- **5 Blog Posts**: Career tips, resume advice, networking strategies

## File Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and types
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── seed.ts            # Sample data seeding
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── uploads/               # File upload directory
```

## Key Pages

1. **Home** (`/`) - Hero section with job search and featured jobs
2. **Jobs** (`/jobs`) - All job listings with advanced filtering
3. **Job Details** (`/jobs/:id`) - Individual job information
4. **Apply** (`/jobs/:id/apply`) - Job application form
5. **Blog** (`/blog`) - Career advice and resources
6. **About** (`/about`) - Company information and mission
7. **Contact** (`/contact`) - Contact form and information

## API Endpoints

- `GET /api/jobs` - Get all jobs with filtering
- `GET /api/jobs/featured` - Get featured jobs
- `GET /api/jobs/:id` - Get specific job details
- `POST /api/jobs/:id/apply` - Submit job application
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get specific blog post
- `GET /api/companies` - Get all companies
- `POST /api/contact` - Submit contact form

## Environment Variables

The following environment variables are automatically configured in Replit:
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGUSER` - Database username
- `PGPASSWORD` - Database password
- `PGDATABASE` - Database name

## Troubleshooting

### Common Issues

1. **NODE_ENV Error on Windows**
   - Solution: Use `npx cross-env NODE_ENV=development tsx server/index.ts`

2. **Database Connection Error**
   - Check if PostgreSQL is running
   - Verify environment variables are set

3. **File Upload Issues**
   - Ensure `uploads/` directory exists
   - Check file permissions

4. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run check`

### Development Tips

- **Hot Reload**: Changes to frontend code automatically reload the browser
- **API Changes**: Server restarts automatically when backend code changes
- **Database Changes**: Run `npm run db:push` after schema modifications
- **Add Sample Data**: Run `npm run db:seed` to add more sample data

## Production Deployment

### Replit Deployment (Recommended)
1. Click "Deploy" in Replit
2. Your app will be automatically deployed with a `.replit.app` domain
3. Database and environment variables are automatically configured

### Manual Deployment
1. Build the project: `npm run build`
2. Set production environment variables
3. Run: `npm start`
4. Ensure PostgreSQL is available in production

## AdSense Integration

The website is designed for Google AdSense approval with:
- **Professional Design**: Clean, user-friendly interface
- **Quality Content**: Career advice blog with original content
- **Proper Navigation**: Clear site structure and navigation
- **Mobile Responsive**: Works perfectly on all devices
- **Ad Spaces**: Designated areas for advertisements
- **Privacy Policy**: Ready for privacy policy pages

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure database is running and accessible
4. Check that all environment variables are set correctly

## Next Steps

1. **Customize Content**: Replace sample data with your actual content
2. **Add Your Branding**: Update colors, logos, and company information
3. **Configure Analytics**: Add Google Analytics tracking
4. **Set Up AdSense**: Apply for Google AdSense once content is finalized
5. **Add More Features**: Implement user authentication, admin panel, etc.

## Success! 🎉

Your professional job portal is now ready to use. The website includes all essential features for a modern job board and is optimized for both user experience and search engine visibility.
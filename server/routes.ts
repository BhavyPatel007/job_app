import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobApplicationSchema, insertContactMessageSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and images are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Jobs endpoints
  app.get("/api/jobs", async (req, res) => {
    try {
      const { 
        search, 
        location, 
        type, 
        experienceLevel, 
        salaryMin, 
        salaryMax, 
        limit = "20", 
        offset = "0" 
      } = req.query;

      const filters = {
        search: search as string,
        location: location as string,
        type: type as string,
        experienceLevel: experienceLevel as string,
        salaryMin: salaryMin ? parseInt(salaryMin as string) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax as string) : undefined,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string)
      };

      const jobs = await storage.getJobs(filters);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const { limit = "6" } = req.query;
      const jobs = await storage.getFeaturedJobs(parseInt(limit as string));
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching featured jobs:", error);
      res.status(500).json({ error: "Failed to fetch featured jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  // Job applications endpoint
  app.post("/api/jobs/:jobId/apply", upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
    { name: 'additionalFiles', maxCount: 5 }
  ]), async (req, res) => {
    try {
      const jobId = req.params.jobId;
      
      // Verify job exists
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      // Process uploaded files
      const resumeUrl = files.resume?.[0]?.filename || undefined;
      const coverLetterUrl = files.coverLetter?.[0]?.filename || undefined;
      const additionalFiles = files.additionalFiles?.map(file => file.filename) || [];

      const applicationData = {
        ...req.body,
        jobId,
        resumeUrl,
        coverLetterUrl,
        additionalFiles
      };

      const validatedData = insertJobApplicationSchema.parse(applicationData);
      const application = await storage.createJobApplication(validatedData);
      
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating job application:", error);
      res.status(400).json({ error: "Failed to create job application" });
    }
  });

  // Serve uploaded files
  app.get("/api/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });

  // Blog endpoints
  app.get("/api/blog", async (req, res) => {
    try {
      const { limit = "20", offset = "0" } = req.query;
      const posts = await storage.getBlogPosts(
        parseInt(limit as string), 
        parseInt(offset as string)
      );
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Companies endpoint
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  // Contact endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(400).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

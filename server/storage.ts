import { 
  companies, 
  jobs, 
  jobApplications, 
  blogPosts, 
  contactMessages,
  type Company, 
  type InsertCompany,
  type Job, 
  type InsertJob,
  type JobApplication, 
  type InsertJobApplication,
  type BlogPost, 
  type InsertBlogPost,
  type ContactMessage, 
  type InsertContactMessage,
  type JobWithCompany,
  type User,
  type InsertUser,
  users
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Company methods
  getCompanies(): Promise<Company[]>;
  getCompany(id: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Job methods
  getJobs(filters?: {
    search?: string;
    location?: string;
    type?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    limit?: number;
    offset?: number;
  }): Promise<JobWithCompany[]>;
  getJob(id: string): Promise<JobWithCompany | undefined>;
  getFeaturedJobs(limit?: number): Promise<JobWithCompany[]>;
  createJob(job: InsertJob): Promise<Job>;

  // Job application methods
  getJobApplications(jobId?: string): Promise<JobApplication[]>;
  getJobApplication(id: string): Promise<JobApplication | undefined>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;

  // Blog methods
  getBlogPosts(limit?: number, offset?: number): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;

  // Contact methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Company methods
  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(desc(companies.createdAt));
  }

  async getCompany(id: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const [newCompany] = await db
      .insert(companies)
      .values(company)
      .returning();
    return newCompany;
  }

  // Job methods
  async getJobs(filters?: {
    search?: string;
    location?: string;
    type?: string;
    experienceLevel?: string;
    salaryMin?: number;
    salaryMax?: number;
    limit?: number;
    offset?: number;
  }): Promise<JobWithCompany[]> {
    let query = db
      .select()
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(jobs.isActive, true));

    const conditions = [eq(jobs.isActive, true)];

    if (filters?.search) {
      conditions.push(
        sql`(${ilike(jobs.title, `%${filters.search}%`)} OR ${ilike(jobs.description, `%${filters.search}%`)})`
      );
    }

    if (filters?.location) {
      conditions.push(ilike(jobs.location, `%${filters.location}%`));
    }

    if (filters?.type) {
      conditions.push(eq(jobs.type, filters.type));
    }

    if (filters?.experienceLevel) {
      conditions.push(eq(jobs.experienceLevel, filters.experienceLevel));
    }

    if (filters?.salaryMin) {
      conditions.push(gte(jobs.salaryMin, filters.salaryMin));
    }

    if (filters?.salaryMax) {
      conditions.push(lte(jobs.salaryMax, filters.salaryMax));
    }

    if (conditions.length > 1) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(jobs.postedAt));

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    const results = await query;

    return results.map(result => ({
      ...result.jobs,
      company: result.companies!
    }));
  }

  async getJob(id: string): Promise<JobWithCompany | undefined> {
    const [result] = await db
      .select()
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(and(eq(jobs.id, id), eq(jobs.isActive, true)));

    if (!result) return undefined;

    return {
      ...result.jobs,
      company: result.companies!
    };
  }

  async getFeaturedJobs(limit = 6): Promise<JobWithCompany[]> {
    const results = await db
      .select()
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.postedAt))
      .limit(limit);

    return results.map(result => ({
      ...result.jobs,
      company: result.companies!
    }));
  }

  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db
      .insert(jobs)
      .values(job)
      .returning();
    return newJob;
  }

  // Job application methods
  async getJobApplications(jobId?: string): Promise<JobApplication[]> {
    let query = db.select().from(jobApplications);
    
    if (jobId) {
      query = query.where(eq(jobApplications.jobId, jobId));
    }

    return await query.orderBy(desc(jobApplications.appliedAt));
  }

  async getJobApplication(id: string): Promise<JobApplication | undefined> {
    const [application] = await db.select().from(jobApplications).where(eq(jobApplications.id, id));
    return application || undefined;
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const [newApplication] = await db
      .insert(jobApplications)
      .values(application)
      .returning();
    return newApplication;
  }

  // Blog methods
  async getBlogPosts(limit = 20, offset = 0): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(
      and(eq(blogPosts.id, id), eq(blogPosts.isPublished, true))
    );
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(
      and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true))
    );
    return post || undefined;
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(blogPost)
      .returning();
    return newPost;
  }

  // Contact methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();

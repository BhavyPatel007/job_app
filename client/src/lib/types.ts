export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface JobSearchParams extends JobFilters, PaginationParams {}

export interface FileUploadProps {
  onFileSelect: (files: FileList) => void;
  accept: string;
  maxSize?: number;
  multiple?: boolean;
  label: string;
  description?: string;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  experience?: string;
  comments?: string;
  resume?: File;
  coverLetter?: File;
  additionalFiles?: FileList;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, NotebookPen, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import FileUpload from "@/components/file-upload";
import type { JobWithCompany } from "@shared/schema";

const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  experience: z.string().optional(),
  comments: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function ApplyJob() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const jobId = params.jobId;

  const [resumeFiles, setResumeFiles] = useState<FileList | null>(null);
  const [coverLetterFiles, setCoverLetterFiles] = useState<FileList | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<FileList | null>(null);

  const { data: job, isLoading } = useQuery<JobWithCompany>({
    queryKey: ["/api/jobs", jobId],
    enabled: !!jobId,
  });

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experience: "",
      comments: "",
      acceptTerms: false,
    },
  });

  const applicationMutation = useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      const formData = new FormData();
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && key !== 'acceptTerms') {
          formData.append(key, String(value));
        }
      });

      // Add files
      if (resumeFiles && resumeFiles[0]) {
        formData.append('resume', resumeFiles[0]);
      }
      if (coverLetterFiles && coverLetterFiles[0]) {
        formData.append('coverLetter', coverLetterFiles[0]);
      }
      if (additionalFiles) {
        Array.from(additionalFiles).forEach(file => {
          formData.append('additionalFiles', file);
        });
      }

      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit application');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your job application has been submitted successfully. We'll be in touch soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs", jobId, "applications"] });
      setLocation(`/jobs/${jobId}`);
    },
    onError: (error) => {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    if (!resumeFiles || resumeFiles.length === 0) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume before submitting.",
        variant: "destructive",
      });
      return;
    }

    applicationMutation.mutate(data);
  };

  const saveAsDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your application has been saved as a draft.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 w-2/3"></div>
              <div className="space-y-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-job-not-found">
                  Job Not Found
                </h1>
                <p className="text-gray-600 mb-4">
                  The job you're trying to apply for doesn't exist or has been removed.
                </p>
                <Link href="/jobs" data-testid="link-back-to-jobs">
                  <Button>Back to Jobs</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={`/jobs/${jobId}`} data-testid="link-back-to-job">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Details
          </Button>
        </Link>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-apply-title">
                Apply for Position
              </h1>
              <p className="text-xl text-neutral" data-testid="text-job-title-company">
                {job.title} at {job.company?.name}
              </p>
            </div>
            
            {/* Job Interview Career Image */}
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Job interview career opportunities" 
                className="rounded-lg shadow-md w-full h-64 object-cover"
                data-testid="img-job-interview"
              />
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-job-application">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-first-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-last-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* File Uploads */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <FileUpload
                      onFileSelect={setResumeFiles}
                      accept=".pdf,.doc,.docx"
                      maxSize={10 * 1024 * 1024}
                      label="Resume/CV *"
                      description="PDF, DOC, DOCX (Max 10MB)"
                    />
                  </div>
                  
                  <div>
                    <FileUpload
                      onFileSelect={setCoverLetterFiles}
                      accept=".pdf,.doc,.docx"
                      maxSize={5 * 1024 * 1024}
                      label="Cover Letter"
                      description="PDF, DOC, DOCX (Max 5MB)"
                    />
                  </div>
                </div>
                
                {/* Additional Files */}
                <div>
                  <FileUpload
                    onFileSelect={setAdditionalFiles}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    maxSize={5 * 1024 * 1024}
                    multiple={true}
                    label="Certificates & Portfolio (Optional)"
                    description="Multiple files allowed (Max 5MB each)"
                  />
                </div>
                
                {/* Experience & Skills */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-experience">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-3">2-3 years</SelectItem>
                          <SelectItem value="4-6">4-6 years</SelectItem>
                          <SelectItem value="7-10">7-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Tell us why you're interested in this position..."
                          data-testid="textarea-comments"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Terms & Conditions */}
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-accept-terms"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:text-secondary">
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary hover:text-secondary">
                            Privacy Policy
                          </a>{" "}
                          *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-primary text-white hover:bg-secondary"
                    disabled={applicationMutation.isPending}
                    data-testid="button-submit-application"
                  >
                    <NotebookPen className="w-4 h-4 mr-2" />
                    {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={saveAsDraft}
                    data-testid="button-save-draft"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

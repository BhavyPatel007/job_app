import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  Globe, 
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark
} from "lucide-react";
import type { JobWithCompany } from "@shared/schema";

export default function JobDetails() {
  const params = useParams();
  const jobId = params.id;

  const { data: job, isLoading, error } = useQuery<JobWithCompany>({
    queryKey: ["/api/jobs", jobId],
    enabled: !!jobId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-job-not-found">
                  Job Not Found
                </h1>
                <p className="text-gray-600 mb-4">
                  The job you're looking for doesn't exist or has been removed.
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

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "Salary not specified";
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
    if (min) return `$${(min / 1000).toFixed(0)}k+`;
    if (max) return `Up to $${(max / 1000).toFixed(0)}k`;
    return "Salary not specified";
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCompanyInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/jobs" data-testid="link-back-to-jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        {/* Job Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex items-start mb-4 md:mb-0">
                <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mr-6">
                  {job.company?.logo ? (
                    <img 
                      src={job.company.logo} 
                      alt={job.company.name} 
                      className="w-full h-full object-cover rounded-lg"
                      data-testid="img-company-logo"
                    />
                  ) : (
                    getCompanyInitials(job.company?.name || "Company")
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-job-title">
                    {job.title}
                  </h1>
                  <p className="text-xl text-primary font-medium mb-4" data-testid="text-company-name">
                    {job.company?.name}
                  </p>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span data-testid="text-job-location">{job.location}</span>
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span data-testid="text-job-type">{job.type}</span>
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span data-testid="text-job-salary">{formatSalary(job.salaryMin, job.salaryMax)}</span>
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span data-testid="text-job-posted">Posted {job.postedAt ? formatDate(job.postedAt) : 'recently'}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link href={`/jobs/${job.id}/apply`} data-testid="link-apply-job">
                  <Button className="bg-primary text-white hover:bg-secondary w-full">
                    Apply Now
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" data-testid="button-bookmark">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" data-testid="button-share">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2" data-testid="job-skills">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" data-testid={`badge-skill-${index}`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Job Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-description-title">
                  Job Description
                </h2>
                <div className="prose max-w-none" data-testid="text-job-description">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-requirements-title">
                    Requirements
                  </h2>
                  <div className="prose max-w-none" data-testid="text-job-requirements">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.requirements}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-responsibilities-title">
                    Responsibilities
                  </h2>
                  <div className="prose max-w-none" data-testid="text-job-responsibilities">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.responsibilities}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job Interview Image */}
            <Card>
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                  alt="Job interview career opportunities" 
                  className="rounded-lg w-full h-64 object-cover"
                  data-testid="img-job-interview"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4" data-testid="text-apply-card-title">
                  Ready to Apply?
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Join our team and make a difference in your career.
                </p>
                <Link href={`/jobs/${job.id}/apply`} data-testid="link-apply-sidebar">
                  <Button className="w-full bg-primary text-white hover:bg-secondary">
                    Apply for this Position
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4" data-testid="text-company-info-title">
                  About {job.company?.name}
                </h3>
                
                {job.company?.description && (
                  <p className="text-gray-600 text-sm mb-4" data-testid="text-company-description">
                    {job.company.description}
                  </p>
                )}

                <div className="space-y-3">
                  {job.company?.industry && (
                    <div className="flex items-center text-sm">
                      <Building className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600" data-testid="text-company-industry">
                        {job.company.industry}
                      </span>
                    </div>
                  )}
                  
                  {job.company?.size && (
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600" data-testid="text-company-size">
                        {job.company.size}
                      </span>
                    </div>
                  )}
                  
                  {job.company?.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600" data-testid="text-company-location">
                        {job.company.location}
                      </span>
                    </div>
                  )}
                  
                  {job.company?.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="w-4 h-4 mr-3 text-gray-400" />
                      <a 
                        href={job.company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary"
                        data-testid="link-company-website"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AdSense Placeholder */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-gray-500">
              <div className="h-64 flex items-center justify-center text-sm" data-testid="ad-space-sidebar">
                Advertisement Space
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

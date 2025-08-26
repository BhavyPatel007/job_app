import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { JobWithCompany } from "@shared/schema";

interface JobCardProps {
  job: JobWithCompany;
  variant?: "featured" | "list";
}

export default function JobCard({ job, variant = "featured" }: JobCardProps) {
  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "Salary not specified";
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
    if (min) return `$${(min / 1000).toFixed(0)}k+`;
    if (max) return `Up to $${(max / 1000).toFixed(0)}k`;
    return "Salary not specified";
  };

  const getCompanyInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Posted 1 day ago";
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Posted ${Math.ceil(diffDays / 30)} months ago`;
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-accent text-white';
      case 'part-time':
        return 'bg-secondary text-white';
      case 'contract':
        return 'bg-purple-500 text-white';
      case 'remote':
        return 'bg-secondary text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (variant === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow" data-testid={`card-job-${job.id}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-start mb-4 md:mb-0">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                {job.company?.logo ? (
                  <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  getCompanyInitials(job.company?.name || "Company")
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1" data-testid={`text-job-title-${job.id}`}>
                  {job.title}
                </h3>
                <p className="text-primary font-medium mb-2" data-testid={`text-company-${job.id}`}>
                  {job.company?.name}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-neutral">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span data-testid={`text-location-${job.id}`}>{job.location}</span>
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span data-testid={`text-type-${job.id}`}>{job.type}</span>
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span data-testid={`text-salary-${job.id}`}>{formatSalary(job.salaryMin, job.salaryMax)}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <Link href={`/jobs/${job.id}`} data-testid={`link-view-job-${job.id}`}>
                <Button className="bg-primary text-white hover:bg-secondary mb-2">
                  View Job
                </Button>
              </Link>
              <p className="text-sm text-neutral" data-testid={`text-posted-date-${job.id}`}>
                {job.postedAt ? formatDate(job.postedAt) : 'Recently posted'}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 mt-4 line-clamp-2" data-testid={`text-description-${job.id}`}>
            {job.description}
          </p>
          
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-skill-${job.id}-${index}`}>
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`card-featured-job-${job.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold mr-3">
              {job.company?.logo ? (
                <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                getCompanyInitials(job.company?.name || "Company")
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900" data-testid={`text-company-${job.id}`}>
                {job.company?.name}
              </h3>
              <p className="text-sm text-neutral" data-testid={`text-location-${job.id}`}>
                {job.location}
              </p>
            </div>
          </div>
          <Badge className={`text-xs px-2 py-1 ${getTypeColor(job.type)}`} data-testid={`badge-type-${job.id}`}>
            {job.type}
          </Badge>
        </div>
        
        <h4 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`text-title-${job.id}`}>
          {job.title}
        </h4>
        <p className="text-neutral mb-4 line-clamp-3" data-testid={`text-description-${job.id}`}>
          {job.description}
        </p>
        
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-skill-${job.id}-${index}`}>
                {skill}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold" data-testid={`text-salary-${job.id}`}>
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
          <Link href={`/jobs/${job.id}`} data-testid={`link-view-details-${job.id}`}>
            <Button variant="ghost" className="text-primary hover:text-secondary p-0">
              View Details <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

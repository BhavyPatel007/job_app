import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import JobCard from "@/components/job-card";
import type { JobWithCompany } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const { data: featuredJobs, isLoading } = useQuery<JobWithCompany[]>({
    queryKey: ["/api/jobs/featured"],
  });

  const handleJobSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (searchLocation) params.set("location", searchLocation);
    window.location.href = `/jobs?${params.toString()}`;
  };

  const stats = {
    jobsPosted: "5,000+",
    companiesServed: "500+",
    candidatesPlaced: "15,000+"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
                Find Your Dream Career Today
              </h1>
              <p className="text-xl mb-8 opacity-90" data-testid="text-hero-subtitle">
                Connect with top employers and discover professional opportunities that match your skills and aspirations.
              </p>
              
              {/* Job Search Form */}
              <Card className="bg-white p-6 shadow-xl">
                <form onSubmit={handleJobSearch} className="flex flex-col md:flex-row gap-4" data-testid="form-job-search">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Job title, keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                      data-testid="input-search-query"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full"
                      data-testid="input-search-location"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-secondary text-white px-8 py-3"
                    data-testid="button-search-jobs"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Jobs
                  </Button>
                </form>
              </Card>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional office workplace" 
                className="rounded-lg shadow-2xl w-full h-auto"
                data-testid="img-hero-workplace"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-featured-jobs-title">
              Featured Job Opportunities
            </h2>
            <p className="text-xl text-neutral" data-testid="text-featured-jobs-subtitle">
              Discover hand-picked career opportunities from top companies
            </p>
          </div>
          
          {/* AdSense Placeholder */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-12 text-center text-gray-500">
            <div className="h-20 flex items-center justify-center text-sm" data-testid="ad-space-featured">
              Advertisement Space
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse" data-testid={`skeleton-job-${i}`}>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-featured-jobs">
              {featuredJobs?.map((job) => (
                <JobCard key={job.id} job={job} variant="featured" />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/jobs" data-testid="link-view-all-jobs">
              <Button className="bg-primary text-white px-8 py-3 hover:bg-secondary">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="text-about-title">
                About DataMind Jobs
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-testid="text-about-description">
                DataMind Jobs is your trusted partner in professional career development. We connect talented individuals with leading companies, creating opportunities that transform careers and businesses alike.
              </p>
              <p className="text-gray-600 mb-6" data-testid="text-about-mission">
                Since our founding, we've helped thousands of professionals find their ideal roles while assisting companies in building exceptional teams. Our platform combines cutting-edge technology with personalized service to deliver results that matter.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8" data-testid="stats-container">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-jobs-posted">
                    {stats.jobsPosted}
                  </div>
                  <div className="text-sm text-neutral">Jobs Posted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-companies-served">
                    {stats.companiesServed}
                  </div>
                  <div className="text-sm text-neutral">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-candidates-placed">
                    {stats.candidatesPlaced}
                  </div>
                  <div className="text-sm text-neutral">Candidates Hired</div>
                </div>
              </div>
              
              {/* Mission Points */}
              <div className="space-y-4" data-testid="mission-points">
                <div className="flex items-start">
                  <CheckCircle className="text-accent text-xl mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quality First</h4>
                    <p className="text-gray-600 text-sm">We carefully vet all job postings and companies to ensure legitimate opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-accent text-xl mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Personal Support</h4>
                    <p className="text-gray-600 text-sm">Our team provides personalized guidance throughout your job search journey.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-accent text-xl mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Industry Expertise</h4>
                    <p className="text-gray-600 text-sm">Deep knowledge across multiple industries and career levels.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team meeting and collaboration" 
                className="rounded-lg shadow-lg w-full h-auto"
                data-testid="img-about-team"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

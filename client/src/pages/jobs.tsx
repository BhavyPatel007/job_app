import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import JobCard from "@/components/job-card";
import type { JobWithCompany } from "@shared/schema";
import type { JobFilters } from "@/lib/types";

export default function Jobs() {
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const { data: jobs, isLoading } = useQuery<JobWithCompany[]>({
    queryKey: ["/api/jobs", {
      ...filters,
      search: searchQuery,
      location: searchLocation,
      limit,
      offset: (currentPage - 1) * limit
    }],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      location: searchLocation
    }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof JobFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const handleJobTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({ ...prev, type }));
    } else {
      setFilters(prev => ({ ...prev, type: undefined }));
    }
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setSearchQuery("");
    setSearchLocation("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
            All Job Listings
          </h1>
          <p className="text-xl text-neutral" data-testid="text-page-subtitle">
            Browse through all available positions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900" data-testid="text-filter-title">Filter Jobs</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} data-testid="button-reset-filters">
                    Reset
                  </Button>
                </div>
                
                {/* Job Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {[
                      { id: "full-time", label: "Full-time" },
                      { id: "part-time", label: "Part-time" },
                      { id: "contract", label: "Contract" },
                      { id: "remote", label: "Remote" }
                    ].map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={filters.type === type.id}
                          onCheckedChange={(checked) => handleJobTypeChange(type.id, checked as boolean)}
                          data-testid={`checkbox-${type.id}`}
                        />
                        <label htmlFor={type.id} className="text-sm text-gray-600 cursor-pointer">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Salary Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Salary Range</h4>
                  <Select onValueChange={(value) => {
                    if (value === "0-50k") {
                      handleFilterChange("salaryMin", "0");
                      handleFilterChange("salaryMax", "50000");
                    } else if (value === "50k-75k") {
                      handleFilterChange("salaryMin", "50000");
                      handleFilterChange("salaryMax", "75000");
                    } else if (value === "75k-100k") {
                      handleFilterChange("salaryMin", "75000");
                      handleFilterChange("salaryMax", "100000");
                    } else if (value === "100k+") {
                      handleFilterChange("salaryMin", "100000");
                      handleFilterChange("salaryMax", undefined);
                    } else {
                      handleFilterChange("salaryMin", undefined);
                      handleFilterChange("salaryMax", undefined);
                    }
                  }} data-testid="select-salary-range">
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="0-50k">$0 - $50k</SelectItem>
                      <SelectItem value="50k-75k">$50k - $75k</SelectItem>
                      <SelectItem value="75k-100k">$75k - $100k</SelectItem>
                      <SelectItem value="100k+">$100k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Experience Level */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {[
                      { id: "entry", label: "Entry Level" },
                      { id: "mid", label: "Mid Level" },
                      { id: "senior", label: "Senior Level" }
                    ].map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={level.id}
                          name="experience"
                          value={level.id}
                          checked={filters.experienceLevel === level.id}
                          onChange={(e) => handleFilterChange("experienceLevel", e.target.value)}
                          className="text-primary focus:ring-primary"
                          data-testid={`radio-${level.id}`}
                        />
                        <label htmlFor={level.id} className="text-sm text-gray-600 cursor-pointer">
                          {level.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary text-white hover:bg-secondary"
                  onClick={() => setCurrentPage(1)}
                  data-testid="button-apply-filters"
                >
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Job Results */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4" data-testid="form-job-search">
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    data-testid="input-search-jobs"
                  />
                  <Input
                    type="text"
                    placeholder="Location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="flex-1"
                    data-testid="input-search-location"
                  />
                  <Button type="submit" className="bg-primary text-white hover:bg-secondary" data-testid="button-search">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Job Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600" data-testid="text-results-count">
                Showing {jobs?.length || 0} jobs
              </p>
              <Select value={sortOrder} onValueChange={setSortOrder} data-testid="select-sort-order">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* AdSense Placeholder */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 text-center text-gray-500">
              <div className="h-20 flex items-center justify-center text-sm" data-testid="ad-space-jobs">
                Advertisement Space
              </div>
            </div>
            
            {/* Job Listings */}
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse" data-testid={`skeleton-job-${i}`}>
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6" data-testid="job-listings">
                {jobs?.map((job) => (
                  <JobCard key={job.id} job={job} variant="list" />
                ))}
                
                {jobs?.length === 0 && (
                  <div className="text-center py-12" data-testid="no-jobs-message">
                    <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
                    <Button onClick={resetFilters} variant="outline" className="mt-4" data-testid="button-clear-filters">
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Pagination */}
            {jobs && jobs.length >= limit && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2" data-testid="pagination">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    data-testid="button-previous-page"
                  >
                    Previous
                  </Button>
                  <Button variant="outline" className="bg-primary text-white" data-testid="text-current-page">
                    {currentPage}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={jobs.length < limit}
                    data-testid="button-next-page"
                  >
                    Next
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

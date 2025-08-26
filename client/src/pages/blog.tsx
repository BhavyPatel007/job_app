import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";
import type { BlogPost } from "@shared/schema";
import { useState } from "react";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { limit, offset: (currentPage - 1) * limit }],
  });

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-blog-title">
            Career Insights & Resources
          </h1>
          <p className="text-xl text-neutral" data-testid="text-blog-subtitle">
            Expert advice and tips to advance your career
          </p>
        </div>
        
        {/* AdSense Placeholder */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-12 text-center text-gray-500">
          <div className="h-20 flex items-center justify-center text-sm" data-testid="ad-space-blog">
            Advertisement Space
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse" data-testid={`skeleton-blog-${i}`}>
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 ml-2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-blog-posts">
              {blogPosts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {blogPosts?.length === 0 && (
              <div className="text-center py-12" data-testid="no-blog-posts">
                <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
                <p className="text-gray-600">Check back soon for new career insights and tips!</p>
              </div>
            )}

            {/* Pagination */}
            {blogPosts && blogPosts.length >= limit && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2" data-testid="blog-pagination">
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
                    disabled={blogPosts.length < limit}
                    data-testid="button-next-page"
                  >
                    Next
                  </Button>
                </nav>
              </div>
            )}

            {/* Additional AdSense space at bottom */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mt-12 text-center text-gray-500">
              <div className="h-20 flex items-center justify-center text-sm" data-testid="ad-space-blog-bottom">
                Advertisement Space
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

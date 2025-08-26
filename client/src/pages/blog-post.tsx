import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2, Bookmark } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-post-not-found">
                  Blog Post Not Found
                </h1>
                <p className="text-gray-600 mb-4">
                  The blog post you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/blog" data-testid="link-back-to-blog">
                  <Button>Back to Blog</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getAuthorInitials = (author: string) => {
    return author
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'career tips':
        return 'bg-primary text-white';
      case 'resume tips':
        return 'bg-accent text-white';
      case 'remote work':
        return 'bg-secondary text-white';
      case 'networking':
        return 'bg-purple-500 text-white';
      case 'interview tips':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog" data-testid="link-back-to-blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Blog Post Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                data-testid="img-featured"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${getCategoryColor(post.category)}`} data-testid="badge-category">
                  {post.category}
                </Badge>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Title and Meta */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span data-testid="text-date">{post.publishedAt ? formatDate(post.publishedAt) : 'Recently published'}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span data-testid="text-author">{post.author}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-medium mr-4">
                    {post.authorAvatar ? (
                      <img 
                        src={post.authorAvatar} 
                        alt={post.author}
                        className="w-full h-full object-cover rounded-full"
                        data-testid="img-author-avatar"
                      />
                    ) : (
                      getAuthorInitials(post.author)
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900" data-testid="text-author-name">
                      {post.author}
                    </p>
                    <p className="text-sm text-gray-600">Author</p>
                  </div>
                </div>
                
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

            {/* Content */}
            <div className="prose max-w-none">
              <div className="text-xl text-gray-700 mb-8 font-medium" data-testid="text-excerpt">
                {post.excerpt}
              </div>
              
              <div className="text-gray-700 leading-relaxed whitespace-pre-line" data-testid="text-content">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2" data-testid="post-tags">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" data-testid={`badge-tag-${index}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* AdSense Placeholder */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mt-8 text-center text-gray-500">
          <div className="h-20 flex items-center justify-center text-sm" data-testid="ad-space">
            Advertisement Space
          </div>
        </div>

        {/* Back to Blog */}
        <div className="text-center mt-12">
          <Link href="/blog" data-testid="link-more-articles">
            <Button className="bg-primary text-white hover:bg-secondary">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

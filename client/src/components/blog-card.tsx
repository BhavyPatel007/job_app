import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow overflow-hidden" data-testid={`card-blog-${post.id}`}>
      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-48 object-cover"
          data-testid={`img-blog-featured-${post.id}`}
        />
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge className={`text-xs px-2 py-1 ${getCategoryColor(post.category)}`} data-testid={`badge-category-${post.id}`}>
            {post.category}
          </Badge>
          <span className="text-sm text-neutral ml-2" data-testid={`text-date-${post.id}`}>
            {post.publishedAt ? formatDate(post.publishedAt) : 'Recently published'}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2" data-testid={`text-title-${post.id}`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3" data-testid={`text-excerpt-${post.id}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              {post.authorAvatar ? (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author}
                  className="w-full h-full object-cover rounded-full"
                  data-testid={`img-author-${post.id}`}
                />
              ) : (
                getAuthorInitials(post.author)
              )}
            </div>
            <span className="ml-2 text-sm text-gray-700" data-testid={`text-author-${post.id}`}>
              {post.author}
            </span>
          </div>
          <Link href={`/blog/${post.slug}`} data-testid={`link-read-more-${post.id}`}>
            <span className="text-primary hover:text-secondary font-medium cursor-pointer flex items-center">
              Read More <ArrowRight className="ml-1 w-4 h-4" />
            </span>
          </Link>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-tag-${post.id}-${index}`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

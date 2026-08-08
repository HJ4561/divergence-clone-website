// src/pages/BlogPost.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string | null;
  external_link: string;
  author: string;
  read_time: string;
  published_date: string | null;
  order: number;
  is_active: boolean;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// ============================================================
// SCROLL TO TOP COMPONENT
// ============================================================
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 p-3 bg-teal-400/10 hover:bg-teal-400/20 text-teal-300 rounded-full border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-110 shadow-lg shadow-teal-500/10"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </>
  );
}

// ============================================================
// MAIN BLOG POST COMPONENT
// ============================================================
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ============================================================
  // FETCH SINGLE BLOG POST
  // Endpoint: GET /api/blog/posts/{slug}/
  // ============================================================
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No post slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://client-divergent.vercel.app/api/blog/posts/${slug}/`);
        
        if (response.status === 404) {
          navigate('/blog', { replace: true });
          return;
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load the post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  // ============================================================
  // RENDER
  // ============================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <Link
            to="/blog"
            className="text-teal-300 hover:text-teal-200 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Post not found.</p>
          <Link
            to="/blog"
            className="text-teal-300 hover:text-teal-200 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-teal-300 transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
            <span>{post.author}</span>
            <span className="text-gray-600">•</span>
            <span>{formatDate(post.published_date)}</span>
            <span className="text-gray-600">•</span>
            <span>{post.read_time || getReadTime(post.content)}</span>
          </div>
        </header>

        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden border border-white/10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-teal max-w-none">
          {post.content?.includes('<') ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="space-y-4">
              {post.content?.split('\n').map((paragraph, i) => (
                paragraph.trim() && (
                  <p key={i} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          )}
        </div>

        {post.external_link && (
          <div className="mt-8 p-4 bg-ink-900 rounded-xl border border-white/10 text-center">
            <p className="text-gray-400 text-sm mb-2">
              This article is hosted externally.
            </p>
            <a
              href={post.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-teal-200 transition-colors"
            >
              Read the full article →
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-200 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to all posts
          </Link>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
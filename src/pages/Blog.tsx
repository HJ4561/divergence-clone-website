// src/pages/Blog.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  if (!dateString) return 'Coming soon';
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
// MAIN BLOG COMPONENT
// ============================================================
export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // SCROLL TO TOP ON PAGE LOAD
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ============================================================
  // FETCH BLOG POSTS
  // Endpoint: GET /api/blog/posts/
  // ============================================================
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://client-divergent.vercel.app/api/blog/posts/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle paginated response
        const postsData = data.results || data || [];
        setPosts(postsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ============================================================
  // RENDER
  // ============================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-teal-300 hover:text-teal-200 transition-colors"
          >
            Try again →
          </button>
        </div>
      </div>
    );
  }

  // If no posts from API, show empty state
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-ink-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
              &sect; JOURNAL
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
            Our <span className="text-teal-300">Blog</span>
          </h1>
          <p className="text-gray-400 mb-12 max-w-xl leading-relaxed">
            Insights on AI automation, simulation engineering, and the future of RF design.
          </p>
          <div className="text-center py-12">
            <p className="text-gray-400">No blog posts available yet. Check back soon!</p>
          </div>
        </div>
      </div>
    );
  }

  // Map API posts to display format
  const displayPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description || post.content?.substring(0, 150) + '...' || 'Read more',
    date: formatDate(post.published_date),
    author: post.author || 'Divergent Physics',
    readTime: post.read_time || getReadTime(post.content || ''),
  }));

  return (
    <div className="min-h-screen bg-ink-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; JOURNAL
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
          Our <span className="text-teal-300">Blog</span>
        </h1>
        
        <p className="text-gray-400 mb-12 max-w-xl leading-relaxed">
          Insights on AI automation, simulation engineering, and the future of RF design.
        </p>
        
        <div className="space-y-6">
          {displayPosts.map((post, index) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`} 
              className="group block bg-ink-900 p-6 md:p-8 rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/5 animate-card-enter"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-500 font-mono whitespace-nowrap">
                  {post.readTime}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="text-gray-500 font-mono tracking-wide">
                  {post.author}
                </span>
                <span className="text-gray-700">•</span>
                <span className="text-gray-500 font-mono">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes card-enter {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-card-enter {
          animation: card-enter 0.6s ease-out both;
        }
      `}</style>

      <ScrollToTop />
    </div>
  );
}
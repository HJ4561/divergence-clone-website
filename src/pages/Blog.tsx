import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    slug: 'ai-automation-simulation',
    title: 'AI Automation in Simulation Engineering',
    excerpt: 'How AI agents are transforming the way engineers approach simulation workflows.',
    date: 'January 15, 2024',
    author: 'Dr. Sarah Chen',
    readTime: '5 min read',
  },
  {
    slug: 'bayesian-optimization-hfss',
    title: 'Bayesian Optimization for Ansys HFSS',
    excerpt: 'Using Bayesian optimization to reduce simulation time while finding optimal designs.',
    date: 'January 10, 2024',
    author: 'Dr. Michael Torres',
    readTime: '7 min read',
  },
  {
    slug: 'future-of-engineering',
    title: 'The Future of Engineering with AI',
    excerpt: 'Exploring how AI is reshaping the engineering profession and what it means for the future.',
    date: 'January 5, 2024',
    author: 'Dr. Emily Nakamura',
    readTime: '4 min read',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our <span className="text-cyan-400">Blog</span></h1>
        <p className="text-gray-400 mb-12">Insights on AI automation, simulation engineering, and more.</p>
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">{post.title}</h2>
                <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{post.readTime}</span>
              </div>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{post.author}</span>
                <span className="text-gray-500">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
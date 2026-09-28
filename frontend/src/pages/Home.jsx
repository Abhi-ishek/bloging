import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

function Home({ user }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/');
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col flex-grow min-h-screen bg-[#0a0a0c]">

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex items-center py-20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left – copy */}
            <div className="text-center lg:text-left">
              {user ? (
                <>
                  <span className="inline-block text-xs font-bold tracking-[3px] uppercase text-gradient mb-3">Welcome Back</span>
                  <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-white">
                    Hello, {user.fullName}!
                  </h1>
                  <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                    Ready to share your next unique story? Your voice matters. Join thousands of writers who share their thoughts with the world.
                  </p>
                  <Link
                    to="/blog/add-new"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-gradient text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-.707.465l-3.182 1.06 1.06-3.182A2 2 0 019 13z" />
                    </svg>
                    Create New Post
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-white">
                    Express Your Ideas to the{' '}
                    <span className="text-gradient">World</span>
                  </h1>
                  <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                    The ultimate destination for storytellers and curious minds. Discover articles on tech, life, and everything in between.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to="/user/signup"
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-gradient text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Start Writing
                    </Link>
                    <Link
                      to="/user/signin"
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Browse Blogs
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Right – hero image */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-accent-gradient opacity-10 blur-3xl" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
                alt="Hero Illustration"
                className="relative z-10 w-full rounded-3xl shadow-2xl shadow-black/50 border border-white/10 object-cover"
                style={{ transform: 'perspective(1000px) rotateY(-8deg) rotateX(3deg)' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Recent Stories ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-3">
            Recent <span className="text-gradient">Stories</span>
          </h2>
          <div className="w-20 h-1 rounded-full bg-accent-gradient" />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/40 hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={blog.coverImageURL ? `http://localhost:8000${blog.coverImageURL}` : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="flex items-center gap-1 text-xs text-white bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    <Link to={`/blog/${blog._id}`} className="hover:text-indigo-400 transition-colors">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {blog.body
                      ? blog.body.substring(0, 150).replace(/<[^>]*>?/gm, '') + '…'
                      : 'Dive into this interesting story and explore more about this topic.'}
                  </p>

                  {/* Author + Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] mt-auto">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.createdBy?.profileImageURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                        alt="Author"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-400 font-medium">{blog.createdBy?.fullName || 'Anonymous'}</span>
                    </div>
                    <Link to={`/blog/${blog._id}`} className="text-sm font-bold text-gradient flex items-center gap-1 hover:gap-2 transition-all">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full py-20 text-center">
              <div className="bg-white/[0.03] border-2 border-dashed border-white/[0.08] rounded-3xl p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h4 className="text-xl font-bold text-white mb-2">No stories found</h4>
                <p className="text-gray-400 text-sm mb-6">The feed is empty for now. Be the first one to create a story!</p>
                <Link
                  to="/blog/add-new"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent-gradient text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Create Blog
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

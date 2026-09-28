import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function Profile({ user }) {
  const [activeTab, setActiveTab] = useState('posts');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/user/profile');
        if (res.data.success) {
          setProfileData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  if (!user) return <Navigate to="/user/signin" />;

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="w-10 h-10 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-400 text-sm">Loading profile…</p>
        </div>
      </div>
    );
  }

  const { blogs, savedBlogs } = profileData;

  // Reusable Blog Card
  const BlogCard = ({ blog, showDelete = false, showUnsave = false }) => (
    <div className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
      <div className="h-44 overflow-hidden">
        <img
          src={blog.coverImageURL ? `http://localhost:8000${blog.coverImageURL}` : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop'}
          alt="Blog Thumbnail"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h5 className="font-bold text-white text-sm leading-snug line-clamp-2 mb-3">
          <Link to={`/blog/${blog._id}`} className="hover:text-indigo-400 transition-colors">{blog.title}</Link>
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
          <div className="flex gap-2">
            {showDelete && (
              <>
                <button className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Edit">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-.707.465l-3.182 1.06 1.06-3.182A2 2 0 019 13z" />
                  </svg>
                </button>
                <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all" title="Delete">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
            {showUnsave && (
              <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all" title="Remove bookmark">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ icon, title, desc, link, linkLabel }) => (
    <div className="col-span-full py-16 text-center">
      <div className="opacity-20 mb-4 flex justify-center">{icon}</div>
      <h5 className="font-bold text-white text-lg mb-1">{title}</h5>
      <p className="text-gray-400 text-sm mb-4">{desc}</p>
      <Link to={link} className="inline-flex items-center gap-2 px-5 py-2 bg-accent-gradient text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200">
        {linkLabel}
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0c]">

      {/* Profile Hero */}
      <div className="relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 text-center pt-20 pb-32 px-4">

          {/* Avatar */}
          <div className="relative inline-block mb-5">
            <div className="w-36 h-36 rounded-full p-1 bg-accent-gradient shadow-2xl shadow-indigo-500/30">
              <img
                src={user.profileImageURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                alt={user.fullName}
                className="w-full h-full rounded-full object-cover border-4 border-[#0a0a0c]"
              />
            </div>
            {/* Online dot */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0a0a0c]" />
          </div>

          <h1 className="text-4xl font-extrabold text-white mb-3">{user.fullName}</h1>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-300 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {user.role || 'Member'}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-300 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {user.email}
            </span>
          </div>

          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/10 text-gray-300 text-sm font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Edit Settings
          </button>
        </div>
      </div>

      {/* Content Panel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-16">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl shadow-black/50">

          {/* Tab Navigation */}
          <div className="flex border-b border-white/[0.08] px-4 pt-2">
            <button
              id="tab-posts"
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all mr-1 ${
                activeTab === 'posts'
                  ? 'text-white border-indigo-500'
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              My Posts
            </button>
            <button
              id="tab-saved"
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all ${
                activeTab === 'saved'
                  ? 'text-white border-indigo-500'
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z" />
              </svg>
              Saved Stories
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'posts' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => <BlogCard key={blog._id} blog={blog} showDelete />)
                ) : (
                  <EmptyState
                    icon={
                      <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    }
                    title="No posts yet"
                    desc="You haven't written any stories yet."
                    link="/blog/add-new"
                    linkLabel="Write First Post"
                  />
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedBlogs && savedBlogs.length > 0 ? (
                  savedBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} showUnsave />)
                ) : (
                  <EmptyState
                    icon={
                      <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z" />
                      </svg>
                    }
                    title="No saved stories"
                    desc="Found something interesting? Bookmark it to read later."
                    link="/"
                    linkLabel="Explore Blogs"
                  />
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;

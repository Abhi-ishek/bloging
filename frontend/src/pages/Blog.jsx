import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Blog({ user }) {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://bloging-u462.onrender.com/blog/${id}`);
        if (res.data.success) {
          setBlogData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch blog', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://bloging-u462.onrender.com/blog/comment/${id}`, { content: commentContent });
      if (res.data.success) {
        setBlogData({ ...blogData, comments: [...blogData.comments, res.data.comment] });
        setCommentContent('');
      }
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const handleSaveBlog = async () => {
    try {
      await axios.post(`http://localhost:8000/blog/save/${id}`);
      alert('Blog saved successfully!');
    } catch (err) {
      console.error('Failed to save blog', err);
    }
  };

  if (!blogData) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="w-10 h-10 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-400 text-sm">Loading story…</p>
        </div>
      </div>
    );
  }

  const { blog, comments } = blogData;

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-10 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to feed
        </Link>

        {/* Article Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">{blog.title}</h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <img
                src={blog.createdBy.profileImageURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                alt="Author"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-medium">{blog.createdBy.fullName}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 min read
            </span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="mb-10">
          <img
            src={blog.coverImageURL ? `http://localhost:8000${blog.coverImageURL}` : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop'}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-3xl shadow-2xl shadow-black/50 border border-white/10"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none mb-10 text-gray-300 text-lg leading-relaxed space-y-6">
          {blog.body.split('\\n').map((p, idx) => p.trim() ? <p key={idx}>{p}</p> : null)}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between py-5 border-t border-b border-white/[0.08] mb-10">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              24 Likes
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
          {user && (
            <button
              onClick={handleSaveBlog}
              className="flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white text-sm font-semibold rounded-full shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z" />
              </svg>
              Save Story
            </button>
          )}
        </div>

        {/* Author Box */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-5">
            <img
              src={blog.createdBy.profileImageURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
              alt="Author"
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Written by {blog.createdBy.fullName}</h4>
              <p className="text-sm text-gray-400">
                Passionate writer and technology enthusiast. Exploring the boundaries of digital storytelling and web development.
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">
            Comments <span className="text-gray-500 font-normal text-xl">({comments.length})</span>
          </h3>

          {/* Comment Form */}
          {user ? (
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-8">
              <form onSubmit={handleCommentSubmit}>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Join the discussion
                </label>
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                  placeholder="What are your thoughts?"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl p-4 text-sm outline-none focus:border-indigo-500/60 transition-all resize-none mb-4"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-accent-gradient text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Post Comment
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl mb-8">
              <p className="text-gray-400 text-sm">
                Please{' '}
                <Link to="/user/signin" className="font-bold text-gradient hover:brightness-125 transition-all">
                  Sign In
                </Link>{' '}
                to join the conversation.
              </p>
            </div>
          )}

          {/* Comment List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
                >
                  <div className="flex gap-4">
                    <img
                      src={comment.createdBy.profileImageURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                      alt="Commenter"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-bold text-white text-sm">{comment.createdBy.fullName}</h6>
                        <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-400">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-14 opacity-40">
                <svg className="w-14 h-14 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-400">No comments yet. Be the first to say something!</p>
              </div>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}

export default Blog;

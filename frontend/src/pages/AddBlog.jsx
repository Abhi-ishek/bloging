import { useState, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

function AddBlog({ user }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/user/signin" />;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      if (coverImage) formData.append('coverImage', coverImage);

      const res = await axios.post('http://localhost:8000/blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        navigate(`/blog/${res.data.blog._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to publish blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            to="/"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              Create <span className="text-gradient">New Story</span>
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-0.5">Draft your masterpiece</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center justify-between gap-3 mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Story Title
              </label>
              <input
                id="blog-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a catchy title…"
                required
                className="w-full bg-transparent border-0 border-b-2 border-white/10 text-white text-3xl font-bold py-3 px-0 outline-none placeholder-gray-600 focus:border-indigo-500/60 transition-colors"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Cover Image
              </label>

              {!preview ? (
                <label
                  htmlFor="coverImageInput"
                  className="flex flex-col items-center justify-center w-full h-48 bg-white/[0.02] border-2 border-dashed border-white/[0.12] rounded-2xl cursor-pointer hover:bg-white/[0.04] hover:border-indigo-500/40 transition-all group"
                >
                  <svg className="w-12 h-12 text-gray-600 group-hover:text-indigo-400 mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h5 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors mb-1">Click to upload cover image</h5>
                  <p className="text-xs text-gray-500">Recommended: 1200×630px · Max 5MB</p>
                  <input
                    id="coverImageInput"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    required={!preview}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={preview} alt="Preview" className="w-full max-h-96 object-cover rounded-2xl shadow-xl" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                placeholder="Tell your story…"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-2xl p-5 text-base leading-relaxed outline-none focus:border-indigo-500/60 transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-7 py-2.5 bg-accent-gradient text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
                {loading ? 'Publishing…' : 'Publish Story'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;

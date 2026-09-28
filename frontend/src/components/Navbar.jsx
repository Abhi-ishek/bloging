import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/user/logout');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/[0.08] bg-[#0a0a0c]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Blog<span className="text-gradient">ify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/blog/add-new" className="text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Blog
                </Link>

                {/* User Dropdown */}
                <div className="relative group ml-2">
                  <button className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-white/15">
                    <img
                      src={user.profileImageURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{user.fullName}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#16161a] border border-white/[0.08] shadow-xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-1">
                      <Link to="/user/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                      <hr className="my-1 border-white/[0.08]" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/user/signin" className="text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">
                  Sign In
                </Link>
                <Link to="/user/signup" className="ml-2 px-4 py-2 bg-accent-gradient text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <details className="group">
              <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <div className="absolute top-16 left-0 right-0 bg-[#0a0a0c]/95 backdrop-blur-md border-b border-white/[0.08] p-4 flex flex-col gap-2">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">Home</Link>
                {user ? (
                  <>
                    <Link to="/blog/add-new" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">Add Blog</Link>
                    <Link to="/user/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">Profile</Link>
                    <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-500/5">Log Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/user/signin" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5">Sign In</Link>
                    <Link to="/user/signup" className="px-4 py-2 bg-accent-gradient text-white text-sm font-semibold rounded-xl text-center">Get Started</Link>
                  </>
                )}
              </div>
            </details>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

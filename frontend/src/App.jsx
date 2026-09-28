import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import AddBlog from './pages/AddBlog';
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Basic check to see if user is logged in
    const checkUser = async () => {
      try {
        const res = await axios.get('https://bloging-u462.onrender.com/user/profile');
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0a0a0c] text-white">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow flex flex-col w-full">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/user/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/profile" element={<Profile user={user} />} />
          <Route path="/blog/add-new" element={<AddBlog user={user} />} />
          <Route path="/blog/:id" element={<Blog user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { Link, useNavigate } from "react-router-dom";
import { User, signOut } from "firebase/auth";
import { auth, signInWithGoogle } from "../../lib/firebase";
import { Mic, User as UserIcon, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-accent-blue transition-all">
              VoiceOver AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                <Link to="/studio" className="text-sm text-gray-400 hover:text-white transition-colors">Voice Studio</Link>
                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                  <div className="flex items-center gap-2">
                    <img src={user.photoURL || ""} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-white/20" />
                    <span className="text-sm font-medium">{user.displayName?.split(' ')[0]}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[#030014] border-b border-white/10 px-4 py-6"
          >
            <div className="flex flex-col gap-4">
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-lg text-gray-400 font-medium">Pricing</Link>
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg text-gray-400 font-medium">Dashboard</Link>
                  <Link to="/studio" onClick={() => setIsOpen(false)} className="text-lg text-gray-400 font-medium">Voice Studio</Link>
                  <button onClick={handleLogout} className="text-lg text-red-500 font-medium text-left">Sign Out</button>
                </>
              ) : (
                <button 
                  onClick={signInWithGoogle}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { User } from "firebase/auth";
import { motion } from "motion/react";
import { Mic, Plus, Play, Download, Search, Settings2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  // Mock data for initial UI
  const voices = [
    { id: "1", name: "Professional Dave", status: "active", quality: 98 },
    { id: "2", name: "Cheerful Sarah", status: "active", quality: 95 },
  ];

  const recentAudio = [
    { id: "a1", name: "Product Launch Intro", date: "2 hours ago", size: "1.2 MB" },
    { id: "a2", name: "Tutorial Voiceover", date: "Yesterday", size: "4.5 MB" },
    { id: "a3", name: "Podcast Ad Read", date: "3 days ago", size: "2.8 MB" },
  ];

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.displayName?.split(' ')[0]}</h1>
          <p className="text-gray-400 text-sm">Manage your cloned voices and generated assets.</p>
        </div>
        <Link 
          to="/studio"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> Create New Voice
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voice Profiles List */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Mic className="w-5 h-5 text-accent-blue" /> Your Voices
          </h2>
          {voices.map(voice => (
            <div key={voice.id} className="glass-card p-5 hover:bg-white/10 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">{voice.name}</h3>
                  <span className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Ready
                  </span>
                </div>
                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                   <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Quality Score</span>
                      <span>{voice.quality}%</span>
                   </div>
                   <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-blue rounded-full" style={{ width: `${voice.quality}%` }} />
                   </div>
                </div>
                <button className="p-3 bg-white/10 rounded-full text-white hover:bg-accent-blue transition-colors group-hover:scale-110">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
          <Link to="/studio" className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 transition-all text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Voice Profile
          </Link>
        </div>

        {/* Audio Library / Recent Generations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Play className="w-5 h-5 text-accent-purple" /> Recent Audio
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search audio..." 
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Size</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentAudio.map(audio => (
                  <tr key={audio.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                        <span className="font-medium">{audio.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{audio.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{audio.size}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-white"><Download className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

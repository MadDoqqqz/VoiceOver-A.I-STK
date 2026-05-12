import { User } from "firebase/auth";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Mic, TextQuote, Sparkles, Languages, Volume2, Save, Send } from "lucide-react";

interface VoiceStudioProps {
  user: User;
}

export default function VoiceStudio({ user }: VoiceStudioProps) {
  const [activeTab, setActiveTab] = useState<"generate" | "clone">("generate");
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloneProgress, setCloneProgress] = useState(0);

  const handleClone = () => {
    setIsCloning(true);
    setCloneProgress(0);
    const interval = setInterval(() => {
      setCloneProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCloning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleGenerate = () => {
    if (!text) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Voice Studio</h1>
        <div className="flex justify-center p-1 bg-white/5 border border-white/10 rounded-2xl w-fit mx-auto">
          <button 
            onClick={() => setActiveTab("generate")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "generate" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Generate Speech
          </button>
          <button 
            onClick={() => setActiveTab("clone")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "clone" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Clone Voice
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "generate" ? (
          <motion.div 
            key="generate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Voice Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" /> Select Voice
                  </label>
                  <select className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors">
                    <option>Professional Dave (My Clone)</option>
                    <option>Cheerful Sarah (My Clone)</option>
                    <hr className="my-2 border-white/5" />
                    <option>AI: James (Deep & Rich)</option>
                    <option>AI: Emma (Bright & Friendly)</option>
                  </select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5" /> Language
                  </label>
                  <select className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish (ES)</option>
                    <option>French (FR)</option>
                    <option>German (DE)</option>
                  </select>
                </div>

                {/* Tone / Emotion */}
                 <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> Emotion / Tone
                  </label>
                  <select className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors">
                    <option>Professional / Calm</option>
                    <option>Excited / Energetic</option>
                    <option>Cinematic / Epic</option>
                    <option>Sad / Melancholic</option>
                  </select>
                </div>
              </div>

              {/* Text Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <TextQuote className="w-3.5 h-3.5" /> Script
                </label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the text you want to convert to speech..."
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 h-64 focus:outline-none focus:border-accent-purple transition-colors resize-none text-lg leading-relaxed"
                />
                <div className="flex justify-between items-center px-1">
                   <span className="text-xs text-gray-500">{text.length} / 5000 characters</span>
                   <button className="text-xs text-accent-purple hover:underline">Apply generic cleanup</button>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !text}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Generate Audio
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="clone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="glass-card p-10 border-dashed border-2 flex flex-col items-center justify-center gap-4 hover:border-accent-blue/50 transition-colors group cursor-pointer">
                   <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold">Upload Audio</h3>
                   <p className="text-sm text-gray-400">Drag and drop MP3 or WAV files (Max 10MB)</p>
                   <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium mt-2">Select File</button>
                </div>

                <div className="glass-card p-10 border-dashed border-2 flex flex-col items-center justify-center gap-4 hover:border-accent-purple/50 transition-colors group cursor-pointer">
                   <div className="w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple mb-2 group-hover:scale-110 transition-transform">
                      <Mic className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold">Record Direct</h3>
                   <p className="text-sm text-gray-400">Speak directly into your microphone for 30s</p>
                   <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium mt-2">Start Recording</button>
                </div>
             </div>

             <div className="glass-card p-8">
                <h3 className="text-lg font-bold mb-6">Voice Model Configuration</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Voice Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. My Personal Clone"
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors"
                      />
                   </div>
                   <div className="flex items-start gap-4 p-4 bg-accent-purple/5 rounded-xl border border-accent-purple/20">
                      <div className="p-2 bg-accent-purple rounded-lg">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold">Neural Optimization</h4>
                         <p className="text-xs text-gray-400 mt-1">Our advanced AI will analyze pitch, rhythm, and tone variations to create a 3D acoustic fingerprint.</p>
                      </div>
                   </div>
                   <button 
                     onClick={handleClone}
                     disabled={isCloning}
                     className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50"
                   >
                      {isCloning ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Training Neural Model... {cloneProgress}%
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" /> Initiate Training
                        </>
                      )}
                   </button>
                   {isCloning && (
                     <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${cloneProgress}%` }}
                        />
                     </div>
                   )}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

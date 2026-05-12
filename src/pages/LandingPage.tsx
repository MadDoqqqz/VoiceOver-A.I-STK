import { motion } from "motion/react";
import { Mic, Zap, Globe, Shield, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../lib/firebase";
import { ReactNode } from "react";

export default function LandingPage() {
  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-accent-blue mb-8">
              New: Realistic Emotion Control v2.0
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              Clone Your Voice with
              <span className="block text-gradient">AI Precision</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the world's most advanced AI voice cloning technology. Create high-fidelity voice profiles in minutes and generate studio-quality speech from text.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={signInWithGoogle}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                Start Cloning Free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                Watch Demo <Play className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Preview Image/Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative px-4"
        >
          <div className="max-w-5xl mx-auto glass-card p-4 md:p-8 neon-border">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070')] bg-cover opacity-20" />
               <div className="relative text-center p-8">
                  <div className="flex justify-center gap-4 mb-8">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [20, 60, 20] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                        className="w-2 bg-gradient-to-t from-accent-purple to-accent-blue rounded-full"
                      />
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Analyzing Voice Sample...</h3>
                  <p className="text-gray-400">Deep neural network processing active</p>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-accent-blue" />}
            title="Instant Training"
            description="Train a high-fidelity voice model with just 30 seconds of audio. Our optimized pipeline delivers results in minutes."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-accent-purple" />}
            title="29+ Languages"
            description="Generate speech in over 29 languages with native accents preserved through your unique voice profile."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-green-400" />}
            title="Secure & Private"
            description="Your voice samples are encrypted and used only for your projects. Complete control over your digital identity."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-8 hover:bg-white/10 transition-colors border-white/5">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

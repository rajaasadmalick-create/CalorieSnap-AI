import React from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Camera, 
  Brain, 
  Activity, 
  ScanLine, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Target, 
  ShieldCheck 
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Navbar component for the landing page
 */
function Navbar({ user, onCTA }: { user: any; onCTA: () => void }) {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ScanLine size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            CalorieSnap AI
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">How it Works</a>
          </div>
          {user ? (
            <Button onClick={() => navigate('/app/scan')} variant="outline" className="rounded-full border-slate-200">
              Dashboard
            </Button>
          ) : (
            <Button onClick={onCTA} variant="ghost" className="font-medium hidden sm:inline-flex rounded-full">
              Sign In
            </Button>
          )}
          <Button onClick={onCTA} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-11 transition-all">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

/**
 * Feature card component
 */
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  className = "",
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group ${className}`}
    >
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm lg:text-base">{description}</p>
    </motion.div>
  );
}

export default function Landing() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleCTA = async () => {
    if (user) {
      navigate('/app/scan');
    } else {
      try {
        await signInWithGoogle();
        navigate('/app/scan');
      } catch (error) {
        console.error("Auth failed", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-emerald-100 overflow-x-hidden">
      <Navbar user={user} onCTA={handleCTA} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 px-4 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Tracking
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.05]">
                  Nutrition tracking, <br />
                  <span className="text-emerald-500 italic font-serif">evolved.</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Stop guessing. Start snapping. Our hybrid Vision-AI instantly identifies meals and computes precise macros across 100,000+ ingredients.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                  <Button 
                    onClick={handleCTA} 
                    size="lg" 
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-emerald-500/25 transition-all hover:translate-y-[-2px]"
                  >
                    Start Free Scanning <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                      +1k
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-500">Trusted by early adopters</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop" 
                  alt="App Preview" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Identified</span>
                    <span className="text-white/80 text-xs font-mono tracking-tighter">0.82s Latency</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-1">Avocado Grain Bowl</h3>
                  <p className="text-white/60 text-sm mb-4">Healthy fats • High Fiber • Complex Carbs</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { l: 'CAL', v: '482' },
                      { l: 'PRO', v: '18g' },
                      { l: 'FAT', v: '22g' },
                      { l: 'CARB', v: '54g' }
                    ].map(stat => (
                      <div key={stat.l} className="bg-white/10 rounded-xl p-2 text-center text-white">
                        <div className="text-[10px] opacity-60 mb-0.5">{stat.l}</div>
                        <div className="text-sm font-bold">{stat.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Meal Accuracy', val: '98%' },
            { label: 'Vision Latency', val: '< 1s' },
            { label: 'User Rating', val: '4.9/5' },
            { label: 'Macro Precision', val: '95%' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.val}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">The ultimate nutrition toolkit.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              We've replaced the tedious work of manual logging with high-performance computer vision and advanced language models.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Camera}
              title="Point & Shoot"
              description="Simply snap a photo of any meal. Our AI identifies textures, colors, and patterns to pinpoint exactly what's on your plate."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap}
              title="Real-time Compute"
              description="Powered by the latest Large Language Models via OpenRouter, processing complex nutritional data in near real-time."
              delay={0.2}
            />
            <FeatureCard 
              icon={Target}
              title="Macro-Targeting"
              description="Get personalized feedback based on your specific meal's profile to help you hit your daily protein and caloric targets."
              delay={0.3}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Verified Data"
              description="Cross-referenced across multiple verified food databases to ensure the highest possible estimation accuracy."
              delay={0.4}
            />
            <FeatureCard 
              icon={Activity}
              title="Sync History"
              description="Keep a persistent visual diary of everything you eat. Visualize your patterns and identify areas for improvement."
              delay={0.5}
            />
            <FeatureCard 
              icon={Brain}
              title="Smart Coaching"
              description="Coming soon: AI-driven meal planning and suggestions based on your historical eating habits and goals."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto rounded-[48px] bg-slate-900 relative overflow-hidden p-8 sm:p-16 lg:p-24 text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[80px] -z-0" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -z-0" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Snap once. <br />
              <span className="text-emerald-400">Track for life.</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-xl mx-auto font-medium">
              Join the thousands of users already transforming their relationship with food. Your first scan is entirely on us.
            </p>
            <Button 
              onClick={handleCTA} 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-12 h-16 text-xl font-extrabold shadow-2xl shadow-emerald-500/20 w-full sm:w-auto hover:scale-105 transition-all"
            >
              Claim Your Free Scan
            </Button>
            <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-widest">
              <span>No credit card</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Instant AI Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                  <ScanLine size={18} />
                </div>
                <span className="text-lg font-bold">CalorieSnap</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                The intelligent visual nutrition tracker helping you understand your body, one snap at a time.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#features" className="hover:text-emerald-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-emerald-600 transition-colors">Science</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link to="/privacy-policy" className="hover:text-emerald-600 transition">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-600 transition">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><Link to="/faq" className="hover:text-emerald-600 transition">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest gap-4">
            <p>© {new Date().getFullYear()} CalorieSnap AI</p>
            <div className="flex gap-8">
              <Link to="/terms" className="hover:text-slate-600">Privacy Policy</Link>
              <Link to="/privacy-policy" className="hover:text-slate-600">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

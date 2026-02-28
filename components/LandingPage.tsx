
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onDashboard: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onDashboard }) => {
  return (
    <div className="text-slate-100 overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                <i className="fas fa-atom"></i>
              </div>
              <span className="text-2xl font-black tracking-tighter heading-font">UEPG <span className="text-cyan-400">setup AI</span></span>
            </div>
            <div className="hidden md:flex space-x-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
              <button onClick={onDashboard} className="hover:text-white transition-colors flex items-center gap-2">
                <i className="fas fa-vault text-[10px]"></i> Launch Vault
              </button>
            </div>
            <div>
              <button 
                onClick={onStart}
                className="bg-white text-slate-950 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition transform hover:-translate-y-1 shadow-xl shadow-cyan-500/10"
              >
                Launch Studio
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 border border-white/10 text-cyan-400">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
            Unlimited Open Access
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 heading-font leading-none">
            Free Professional <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400">Exam Synthesis.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            The ultimate open-access tool for educators. Generate high-fidelity assessments, diagrams, and grading matrices without subscription friction or cost.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={onStart}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-3xl text-xl font-black hover:scale-105 transition transform shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-4"
            >
              Start Creating Now
              <i className="fas fa-bolt-lightning text-amber-300"></i>
            </button>
            <button 
              onClick={onDashboard}
              className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-3xl text-xl font-black hover:bg-white/10 transition flex items-center justify-center gap-4"
            >
              Access Your Vault
              <i className="fas fa-archive text-slate-500"></i>
            </button>
          </div>
          
          {/* Mockup Preview */}
          <div className="mt-32 relative">
            <div className="glass-panel rounded-[3rem] p-4 shadow-2xl max-w-5xl mx-auto overflow-hidden border border-white/10 relative">
              <div className="bg-white rounded-[2rem] overflow-hidden aspect-video flex items-center justify-center relative shadow-inner">
                <div className="absolute inset-0 bg-slate-50 p-12 flex flex-col gap-8 text-left opacity-30">
                  <div className="h-10 w-1/3 bg-slate-200 rounded-xl"></div>
                  <div className="h-4 w-full bg-slate-100 rounded-lg"></div>
                  <div className="h-4 w-5/6 bg-slate-100 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-8 mt-6">
                    <div className="h-48 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                      <div className="h-4 w-1/2 bg-cyan-100 rounded-lg mb-6"></div>
                      <div className="space-y-4">
                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-48 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                      <div className="h-4 w-1/2 bg-violet-100 rounded-lg mb-6"></div>
                      <div className="space-y-4">
                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="z-10 bg-slate-950 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl flex items-center gap-5 border border-white/10 scale-125">
                  <div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                  <span className="tracking-widest uppercase text-sm">System Ready: Always Free</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 heading-font">Studio Grade Capabilities</h2>
            <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Unrestricted Access to All Features</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-10 group-hover:scale-110 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                <i className="fas fa-unlock text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 heading-font text-white">Full Feature Access</h3>
              <p className="text-slate-400 leading-relaxed font-medium">MCQs, Essays, Matching, and Comprehension. No tiered restrictions—every educator gets the full UEPG suite.</p>
            </div>
            <div className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-violet-500/30 transition-all group">
              <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 mb-10 group-hover:scale-110 transition group-hover:bg-violet-400 group-hover:text-slate-950">
                <i className="fas fa-infinity text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 heading-font text-white">Unlimited Generation</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Generate as many papers as you need. Our infrastructure is optimized for high-volume pedagogical support.</p>
            </div>
            <div className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-rose-500/30 transition-all group">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400 mb-10 group-hover:scale-110 transition group-hover:bg-rose-400 group-hover:text-slate-950">
                <i className="fas fa-hand-holding-heart text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 heading-font text-white">Community First</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Built by and for educators. UEPG setup AI will remain an open tool to democratize assessment design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="glass-panel rounded-[4rem] p-20 text-white relative overflow-hidden neon-border">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-8 heading-font leading-tight">Empowering Educators <br/><span className="text-cyan-400">At Zero Cost.</span></h2>
              <p className="text-slate-400 mb-16 text-xl max-w-2xl mx-auto font-medium">No credit cards. No subscriptions. Just pure neural intelligence for your classroom.</p>
              <div className="flex justify-center">
                <button 
                  onClick={onStart}
                  className="bg-white text-slate-950 px-20 py-8 rounded-[2.5rem] font-black text-2xl hover:bg-cyan-400 transition transform hover:scale-105 shadow-2xl flex items-center gap-6"
                >
                  Enter Prismatic Studio
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <p className="mt-10 text-xs text-slate-500 font-black uppercase tracking-[0.3em]">Free Forever • Open Source Intelligence • v3.1 Modified</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg">
                <i className="fas fa-atom"></i>
              </div>
              <span className="text-2xl font-black heading-font tracking-tighter uppercase">UEPG <span className="text-cyan-400">setup AI</span></span>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Neural Terms</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
            <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">
              &copy; 2025 Global Intelligence Matrix. Public Good Project.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

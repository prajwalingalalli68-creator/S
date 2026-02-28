
import React, { useState, useEffect } from 'react';
import { ExamPaper, GenerationConfig } from './types';
import { generateExamPaper } from './services/gemini';
import ExamForm from './components/ExamForm';
import ExamPreview from './components/ExamPreview';
import HistoryList from './components/HistoryList';
import LandingPage from './components/LandingPage';
import GenerationProgress from './components/GenerationProgress';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard' | 'creator' | 'preview'>('landing');
  const [exams, setExams] = useState<ExamPaper[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamPaper | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('uepg_exams_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: Ensure paperType and board exist
        const migrated = parsed.map((ex: any) => ({
          ...ex,
          paperType: ex.paperType || 'exam',
          board: ex.board || 'CBSE'
        }));
        setExams(migrated);
      } catch (e) {
        console.error("Vault Access Denied", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('uepg_exams_v3', JSON.stringify(exams));
  }, [exams]);

  const handleGenerate = async (config: GenerationConfig) => {
    setIsGenerating(true);
    setError(null);
    try {
      const newExam = await generateExamPaper(config);
      setExams(prev => [newExam, ...prev]);
      setSelectedExam(newExam);
      setView('preview');
    } catch (err: any) {
      setError(err.message || "Neuro-link Error. Check API status.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 transition-all duration-700">
      {/* Conditionally render header based on view */}
      {view !== 'landing' && (
        <header className="bg-slate-950/50 backdrop-blur-2xl border-b border-white/5 py-6 px-10 sticky top-0 z-[100] no-print">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div 
              className="flex items-center gap-5 cursor-pointer group" 
              onClick={() => setView('landing')}
            >
              <div className="relative">
                <div className="bg-gradient-to-tr from-cyan-400 via-violet-500 to-rose-500 w-14 h-14 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)] group-hover:scale-110 transition-transform duration-500 border border-white/20">
                  <i className="fas fa-atom text-white text-2xl"></i>
                </div>
                <div className="absolute -inset-2 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-white leading-none heading-font">
                  UEPG <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">setup AI</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-1.5">Neural Assessment Engine</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-4">
              <button 
                onClick={() => setView('dashboard')}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${view === 'dashboard' ? 'bg-white/10 text-white shadow-inner border border-white/10' : 'text-slate-400 hover:text-white'}`}
              >
                Vault
              </button>
              <button 
                onClick={() => setView('creator')}
                className="neo-button bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-3 border border-white/10"
              >
                <i className="fas fa-plus-circle"></i>
                Initialize Paper
              </button>
            </nav>
          </div>
        </header>
      )}

      {view === 'landing' ? (
        <LandingPage onStart={() => setView('creator')} onDashboard={() => setView('dashboard')} />
      ) : (
        <main className="max-w-7xl mx-auto px-10 pt-16">
          <GenerationProgress isGenerating={isGenerating} />
          {error && (
            <div className="mb-12 glass-panel border-rose-500/30 text-rose-100 px-10 py-6 rounded-[2.5rem] flex items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-700 no-print">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center flex-shrink-0 text-2xl border border-rose-500/30">
                <i className="fas fa-exclamation-triangle text-rose-400"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-1">Neural Error Detected</h4>
                <p className="text-xs opacity-70 font-bold">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-200 transition text-2xl p-2">
                <i className="fas fa-times-circle"></i>
              </button>
            </div>
          )}

          {view === 'dashboard' && (
            <div className="space-y-24 no-print animate-in fade-in duration-1000">
              <section className="relative">
                <div className="glass-panel border-white/10 rounded-[4rem] p-20 relative overflow-hidden">
                  <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-10 border border-white/10 text-cyan-400">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                      Core v3.1 Modified
                    </div>
                    <h2 className="text-7xl font-black mb-10 leading-[0.95] tracking-tighter text-white heading-font">
                      Vault <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 drop-shadow-2xl">History.</span>
                    </h2>
                    <p className="text-slate-400 text-2xl mb-14 leading-relaxed font-medium">
                      Manage your engineered assessments. Every paper is archived in the Neural Vault for instant deployment or iterative modification.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <button 
                        onClick={() => setView('creator')}
                        className="bg-white text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-4 heading-font"
                      >
                        Enter Studio
                        <i className="fas fa-arrow-right text-sm"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Visual Highlights */}
                  <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full -mr-40 -mt-40 blur-[150px] animate-pulse"></div>
                  <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-30 pointer-events-none scale-150 rotate-12">
                     <i className="fas fa-archive text-[250px] text-white/10"></i>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        <i className="fas fa-archive text-indigo-400"></i>
                     </div>
                     <div>
                       <h3 className="text-4xl font-black text-white tracking-tighter heading-font">Neural Archive</h3>
                       <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Historical Assessment Database</p>
                     </div>
                  </div>
                  <div className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    {exams.length} Engineered Papers
                  </div>
                </div>
                <HistoryList 
                  exams={exams} 
                  onSelect={(e) => { setSelectedExam(e); setView('preview'); }} 
                  onDelete={(id) => setExams(p => p.filter(ex => ex.id !== id))} 
                />
              </section>
            </div>
          )}

          {view === 'creator' && (
            <div className="max-w-5xl mx-auto no-print animate-in slide-in-from-bottom-10 duration-700">
              <div className="mb-16 text-center">
                <h2 className="text-6xl font-black text-white mb-6 tracking-tighter heading-font">Studio Matrix</h2>
                <p className="text-slate-400 font-bold text-xl uppercase tracking-widest opacity-60">Architect the ultimate assessment</p>
              </div>
              <ExamForm onSubmit={handleGenerate} isLoading={isGenerating} />
            </div>
          )}

          {view === 'preview' && selectedExam && (
            <ExamPreview 
              exam={selectedExam} 
              onBack={() => setView('dashboard')} 
            />
          )}
        </main>
      )}

      {view !== 'landing' && (
        <footer className="mt-40 py-20 border-t border-white/5 text-center no-print relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-10 relative z-10">
            <div className="flex justify-center gap-12 mb-12">
               {['twitter', 'linkedin', 'discord'].map(social => (
                 <a key={social} href="#" className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all hover:-translate-y-2">
                   <i className={`fab fa-${social} text-2xl`}></i>
                 </a>
               ))}
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 font-black text-2xl tracking-tighter heading-font">
                &copy; {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">UEPG setup AI</span>
              </p>
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">Global Educational Intelligence Matrix</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;

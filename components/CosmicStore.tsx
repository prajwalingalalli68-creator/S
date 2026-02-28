
import React from 'react';
import { AppMetadata } from '../types';

interface CosmicStoreProps {
  onLaunchApp: (appId: string) => void;
}

const APPS: AppMetadata[] = [
  {
    id: 'paper-gen',
    name: 'SSGPT Paper Gen',
    description: 'Advanced AI assessment architect for NCERT, Cambridge, and Siri Kannada syllabi.',
    logo: 'fa-file-invoice',
    color: 'from-cyan-500 to-blue-600',
    category: 'Education'
  },
  {
    id: 'presentator',
    name: 'Cosmic Presentator',
    description: 'AI-powered presentation engine. The Gamma & Canva alternative for cosmic-grade decks.',
    logo: 'fa-person-chalkboard',
    color: 'from-violet-500 to-purple-700',
    category: 'Creativity',
    isNew: true
  },
  {
    id: 'designer',
    name: 'Neural Designer',
    description: 'Graphic design matrix for social media, posters, and educational infographics.',
    logo: 'fa-palette',
    color: 'from-rose-500 to-pink-600',
    category: 'Design'
  },
  {
    id: 'tutor',
    name: 'AI Neural Tutor',
    description: 'Personalized learning companion for complex STEM and Humanities topics.',
    logo: 'fa-user-graduate',
    color: 'from-emerald-500 to-teal-600',
    category: 'Education'
  }
];

const CosmicStore: React.FC<CosmicStoreProps> = ({ onLaunchApp }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-20 text-center">
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10 text-cyan-400">
          <i className="fas fa-shopping-bag"></i>
          Cosmic Store v4.0
        </div>
        <h2 className="text-7xl font-black text-white mb-6 tracking-tighter heading-font">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400">Cosmic Matrix.</span>
        </h2>
        <p className="text-slate-400 text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          A unified ecosystem of neural applications designed to empower educators and creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {APPS.map(app => (
          <div 
            key={app.id}
            className="glass-panel rounded-[4rem] p-12 border border-white/10 hover:border-white/30 transition-all group relative overflow-hidden cursor-pointer"
            onClick={() => onLaunchApp(app.id)}
          >
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700`}></div>
            
            <div className="flex items-start gap-10 relative z-10">
              <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${app.color} flex items-center justify-center text-4xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-500 border border-white/20`}>
                <i className={`fas ${app.logo}`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-3xl font-black text-white heading-font">{app.name}</h3>
                  {app.isNew && (
                    <span className="bg-cyan-500 text-slate-950 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">New</span>
                  )}
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">{app.category}</div>
                <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
                  {app.description}
                </p>
                <button className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs group-hover:gap-6 transition-all">
                  Launch Application
                  <i className="fas fa-arrow-right text-cyan-400"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 glass-panel rounded-[3rem] p-16 border border-white/10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-4xl font-black text-white mb-6 heading-font">Request a Neural App</h3>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 font-medium">
            Need a specific tool for your classroom? Our engineers are constantly expanding the Cosmic Matrix based on educator feedback.
          </p>
          <button className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition shadow-2xl">
            Submit Request
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-rose-500/5"></div>
      </div>
    </div>
  );
};

export default CosmicStore;

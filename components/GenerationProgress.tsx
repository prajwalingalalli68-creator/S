import React, { useEffect, useState } from 'react';

interface GenerationProgressProps {
  isGenerating: boolean;
}

const PHASES = [
  "Analyzing Syllabus Matrix...",
  "Calibrating Difficulty Vectors...",
  "Synthesizing Question Bank...",
  "Optimizing Layout Geometry...",
  "Finalizing Neural Output..."
];

const GenerationProgress: React.FC<GenerationProgressProps> = ({ isGenerating }) => {
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      setSeconds(0);
      setPhaseIndex(0);
      return;
    }

    const startTime = Date.now();
    const duration = 60000; // 60 seconds target

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Calculate progress, capping at 98% so it doesn't look "finished" before it actually is
      const newProgress = Math.min((elapsed / duration) * 100, 98);
      
      setProgress(newProgress);
      setSeconds(Math.floor(elapsed / 1000));

      // Update phases based on progress chunks
      if (newProgress < 20) setPhaseIndex(0);
      else if (newProgress < 40) setPhaseIndex(1);
      else if (newProgress < 60) setPhaseIndex(2);
      else if (newProgress < 80) setPhaseIndex(3);
      else setPhaseIndex(4);

    }, 100);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center no-print animate-in fade-in duration-300">
      <div className="w-full max-w-lg p-10 relative">
        {/* Central Visual */}
        <div className="flex justify-center mb-12 relative">
          <div className="w-40 h-40 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
             <svg className="w-full h-full absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="46" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  className="text-slate-800"
                />
                <circle 
                  cx="50" cy="50" r="46" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeDasharray="289" // 2 * pi * 46
                  strokeDashoffset={289 - (289 * progress) / 100}
                  className="text-cyan-500 transition-all duration-300 ease-linear"
                  strokeLinecap="round"
                />
             </svg>
             <div className="text-center z-10">
                <div className="text-4xl font-black text-white heading-font tabular-nums">
                  {seconds}<span className="text-sm text-slate-500">s</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  / 60s Target
                </div>
             </div>
             
             {/* Spinning Glow */}
             <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-pulse"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-black text-white uppercase tracking-widest heading-font animate-pulse">
            Neural Synthesis Active
          </h3>
          <p className="text-cyan-400 font-bold text-sm uppercase tracking-[0.2em] h-6">
            {PHASES[phaseIndex]}
          </p>
        </div>

        {/* Linear Progress Bar */}
        <div className="mt-12 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-rose-500 transition-all duration-300 ease-linear relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 blur-sm"></div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span>Initialization</span>
          <span>Processing</span>
          <span>Finalization</span>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;


import React from 'react';
import { ExamPaper } from '../types';

interface HistoryListProps {
  exams: ExamPaper[];
  onSelect: (exam: ExamPaper) => void;
  onDelete: (id: string) => void;
}

const SUBJECT_COLORS: Record<string, { bg: string, text: string, glow: string }> = {
  "S.S.T": { bg: "bg-amber-100", text: "text-amber-700", glow: "shadow-amber-500/20" },
  "SCIENCE": { bg: "bg-emerald-100", text: "text-emerald-700", glow: "shadow-emerald-500/20" },
  "MATHEMATICS": { bg: "bg-cyan-100", text: "text-cyan-700", glow: "shadow-cyan-500/20" },
  "KANNADA": { bg: "bg-rose-100", text: "text-rose-700", glow: "shadow-rose-500/20" },
  "ENGLISH": { bg: "bg-indigo-100", text: "text-indigo-700", glow: "shadow-indigo-500/20" },
  "HINDI": { bg: "bg-orange-100", text: "text-orange-700", glow: "shadow-orange-500/20" },
  "COMPUTER": { bg: "bg-slate-200", text: "text-slate-700", glow: "shadow-slate-500/20" }
};

const HistoryList: React.FC<HistoryListProps> = ({ exams, onSelect, onDelete }) => {
  if (exams.length === 0) {
    return (
      <div className="text-center py-24 glass-card rounded-[3rem] border-2 border-dashed border-white/20 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl">
          <i className="fas fa-box-open text-slate-300 text-3xl"></i>
        </div>
        <h3 className="text-white text-2xl font-black mb-2 tracking-tight">The Vault is Empty</h3>
        <p className="text-slate-400 font-medium max-w-xs mx-auto text-sm leading-relaxed uppercase tracking-widest">Your masterpiece assessments will be archived here.</p>
        <button className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-300 hover:bg-white/10 transition-colors">
          Initiate first generation
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {exams.map(exam => {
        const colors = SUBJECT_COLORS[exam.subject] || { bg: "bg-slate-100", text: "text-slate-700", glow: "shadow-slate-500/10" };
        
        return (
          <div 
            key={exam.id}
            className="group glass-card p-8 rounded-[2.5rem] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col h-full hover:-translate-y-2 active:scale-95"
            onClick={() => onSelect(exam)}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} opacity-20 blur-[60px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className={`px-4 py-1.5 ${colors.bg} ${colors.text} text-[10px] font-black uppercase rounded-full tracking-widest border border-white/50`}>
                {exam.subject}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(exam.id);
                }}
                className="opacity-0 group-hover:opacity-100 w-10 h-10 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all flex items-center justify-center"
              >
                <i className="fas fa-trash-can text-sm"></i>
              </button>
            </div>
            
            <h4 className="font-black text-slate-100 text-xl leading-tight line-clamp-2 mb-3 group-hover:text-white transition-colors">
               {exam.title}
            </h4>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-xs font-bold text-slate-400">
               <span className="flex items-center gap-2"><i className="fas fa-graduation-cap text-[10px]"></i> {exam.gradeLevel}</span>
               <span className="flex items-center gap-2"><i className="fas fa-star text-[10px]"></i> {exam.totalMarks} Marks</span>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                 <i className="fas fa-calendar-days text-[9px]"></i>
                 {new Date(exam.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                Study Studio <i className="fas fa-chevron-right text-[8px]"></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryList;

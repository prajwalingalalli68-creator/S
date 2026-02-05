
import React, { useState, useMemo } from 'react';
import { ExamPaper } from '../types';

interface ExamPreviewProps {
  exam: ExamPaper;
  onBack: () => void;
}

const ExamPreview: React.FC<ExamPreviewProps> = ({ exam, onBack }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  const shuffledMatchingOptions = useMemo(() => {
    const map = new Map<string, string[]>();
    exam.sections.forEach(section => {
      section.questions.forEach(q => {
        if (q.type === 'matching' && q.matchingPairs) {
          const rights = q.matchingPairs.map(p => p.right);
          for (let i = rights.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rights[i], rights[j]] = [rights[j], rights[i]];
          }
          map.set(q.id, rights);
        }
      });
    });
    return map;
  }, [exam]);

  const handlePrint = () => window.print();

  const getBorderClasses = () => {
    switch (exam.borderStyle) {
      case 'double': return 'border-[12px] border-double border-slate-900 m-10 p-16';
      case 'dashed': return 'border-2 border-dashed border-slate-300 m-10 p-16';
      case 'fancy': return 'border-[25px] border-slate-50 outline outline-1 outline-slate-200 m-10 p-20';
      case 'none': return 'p-16';
      default: return 'border-2 border-slate-900 m-10 p-16';
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 animate-in zoom-in-95 duration-500">
      {/* CONTROL BAR */}
      <div className="mb-12 flex flex-wrap items-center justify-between gap-8 no-print glass-panel p-6 rounded-[2.5rem] border-white/20">
        <button 
          onClick={onBack} 
          className="px-8 py-4 text-slate-400 hover:text-cyan-400 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 transition-all group"
        >
          <i className="fas fa-long-arrow-alt-left group-hover:-translate-x-2 transition-transform"></i> 
          Vault Access
        </button>
        <div className="flex gap-5">
          <button 
            onClick={() => setShowAnswers(!showAnswers)} 
            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all border-2 ${showAnswers ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}`}
          >
             <i className={`fas ${showAnswers ? 'fa-fingerprint' : 'fa-lock-open'} mr-3`}></i>
             {showAnswers ? 'Declassify Key' : 'Reveal Answer Matrix'}
          </button>
          <button 
            onClick={handlePrint} 
            className="neo-button px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl border border-white/20"
          >
            <i className="fas fa-print mr-3"></i>
            Deploy Paper
          </button>
        </div>
      </div>

      {/* THE PAPER STUDIO */}
      <div className="bg-white/5 rounded-[4rem] p-1 shadow-inner no-print border border-white/5">
        <div className={`bg-white text-slate-950 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative print:shadow-none print:m-0 print:border-none ${getBorderClasses()} min-h-[1400px]`}>
          
          {/* HEADER BLOCK */}
          <div className="text-center border-b-[4px] border-slate-950 pb-12 mb-12">
            <div className="flex justify-between items-center mb-10 px-6">
              <div className="w-32 h-32 flex items-center justify-center bg-slate-50 rounded-3xl overflow-hidden p-4 border border-slate-100 shadow-sm">
                {exam.schoolLogoUrl ? (
                  <img src={exam.schoolLogoUrl} className="max-h-full max-w-full object-contain" />
                ) : (
                  <i className="fas fa-university text-5xl text-slate-200"></i>
                )}
              </div>
              <div className="flex-1 px-10">
                <h1 className="text-5xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">
                  {exam.instituteName || "UEPG NEURAL INSTITUTE"}
                </h1>
                <p className="text-2xl font-bold text-slate-400 uppercase tracking-[0.4em]">{exam.title}</p>
              </div>
              <div className="w-32 h-32"></div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 text-base font-black text-slate-950 border-y-[2px] border-slate-100 py-8 px-10 bg-slate-50/50">
               <div className="text-left flex items-center gap-3">SUBJECT: <span className="font-bold underline decoration-cyan-400 underline-offset-8">{exam.subject}</span></div>
               <div className="text-right flex items-center justify-end gap-3">GRADE: <span className="font-bold underline decoration-rose-400 underline-offset-8">{exam.gradeLevel}</span></div>
               <div className="text-left">TIME: <span className="font-bold text-slate-600">{exam.duration}</span></div>
               <div className="text-right">MAX SCORE: <span className="font-bold text-slate-600">{exam.totalMarks}</span></div>
            </div>

            <div className="mt-12 flex flex-wrap justify-between items-end gap-10 px-10 text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">
               <div className="flex-1 border-b border-slate-200 pb-2">CANDIDATE: ....................................................</div>
               <div className="w-48 border-b border-slate-200 pb-2">ID: ...................</div>
               <div className="w-48 border-b border-slate-200 pb-2">SEC: ...................</div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-20 px-6">
            
            {exam.referenceImageUrl && (
              <div className="text-center border-2 border-slate-100 p-10 rounded-[3rem] bg-slate-50/50">
                 <p className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-[0.3em]">FIGURE DATA MATRIX 01-A</p>
                 <img src={exam.referenceImageUrl} className="max-h-[400px] mx-auto object-contain rounded-2xl shadow-xl border border-white" />
              </div>
            )}

            {exam.generalInstructions && (
              <div className="p-10 border-l-[8px] border-slate-950 bg-slate-50 text-base font-medium italic relative rounded-r-[2rem]">
                <h4 className="font-black uppercase text-[11px] mb-6 tracking-[0.5em] text-slate-400">Essential Directives</h4>
                <p className="whitespace-pre-line text-slate-800 leading-loose font-serif">{exam.generalInstructions}</p>
              </div>
            )}

            <div className="space-y-20">
              {exam.sections.map((section, sIdx) => (
                <div key={section.id} className="break-inside-avoid">
                  <div className="flex items-center gap-8 mb-10">
                     <div className="bg-slate-950 text-white text-[11px] font-black w-14 h-14 flex items-center justify-center rounded-2xl shadow-xl">
                       {String.fromCharCode(65 + sIdx)}
                     </div>
                     <h2 className="text-3xl font-black uppercase text-slate-950 tracking-tight flex-1 border-b-[3px] border-slate-950 pb-3">
                       {section.title}
                     </h2>
                  </div>
                  
                  {section.instructions && (
                    <div className="text-[11px] font-black text-slate-400 mb-10 flex items-start gap-3 italic uppercase tracking-widest leading-relaxed">
                      <i className="fas fa-exclamation-circle mt-1 text-slate-950"></i>
                      {section.instructions}
                    </div>
                  )}

                  <div className="space-y-16">
                    {section.questions.map((q, qIdx) => (
                      <div key={q.id} className="relative group pl-2 break-inside-avoid">
                        <div className="flex justify-between items-start">
                           <div className="flex gap-6 flex-1">
                              <span className="font-black text-slate-950 text-2xl">{qIdx + 1}.</span>
                              <div className="flex-1">
                                 
                                 {(q.type === 'unseen_passage' || q.type === 'unseen_poem') && q.passageText && (
                                   <div className="mb-10 p-10 border-2 border-slate-100 font-serif leading-loose text-xl text-justify text-slate-800 italic rounded-[2.5rem] bg-slate-50/50 shadow-inner">
                                     {q.passageText.split('\n').map((l, i) => <p key={i} className="mb-6 last:mb-0">{l}</p>)}
                                   </div>
                                 )}

                                 <p className="font-bold text-slate-950 text-xl leading-snug mb-6">{q.text}</p>
                                 
                                 {q.subQuestions && (
                                   <div className="mt-8 ml-10 space-y-8">
                                      {q.subQuestions.map((sq, si) => (
                                        <div key={sq.id} className="flex justify-between items-start gap-6 border-b border-slate-100 pb-6 last:border-0">
                                          <div className="flex gap-4">
                                            <span className="font-black text-slate-400 text-base">({String.fromCharCode(97 + si)})</span>
                                            <span className="text-slate-900 font-semibold text-lg">{sq.text}</span>
                                          </div>
                                          <span className="font-black text-slate-300 text-sm">[{sq.marks}]</span>
                                        </div>
                                      ))}
                                   </div>
                                 )}

                                 {q.type === 'mcq' && q.options && (
                                   <div className="grid grid-cols-2 mt-8 gap-8">
                                     {q.options.map((o, oi) => (
                                       <div key={oi} className="flex items-center gap-5 text-lg font-bold text-slate-800">
                                         <span className="w-8 h-8 flex items-center justify-center rounded-xl border-2 border-slate-200 text-xs font-black text-slate-400">
                                           {String.fromCharCode(65 + oi)}
                                         </span>
                                         <span>{o}</span>
                                       </div>
                                     ))}
                                   </div>
                                 )}

                                 {q.type === 'matching' && q.matchingPairs && (
                                   <div className="mt-10 grid grid-cols-2 gap-16 text-lg font-black bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                                      <div className="space-y-6">
                                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Taxonomy A</div>
                                        {q.matchingPairs.map((p, pi) => <div key={pi} className="flex gap-4"><span className="text-blue-500">{pi+1}.</span> {p.left}</div>)}
                                      </div>
                                      <div className="space-y-6 border-l-[2px] border-slate-200 pl-16">
                                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Taxonomy B</div>
                                        {shuffledMatchingOptions.get(q.id)?.map((item, pi) => <div key={pi} className="flex gap-4"><span className="text-rose-500">{String.fromCharCode(65+pi)}.</span> {item}</div>)}
                                      </div>
                                   </div>
                                 )}

                                 {(q.type === 'short_answer' || q.type === 'essay') && !q.subQuestions && (
                                   <div className="mt-10 space-y-6 opacity-20">
                                      {[...Array(q.type === 'essay' ? 6 : 3)].map((_, i) => (
                                        <div key={i} className="border-b-[2px] border-dotted border-slate-400 h-8"></div>
                                      ))}
                                   </div>
                                 )}
                              </div>
                           </div>
                           <div className="ml-10 font-black text-slate-300 text-sm tracking-tighter">[{q.marks} Pts]</div>
                        </div>

                        {showAnswers && (
                          <div className="mt-8 ml-16 p-8 bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] text-sm text-blue-950 no-print animate-in zoom-in-95 duration-200">
                            <div className="flex items-center gap-3 font-black uppercase tracking-[0.2em] mb-4 text-blue-600">
                              <i className="fas fa-terminal"></i> Neural Solution Matrix
                            </div>
                            <div className="font-bold whitespace-pre-line text-lg">
                              {q.type === 'matching' ? q.matchingPairs?.map(p => `${p.left} → ${p.right}`).join('\n') : q.correctAnswer}
                              {q.subQuestions?.map((sq, i) => <div key={i} className="mt-2 text-base">({String.fromCharCode(97+i)}) {sq.correctAnswer}</div>)}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER BLOCK */}
          <div className="mt-32 pt-12 border-t-[5px] border-slate-950 text-center">
             <div className="inline-block px-12 py-3 border-4 border-slate-950 text-sm font-black uppercase text-slate-950 tracking-[0.8em] rounded-full">
               END OF EVALUATION
             </div>
             <p className="mt-6 text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">Neural Verification ID: {exam.id.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPreview;

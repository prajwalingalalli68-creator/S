
import React, { useState } from 'react';
import { ExamPaper } from '../types';
import { exportToTXT, exportToDOCX } from '../utils/exportUtils';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface ExamPreviewProps {
  exam: ExamPaper;
  onBack: () => void;
}

const ExamPreview: React.FC<ExamPreviewProps> = ({ exam, onBack }) => {
  const [mode, setMode] = useState<'question' | 'answer'>('question');

  const handleExportPDF = () => {
    const element = document.getElementById('exam-paper-content');
    const opt = {
      margin: 0.5,
      filename: `${exam.subject}_${mode}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* CONTROLS */}
      <div className="mb-10 flex flex-wrap gap-4 justify-between items-center no-print glass-panel p-6 rounded-[2.5rem]">
        <button onClick={onBack} className="px-6 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition">
          <i className="fas fa-arrow-left mr-2"></i> Back to Vault
        </button>
        
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
          <button 
            onClick={() => setMode('question')} 
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'question' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Question Paper
          </button>
          <button 
            onClick={() => setMode('answer')} 
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'answer' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Answer Key
          </button>
        </div>

        <div className="flex gap-2">
            <button onClick={() => exportToDOCX(exam, mode)} className="px-4 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition flex items-center gap-2" title="Export to DOCX">
              <i className="fas fa-file-word"></i> <span className="hidden sm:inline">DOCX</span>
            </button>
            <button onClick={handleExportPDF} className="px-4 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-red-500 transition flex items-center gap-2" title="Export to PDF">
              <i className="fas fa-file-pdf"></i> <span className="hidden sm:inline">PDF</span>
            </button>
             <button onClick={() => exportToTXT(exam, mode)} className="px-4 py-3 bg-slate-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-500 transition flex items-center gap-2" title="Export to Text">
              <i className="fas fa-file-alt"></i> <span className="hidden sm:inline">TXT</span>
            </button>
            <button onClick={() => window.print()} className="px-4 py-3 bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-cyan-400 transition flex items-center gap-2" title="Print">
              <i className="fas fa-print"></i> <span className="hidden sm:inline">Print</span>
            </button>
        </div>
      </div>

      {/* PAPER BODY */}
      <div id="exam-paper-content" className={`bg-white text-slate-900 p-16 shadow-2xl rounded-sm min-h-[1400px] border-slate-900 relative ${
        exam.borderStyle === 'double' ? 'border-[6px] border-double' :
        exam.borderStyle === 'dashed' ? 'border-4 border-dashed' :
        exam.borderStyle === 'fancy' ? 'border-[12px] border-slate-900 outline outline-4 outline-offset-[-16px] outline-slate-200' :
        exam.borderStyle === 'rounded' ? 'border-2 rounded-[2rem]' :
        exam.borderStyle === 'heavy' ? 'border-[8px]' :
        exam.borderStyle === 'groove' ? 'border-[8px] !border-slate-300' :
        exam.borderStyle === 'dotted' ? 'border-4 border-dotted' :
        exam.borderStyle === 'none' ? 'border-0' :
        'border-2'
      }`} style={exam.borderStyle === 'groove' ? { borderStyle: 'groove' } : {}}>
        <header className="text-center border-b-4 border-slate-900 pb-10 mb-10 relative">
          {exam.schoolLogoUrl && (
            <div className="absolute top-0 left-0 w-24 h-24 no-print">
              <img src={exam.schoolLogoUrl} alt="School Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          )}
          <h1 className="text-4xl font-black uppercase mb-2">{exam.instituteName}</h1>
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em]">
            {exam.subject} - {exam.paperType === 'revision' ? 'Revision Guide' : (exam.paperType === 'question_bank' ? 'Question Bank' : (mode === 'answer' ? 'Answer Key' : 'Assessment'))}
          </h2>
          
          {/* STUDENT INFO FIELDS */}
          {exam.paperType !== 'question_bank' && (
            <div className="mt-10 grid grid-cols-3 gap-8 border-y-2 border-slate-100 py-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400">Name:</span>
                <div className="flex-1 border-b border-slate-300 h-6"></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400">Roll No:</span>
                <div className="flex-1 border-b border-slate-300 h-6"></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400">Section:</span>
                <div className="flex-1 border-b border-slate-300 h-6"></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 mt-8 text-[10px] font-black uppercase tracking-wider px-10">
             <div className="text-left">
               <div>Grade: {exam.gradeLevel}</div>
               <div className="opacity-60 mt-1">{exam.board} • {exam.syllabus}</div>
             </div>
             <div className="text-center">Duration: {exam.duration}</div>
             <div className="text-right">
               {mode === 'answer' ? 'Teacher Reference' : (exam.paperType === 'revision' ? 'Study Matrix' : (exam.paperType === 'question_bank' ? 'Resource Bank' : `Max Marks: ${exam.totalMarks}`))}
             </div>
          </div>
        </header>

        {exam.referenceImageUrl && mode === 'question' && (
          <div className="mb-12 flex justify-center">
            <div className="max-w-2xl border-2 border-slate-100 p-4 rounded-xl">
              <img src={exam.referenceImageUrl} alt="Reference Diagram" className="w-full h-auto rounded-lg" referrerPolicy="no-referrer" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 text-center">Fig 1.1: Reference Material</p>
            </div>
          </div>
        )}

        {/* GENERAL INSTRUCTIONS */}
        {exam.generalInstructions && mode === 'question' && (
          <div className="mb-12 p-8 border-2 border-slate-900 rounded-sm">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">General Instructions</h4>
            <div className="text-sm font-medium text-slate-700 whitespace-pre-wrap leading-relaxed">
              {exam.generalInstructions}
            </div>
          </div>
        )}

        <div className="space-y-16">
          {exam.sections.map((section, sIdx) => (
            <div key={section.id}>
              <h3 className="text-2xl font-black border-b-2 border-slate-900 pb-2 mb-8 uppercase tracking-tighter">
                {exam.paperType === 'revision' ? `Module ${sIdx + 1}` : `Section ${String.fromCharCode(65 + sIdx)}`}: {section.title}
              </h3>
              
              {section.summary && mode === 'question' && (
                <div className="mb-10 p-8 bg-slate-50 border-2 border-slate-200 rounded-3xl">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <i className="fas fa-lightbulb text-amber-400"></i> Key Concepts & Summary
                  </div>
                  <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                    {section.summary}
                  </div>
                </div>
              )}

              {section.instructions && mode === 'question' && (
                <p className="text-xs font-bold text-slate-500 italic mb-8">Instructions: {section.instructions}</p>
              )}
              
              <div className="space-y-12">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 border-b border-slate-100 pb-2">
                  {mode === 'answer' ? 'Solution Guide' : (exam.paperType === 'revision' ? 'Practice Application' : 'Questions')}
                </div>
                {section.questions.map((q, qIdx) => (
                  <div key={q.id} className="relative">
                    <div className="flex justify-between gap-6">
                      <div className="flex-1">
                        <span className="font-black mr-3">{qIdx + 1}.</span>
                        <div className="inline">
                          {q.passageText && mode === 'question' && (
                            <div className="mb-8 p-8 border-2 border-slate-100 bg-slate-50 font-serif text-lg leading-relaxed italic rounded-2xl shadow-inner">
                              <span className="block text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">
                                {exam.synthesisMode === 'applied' ? 'CASE SCENARIO' : 'READING PASSAGE'}
                              </span>
                              {q.passageText}
                            </div>
                          )}
                          <span className="font-bold text-lg">{q.text}</span>
                        </div>

                        {q.options && (
                          <div className="grid grid-cols-2 mt-6 gap-4 pl-8">
                             {q.options.map((o, oi) => (
                               <div key={oi} className="flex gap-4 items-center">
                                 <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-black">{String.fromCharCode(65+oi)}</span>
                                 <span className={`font-medium ${mode === 'answer' && q.correctAnswer.includes(String.fromCharCode(65+oi)) ? 'text-emerald-600 font-black' : ''}`}>{o}</span>
                               </div>
                             ))}
                          </div>
                        )}

                        {q.subQuestions && (
                          <div className="mt-8 ml-8 space-y-6">
                            {q.subQuestions.map((sq, si) => (
                              <div key={sq.id} className="flex justify-between items-start gap-4">
                                <div>
                                  <span className="font-black text-slate-400 mr-2">({String.fromCharCode(97+si)})</span>
                                  <span className="font-semibold">{sq.text}</span>
                                  {mode === 'answer' && (
                                    <div className="mt-2 text-xs font-black text-emerald-600">
                                      Ans: {sq.correctAnswer}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[10px] font-black text-slate-300">[{sq.marks}]</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-black text-slate-300 whitespace-nowrap">[{q.marks} marks]</span>
                    </div>

                    {mode === 'answer' && (
                      <div className="mt-6 ml-10 p-6 bg-slate-50 border-l-4 border-slate-900 rounded-r-2xl animate-in zoom-in-95">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Teacher Reference</div>
                         <p className="font-black text-slate-800 mb-2">Correct Answer: {q.correctAnswer}</p>
                         {q.solutionLogic && (
                           <div className="mt-4 pt-4 border-t border-slate-200">
                             <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">Logic/Reasoning:</span>
                             <p className="text-xs italic text-slate-600 leading-relaxed">{q.solutionLogic}</p>
                           </div>
                         )}
                         {q.markingRubric && (
                           <div className="mt-4 pt-4 border-t border-slate-200">
                             <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">Marking Rubric:</span>
                             <p className="text-xs text-slate-500 italic">{q.markingRubric}</p>
                           </div>
                         )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamPreview;

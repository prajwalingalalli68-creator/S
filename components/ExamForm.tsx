
import React, { useState } from 'react';
import { GenerationConfig, BorderStyle } from '../types';

interface ExamFormProps {
  onSubmit: (config: GenerationConfig) => void;
  isLoading: boolean;
}

const SUBJECT_OPTIONS = [
  "S.S.T", "SCIENCE", "MATHEMATICS", "KANNADA", "ENGLISH", "HINDI", "COMPUTER"
];

const GRADE_OPTIONS = [
  "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"
];

const BORDER_OPTIONS: { value: BorderStyle; label: string }[] = [
  { value: 'none', label: 'Borderless' },
  { value: 'simple', label: 'Simple' },
  { value: 'double', label: 'Double' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'fancy', label: 'Royal' },
];

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<GenerationConfig>({
    instituteName: '',
    schoolLogoUrl: '',
    referenceImageUrl: '',
    subject: 'SCIENCE',
    topic: '',
    gradeLevel: 'Class 10',
    difficulty: 'Intermediate',
    fromLesson: '',
    toLesson: '',
    generalInstructions: '1. All questions are compulsory.\n2. Write neatly and legibly.',
    duration: '2 Hours',
    maxMarks: 100,
    borderStyle: 'simple',
    pageCount: 'Auto',
    sectionCount: 3,
    mainsNames: '',
    passageGenre: 'General',
    questionCounts: {
      mcq: 5,
      true_false: 5,
      short_answer: 2,
      essay: 1,
      fill_in_the_blank: 2,
      matching: 1,
      unseen_passage: 0,
      unseen_poem: 0
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('count_')) {
      const qType = name.replace('count_', '');
      setFormData(prev => ({
        ...prev,
        questionCounts: { ...prev.questionCounts, [qType]: parseInt(value) || 0 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'schoolLogoUrl' | 'referenceImageUrl') => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, [field]: ev.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-12 pb-32">
      
      {/* 1. BRAND MODULE (CYAN) */}
      <div className="glass-panel rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
              <i className="fas fa-university text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm heading-font">Studio Branding</h3>
              <p className="text-cyan-100 text-[10px] font-bold uppercase opacity-70">Identity Matrix 01</p>
            </div>
          </div>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Institute Name</label>
            <input
              required
              type="text"
              name="instituteName"
              placeholder="Ex: St. Xavier's Global Academy"
              className="w-full bg-slate-900/50 border border-slate-700/50 px-6 py-4 rounded-2xl text-white font-bold placeholder:text-slate-600 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none"
              value={formData.instituteName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Institute Seal</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-3xl hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer transition-all group/up">
              {formData.schoolLogoUrl ? (
                <img src={formData.schoolLogoUrl} className="h-24 object-contain" />
              ) : (
                <div className="flex flex-col items-center">
                  <i className="fas fa-cloud-upload-alt text-2xl text-slate-500 group-hover/up:text-cyan-400 transition-colors"></i>
                  <span className="text-[10px] font-black text-slate-500 uppercase mt-2">Upload PNG/JPG</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'schoolLogoUrl')} />
            </label>
          </div>
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ref Images</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-3xl hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer transition-all group/up">
              {formData.referenceImageUrl ? (
                <img src={formData.referenceImageUrl} className="h-24 object-contain" />
              ) : (
                <div className="flex flex-col items-center">
                  <i className="fas fa-image text-2xl text-slate-500 group-hover/up:text-blue-400 transition-colors"></i>
                  <span className="text-[10px] font-black text-slate-500 uppercase mt-2">Diagrams/Charts</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'referenceImageUrl')} />
            </label>
          </div>
        </div>
      </div>

      {/* 2. SYLLABUS MODULE (EMERALD) */}
      <div className="glass-panel rounded-[2.5rem] overflow-hidden group hover:border-emerald-500/50 transition-all duration-500">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
              <i className="fas fa-flask text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm heading-font">Academic Logic</h3>
              <p className="text-emerald-100 text-[10px] font-bold uppercase opacity-70">Subject Matrix 02</p>
            </div>
          </div>
        </div>
        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Subject</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {SUBJECT_OPTIONS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, subject: s }))}
                    className={`py-3 px-2 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all border-2 ${
                      formData.subject === s 
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-105' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-emerald-500/30 hover:text-emerald-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Grade</label>
              <select
                name="gradeLevel"
                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl text-white font-bold outline-none focus:border-emerald-500"
                value={formData.gradeLevel}
                onChange={handleChange}
              >
                {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Total Score</label>
              <input
                type="number"
                name="maxMarks"
                className="w-full bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl text-white font-bold outline-none focus:border-emerald-500"
                value={formData.maxMarks}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-white/5 space-y-6">
              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-map-marked-alt"></i> Syllabus Scope
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fromLesson"
                  placeholder="From"
                  className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-sm font-bold text-white outline-none focus:border-emerald-500"
                  value={formData.fromLesson || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="toLesson"
                  placeholder="To"
                  className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-sm font-bold text-white outline-none focus:border-emerald-500"
                  value={formData.toLesson || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Instruction Set</label>
               <textarea
                 name="generalInstructions"
                 className="w-full bg-slate-950 border border-slate-800 px-6 py-4 rounded-2xl text-sm font-medium text-slate-300 h-28 outline-none focus:border-emerald-500 resize-none"
                 value={formData.generalInstructions}
                 onChange={handleChange}
               />
            </div>
          </div>
        </div>
      </div>

      {/* 3. TAXONOMY MODULE (ROSE) */}
      <div className="glass-panel rounded-[2.5rem] overflow-hidden group hover:border-rose-500/50 transition-all duration-500">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
              <i className="fas fa-dna text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm heading-font">Question DNA</h3>
              <p className="text-rose-100 text-[10px] font-bold uppercase opacity-70">Taxonomy Matrix 03</p>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'mcq', label: 'MCQs', icon: 'fa-tasks', color: 'text-cyan-400' },
              { id: 'true_false', label: 'T/F', icon: 'fa-toggle-on', color: 'text-emerald-400' },
              { id: 'fill_in_the_blank', label: 'Blanks', icon: 'fa-underline', color: 'text-amber-400' },
              { id: 'matching', label: 'Match', icon: 'fa-link', color: 'text-indigo-400' },
              { id: 'short_answer', label: 'Short', icon: 'fa-pen-fancy', color: 'text-rose-400' },
              { id: 'essay', label: 'Essay', icon: 'fa-feather', color: 'text-pink-400' },
              { id: 'unseen_passage', label: 'Passage', icon: 'fa-book-open', color: 'text-violet-400' },
              { id: 'unseen_poem', label: 'Poem', icon: 'fa-masks-theater', color: 'text-orange-400' },
            ].map(q => (
              <div key={q.id} className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 group/card hover:border-rose-500/20 transition-all">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 group-hover/card:text-rose-400 transition-colors">
                  <i className={`fas ${q.icon} ${q.color}`}></i>
                  {q.label}
                </label>
                <input
                  type="number"
                  min="0"
                  name={`count_${q.id}`}
                  className="w-full bg-transparent border-b-2 border-slate-800 focus:border-rose-500 transition-all text-2xl font-black text-white outline-none pb-2 text-center"
                  value={(formData.questionCounts as any)[q.id]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL SUBMIT BUTTON */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-[100] no-print">
        <button
          disabled={isLoading}
          type="submit"
          className="neo-button w-full h-24 bg-gradient-to-r from-cyan-500 via-violet-600 to-rose-600 text-white rounded-[3rem] font-black text-3xl heading-font shadow-[0_20px_80px_rgba(139,92,246,0.6)] disabled:opacity-50 flex items-center justify-center gap-8 group"
        >
          {isLoading ? (
            <>
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="animate-pulse">Engineering Studio...</span>
            </>
          ) : (
            <>
              <i className="fas fa-bolt text-amber-400 group-hover:scale-125 transition-transform"></i>
              <span>FORGE UEPG MASTER</span>
              <i className="fas fa-sparkles text-cyan-300 animate-pulse"></i>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ExamForm;


import React, { useState } from 'react';
import { GenerationConfig, SynthesisMode, BoardType, BorderStyle, SyllabusType } from '../types';

interface ExamFormProps {
  onSubmit: (config: GenerationConfig) => void;
  isLoading: boolean;
}

const MODES: { id: SynthesisMode; label: string; desc: string; icon: string; color: string }[] = [
  { id: 'standard', label: 'Standard', desc: 'Balanced (30/40/30) Academic Paper', icon: 'fa-file-invoice', color: 'from-cyan-500 to-blue-600' },
  { id: 'competitive', label: 'Elite', desc: 'High-Difficulty MCQs & Logic', icon: 'fa-trophy', color: 'from-violet-500 to-purple-700' },
  { id: 'applied', label: 'Applied', desc: 'Case Studies & Real-world Scenarios', icon: 'fa-microscope', color: 'from-rose-500 to-pink-600' },
  { id: 'foundational', label: 'Quick Check', desc: 'Vocab, Matching & Basic Literacy', icon: 'fa-spell-check', color: 'from-amber-500 to-orange-600' }
];

const SUBJECTS = ["S.S.T", "SCIENCE", "MATHEMATICS", "KANNADA", "ENGLISH", "HINDI", "COMPUTER"];
const GRADES = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const BOARDS: BoardType[] = ["CBSE", "STATE", "KANNADA MEDIUM"];
const SYLLABI: SyllabusType[] = ["Cambridge", "NCERT", "Universal Science", "Siri Kannada"];
const BORDERS: { id: BorderStyle; label: string }[] = [
  { id: 'simple', label: 'Simple' },
  { id: 'double', label: 'Double' },
  { id: 'dashed', label: 'Dashed' },
  { id: 'fancy', label: 'Fancy' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'heavy', label: 'Heavy' },
  { id: 'groove', label: '3D Groove' },
  { id: 'dotted', label: 'Dotted' },
  { id: 'none', label: 'None' }
];

const PASSAGE_GENRES = [
  "Fictional Narrative", "Scientific Article", "Historical Account", "Biographical Sketch", 
  "Philosophical Essay", "Environmental Report", "Technological Review", "Cultural Analysis",
  "Poetic Expression", "Dramatic Dialogue", "News Editorial", "Travelogue"
];

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<GenerationConfig>({
    paperType: 'exam',
    instituteName: '',
    schoolLogoUrl: '',
    referenceImageUrl: '',
    subject: 'SCIENCE',
    gradeLevel: 'Class 10',
    board: 'CBSE',
    syllabus: 'NCERT',
    difficulty: 'Intermediate',
    synthesisMode: 'standard',
    fromLesson: '',
    toLesson: '',
    generalInstructions: '1. All questions are compulsory.\n2. Write neatly and legibly.',
    duration: '1 Hour',
    maxMarks: 50,
    borderStyle: 'simple',
    pageCount: '2 Pages',
    sectionCount: 3,
    mainsNames: '',
    passageGenre: 'Fictional Narrative',
    questionCounts: {
      mcq: 10,
      true_false: 0,
      short_answer: 5,
      essay: 2,
      fill_in_the_blank: 0,
      matching: 0,
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

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-12 pb-40">
      
      {/* PAPER TYPE SELECTOR */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-900/80 p-2 rounded-[2rem] border border-white/10 flex gap-2">
          <button
            type="button"
            onClick={() => setFormData(p => ({ ...p, paperType: 'exam' }))}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all ${formData.paperType === 'exam' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Assessment Paper
          </button>
          <button
            type="button"
            onClick={() => setFormData(p => ({ ...p, paperType: 'revision' }))}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all ${formData.paperType === 'revision' ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Revision Guide
          </button>
          <button
            type="button"
            onClick={() => setFormData(p => ({ ...p, paperType: 'question_bank' }))}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all ${formData.paperType === 'question_bank' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Question Bank
          </button>
        </div>
      </div>

      {/* MODE SELECTOR */}
      {formData.paperType === 'exam' && (
        <div className="glass-panel rounded-[3rem] p-12 border border-white/10 neon-border animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-white font-black uppercase tracking-[0.3em] text-lg heading-font mb-10 flex items-center gap-4">
            <i className="fas fa-microchip text-cyan-400"></i> Synthesis Persona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODES.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setFormData(p => ({ ...p, synthesisMode: m.id }))}
                className={`p-8 rounded-[2.5rem] text-left transition-all border-2 relative overflow-hidden group ${formData.synthesisMode === m.id ? `bg-gradient-to-br ${m.color} border-white shadow-2xl scale-105 z-10` : 'bg-slate-900/50 border-white/5 hover:border-white/20'}`}
              >
                <i className={`fas ${m.icon} text-2xl mb-6 ${formData.synthesisMode === m.id ? 'text-white' : 'text-slate-500'}`}></i>
                <h4 className={`font-black uppercase tracking-widest text-sm mb-2 ${formData.synthesisMode === m.id ? 'text-white' : 'text-slate-300'}`}>{m.label}</h4>
                <p className={`text-[10px] font-bold leading-relaxed ${formData.synthesisMode === m.id ? 'text-white/80' : 'text-slate-500'}`}>{m.desc}</p>
                {formData.synthesisMode === m.id && <div className="absolute top-4 right-4 text-white animate-pulse"><i className="fas fa-check-circle"></i></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* REMAINDER OF FORM */}
      <div className="glass-panel rounded-[3rem] p-12 border border-white/10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Institute / School Name</label>
            <input required type="text" name="instituteName" placeholder="Enter school name" className="w-full bg-white/5 border border-white/10 px-8 py-6 rounded-[2rem] text-white font-black text-xl outline-none focus:border-cyan-500" value={formData.instituteName} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-4">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, difficulty: d as any }))}
                  className={`py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${formData.difficulty === d ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">School Logo URL</label>
            <input type="text" name="schoolLogoUrl" placeholder="https://example.com/logo.png" className="w-full bg-white/5 border border-white/10 px-8 py-4 rounded-[1.5rem] text-white font-medium outline-none focus:border-cyan-500" value={formData.schoolLogoUrl} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Reference Image URL</label>
            <input type="text" name="referenceImageUrl" placeholder="https://example.com/diagram.png" className="w-full bg-white/5 border border-white/10 px-8 py-4 rounded-[1.5rem] text-white font-medium outline-none focus:border-cyan-500" value={formData.referenceImageUrl} onChange={handleChange} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Subject</label>
              <select name="subject" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500 appearance-none" value={formData.subject} onChange={handleChange}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
           </div>
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Board / Medium</label>
              <select name="board" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500 appearance-none" value={formData.board} onChange={handleChange}>
                {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
           </div>
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Syllabus</label>
              <select name="syllabus" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500 appearance-none" value={formData.syllabus} onChange={handleChange}>
                {SYLLABI.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Grade / Class</label>
              <select name="gradeLevel" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500 appearance-none" value={formData.gradeLevel} onChange={handleChange}>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
           </div>
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Max Marks</label>
              <input type="number" name="maxMarks" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.maxMarks} onChange={handleChange} />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">From Lesson</label>
              <input type="text" name="fromLesson" placeholder="e.g. Lesson 1" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.fromLesson} onChange={handleChange} />
           </div>
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Till Lesson</label>
              <input type="text" name="toLesson" placeholder="e.g. Lesson 5" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.toLesson} onChange={handleChange} />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Number of Sections</label>
              <input type="number" name="sectionCount" min="1" max="10" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.sectionCount} onChange={handleChange} />
           </div>
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Mains Names (Comma Separated)</label>
              <input type="text" name="mainsNames" placeholder="e.g. Grammar, Literature, Writing" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.mainsNames} onChange={handleChange} />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Duration (Time)</label>
              <input type="text" name="duration" placeholder="e.g. 1 Hour 30 Mins" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.duration} onChange={handleChange} />
           </div>
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Target Page Count</label>
              <select name="pageCount" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500 appearance-none" value={formData.pageCount} onChange={handleChange}>
                <option value="1 Page">1 Page</option>
                <option value="2 Pages">2 Pages</option>
                <option value="3 Pages">3 Pages</option>
                <option value="4+ Pages">4+ Pages</option>
              </select>
           </div>
        </div>

        <div className="space-y-6">
           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Border Style</label>
           <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
             {BORDERS.map(b => (
               <button
                 key={b.id}
                 type="button"
                 onClick={() => setFormData(p => ({ ...p, borderStyle: b.id }))}
                 className={`group relative flex flex-col items-center justify-center gap-3 p-3 rounded-2xl border transition-all ${formData.borderStyle === b.id ? 'bg-white/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-900/50 border-white/5 hover:bg-white/5 hover:border-white/10'}`}
               >
                 <div className={`w-8 h-6 bg-white ${
                   b.id === 'double' ? 'border-[3px] border-double border-slate-900' :
                   b.id === 'dashed' ? 'border-2 border-dashed border-slate-900' :
                   b.id === 'fancy' ? 'border-[3px] border-slate-900 outline outline-1 outline-offset-[-2px] outline-slate-400' :
                   b.id === 'rounded' ? 'border-2 border-slate-900 rounded-md' :
                   b.id === 'heavy' ? 'border-[3px] border-slate-900' :
                   b.id === 'groove' ? 'border-[3px] border-slate-300' :
                   b.id === 'dotted' ? 'border-2 border-dotted border-slate-900' :
                   b.id === 'none' ? 'border border-slate-200' :
                   'border-2 border-slate-900'
                 }`} style={b.id === 'groove' ? { borderStyle: 'groove' } : {}}></div>
                 <span className={`text-[9px] font-black uppercase tracking-wider text-center ${formData.borderStyle === b.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{b.label}</span>
               </button>
             ))}
           </div>
        </div>

        {/* LANGUAGE SPECIFIC OPTIONS */}
        <div className="glass-panel rounded-[2rem] p-8 border border-white/5 bg-white/5 space-y-8">
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3">
            <i className="fas fa-language text-indigo-400"></i> Language & Unseen Content
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Unseen Passages</label>
              <input type="number" name="count_unseen_passage" min="0" max="5" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.questionCounts.unseen_passage} onChange={handleChange} />
            </div>
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Unseen Poems</label>
              <input type="number" name="count_unseen_poem" min="0" max="5" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500" value={formData.questionCounts.unseen_poem} onChange={handleChange} />
            </div>
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Passage/Poem Genre</label>
              <select name="passageGenre" className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-black outline-none focus:border-cyan-500 appearance-none" value={formData.passageGenre} onChange={handleChange}>
                {PASSAGE_GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* QUESTION COUNTS */}
        <div className="glass-panel rounded-[2rem] p-8 border border-white/5 bg-white/5 space-y-8">
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3">
            <i className="fas fa-list-ol text-cyan-400"></i> Question Distribution
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'mcq', label: 'MCQs' },
              { id: 'true_false', label: 'True/False' },
              { id: 'short_answer', label: 'Short Ans' },
              { id: 'essay', label: 'Long Ans' },
              { id: 'fill_in_the_blank', label: 'Fill Blanks' },
              { id: 'matching', label: 'Matching' }
            ].map(q => (
              <div key={q.id} className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{q.label}</label>
                <input type="number" name={`count_${q.id}`} min="0" className="w-full bg-slate-900 border border-white/5 px-4 py-3 rounded-xl text-white font-black outline-none focus:border-cyan-500" value={formData.questionCounts[q.id as keyof typeof formData.questionCounts]} onChange={handleChange} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">General Instructions / Rules</label>
           <textarea 
             name="generalInstructions" 
             rows={4} 
             className="w-full bg-slate-900 border border-white/5 px-6 py-4 rounded-2xl text-white font-medium outline-none focus:border-cyan-500 resize-none" 
             value={formData.generalInstructions} 
             onChange={handleChange}
             placeholder="Enter rules for the paper..."
           />
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-10 z-[100] no-print">
        <button disabled={isLoading} type="submit" className="neo-button w-full h-24 text-white rounded-[3rem] font-black text-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 shadow-2xl flex items-center justify-center gap-6">
          {isLoading ? <i className="fas fa-atom animate-spin"></i> : <i className="fas fa-bolt-lightning text-amber-300"></i>}
          LAUNCH SYNTHESIS
        </button>
      </div>
    </form>
  );
};

export default ExamForm;

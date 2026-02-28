
export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'essay' | 'fill_in_the_blank' | 'matching' | 'unseen_passage' | 'unseen_poem';
export type SynthesisMode = 'standard' | 'competitive' | 'applied' | 'foundational';
export type PaperType = 'exam' | 'revision' | 'question_bank';
export type BoardType = 'CBSE' | 'STATE' | 'KANNADA MEDIUM';
export type SyllabusType = 'Cambridge' | 'NCERT' | 'Universal Science' | 'Siri Kannada';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; 
  correctAnswer: string;
  markingRubric?: string; 
  solutionLogic?: string; // New: Explaining why the answer is right (Competitive Mode)
  marks: number;
  matchingPairs?: { left: string; right: string }[]; 
  passageText?: string; // For unseen passages or "Case Study Scenarios"
  subQuestions?: Question[]; 
}

export interface ExamSection {
  id: string;
  title: string;
  instructions: string;
  summary?: string; // New: For revision papers
  questions: Question[];
}

export type BorderStyle = 'simple' | 'double' | 'dashed' | 'fancy' | 'none' | 'rounded' | 'heavy' | 'groove' | 'dotted';

export interface ExamPaper {
  id: string;
  title: string;
  paperType: PaperType; // New
  instituteName: string;
  schoolLogoUrl?: string;
  referenceImageUrl?: string;
  subject: string;
  gradeLevel: string;
  board: BoardType;
  syllabus: SyllabusType;
  duration: string;
  totalMarks: number;
  borderStyle: BorderStyle;
  generalInstructions?: string;
  synthesisMode: SynthesisMode;
  sections: ExamSection[];
  createdAt: number;
}

export interface AppMetadata {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  category: string;
  isNew?: boolean;
}

export interface GenerationConfig {
  paperType: PaperType; // New
  instituteName: string;
  schoolLogoUrl?: string;
  referenceImageUrl?: string;
  subject: string;
  gradeLevel: string;
  board: BoardType;
  syllabus: SyllabusType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  synthesisMode: SynthesisMode; // New
  fromLesson?: string;
  toLesson?: string;
  generalInstructions?: string;
  duration: string;
  maxMarks: number;
  borderStyle: BorderStyle;
  pageCount?: string;
  sectionCount: number;
  mainsNames?: string;
  passageGenre?: string; 
  questionCounts: {
    mcq: number;
    true_false: number;
    short_answer: number;
    essay: number;
    fill_in_the_blank: number;
    matching: number;
    unseen_passage: number;
    unseen_poem: number;
  };
}

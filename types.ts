
export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'essay' | 'fill_in_the_blank' | 'matching' | 'unseen_passage' | 'unseen_poem';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // Only for MCQ
  correctAnswer: string;
  marks: number;
  matchingPairs?: { left: string; right: string }[]; // Only for matching
  passageText?: string; // For unseen passages/poems
  subQuestions?: Question[]; // For questions nested under a passage
}

export interface ExamSection {
  id: string;
  title: string;
  instructions: string;
  questions: Question[];
}

export type BorderStyle = 'simple' | 'double' | 'dashed' | 'fancy' | 'none';

export interface ExamPaper {
  id: string;
  title: string;
  instituteName: string;
  schoolLogoUrl?: string;
  referenceImageUrl?: string;
  subject: string;
  gradeLevel: string;
  duration: string;
  totalMarks: number;
  borderStyle: BorderStyle;
  generalInstructions?: string;
  sections: ExamSection[];
  createdAt: number;
}

export interface GenerationConfig {
  instituteName: string;
  schoolLogoUrl?: string;
  referenceImageUrl?: string;
  topic: string;
  subject: string;
  gradeLevel: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  fromLesson?: string;
  toLesson?: string;
  generalInstructions?: string;
  duration: string;
  maxMarks: number;
  borderStyle: BorderStyle;
  pageCount?: string;
  sectionCount: number;
  mainsNames?: string;
  passageGenre?: string; // e.g., "Scientific", "Historical", "Moral", "Nature"
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

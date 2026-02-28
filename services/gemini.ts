
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationConfig, ExamPaper } from "../types";

export const generateExamPaper = async (config: GenerationConfig): Promise<ExamPaper> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let systemInstruction = "";
  let modeSpecificPrompt = "";

  const syllabus = config.syllabus;
  const boardContext = config.board === 'KANNADA MEDIUM' 
    ? "Language: Kannada. Medium: Kannada Medium. The entire paper (questions, instructions, summaries) MUST be in the KANNADA language." 
    : `Board: ${config.board}.`;
  
  const lessonRange = (config.fromLesson || config.toLesson) 
    ? ` covering from ${config.fromLesson || 'start'} till ${config.toLesson || 'end'}` 
    : ' covering the entire syllabus';

  const structureContext = ` The paper must be divided into ${config.sectionCount} sections. ${config.mainsNames ? `The primary headings (Mains) should be: ${config.mainsNames}.` : ''}`;
  const passageContext = (config.questionCounts.unseen_passage > 0 || config.questionCounts.unseen_poem > 0)
    ? ` Include ${config.questionCounts.unseen_passage} unseen passage(s) and ${config.questionCounts.unseen_poem} unseen poem(s) of the genre: ${config.passageGenre || 'General'}.`
    : '';
  const pageContext = config.pageCount ? ` The content should be sufficient to fill approximately ${config.pageCount} of standard A4 paper.` : '';

  if (config.paperType === 'question_bank') {
    systemInstruction = `Role: You are a Question Bank Architect. Task: Generate a large set of diverse questions.
    Syllabus Context: Strictly follow the ${syllabus}. ${boardContext}
    Goal: Provide a wide variety of questions ranging from simple recall to complex analysis.
    Structure: Organize by question type. Provide detailed "correctAnswer" and "solutionLogic" for every question.
    Focus on coverage of the specified scope.`;
    modeSpecificPrompt = `Generate a comprehensive question bank for ${config.subject}${lessonRange} for ${config.gradeLevel} (${config.board}). Include a mix of all requested question types with detailed answers.`;
  } else if (config.paperType === 'revision') {
    systemInstruction = `Role: You are a Revision Specialist. Task: Generate a comprehensive revision guide and practice paper.
    Syllabus Context: Strictly follow the ${syllabus}. ${boardContext}${pageContext}${structureContext}
    Structure: For each section, provide a "summary" field containing key concepts, formulas, or bullet points for quick review.
    Follow the summary with relevant practice questions.
    Focus on clarity, scannability, and high-yield information.`;
    modeSpecificPrompt = `Create a revision paper for ${config.subject}${lessonRange} based on ${syllabus} (${config.board}). Include detailed summaries for each section.`;
  } else {
    switch (config.synthesisMode) {
      case 'competitive':
        systemInstruction = `Role: You are a Competitive Exam Coach. Task: Generate a high-difficulty MCQ paper. 
        Syllabus Context: Strictly follow the ${syllabus}. ${boardContext}${pageContext}${structureContext}${passageContext}
        Rules: Each MCQ has 4 options. Distractors must be based on common student misconceptions. 
        Include one "assertion-reasoning" type question per section. Only one clearly correct answer exists. 
        Provide "solutionLogic" for every question explaining the reasoning.`;
        modeSpecificPrompt = `Create ${config.questionCounts.mcq} elite-level MCQs for ${config.subject} (${syllabus}, ${config.board})${lessonRange}.`;
        break;

      case 'applied':
        systemInstruction = `Role: You are a Case Study Architect. Focus on real-world application. 
        Syllabus Context: Strictly follow the ${syllabus}. ${boardContext}${pageContext}${structureContext}${passageContext}
        Task: For each section, first write a 200-word "Scenario" or "Case Study" based on the subject matter. 
        Follow the scenario with analytical questions that require students to use the text to solve problems. 
        Focus on "How" and "Why" rather than "What". Questions should be placed in the "subQuestions" array of a passage type question.`;
        modeSpecificPrompt = `Architect a case-driven assessment for ${config.subject} (${syllabus}, ${config.board})${lessonRange}. Provide rich scenarios.`;
        break;

      case 'foundational':
        systemInstruction = `Role: You are a Foundational Literacy Educator. Task: Create a vocabulary and concept check. 
        Syllabus Context: Strictly follow the ${syllabus}. ${boardContext}${pageContext}${structureContext}${passageContext}
        Structure: Use 'Fill in the blanks' with a Word Bank provided in instructions, 'Matching', and 'True or False' where students must correct False statements.`;
        modeSpecificPrompt = `Generate foundational literacy checks for ${config.subject} (${syllabus}, ${config.board})${lessonRange}.`;
        break;

      case 'standard':
      default:
        systemInstruction = `Role: You are a Professional Examiner. Generate a balanced paper. 
        Syllabus Context: Strictly follow the ${syllabus}. ${boardContext}${pageContext}${structureContext}${passageContext}
        Distribution: 30% Recall (Direct facts), 40% Understanding (Explaining concepts), 30% Application (Solving problems). 
        Structure: Section A (Objective), Section B (Short Answer), Section C (Long Answer). Include Marking Rubrics.`;
        modeSpecificPrompt = `Generate a standard paper for ${config.subject} (${syllabus}, ${config.board})${lessonRange}.`;
        break;
    }
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Subject: ${config.subject}, Grade: ${config.gradeLevel}, Board: ${config.board}, Difficulty: ${config.difficulty}${lessonRange}.${pageContext}${structureContext}${passageContext} ${modeSpecificPrompt}`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                instructions: { type: Type.STRING },
                summary: { type: Type.STRING, description: "Key concepts or summary for revision (optional)" },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      type: { type: Type.STRING },
                      text: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      correctAnswer: { type: Type.STRING },
                      markingRubric: { type: Type.STRING },
                      solutionLogic: { type: Type.STRING },
                      marks: { type: Type.NUMBER },
                      matchingPairs: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { left: { type: Type.STRING }, right: { type: Type.STRING } } } },
                      passageText: { type: Type.STRING },
                      subQuestions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, text: { type: Type.STRING }, marks: { type: Type.NUMBER }, correctAnswer: { type: Type.STRING }, markingRubric: { type: Type.STRING }, solutionLogic: { type: Type.STRING } }, required: ["id", "text", "marks", "correctAnswer"] } }
                    },
                    required: ["id", "type", "text", "marks"]
                  }
                }
              },
              required: ["id", "title", "instructions", "questions"]
            }
          }
        },
        required: ["title", "sections"]
      }
    }
  });

  const rawData = JSON.parse(response.text || "{}");
  return {
    ...rawData,
    id: crypto.randomUUID(),
    paperType: config.paperType,
    instituteName: config.instituteName,
    schoolLogoUrl: config.schoolLogoUrl,
    referenceImageUrl: config.referenceImageUrl,
    subject: config.subject,
    gradeLevel: config.gradeLevel,
    board: config.board,
    syllabus: config.syllabus,
    generalInstructions: config.generalInstructions,
    duration: config.duration,
    totalMarks: config.maxMarks,
    borderStyle: config.borderStyle,
    synthesisMode: config.synthesisMode,
    createdAt: Date.now()
  };
};

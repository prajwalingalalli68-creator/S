
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationConfig, ExamPaper } from "../types";

export const generateExamPaper = async (config: GenerationConfig): Promise<ExamPaper> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const lessonRange = config.fromLesson && config.toLesson 
    ? `Scope: Covering content from ${config.fromLesson} up to ${config.toLesson}.` 
    : '';

  const mainsInstructions = config.mainsNames 
    ? `Organize the paper into exactly ${config.sectionCount} sections using these specific headings in order: ${config.mainsNames}.` 
    : `Organize the paper into exactly ${config.sectionCount} logical sections/mains.`;

  const pageInstruction = config.pageCount && config.pageCount !== 'Auto'
    ? `Ensure the volume of questions corresponds to approximately ${config.pageCount} A4 pages of printed content.`
    : '';

  const passageGenreInfo = (config.questionCounts.unseen_passage > 0 || config.questionCounts.unseen_poem > 0)
    ? `The unseen passages or poems should be based on the "${config.passageGenre}" genre/theme.`
    : '';

  const imageContext = config.referenceImageUrl 
    ? `An image has been provided for reference (e.g., a diagram, chart, or map). If applicable to the subject, create at least one question that requires interpreting an image (the user will manually attach the image where you indicate [IMAGE PLACEHOLDER]).`
    : '';

  const prompt = `Generate a high-quality, professional academic exam paper.
    - Institute: ${config.instituteName}
    - Subject: ${config.subject}
    - ${lessonRange}
    - Topic Focus: ${config.topic || 'General curriculum standards'}
    - Grade: ${config.gradeLevel}
    - Difficulty: ${config.difficulty}
    - Total Marks Target: ${config.maxMarks}
    - ${mainsInstructions}
    - ${pageInstruction}
    - ${passageGenreInfo}
    - ${imageContext}
    
    Question distribution requirements: 
    - ${config.questionCounts.mcq} Multiple Choice Questions
    - ${config.questionCounts.true_false} True/False Questions
    - ${config.questionCounts.short_answer} Short Answer Questions
    - ${config.questionCounts.essay} Long Answer/Essay Questions
    - ${config.questionCounts.fill_in_the_blank} Fill in the Blanks
    - ${config.questionCounts.matching} Matching Sets (each set with 4-5 items)
    - ${config.questionCounts.unseen_passage} Comprehension Passages (with sub-questions)
    - ${config.questionCounts.unseen_poem} Poetry Comprehension (with sub-questions)

    Guidelines:
    1. Distribute marks logically to reach the target of ${config.maxMarks}.
    2. Maintain appropriate academic tone for ${config.gradeLevel}.
    3. Ensure no question repetition.
    4. For Unseen Passages/Poems, provide the text in 'passageText' and nested questions in 'subQuestions'.
    5. Return a JSON object matching the schema.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
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
                      marks: { type: Type.NUMBER },
                      matchingPairs: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            left: { type: Type.STRING },
                            right: { type: Type.STRING }
                          }
                        }
                      },
                      passageText: { type: Type.STRING },
                      subQuestions: {
                        type: Type.ARRAY,
                        items: {
                           type: Type.OBJECT,
                           properties: {
                              id: { type: Type.STRING },
                              text: { type: Type.STRING },
                              marks: { type: Type.NUMBER },
                              correctAnswer: { type: Type.STRING }
                           },
                           required: ["id", "text", "marks", "correctAnswer"]
                        }
                      }
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

  const text = response.text;
  if (!text) throw new Error("AI failed to provide a valid response.");

  try {
    const rawData = JSON.parse(text);
    return {
      ...rawData,
      id: crypto.randomUUID(),
      instituteName: config.instituteName, 
      schoolLogoUrl: config.schoolLogoUrl,
      referenceImageUrl: config.referenceImageUrl,
      subject: config.subject,
      gradeLevel: config.gradeLevel,
      generalInstructions: config.generalInstructions,
      duration: config.duration,
      totalMarks: config.maxMarks,
      borderStyle: config.borderStyle,
      createdAt: Date.now()
    };
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Could not parse AI output. Try generating again.");
  }
};

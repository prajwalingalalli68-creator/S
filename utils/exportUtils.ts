import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { ExamPaper } from "../types";

export const exportToTXT = (exam: ExamPaper, mode: 'question' | 'answer') => {
  let content = `${exam.instituteName}\n${exam.subject} - ${mode === 'answer' ? 'Answer Key' : 'Assessment'}\n`;
  content += `Grade: ${exam.gradeLevel} | Duration: ${exam.duration} | Marks: ${exam.totalMarks}\n\n`;
  
  if (exam.generalInstructions) {
    content += `General Instructions:\n${exam.generalInstructions}\n\n`;
  }

  exam.sections.forEach((section, sIdx) => {
    content += `Section ${String.fromCharCode(65 + sIdx)}: ${section.title}\n`;
    if (section.instructions) content += `Instructions: ${section.instructions}\n`;
    content += '\n';

    section.questions.forEach((q, qIdx) => {
      content += `${qIdx + 1}. ${q.text} [${q.marks} marks]\n`;
      
      if (q.passageText && mode === 'question') {
         content += `   Passage: ${q.passageText}\n`;
      }

      if (q.options && mode === 'question') {
        q.options.forEach((opt, oIdx) => {
          content += `   ${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
        });
      }

      if (q.subQuestions) {
          q.subQuestions.forEach((sq, sqIdx) => {
              content += `   (${String.fromCharCode(97 + sqIdx)}) ${sq.text} [${sq.marks}]\n`;
              if (mode === 'answer') {
                  content += `      Ans: ${sq.correctAnswer}\n`;
              }
          });
      }

      if (mode === 'answer') {
        content += `   Answer: ${q.correctAnswer}\n`;
        if (q.solutionLogic) content += `   Logic: ${q.solutionLogic}\n`;
      }
      content += '\n';
    });
    content += '\n';
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${exam.subject}_${mode}.txt`);
};

export const exportToDOCX = (exam: ExamPaper, mode: 'question' | 'answer') => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: exam.instituteName,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: `${exam.subject} - ${mode === 'answer' ? 'Answer Key' : 'Assessment'}`,
          heading: HeadingLevel.HEADING_2,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: `Grade: ${exam.gradeLevel} | Duration: ${exam.duration} | Marks: ${exam.totalMarks}`,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ text: "" }), // Spacer
        
        ...(exam.generalInstructions ? [
          new Paragraph({
            text: "General Instructions:",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: exam.generalInstructions,
          }),
          new Paragraph({ text: "" }),
        ] : []),

        ...exam.sections.flatMap((section, sIdx) => [
          new Paragraph({
            text: `Section ${String.fromCharCode(65 + sIdx)}: ${section.title}`,
            heading: HeadingLevel.HEADING_3,
          }),
          ...(section.instructions ? [new Paragraph({ text: `Instructions: ${section.instructions}`, italics: true })] : []),
          new Paragraph({ text: "" }),
          
          ...section.questions.flatMap((q, qIdx) => {
            const paragraphs = [
              new Paragraph({
                children: [
                  new TextRun({ text: `${qIdx + 1}. `, bold: true }),
                  new TextRun(q.text),
                  new TextRun({ text: ` [${q.marks} marks]`, bold: true }),
                ],
              }),
            ];

            if (q.passageText && mode === 'question') {
                paragraphs.push(
                    new Paragraph({
                        text: `Passage: ${q.passageText}`,
                        italics: true,
                        indent: { left: 720 },
                    })
                );
            }

            if (q.options && mode === 'question') {
                q.options.forEach((opt, oIdx) => {
                    paragraphs.push(
                        new Paragraph({
                            text: `   ${String.fromCharCode(65 + oIdx)}. ${opt}`,
                            indent: { left: 720 },
                        })
                    );
                });
            }

            if (q.subQuestions) {
                q.subQuestions.forEach((sq, sqIdx) => {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({ text: `   (${String.fromCharCode(97 + sqIdx)}) `, bold: true }),
                                new TextRun(sq.text),
                                new TextRun({ text: ` [${sq.marks}]`, bold: true }),
                            ],
                            indent: { left: 720 },
                        })
                    );
                    if (mode === 'answer') {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({ text: "      Ans: ", bold: true }),
                                    new TextRun(sq.correctAnswer),
                                ],
                                indent: { left: 1440 },
                            })
                        );
                    }
                });
            }

            if (mode === 'answer') {
                paragraphs.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: "   Answer: ", bold: true }),
                            new TextRun(q.correctAnswer),
                        ],
                    })
                );
                if (q.solutionLogic) {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({ text: "   Logic: ", bold: true, italics: true }),
                                new TextRun({ text: q.solutionLogic, italics: true }),
                            ],
                        })
                    );
                }
            }
            
            paragraphs.push(new Paragraph({ text: "" }));
            return paragraphs;
          }),
        ]),
      ],
    }],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${exam.subject}_${mode}.docx`);
  });
};

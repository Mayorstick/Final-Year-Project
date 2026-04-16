export type GeneratedIssueOption = {
  id: string;
  text: string;
  correct: boolean;
  feedback?: string;
};

export type GeneratedIssue = {
  id: string;
  title: string;
  issueType: string;
  issueExplanation: string;
  whoIsAffected: string[];
  whyItMatters: string;
  howToFix: {
    text: string;
    exampleCode?: string;
  };
  question: string;
  options: GeneratedIssueOption[];
};

export type GeneratedQuickCheckQuestion = {
  prompt: string;
  options: {
    id: string;
    text: string;
  }[];
  correctId: string;
};

export type GeneratedQuickCheck = {
  missionTitle: string;
  missionBonusXp: number;
  questions: [GeneratedQuickCheckQuestion, GeneratedQuickCheckQuestion];
};

export type GeneratedAIMission = {
  title: string;
  missionSource: "ai-generated";
  feedbackText: string;
  issues: [GeneratedIssue, GeneratedIssue];
  quickCheck: GeneratedQuickCheck;
};

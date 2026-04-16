export type GeneratedIssueOption = {
  id: string;
  text: string;
  correct: boolean;
};

export type GeneratedIssue = {
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

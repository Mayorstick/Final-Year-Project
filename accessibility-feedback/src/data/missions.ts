export type PersonaId = "screenReader" | "lowVision" | "keyboard" | "sunlight";

export type Mission = {
  id: string;
  personaId: PersonaId;
  title: string;
  description: string;
  issueTypes: string[]; // e.g., ["contrast", "textSpacing"]
  xpReward: number;
};

export const MISSIONS: Mission[] = [
  // LOW VISION (contrast + readability)
  {
    id: "lv-1",
    personaId: "lowVision",
    title: "Mission 1: Make text readable",
    description: "Spot and understand low contrast text problems.",
    issueTypes: ["contrast"],
    xpReward: 100,
  },
  {
    id: "lv-2",
    personaId: "lowVision",
    title: "Mission 2: Improve readability",
    description: "Understand small text and spacing barriers.",
    issueTypes: ["textSize", "spacing"],
    xpReward: 120,
  },

  // SCREEN READER (labels + names)
  {
    id: "sr-1",
    personaId: "screenReader",
    title: "Mission 1: Describe the invisible",
    description: "Learn why missing labels/alt text breaks navigation.",
    issueTypes: ["altText", "ariaLabel", "formLabel"],
    xpReward: 100,
  },
  {
    id: "sr-2",
    personaId: "screenReader",
    title: "Mission 2: Link purpose",
    description: "Fix unclear links and empty links.",
    issueTypes: ["linkName", "emptyLink"],
    xpReward: 120,
  },

  // KEYBOARD (focus + navigation)
  {
    id: "kb-1",
    personaId: "keyboard",
    title: "Mission 1: Keyboard-first navigation",
    description: "Check tab order and access to interactive elements.",
    issueTypes: ["tabOrder", "keyboardAccess"],
    xpReward: 100,
  },
  {
    id: "kb-2",
    personaId: "keyboard",
    title: "Mission 2: Focus matters",
    description: "Understand focus visibility and focus traps.",
    issueTypes: ["focusVisible", "focusTrap"],
    xpReward: 120,
  },
  {
    id: "sun-1",
    personaId: "sunlight",
    title: "Readability in Bright Light",
    description:
      "Learn why strong contrast and visible controls matter when using a screen outdoors.",
    xpReward: 120,
    issueTypes: ["contrast", "visibility"],
  },
];

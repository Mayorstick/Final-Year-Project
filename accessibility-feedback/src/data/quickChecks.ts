export type QuickCheckOption = { id: string; text: string };
export type QuickCheckQuestion = {
  prompt: string;
  options: QuickCheckOption[];
  correctId: string;
};

export type MissionQuickCheck = {
  missionId: string;
  missionTitle: string;
  missionBonusXp: number;
  questions: [QuickCheckQuestion, QuickCheckQuestion];
};

export const QUICK_CHECKS: MissionQuickCheck[] = [
  {
    missionId: "sr-1",
    missionTitle: "Describe the invisible",
    missionBonusXp: 100,
    questions: [
      {
        prompt: "Why does alt text matter?",
        options: [
          { id: "a", text: "It helps screen reader users understand images." },
          {
            id: "b",
            text: "It helps search engines know what an image is about.",
          },
          { id: "c", text: "It makes images load better on slow internet." },
        ],
        correctId: "a",
      },
      {
        prompt: "What’s the best way to label an unlabeled icon button?",
        options: [
          {
            id: "a",
            text: "Add a small text hint that shows when you hover over it.",
          },
          {
            id: "b",
            text: 'Add an accessible name (e.g., aria-label="Checkout").',
          },
          { id: "c", text: "Use a clearer icon so people can understand it." },
        ],
        correctId: "b",
      },
    ],
  },

  {
    missionId: "sr-2",
    missionTitle: "Link purpose",
    missionBonusXp: 120,
    questions: [
      {
        prompt: "Why should link text make sense out of context?",
        options: [
          {
            id: "a",
            text: "Because users may navigate by jumping through links.",
          },
          {
            id: "b",
            text: "Because clear links help all users understand where they will go.",
          },
          {
            id: "c",
            text: "Because links look better when they are longer and more detailed.",
          },
        ],
        correctId: "a",
      },
      {
        prompt: "How do you fix an empty link that only contains an icon?",
        options: [
          {
            id: "a",
            text: "Add a text hint that shows when you hover over the link.",
          },
          {
            id: "b",
            text: "Add visible text or an aria-label to give it an accessible name.",
          },
          { id: "c", text: "Use a clearer icon so people can understand it." },
        ],
        correctId: "b",
      },
    ],
  },
  {
    missionId: "lv-1",
    missionTitle: "Make text readable",
    missionBonusXp: 100,
    questions: [
      {
        prompt: "Why should text be easy to see for people with low vision?",
        options: [
          {
            id: "a",
            text: "It makes text easier to read against its background.",
          },
          {
            id: "b",
            text: "It helps people see text more clearly in different lighting.",
          },
          {
            id: "c",
            text: "It makes the page look more colourful and bright.",
          },
        ],
        correctId: "a",
      },
      {
        prompt: "What makes body text easy to read?",
        options: [
          {
            id: "a",
            text: "Text that is large enough with space between lines.",
          },
          { id: "b", text: "Very small text so more fits on the screen." },
          { id: "c", text: "Any text size as long as the colour looks nice." },
        ],
        correctId: "a",
      },
    ],
  },
  {
    missionId: "lv-2",
    missionTitle: "Improve readability",
    missionBonusXp: 120,
    questions: [
      {
        prompt: "Why is space between lines of text important?",
        options: [
          {
            id: "a",
            text: "It makes text easier to read and follow.",
          },
          { id: "b", text: "It helps text look better on different screens." },
          { id: "c", text: "It makes the page look more clean and tidy." },
        ],
        correctId: "a",
      },
      {
        prompt: "Why should there be space between parts of a page?",
        options: [
          {
            id: "a",
            text: "It helps people tell different content apart and use the page more easily.",
          },
          {
            id: "b",
            text: "It helps the page look better on different devices.",
          },
          { id: "c", text: "It lets you use fewer headings." },
        ],
        correctId: "a",
      },
    ],
  },
  {
    missionId: "kb-1",
    missionTitle: "Keyboard-first navigation",
    missionBonusXp: 100,
    questions: [
      {
        prompt:
          "Why should you avoid setting tab order with values like 1, 2, 3?",
        options: [
          {
            id: "a",
            text: "It can make the tab order confusing and hard to follow.",
          },
          {
            id: "b",
            text: "It can be hard to manage and break the natural order of the page.",
          },
          { id: "c", text: "It makes keyboard navigation faster." },
        ],
        correctId: "a",
      },
      {
        prompt:
          "What is the best fix for a clickable <div> that acts like a button?",
        options: [
          {
            id: "a",
            text: "Add keyboard support to the div so it works like a button.",
          },
          {
            id: "b",
            text: "Use a real <button> (or add proper keyboard support + role).",
          },
          { id: "c", text: "Make the div easier to see and click." },
        ],
        correctId: "b",
      },
    ],
  },
  {
    missionId: "kb-2",
    missionTitle: "Focus matters",
    missionBonusXp: 120,
    questions: [
      {
        prompt: "Why is it important to see where your focus is on a page?",
        options: [
          {
            id: "a",
            text: "So keyboard users know where they are on the page.",
          },
          { id: "b", text: "So users can move around the page more easily." },
          { id: "c", text: "So the page looks more clear and organised." },
        ],
        correctId: "a",
      },
      {
        prompt: "How do you fix a keyboard focus trap in a modal?",
        options: [
          { id: "a", text: "Let users move focus out of the modal freely." },
          {
            id: "b",
            text: "Keep focus inside the modal and allow a key or button to close it.",
          },
          {
            id: "c",
            text: "Make the modal stand out more from the background.",
          },
        ],
        correctId: "b",
      },
    ],
  },
  {
    missionId: "sun-1",
    missionTitle: "Readability in Bright Light",
    missionBonusXp: 120,
    questions: [
      {
        prompt:
          "Why is it harder to see content on a screen in bright sunlight?",
        options: [
          {
            id: "a",
            text: "Because bright light makes the screen harder to see clearly.",
          },
          {
            id: "b",
            text: "Because the page uses more colours in sunlight.",
          },
          {
            id: "c",
            text: "Because text becomes smaller in bright light.",
          },
        ],
        correctId: "a",
      },
      {
        prompt: "What helps a button stay easy to see outdoors?",
        options: [
          {
            id: "a",
            text: "Make it stand out clearly with strong colours and a clear shape.",
          },
          {
            id: "b",
            text: "Make the button blend in with the background.",
          },
          {
            id: "c",
            text: "Use lighter colours so it looks softer.",
          },
        ],
        correctId: "a",
      },
    ],
  },
];

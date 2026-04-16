export type IssueOption = {
  id: string;
  text: string;
  correct: boolean;
};

export type MissionIssue = {
  id: string;
  missionId: string;
  title: string;
  issueExplanation: string;
  question: string;
  xpReward: number;
  options: IssueOption[];

  // 👇 ADD THESE
  whoIsAffected: string[];
  whyItMatters: string;
  howToFix: {
    text: string;
    exampleCode?: string;
  };
};

export const ISSUES: MissionIssue[] = [
  // ✅ Screen reader mission sr-1
  {
    id: "sr-1-issue-1",
    missionId: "sr-1",
    title: "Missing alternative text",
    issueExplanation:
      "There’s an unlabeled image of a product in the online store. Without alt text, screen reader users have no way of knowing what it shows.",

    question: "What should the alternative text say?",
    xpReward: 50,

    // 👇 ADD THESE
    whoIsAffected: ["Screen reader users"],
    whyItMatters:
      "Without alt text, screen readers cannot describe images. Users relying on assistive technology won’t understand what product is being shown.",
    howToFix: {
      text: "Add meaningful alternative text that clearly describes the image.",
      exampleCode: `<img src="bike.png" alt="Silver bicycle with brown seat and handlebars" />`,
    },

    options: [
      {
        id: "a",
        text: "Silver bicycle with brown seat and handlebars.",
        correct: true,
      },
      { id: "b", text: "Bike", correct: false },
      { id: "c", text: "Image of Bike", correct: false },
    ],
  },
  {
    id: "sr-1-issue-2",
    missionId: "sr-1",
    title: "Unlabeled checkout button",
    issueExplanation:
      "The checkout button uses only an icon. Because it has no accessible name, a screen reader may announce it as 'button' with no meaning.",

    question: "What should be added to make this button accessible?",
    xpReward: 50,

    // 👇 NEW fields (same structure as Issue 1)
    whoIsAffected: [
      "Screen reader users",
      "Keyboard-only users (using assistive tech)",
    ],
    whyItMatters:
      "If a button has no accessible name, screen reader users cannot tell what action it performs. This can block checkout and stop users from completing a task.",
    howToFix: {
      text: "Give the icon button an accessible name using aria-label (or visible text).",
      exampleCode: `<button aria-label="Checkout">
        <CheckoutIcon aria-hidden="true" />
      </button>`,
    },

    options: [
      { id: "a", text: 'Add aria-label="Checkout"', correct: true },
      { id: "b", text: "Increase the button size", correct: false },
      { id: "c", text: "Change the button color", correct: false },
    ],
  },

  {
    id: "sr-2-issue-1",
    missionId: "sr-2",
    title: "Unclear link text",
    issueExplanation:
      "Some links use vague text like 'Click here' or 'Read more'. Screen reader users often navigate by jumping through links, so vague labels don’t explain the destination.",
    question: " Which link text best explains where the link goes?",
    xpReward: 60,
    whoIsAffected: ["Screen reader users", "Keyboard users"],
    whyItMatters:
      "Links should make sense out of context. Bad link text makes navigation confusing.",
    howToFix: {
      text: "Use descriptive link text that explains the destination.",
    },
    options: [
      { id: "a", text: "View City Cruiser details", correct: true },
      { id: "b", text: "Click here", correct: false },
      { id: "c", text: "Read more", correct: false },
    ],
  },
  {
    id: "sr-2-issue-2",
    missionId: "sr-2",
    title: "Empty link",
    issueExplanation:
      "A link has no text (or only an icon) and no accessible name, so a screen reader can’t describe it.",
    question: "What should be added to fix it?",
    xpReward: 60,
    whoIsAffected: ["Screen reader users"],
    whyItMatters: "An empty link becomes meaningless and can block navigation.",

    howToFix: {
      text: "Add visible text or an aria-label to give it an accessible name.",
      exampleCode: `<a href="/checkout" aria-label="Checkout">🛒checkout</a>`,
    },
    options: [
      { id: "a", text: 'Add aria-label="Checkout"', correct: true },
      { id: "b", text: "Increase link size", correct: false },
      { id: "c", text: "Change link color", correct: false },
    ],
  },
  {
    id: "lv-1-issue-1",
    missionId: "lv-1",
    title: "Text is hard to see",
    issueExplanation:
      "Some text is too light and does not stand out from its background. People with low vision may struggle to read it, especially in bright light or on small screens.",
    question: "Which change makes the text easier to read?",
    xpReward: 60,
    whoIsAffected: ["Low vision users", "Users in bright light", "Older users"],
    whyItMatters:
      "If text does not stand out, people may miss important information like prices, instructions, or warnings.",
    howToFix: {
      text: "Use darker text or a lighter background so the text stands out clearly.",
      exampleCode: `/* Bad */
  .text { color: #cbd5e1; background: white; }
  
  /* Better */
  .text { color: #0f172a; background: white; }`,
    },
    options: [
      {
        id: "a",
        text: "Use darker text so it stands out more",
        correct: true,
      },
      {
        id: "b",
        text: "Make the text a bit bigger so it is easier to see",
        correct: false,
      },
      {
        id: "c",
        text: "Add more space around the text",
        correct: false,
      },
    ],
  },
  {
    id: "lv-1-issue-2",
    missionId: "lv-1",
    title: "Text too small",
    issueExplanation:
      "Important text is very small. Low vision users may not be able to read it comfortably, even with zoom.",
    question: "What is the best fix for this issue?",
    xpReward: 60,
    whoIsAffected: ["Low vision users", "Mobile users", "Older users"],
    whyItMatters:
      "Tiny text increases effort and errors. Users may abandon the task if they can’t read key information easily.",
    howToFix: {
      text: "Use a readable base font size and support text resizing without breaking layout.",
      exampleCode: `/* Better baseline */
  body { font-size: 16px; line-height: 1.5; }
  
  /* Avoid very small text */
  .small-note { font-size: 14px; }`,
    },
    options: [
      {
        id: "a",
        text: "Increase the font size (and keep good line-height)",
        correct: true,
      },
      { id: "b", text: "Change the text color to blue", correct: false },
      { id: "c", text: "Add an underline to the text", correct: false },
    ],
  },
  {
    id: "lv-2-issue-1",
    missionId: "lv-2",
    title: "Line spacing too tight",
    issueExplanation:
      "The paragraph text has very tight line spacing. When lines are too close together, users with low vision may struggle to track from one line to the next.",

    question: "What is the best way to improve readability here?",
    xpReward: 60,

    whoIsAffected: ["Low vision users", "Users with dyslexia", "Older users"],
    whyItMatters:
      "Tight line spacing makes text harder to follow and increases visual strain. Proper line-height improves readability and reduces fatigue.",
    howToFix: {
      text: "Increase the line-height to create more vertical space between lines.",
      exampleCode: `/* Bad */
  .text { line-height: 1; }
  
  /* Better */
  .text { line-height: 1.5; }`,
    },

    options: [
      {
        id: "a",
        text: "Increase the line-height (e.g. 1.5 or higher)",
        correct: true,
      },
      { id: "b", text: "Make the text bold", correct: false },
      { id: "c", text: "Move the paragraph lower on the page", correct: false },
    ],
  },

  {
    id: "lv-2-issue-2",
    missionId: "lv-2",
    title: "Crowded layout",
    issueExplanation:
      "Buttons and text blocks are placed too close together. The layout feels cramped, making it harder to scan and interact comfortably.",

    question: "Which change best improves this layout?",
    xpReward: 60,

    whoIsAffected: [
      "Low vision users",
      "Mobile users",
      "Users with motor difficulties",
    ],
    whyItMatters:
      "When elements are too close together, users may misclick or struggle to visually separate content groups. Spacing improves clarity and usability.",
    howToFix: {
      text: "Add spacing (margin, padding, or gap) between related elements.",
      exampleCode: `/* Bad */
  .card { padding: 4px; }
  
  /* Better */
  .card { padding: 16px; margin-bottom: 12px; }`,
    },

    options: [
      {
        id: "a",
        text: "Add more spacing between elements (padding/margin/gap)",
        correct: true,
      },
      { id: "b", text: "Change the text color", correct: false },
      { id: "c", text: "Add an icon next to each button", correct: false },
    ],
  },
  {
    id: "kb-1-issue-1",
    missionId: "kb-1",
    title: "Can’t reach an element with Tab",
    issueExplanation:
      "One interactive element is not reachable using the keyboard. This usually happens when something clickable is built with a non-interactive element (like a div) and it isn’t focusable.",
    question: "What should be added so keyboard users can reach it?",
    xpReward: 60,
    whoIsAffected: [
      "Keyboard-only users",
      "Switch device users",
      "Screen reader users",
    ],
    whyItMatters:
      "If you can’t Tab to an element, you can’t use it without a mouse. This blocks actions like opening menus or starting checkout.",
    howToFix: {
      text: "Use a real <button> or <a> element. If you must use a div, add tabIndex=0 and proper keyboard handlers (Enter/Space).",
      exampleCode: `/* Best */
<button onClick={openMenu}>Open menu</button>

/* If you must use a div */
<div role="button" tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") openMenu();
  }}
  onClick={openMenu}
>
  Open menu
</div>`,
    },
    options: [
      {
        id: "a",
        text: "Use a real button (or add tabIndex=0 with keyboard support)",
        correct: true,
      },
      { id: "b", text: "Make it bigger", correct: false },
      { id: "c", text: "Change the background color", correct: false },
    ],
  },

  {
    id: "kb-1-issue-2",
    missionId: "kb-1",
    title: "Wrong tab order",
    issueExplanation:
      "When you press Tab, focus moves in a confusing order. This often happens when items are visually arranged one way, but the DOM order is different.",
    question: "What is the best way to fix tab order problems?",
    xpReward: 60,
    whoIsAffected: ["Keyboard-only users", "Screen reader users"],
    whyItMatters:
      "Keyboard users rely on Tab order to navigate. If focus jumps around unpredictably, it becomes slow, frustrating, and easy to miss important actions.",
    howToFix: {
      text: "Match the DOM order to the visual order. Avoid using positive tabindex values (tabIndex=1,2,3…) because it creates hard-to-maintain navigation.",
      exampleCode: `/* Best: reorder the elements in JSX/HTML */
<nav>
  <a href="/shop">Shop</a>
  <a href="/deals">Deals</a>
  <a href="/contact">Contact</a>
</nav>

/* Avoid */
<div tabIndex={3}>Contact</div>
<div tabIndex={1}>Shop</div>
<div tabIndex={2}>Deals</div>`,
    },
    options: [
      {
        id: "a",
        text: "Fix the DOM order so it matches the visual order",
        correct: true,
      },
      { id: "b", text: "Use tabIndex=1,2,3 everywhere", correct: false },
      { id: "c", text: "Remove outlines so it looks cleaner", correct: false },
    ],
  },
  {
    id: "kb-2-issue-1",
    missionId: "kb-2",
    title: "Focus indicator not visible",
    issueExplanation:
      "When keyboard users press Tab, they need a clear visual indicator showing which element is focused. Here, the focus style is missing, so it’s hard to know where you are on the page.",
    question: "What is the best fix?",
    xpReward: 60,
    whoIsAffected: ["Keyboard-only users", "Low vision users"],
    whyItMatters:
      "Without a visible focus indicator, keyboard users can get lost and may not be able to complete tasks reliably.",
    howToFix: {
      text: "Add a clear focus-visible style (outline or ring) to interactive elements.",
      exampleCode: `/* Example */
  button:focus-visible {
    outline: 3px solid #93c5fd; /* visible focus ring */
    outline-offset: 2px;
  }`,
    },
    options: [
      {
        id: "a",
        text: "Add a clear focus-visible style (outline/ring)",
        correct: true,
      },
      { id: "b", text: "Make the button text bold", correct: false },
      { id: "c", text: "Center-align the button", correct: false },
    ],
  },
  {
    id: "kb-2-issue-2",
    missionId: "kb-2",
    title: "Keyboard trap in modal",
    issueExplanation:
      "A modal opens and the keyboard user can’t easily reach the Close control (or can’t escape). This can trap the user and block progress.",
    question: "Which change best prevents keyboard traps?",
    xpReward: 60,
    whoIsAffected: ["Keyboard-only users", "Screen reader users"],
    whyItMatters:
      "Keyboard traps are a major blocker. Users must be able to reach all controls and exit dialogs without getting stuck.",
    howToFix: {
      text: "Ensure the modal has a focusable Close button and supports Escape to close. Keep focus managed so users can exit.",
      exampleCode: `// Example patterns:
  <button onClick={close} autoFocus>Close</button>
  // Also allow:
  onKeyDown={(e) => { if (e.key === "Escape") close(); }}`,
    },
    options: [
      {
        id: "a",
        text: "Add a focusable Close button and support Escape to close",
        correct: true,
      },
      { id: "b", text: "Reduce the modal width", correct: false },
      { id: "c", text: "Change the modal color", correct: false },
    ],
  },
  {
    id: "sun-1-issue-1",
    missionId: "sun-1",
    title: "Low contrast in bright sunlight",
    issueExplanation:
      "Text and buttons can become much harder to see when a screen is used outdoors in bright sunlight. Low contrast that may look acceptable indoors can become difficult to read outside.",

    question: "Which change would best improve visibility in bright sunlight?",
    xpReward: 60,

    whoIsAffected: ["Users outdoors", "Mobile users", "Users in bright light"],
    whyItMatters:
      "Bright environments reduce perceived contrast on screens. If text and controls are too faint, users may miss important information or struggle to complete tasks.",
    howToFix: {
      text: "Use stronger contrast between text and background, and make important actions visually clear.",
      exampleCode: `/* Bad */
  .text { color: #94a3b8; background: #ffffff; }
  
  /* Better */
  .text { color: #0f172a; background: #ffffff; }`,
    },

    options: [
      {
        id: "a",
        text: "Increase contrast so text and buttons stand out more clearly",
        correct: true,
      },
      { id: "b", text: "Make the page animation faster", correct: false },
      { id: "c", text: "Move the button lower on the page", correct: false },
    ],
  },
  {
    id: "sun-1-issue-2",
    missionId: "sun-1",
    title: "Important button is too subtle",
    issueExplanation:
      "A key button blends into the page because its color and border do not stand out enough. In bright sunlight, subtle controls can become hard to notice or distinguish from surrounding content.",

    question: "What is the best way to make this button easier to notice?",
    xpReward: 60,

    whoIsAffected: [
      "Users in bright sunlight",
      "Low vision users",
      "Mobile users",
    ],
    whyItMatters:
      "Primary actions should be easy to find quickly. If a button is too faint, users may overlook it and fail to complete the task.",
    howToFix: {
      text: "Use a stronger visual style for important buttons, such as higher contrast, clearer borders, and stronger emphasis.",
      exampleCode: `/* Better primary button */
  .button-primary {
    background: #1d4ed8;
    color: white;
    border: 2px solid #1e3a8a;
  }`,
    },

    options: [
      {
        id: "a",
        text: "Use a stronger contrast and clearer button style",
        correct: true,
      },
      { id: "b", text: "Reduce the button padding", correct: false },
      { id: "c", text: "Remove the button border completely", correct: false },
    ],
  },
];

export type GeneratedIssue = {
  title: string;
  what: string;
  who: string[];
  why: string;
  fix: string;
};

export function generateFromFeedback(text: string): GeneratedIssue | null {
  const lower = text.toLowerCase();

  if (lower.includes("contrast")) {
    return {
      title: "Low Contrast Text",
      what: "Some text does not have enough contrast against its background.",
      who: ["Low vision users", "Users in bright light", "Older users"],
      why: "Low contrast makes text difficult to read and may cause users to miss important information.",
      fix: "Increase contrast by using darker text or lighter background colors. Aim to meet WCAG contrast ratios.",
    };
  }

  if (lower.includes("accessible name") || lower.includes("button")) {
    return {
      title: "Missing Accessible Button Name",
      what: "A button does not have a clear accessible name for assistive technologies.",
      who: ["Screen reader users", "Keyboard users"],
      why: "Without an accessible name, screen reader users cannot understand what the button does.",
      fix: "Add visible text or use aria-label to provide a meaningful name.",
    };
  }

  if (lower.includes("link")) {
    return {
      title: "Unclear Link Text",
      what: "A link uses vague text that does not explain its destination.",
      who: ["Screen reader users", "Keyboard users"],
      why: "Users navigating by links cannot understand where the link goes.",
      fix: "Use descriptive link text that clearly explains the destination.",
    };
  }

  return null;
}

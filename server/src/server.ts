import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY in .env");
}

const openai = new OpenAI({ apiKey });

app.get("/", (_req, res) => {
  res.json({ message: "AI Feedback Server Running 🚀" });
});

app.post("/generate-issue", upload.single("screenshot"), async (req, res) => {
  try {
    const feedbackText = String(req.body.feedbackText ?? "").trim();
    const screenshotFile = req.file;

    if (!feedbackText && !screenshotFile) {
      return res.status(400).json({
        error: "Please provide audit feedback text or a screenshot.",
      });
    }

    let prompt = `
You are an accessibility educator helping a student understand pasted accessibility audit feedback.


Important rules:
- If only a screenshot is provided and no audit feedback text is given, do not invent hidden code or markup issues.
- Only identify issues that are clearly visible in the screenshot.
- Do not claim problems such as missing alt text, missing aria-labels, missing accessible names, or semantic HTML issues unless they are explicitly mentioned in the pasted feedback text.
- If the screenshot does not clearly show a web accessibility issue, say that no obvious visible accessibility issue was found from the screenshot alone.
- In screenshot-only cases, prefer visible issue types such as: contrast, textSize, spacing, focusVisible, keyboardAccess, tabOrder, or generic.
- If no clear visible issue exists, return a generic educational response explaining that no definite visible issue could be confirmed from the screenshot alone.
- If a screenshot does not show a clear accessibility issue, return a valid mission with issueType "generic" and explain that no obvious visible accessibility issue was found from the screenshot alone
- Quick check questions should test understanding of accessibility concepts.
- Avoid questions that require memorizing technical values like contrast ratios or WCAG numbers.
- Focus on reasoning about what improves accessibility.
- Quick check questions should ask what the user should do, why the issue matters, or which fix is most helpful.
- Avoid quiz questions that mainly test remembering numbers, attribute names, or WCAG terms without context.
- Always explain issues in plain language first.
- If technical values such as WCAG ratios or attributes are used, explain what they mean in simple terms.
- Avoid assuming the learner understands accessibility jargon.
- Base your answer on the pasted feedback and any visible evidence from the screenshot if provided.
- Do not pretend you inspected the full website or codebase.
- If a screenshot is provided, only infer visible accessibility issues such as contrast, spacing, clutter, text size, and layout.
- Do not claim hidden code issues unless they are supported by the pasted feedback.
- Keep explanations clear, plain-language, and educational.
- Return valid JSON only.
- Use issue types only from this list:
  "altText", "ariaLabel", "linkName", "emptyLink", "contrast", "textSize", "spacing", "focusVisible", "tabOrder", "keyboardAccess", "generic"

Generate ONE AI mission pack in this exact JSON shape:
{
  "title": "string",
  "missionSource": "ai-generated",
  "feedbackText": "string",
  "issues": [
    {
      "id": "issue-1",
      "title": "string",
      "issueType": "one of the allowed values above",
      "issueExplanation": "string",
      "whoIsAffected": ["string", "string"],
      "whyItMatters": "string",
      "howToFix": {
        "text": "string",
        "exampleCode": "string"
      },
      "question": "string",
      "options": [
        { "id": "a", "text": "string", "correct": true, "feedback": "string" },
        { "id": "b", "text": "string", "correct": false, "feedback": "string" },
        { "id": "c", "text": "string", "correct": false, "feedback": "string" }
      ]
    },
    {
      "id": "issue-2",
      "title": "string",
      "issueType": "one of the allowed values above",
      "issueExplanation": "string",
      "whoIsAffected": ["string", "string"],
      "whyItMatters": "string",
      "howToFix": {
        "text": "string",
        "exampleCode": "string"
      },
      "question": "string",
      "options": [
        { "id": "a", "text": "string", "correct": true, "feedback": "string" },
        { "id": "b", "text": "string", "correct": false, "feedback": "string" },
        { "id": "c", "text": "string", "correct": false, "feedback": "string" }
      ]
    }
  ],
  "quickCheck": {
    "missionTitle": "string",
    "missionBonusXp": 20,
    "questions": [
      {
        "prompt": "string",
        "options": [
          { "id": "a", "text": "string" },
          { "id": "b", "text": "string" },
          { "id": "c", "text": "string" }
        ],
        "correctId": "a"
      },
      {
        "prompt": "string",
        "options": [
          { "id": "a", "text": "string" },
          { "id": "b", "text": "string" },
          { "id": "c", "text": "string" }
        ],
        "correctId": "a"
      }
    ]
  }
}


Additional instructions:
- "title" should summarise the feedback theme.
- "feedbackText" must exactly repeat the pasted feedback.
- Always return exactly 2 issues so the JSON shape stays consistent.
- Only generate specific accessibility issues when they are clearly supported by the pasted feedback or visible screenshot evidence.
- If no clear visible accessibility issue is supported, use issueType "generic" for both issues.
- In screenshot-only cases, do not generate altText, ariaLabel, linkName, or other hidden code issues unless they are explicitly visible or explicitly mentioned in the feedback text.
- If no obvious visible issue is found, explain that no obvious visible accessibility issue could be confirmed from the screenshot alone.
- Each issue must have exactly 3 options and only one correct option.
- Every issue option must include a short "feedback" string.
- If the option is correct, the feedback should briefly explain why it is the best answer.
- If the option is wrong, the feedback should briefly explain why it is not the best choice and hint toward the correct accessibility reasoning.
- "whoIsAffected" should have 2–3 short groups.
- "howToFix.exampleCode" can be an empty string if code is not relevant.
- Keep the output educational and concise.

Pasted audit feedback:
"""
${feedbackText}
"""
`;

    let response;

    if (screenshotFile) {
      const imageBuffer = fs.readFileSync(screenshotFile.path);
      const base64Image = imageBuffer.toString("base64");

      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${screenshotFile.mimetype};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      });

      fs.unlinkSync(screenshotFile.path);
    } else {
      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      });
    }

    const content = response.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(content);

    const noIssueFound =
      parsed?.title?.toLowerCase().includes("no visible") ||
      parsed?.title?.toLowerCase().includes("no obvious") ||
      (Array.isArray(parsed?.issues) &&
        parsed.issues.every((issue: any) => issue.issueType === "generic"));

    return res.json({
      raw: content,
      noIssueFound,
    });

    return res.json({ raw: content });
  } catch (error: any) {
    console.error("OpenAI generation error:", error);
    return res.status(500).json({
      error: error?.message ?? "Failed to generate issue explanation.",
    });
  }
});

const PORT = Number(process.env.PORT || 5001);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

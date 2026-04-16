import { onCall, HttpsError } from "firebase-functions/v2/https";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY in functions environment.");
}

const openai = new OpenAI({ apiKey });

export const generateAccessibilityExplanation = onCall(async (request) => {
  const { issue, element } = request.data as {
    issue?: string;
    element?: string;
  };

  if (!issue || issue.trim().length === 0) {
    throw new HttpsError("invalid-argument", "Issue description is required.");
  }

  const prompt = `
You are an accessibility educator.

Explain this accessibility issue clearly and simply.

Issue:
"${issue}"

If an element is mentioned:
"${element || "Not specified"}"

Respond in this structure:

What is wrong:
Who is affected:
Why it matters:
How to fix it:
Example fix code:
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    explanation: response.choices[0].message.content ?? "",
  };
});

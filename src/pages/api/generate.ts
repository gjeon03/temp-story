// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  GenerateImageInfo,
  GenerateResponse,
  GenerateResponseItem,
} from "@/hooks/mutations/use-generate-mutation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

const apiKeyGenAI = process.env.GOOGLE_GENERATIVE_AI_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse | { error: string }>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imgInfo, ogText }: { imgInfo: GenerateImageInfo[]; ogText: string } =
    req.body;

  if (!apiKeyGenAI) {
    return res
      .status(500)
      .json({ error: "Missing API key for Google Generative AI" });
  }

  const generativeAi = new GoogleGenerativeAI(apiKeyGenAI);
  const model = generativeAi.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const sortedImgInfo = imgInfo.sort(
      (a, b) => new Date(a.imgDtm).getTime() - new Date(b.imgDtm).getTime(),
    );

    // Generate responses using Google Generative AI
    const generateContent = async (type: string) => {
      const prompt = `
        Write a detailed and beautifully formatted blog post in JSON format with the following fields:
        - title: The title of the blog post
        - content: A markdown-formatted description of at least 2000 characters.

        ### Instructions:
        - The blog content should NOT include any geographic coordinates.
        - Use markdown creatively, including headers (#, ##, ###), bullet points (*, -), bold text (**), italic text (*), and blockquotes (>) where appropriate.
        - Add visual elements like emojis 🎉, 🌟, or 📸 to make the blog post more engaging and visually appealing.
        - Follow a chronological narrative based on the image information and the provided context.
        - Each section should feel cohesive, connecting moments and transitions naturally.
        - Respond ONLY in plain JSON format without wrapping it in code blocks (e.g., \`\`\` or \`\`\`json).

        ### Blog Details:
        Here is the chronological order of image information:
        ${sortedImgInfo
          .map(
            (img, index) =>
              `Image ${index + 1}:
              - Date: ${img.imgDtm}`,
          )
          .join("\n")}

        Use the following context for additional details: 
        ${ogText}

        Ensure that the JSON output strictly follows this format:
        Example JSON response:
        {
          "title": "An Enchanting Day in the City",
          "content": "## Morning Magic 🌅\\n\\nThe day began with a burst of energy as the sun rose over the bustling streets. The scent of freshly brewed coffee filled the air, marking the start of an exciting adventure.\\n\\n> *\"Mornings are for fresh starts and boundless possibilities!\"*\\n\\n### Afternoon Adventures ☀️\\n\\nThe warm afternoon invited exploration. Laughter echoed through the city as friends gathered to share moments of joy.\\n\\n- **Highlight:** The vibrant market street\\n- **Surprise:** A hidden café with the best pastries 🥐\\n\\n### Evening Reflections 🌙\\n\\nAs the day wound down, the city lights began to shimmer like a galaxy of stars. Sitting by the window, I couldn’t help but reflect on the day’s adventures.\\n\\n> *\"Every sunset is a promise of a new dawn.\"*\\n\\n🌟 *Grateful for the little moments that made this day unforgettable.*"
        }

        Here is another example:
        {
          "title": "An Enchanting Day in the City",
          "content": "## Morning Magic 🌅\\n\\nThe day began with a burst of energy as the sun rose over the bustling streets. The scent of freshly brewed coffee filled the air, marking the start of an exciting adventure.\\n\\n> *\"Mornings are for fresh starts and boundless possibilities!\"*\\n\\n### Afternoon Adventures ☀️\\n\\nThe warm afternoon invited exploration. Laughter echoed through the city as friends gathered to share moments of joy.\\n\\n- **Highlight:** The vibrant market street\\n- **Surprise:** A hidden café with the best pastries 🥐\\n\\n### Evening Reflections 🌙\\n\\nAs the day wound down, the city lights began to shimmer like a galaxy of stars. Sitting by the window, I couldn’t help but reflect on the day’s adventures.\\n\\n> *\"Every sunset is a promise of a new dawn.\"*\\n\\n🌟 *Grateful for the little moments that made this day unforgettable.*"
        }

        If you cannot generate the output in this exact JSON format, respond with: {"title": "", "description": ""}.
        `;

      const result = await model.generateContent(prompt);

      const text = result.response.text() || "Unable to generate content.";

      console.log(`Generated content for ${type}:`, text);
      try {
        const json = JSON.parse(text);
        return {
          title: json.title || "Untitled",
          content: json.content || "No description available.",
        } as GenerateResponseItem;
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        return {
          title: `${type} Blog Post`,
          content: "Failed to generate valid JSON content.",
        };
      }
    };

    const [genRes1, genRes2, genRes3] = await Promise.all([
      generateContent("Type 1"),
      generateContent("Type 2"),
      generateContent("Type 3"),
    ]);

    const result: GenerateResponse = { genRes1, genRes2, genRes3 };
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error generating blog content:", error);
    return res.status(500).json({ error: "Failed to generate blog content" });
  }
}

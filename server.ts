import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import OpenAI from "openai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API routes
  app.post("/api/analyze-meal", async (req, res) => {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: "Missing image data" });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY is not configured" });
    }

    try {
      const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: apiKey,
        defaultHeaders: {
          "HTTP-Referer": "https://calorie-snap.ai", // Optional, for OpenRouter tracking
          "X-Title": "CalorieSnap AI", // Optional
        }
      });

      const prompt = `Analyze this meal. Provide a realistic estimate of its nutritional value including total calories, proteins, carbohydrates, and fats in grams. Note key vitamins or minerals present. Also, provide a short array of practical suggestions to improve its nutritional balance according to general health and fitness principles. Also identify the main food item name. Do not hallucinate exact decimal precision, be practical. Your response must be a strict JSON object with these keys: calories (number), protein (number), carbs (number), fat (number), vitamins (string), suggestions (string array), foodName (string).`;

      const response = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001", 
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from AI");

      const result = JSON.parse(content);
      res.json(result);
    } catch (error) {
      console.error("Analysis Error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

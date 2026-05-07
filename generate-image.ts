import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    console.log('Generating image...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A high quality, cinematic, industrial photography shot representing textiles, leather, and paper manufacturing. Rolls of fabric, leather sheets, and paper rolls in a modern, clean factory setting. Warm lighting, highly detailed, 8k resolution, professional industrial photography.',
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        fs.writeFileSync('./public/textiles-leather-paper.png', Buffer.from(base64EncodeString, 'base64'));
        console.log('Image saved successfully to ./public/textiles-leather-paper.png');
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generate();

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const prompts = [
  { id: "powder_white", prompt: "Professional macro photography of fine white chemical powder in a clean glass petri dish on a stainless steel lab bench, studio lighting, high resolution, 8k" },
  { id: "liquid_clear", prompt: "Professional photography of clear transparent chemical liquid in a glass Erlenmeyer flask on a white laboratory table, clean, bright studio lighting, 8k" },
  { id: "liquid_blue", prompt: "Professional photography of vibrant blue chemical liquid in a glass beaker, clean laboratory setting, bright lighting, 8k" },
  { id: "liquid_amber", prompt: "Professional photography of amber chemical liquid in a glass bottle, clean laboratory setting, bright lighting, 8k" },
  { id: "drums_blue", prompt: "Professional industrial photography of clean blue plastic chemical drums neatly stacked in a modern warehouse, bright lighting, 8k" },
  { id: "sacks_white", prompt: "Professional industrial photography of clean white woven sacks containing chemical powder on a wooden pallet, modern warehouse, 8k" },
  { id: "crystals_clear", prompt: "Professional macro photography of clear chemical crystals, clean laboratory setting, studio lighting, 8k" },
  { id: "powder_yellow", prompt: "Professional macro photography of fine yellow chemical powder in a clean glass watch glass, laboratory setting, 8k" },
  { id: "bottle_amber", prompt: "Professional photography of a clean amber glass chemical reagent bottle on a lab bench, blurred background, 8k" },
  { id: "generic_lab", prompt: "Professional photography of a modern, clean chemical laboratory with glassware and instruments, bright, 8k" }
];

async function generateImages() {
  const generatedImages: Record<string, string> = {};
  
  for (const item of prompts) {
    console.log(`Generating image for: ${item.id}`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: item.prompt },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          }
        }
      });
      
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
          generatedImages[item.id] = imageUrl;
          console.log(`Successfully generated image for: ${item.id}`);
          break;
        }
      }
    } catch (error) {
      console.error(`Failed to generate image for ${item.id}:`, error);
    }
  }
  
  fs.writeFileSync(path.join(process.cwd(), "generated_images.json"), JSON.stringify(generatedImages, null, 2));
  console.log("Finished generating images.");
}

generateImages();

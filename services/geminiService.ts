
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// process.env.API_KEY is expected to be available in the build environment
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

// Model constants
const CODING_MODEL = 'gemini-3-pro-preview'; 
// Using 2.5 flash for vision/multimodal tasks where speed is helpful, but 3-pro supports it too.
// The prompt asks for "Convert Anything -> Code", so a multimodal model is key.
// 3-pro-preview handles complex reasoning better.
const VISION_MODEL = 'gemini-3-pro-preview'; 
const VIDEO_MODEL = 'veo-3-pro-preview-preview'; // Not actually used directly, explicit string in function
const SEARCH_MODEL = 'gemini-2.5-flash';

export const generateCodeFromPrompt = async (prompt: string, language: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");
  
  let fullPrompt = "";

  if (language === 'Auto (AI Agent)') {
    // Special prompt for the AI Agent
    fullPrompt = `
      You are an expert Senior Software Architect and Polyglot Programmer.
      
      Task:
      1. Analyze the user's request carefully to determine the nature of the task (e.g., Data Science, Web Frontend, System Tool, Mobile App, etc.).
      2. Select the ABSOLUTE BEST programming language and framework for this specific task based on industry standards, performance, and ease of deployment.
      3. Generate production-ready, clean, and efficient code in that selected language.
      4. CRITICAL: At the very top of your response, BEFORE the code block, add a comment indicating which language you chose and why. 
         Example: "// Language Selected: Python (Best for Data Analysis)"
      
      Request: ${prompt}
      
      Rules:
      1. Output the code inside markdown code blocks.
      2. Add brief comments explaining complex logic.
      3. Do not ask for clarification, just make the best architectural decision.
    `;
  } else {
    // Standard prompt for specific language
    fullPrompt = `
      You are an expert Senior Software Engineer.
      Task: Generate production-ready, clean, and efficient code in ${language}.
      Request: ${prompt}
      
      Rules:
      1. Output ONLY the code inside markdown code blocks.
      2. Add brief comments explaining complex logic.
      3. No conversational filler before or after the code.
    `;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: CODING_MODEL,
      contents: fullPrompt,
    });
    return response.text || '// No code generated';
  } catch (error) {
    console.error("Gemini Generate Error:", error);
    throw error;
  }
};

export const searchAndSummarize = async (query: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: SEARCH_MODEL,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        // System instruction specifically for search/grounding behavior
        systemInstruction: "You are a helpful and knowledgeable research assistant. Your task is to search Google for the user's query and provide a comprehensive yet concise summary of the latest information found. If the user asks for code or technical solutions, ensure the information is based on the most recent documentation available. Always include the sources provided by the search tool."
      },
    });

    let text = response.text || 'No results found.';
    
    // Handle Grounding Sources
    // Always extract URLs from groundingChunks and list them
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      const sources = chunks
        .map((c: any) => c.web?.uri && c.web?.title ? `- [${c.web.title}](${c.web.uri})` : null)
        .filter(Boolean);
      
      if (sources.length > 0) {
        // Deduplicate sources
        const uniqueSources = Array.from(new Set(sources));
        text += `\n\n### 📚 Grounding Sources\n${uniqueSources.join('\n')}`;
      }
    }

    return text;
  } catch (error: any) {
    console.error("Search error:", error);
    return `Error performing search: ${error.message}`;
  }
};

export const executePythonCode = async (code: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    Act as a Python 3.11 Python Interpreter.
    
    Code to execute:
    ${code}
    
    Rules:
    1. Simulate the execution of this code exactly as a Python terminal would.
    2. Return ONLY the output (stdout/stderr).
    3. Do not add any conversational text like "Here is the output".
    4. If there is a syntax error or runtime error, print the Python traceback.
    5. If the code generates no output, return empty string.
    6. Mock any file operations or network requests by printing what they would do (e.g., "[Mock] Request sent to google.com").
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: CODING_MODEL,
      contents: prompt,
    });
    return response.text || '';
  } catch (error: any) {
    return `Error executing code: ${error.message}`;
  }
};

export const debugAndFixCode = async (buggyCode: string): Promise<{ analysis: string; fixedCode: string }> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    You are an expert Code Debugger.
    Task: Analyze the provided code, find errors (syntax, logic, security), and provide a fixed version.
    
    Input Code:
    ${buggyCode}
    
    Output Format (JSON):
    {
      "analysis": "Detailed explanation of bugs found...",
      "fixedCode": "The complete corrected code string..."
    }
    Ensure the output is valid JSON. Do not use Markdown formatting for the JSON envelope.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: CODING_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Debug Error:", error);
    throw error;
  }
};

export const convertImageToCode = async (base64Image: string, promptText: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    // Construct parts for multimodal request
    // Clean base64 string if it has data URI prefix
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: VISION_MODEL,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG or JPEG, usually generic 'image/png' works for Gemini inlineData if source is reasonably standard
              data: cleanBase64
            }
          },
          {
            text: `Analyze this image. ${promptText}. Provide the code to recreate this UI or logic. If it's a UI, use HTML/Tailwind/React.`
          }
        ]
      }
    });
    
    return response.text || '// Could not convert image';
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
};

export const buildFullApp = async (description: string): Promise<any> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    You are a System Architect.
    Task: Create a full application structure based on the description.
    Description: ${description}
    
    Output Requirement:
    Return a JSON object containing a file tree and content for key files.
    Format:
    {
      "architectureExplanation": "...",
      "files": [
        { "path": "src/App.tsx", "content": "...", "language": "typescript" },
        { "path": "package.json", "content": "...", "language": "json" },
        ...
      ],
      "buildInstructions": "..."
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: CODING_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini App Build Error:", error);
    throw error;
  }
};

export const generateVideo = async (
  imageBase64: string, 
  prompt: string, 
  aspectRatio: '16:9' | '9:16'
): Promise<string> => {
  // 1. Handle API Key Selection for Veo
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      try {
        await (window as any).aistudio.openSelectKey();
      } catch (e) {
         console.error("Key selection failed or cancelled", e);
         throw new Error("API Key selection is required for Veo video generation.");
      }
    }
  }

  // 2. Create FRESH instance with latest key (process.env.API_KEY is updated by the environment)
  const currentKey = process.env.API_KEY;
  if (!currentKey) throw new Error("No API Key available. Please select one.");
  
  const veoAi = new GoogleGenAI({ apiKey: currentKey });

  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  // 3. Initiate Video Generation
  let operation = await veoAi.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt || 'Animate this image naturally',
    image: {
      imageBytes: cleanBase64,
      mimeType: 'image/png', 
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  // 4. Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    operation = await veoAi.operations.getVideosOperation({ operation: operation });
  }

  // 5. Get Video URI
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("Video generation failed: No download URI returned.");
  }

  // 6. Fetch Video Content
  // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
  const response = await fetch(`${downloadLink}&key=${currentKey}`);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeCivicPortfolio = async (data) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Analyze the following citizen's electoral simulation journey and provide a professional, educational "Civic Impact Analysis".
            
            USER DATA:
            - Eligibility: ${data.eligibility}
            - Policy Alignment Match: ${data.policyMatch}%
            - Election Prep (Items in Bag): ${data.bagItems.join(", ") || "None"}
            - Final Vote Cast: ${data.vote || "Abstained"}
            
            GOAL:
            1. Provide a concise (3-4 sentences) summary of their democratic engagement.
            2. Explain what their "Policy Match" means for their representative voice.
            3. Comment on their "Booth Protocol" (if they brought illegal items, explain why secrecy matters; if they were clean, praise their legal awareness).
            
            TONE: Professional, encouraging, and institutional (Cyber-Gov style).
            FORMAT: Simple plain text with professional spacing.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return "Our AI analysis service is temporarily offline. However, your journey towards democratic participation is noted and verified.";
    }
};

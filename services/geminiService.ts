import { GoogleGenAI } from "@google/genai";

export const askSensei = async (techniqueName: string, discipline: string): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    // Fallback if no API key is present for demo purposes
    return new Promise(resolve => setTimeout(() => resolve(`**Conselho do Sensei (Demo):**\n\nPara dominar o ${techniqueName}, o segredo está na paciência. \n\n*Erro comum:* Usar muita força e pouca alavanca.\n\n"A árvore mais forte quebra, o bambu enverga." - Oss!`), 1500));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    // Use gemini-3-flash-preview as requested for general text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um grão-mestre de artes marciais da academia "Zen Jitsu".
        O aluno pergunta sobre: "${techniqueName}" em "${discipline}".
        Dê um conselho curto, técnico e motivacional (max 80 palavras).
        Inclua: 1 detalhe técnico, 1 erro a evitar, e uma frase estilo Bushido no final.
        Responda em Português do Brasil.
      `,
    });
    
    return response.text || "O Sensei está em silêncio... (Resposta vazia)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "O Sensei está meditando... Verifique sua conexão ou a Chave de API.";
  }
};
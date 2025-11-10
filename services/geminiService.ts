import { GoogleGenAI } from "@google/genai";
import { Challenge } from '../types';

// FIX: Per coding guidelines, the API key MUST be obtained from process.env.API_KEY.
// This replaces the use of import.meta.env.VITE_API_KEY.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be caught if the environment variable is not set.
  throw new Error("API_KEY environment variable not set. This is required for deployment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getPmBrainstorm(challenge: Challenge): Promise<string> {
  const optionsList = challenge.options.map((opt, index) => 
      `${index + 1}. **${opt.label}** (Impact: ${opt.impact}. Schedule effect: ${opt.delay} days, Cost effect: ₹${opt.cost} Cr)`
  ).join('\n');

  const systemPrompt = "You are a pragmatic, neutral Project Management Consultant (PMC) specializing in large-scale infrastructure and rail projects. Your goal is to analyze the user's current situation and provide a concise, balanced analysis of the four available options. Structure your output with Markdown headings for 'Challenge Summary' and 'Option Analysis (Pros & Cons)'. Focus on risk management, schedule stability, and stakeholder relations. Do not make a final decision, just provide the facts.";
  
  const userQuery = `Current Challenge: ${challenge.title}
  Description: ${challenge.description}
  
  Available Options (Analyze the trade-offs based on the given impacts):
  ${optionsList}
  
  Analyze the long-term strategic pros and cons for each of the four options provided.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating brainstorm via API:", error);
    return "Failed to get AI analysis. An API service error occurred. Please check your connection or API key and try again.";
  }
}

export async function generateFinalReport(delay: number, cost: number): Promise<string> {
  const delayStatus = delay < 0 ? `Finished ${Math.abs(delay).toLocaleString()} days ahead of schedule, showcasing proactive risk mitigation.` : `Finished ${delay.toLocaleString()} days behind the original schedule, necessitating a formal time extension claim.`;
  const costStatus = cost >= 0 ? `The cumulative cost overrun amounted to ₹${cost.toLocaleString()} Cr, demanding a detailed reconciliation.` : `The project achieved a net cost saving of ₹${Math.abs(cost).toLocaleString()} Cr, largely due to efficient resource utilization during time-saving actions.`;

  let outcome = "";
  if (delay < -30) {
      outcome = "Exceptional Performance";
  } else if (delay < 120) {
      outcome = "Excellent Performance";
  } else {
      outcome = "Significant Extension Required";
  }

  const systemPrompt = "You are a professional project management consultant (PMC). Your task is to write a formal completion report for the Mumbai-Ahmedabad High-Speed Rail (MAHSR) project, based on the simulation results provided. The report must be concise, structured with Markdown headings, and professional.";

  const userQuery = `Generate a formal, professional Project Completion Report for the MAHSR simulation.
  
  Overall Outcome: ${outcome}
  Final Delay: ${delay} days. (Result: ${delayStatus})
  Final Cost Overrun: ₹${cost} Cr. (Result: ${costStatus})
  
  Write the report including an Executive Summary, a section on Key Performance Indicators (KPIs - focus on Schedule and Budget), and a section on Lessons Learned/Recommendations based on the simulated outcome (e.g., if delay is high, recommend better ROW management).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report via API:", error);
    return `### [FALLBACK] MAHSR Project Completion Summary
#### Executive Summary
The simulation concluded with ${delayStatus}. ${costStatus} This result highlights the critical importance of timely decision-making and aggressive strategy implementation.

#### Key Performance Indicators (KPIs)
- **Schedule Performance:** ${delay} days of cumulative schedule variance.
- **Cost Performance:** ₹${cost} Cr cumulative budget variance.

#### Recommendations
1.  **Strengthen Risk Contingency:** Formalize budget and schedule contingency plans.
2.  **Proactive Stakeholder Management:** Dedicate resources to early utility shifting and land clearance.
3.  **Enhance Technical Collaboration:** Implement joint task forces to accelerate critical design and approval.`;
  }
}
# PromptWars Validation: Architecture & Prompt Flow

This document fulfills the "Validation Mechanisms" and "Tool Usage Enforcement" requirements for the PromptWars submission. It details the genuine adoption of Generative AI tools within the ElectGuide platform.

## 🛠️ Tool Usage Documentation

### 1. Which tools were used?
*   **Gemini 1.5 Pro (via Vertex AI):** Used as the core engine for the "Democracy Insight Engine" within the `ResultVisualizer` component.
*   **Cloud Run:** The ElectGuide React application and the backend Node.js proxy (which securely handles Vertex AI API keys) are deployed on Google Cloud Run for scalable, serverless execution.
*   **Firebase Studio:** Used for hosting initial assets, integrating Google Analytics, and managing remote configurations for A/B testing prompt variations.

### 2. Why were they selected?
*   **Gemini 1.5 Pro:** Selected for its advanced reasoning capabilities and large context window. The Democracy Insight Engine needs to synthesize the user's specific policy preferences, their final vote, and the simulated national election results into a personalized, cohesive narrative.
*   **Vertex AI:** Chosen for enterprise-grade security and strict data governance. Voter preference data (even simulated) is sensitive, and Vertex AI ensures data is not used to train foundational models.
*   **Cloud Run:** Selected for its seamless integration with Google Workspace and ability to scale from zero to handle potential spikes during election cycles.

### 3. What GenAI Handled vs. What Humans Designed

| Component | Handled By | Details |
| :--- | :--- | :--- |
| **System Architecture & UI** | **Human** | React frontend, component design, state management, Accessibility (WCAG), and responsive CSS. |
| **Civic Data Fetching** | **Human** | Integration with Google Civic Information API for deterministic data retrieval. |
| **Insight Generation** | **GenAI (Gemini)** | Taking the deterministic data (User Vote = X, Winning Vote = Y) and generating a nuanced, educational explanation of *why* their vote matters in that specific context. |
| **Prompt Engineering** | **Human** | Crafting the system instructions and few-shot examples to ensure the AI output is politically neutral, educational, and structured correctly. |

---

## 🧠 Architecture & Prompt Flow Description

### The Flow
1.  **Data Aggregation:** The user completes the voting simulation. The app aggregates their `policyMatch` score, their `vote`, and the `displayResults` (national majority).
2.  **Payload Construction:** A JSON payload is sent from the frontend to the Cloud Run backend.
3.  **Prompt Assembly:** The backend injects the JSON payload into a predefined System Prompt template.
4.  **Vertex AI Execution:** The assembled prompt is sent to the Gemini 1.5 Pro model via the Vertex AI SDK.
5.  **Response Parsing:** The AI generates a personalized insight.
6.  **UI Delivery:** The React frontend receives the insight and displays it in the `ResultVisualizer` modal.

### How Prompts Evolved (Iterative Refinement)

#### Iteration 1: Zero-Shot (Basic)
*   **Prompt:** `The user voted for {vote}. The winner is {winner}. Tell them what this means for democracy.`
*   **Result:** The responses were often too generic, sometimes slightly biased, or hallucinated facts about the fictional parties.

#### Iteration 2: System Instructions Added
*   **Prompt:** `System: You are an unbiased civic educator. Context: User voted {vote}. Winner is {winner}. Task: Explain the democratic outcome.`
*   **Result:** Better tone, but the AI sometimes gave overly long, academic essays that didn't fit the UI modal.

#### Iteration 3: Final Production Prompt (Few-Shot & Constrained)
To ensure the output fits the UI and maintains absolute neutrality, we evolved to a highly constrained prompt using JSON output enforcement (if supported) or strict length limits.

**Final Prompt Excerpt:**
```text
System Instructions:
You are the 'Democracy Insight Engine', an unbiased, educational AI assistant.
Your goal is to explain the significance of a user's vote in the context of the overall election result.
Never express a political preference. Keep the tone encouraging and analytical.
Limit the response to exactly two short paragraphs.

Context Data:
- User's Chosen Candidate: {civicData.vote}
- Election Winner: {winner.name}
- User's Policy Alignment Score: {civicData.policyMatch}%

Task:
Generate a personalized insight explaining how their vote contributes to the democratic process, whether their candidate won or lost. Focus on the concept of 'mandate' if they won, and 'civic record/opposition voice' if they lost.
```

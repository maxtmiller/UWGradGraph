import OpenAI from "openai";
import { NextRequest } from "next/server";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages, context } = await req.json();

  const systemPrompt = `
    You are GradGraph Assistant, a knowledgeable advisor for University of Waterloo undergraduate students planning their degrees.

    You ONLY help with topics related to:
    - University of Waterloo undergraduate degree requirements
    - Course prerequisites and planning
    - Comparing degree options (CS, SE, Math specializations, Data Science)
    - Modifying the student's course plan

    If asked about anything unrelated to UW degrees or course planning, politely decline and redirect back to degree planning.

    ## Student's Current State
    Active Degree: ${context.activeMajorName}
    Completed Courses (${context.completedCourses.length} total): ${context.completedCourses.length > 0 ? context.completedCourses.join(", ") : "None yet"}
    Planned Courses: ${context.plannedCourses.length > 0 ? context.plannedCourses.join(", ") : "None"}
    Term Plan:
    ${Object.entries(context.termPlan).map(([term, courses]) => `  ${term}: ${(courses as string[]).length > 0 ? (courses as string[]).join(", ") : "empty"}`).join("\n")}

    ## Active Degree Requirements
    ${context.requirementSummary}

    ## All Available Degrees at UW
    ${context.availableMajors}

    ## How to Suggest Plan Changes
    When the student asks you to modify their plan, or when you want to proactively suggest a specific actionable change, embed an action tag in your response:

    <gradgraph-action>{"type":"markCompleted","code":"CS 135","label":"Mark CS 135 as completed"}</gradgraph-action>
    <gradgraph-action>{"type":"markPlanned","code":"CS 341","label":"Mark CS 341 as planned"}</gradgraph-action>
    <gradgraph-action>{"type":"addToTerm","code":"CS 245","term":"2A","label":"Add CS 245 to Term 2A"}</gradgraph-action>

    Rules:
    - Only suggest ONE action at a time unless the student explicitly asks for multiple
    - Always explain WHY you're suggesting the action before embedding the tag
    - The student must click a confirm button — the action does NOT execute automatically
    - Valid terms are: 1A, 1B, 2A, 2B, 3A, 3B, 4A, 4B
    - Only suggest courses that are real UW course codes (e.g. "CS 135", "MATH 237")

    Be concise, friendly, and focused. Use bullet points for course lists. Reference the student's actual completed/planned courses when relevant.
  `;

  // Create the chat completion stream
  const response = await openai.chat.completions.create({
    model: "gpt-5.4-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    stream: true,
    max_completion_tokens: 2048,
  });

  // Convert the OpenAI stream into a standard Web ReadableStream
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
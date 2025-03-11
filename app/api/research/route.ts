/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MemoryClient } from 'mem0ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY || ''
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // First, search for relevant past memories
    const searchResults = await mem0.search(query, {
      user_id: 'researcher',
      threshold: 0.1,
      api_version: 'v2'
    });

    // Prepare context from past memories
    const relevantContext = searchResults.length > 0
      ? 'Previous relevant information:\n' + searchResults.map((r: any) => r.content).join('\n\n')
      : '';

    // Generate research response using OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful research assistant. Provide detailed, well-structured answers with citations when possible.\n\n${relevantContext}`
        },
        {
          role: 'user',
          content: query
        }
      ],
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 1000
    });

    const researchResponse = completion.choices[0].message.content;

    // Store the interaction in memory
    await mem0.add([
      { role: 'user', content: query },
      { role: 'assistant', content: researchResponse || '' }
    ], {
      user_id: 'researcher',
      agent_id: 'research-assistant'
    });

    return NextResponse.json({ result: researchResponse });
  } catch (error: any) {
    console.error('Research error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

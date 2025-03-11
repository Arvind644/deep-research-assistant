'use client';

import { useState } from 'react';
import { MemoryClient } from 'mem0ai';
import ReactMarkdown from 'react-markdown';

interface Memory {
  id: string;
  content: string;
  score?: number;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function ResearchInterface() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');
  const [error, setError] = useState('');

  const handleResearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while processing your request.');
      }

      setResults(data.result);
    } catch (err: any) {
      setError(err.message);
      console.error('Research error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#93a1a1]">
      <p className="text-[#586e75] text-center mb-8">
        Enter your research query below. The AI will search through past interactions and provide
        a detailed response with relevant context.
      </p>

      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What would you like to research?"
            className="w-full h-32 p-4 text-[#586e75] bg-[#fdf6e3] rounded-lg border-2 border-[#93a1a1] focus:ring-2 focus:ring-[#268bd2] focus:border-[#268bd2] resize-none font-mono text-lg placeholder-[#93a1a1]"
          />
          <button
            onClick={handleResearch}
            disabled={isLoading || !query.trim()}
            className={`w-full py-4 rounded-lg font-medium text-lg transition-colors ${
              isLoading || !query.trim()
                ? 'bg-[#93a1a1] cursor-not-allowed text-[#fdf6e3]'
                : 'bg-[#268bd2] hover:bg-[#2aa198] text-white'
            }`}
          >
            {isLoading ? 'Researching...' : 'Start Research'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-[#fdf6e3] border-2 border-[#dc322f] rounded-lg">
            <p className="text-[#dc322f] font-medium">{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-8">
            <h2 className="text-2xl font-serif text-[#6c71c4] mb-4">Research Results</h2>
            <div className="bg-[#fdf6e3] border-2 border-[#93a1a1] rounded-lg p-6">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-[#268bd2] text-2xl font-bold mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-[#2aa198] text-xl font-bold mb-3">{children}</h2>,
                    p: ({ children }) => <p className="text-[#586e75] mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside text-[#586e75] mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-[#586e75] mb-4">{children}</ol>,
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    a: ({ children, href }) => (
                      <a href={href} className="text-[#268bd2] hover:underline" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="bg-[#eee8d5] text-[#586e75] px-1 py-0.5 rounded font-mono">{children}</code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-[#eee8d5] text-[#586e75] p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                    ),
                  }}
                >
                  {results}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
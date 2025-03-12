import { ResearchInterface } from '../components/ResearchInterface';
import Footer from '../components/Footer';
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf6e3] to-[#eee8d5] p-6">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif mb-4 text-[#6c71c4]">
            The <span className="italic">Official</span>
            <br />
            <span className="text-[#268bd2] font-bold">Personalized AI Deep Research Assistant</span>
          </h1>
          <p className="text-[#586e75] text-lg italic mb-8">
            Your intelligent research companion that remembers context and evolves with your queries.
            Powered by advanced AI to help you dive deep into any topic.
          </p>
          <div className="bg-[#fdf6e3] border-2 border-[#93a1a1] p-4 rounded-lg inline-block">
            <p className="text-[#dc322f] font-medium">
              Note: This is an AI assistant. Results may vary and should be verified.
            </p>
          </div>
        </div>
        <ResearchInterface />
      </div>
      <Footer />
    </main>
  );
}

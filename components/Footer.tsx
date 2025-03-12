export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#93a1a1] bg-[#eee8d5] bg-opacity-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-3">
          <p className="text-[#586e75] text-sm">
            © {new Date().getFullYear()}{' '}
            <a 
              href="https://buildclub.ai" 
              className="text-[#268bd2] hover:text-[#6c71c4] transition-colors duration-200 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Build Club
            </a>
            . All rights reserved.
          </p>
          <p className="text-[#657b83] text-sm">
            Powered by{' '}
            <a 
              href="https://mem0.ai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#2aa198] hover:text-[#268bd2] transition-colors duration-200 font-medium"
            >
              mem0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';
import { useCursor } from '@/context/CursorContext';

export default function Footer() {
  const { textEnter, textLeave } = useCursor();
  return (
    <footer className="text-[#f7f7f7] py-4 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center">
          {/* Left side - Photo Link */}
          <div>
            <Link href="/photos">
              <span className="text-sm hover:opacity-70 transition-opacity tracking-wide hover:text-white" style={{ fontFamily: '"Shippori Mincho", serif' }} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                写真
              </span>
            </Link>
          </div>
          
          {/* Right side - Social Media Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:opacity-70 transition-opacity tracking-wide hover:text-white" style={{ fontFamily: '"Shippori Mincho", serif' }} onMouseEnter={textEnter} onMouseLeave={textLeave}>
              GitHub
            </a>
            <a href="#" className="text-sm hover:opacity-70 transition-opacity tracking-wide hover:text-white" style={{ fontFamily: '"Shippori Mincho", serif' }} onMouseEnter={textEnter} onMouseLeave={textLeave}>
              LinkedIn
            </a>
            <a href="#" className="text-sm hover:opacity-70 transition-opacity tracking-wide hover:text-white" style={{ fontFamily: '"Shippori Mincho", serif' }} onMouseEnter={textEnter} onMouseLeave={textLeave}>
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
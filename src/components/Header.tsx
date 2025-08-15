import Link from 'next/link';
import Image from 'next/image'; // Image コンポーネントをインポート
import { useCursor } from '@/context/CursorContext';
import { useScrollbarWidth } from '@/context/ScrollbarWidthContext';

// textColor prop を受け取る
interface HeaderProps {
  textColor: string;
}

export default function Header({ textColor }: HeaderProps) {
  const { textEnter, textLeave } = useCursor();
  const { scrollbarWidth } = useScrollbarWidth();

  const hoverTextColorClass = 'hover:text-highlight';

  return (
    <header
      className={`fixed top-0 left-0 z-50 py-6 px-8 md:py-8 md:px-12 transition-colors duration-300 ${textColor}`}
      style={{ width: '100vw', paddingRight: `${scrollbarWidth}px` }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side - Logo */}
        <Link href="/">
          <div 
            className="cursor-pointer"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            <Image
              src="/images/babayudai_logo.svg"
              alt="babayudai logo"
              width={280} // ロゴのサイズを調整
              height={80}
              className="w-auto h-16 md:h-20"
            />
          </div>
        </Link>
        
        {/* Right side - Navigation */}
        <nav className="pr-8">
          <ul className="flex flex-row items-center space-x-6 md:space-x-8">
            <li>
              <Link href="/about">
                <span
                  className={`text-sm md:text-base font-bold ${hoverTextColorClass} transition-colors duration-300 cursor-pointer tracking-wide`}
                  style={{ fontFamily: '"Shippori Mincho", serif' }}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  about
                </span>
              </Link>
            </li>
            <li>
              <Link href="/photos">
                <span
                  className={`text-sm md:text-base font-bold ${hoverTextColorClass} transition-colors duration-300 cursor-pointer tracking-wide`}
                  style={{ fontFamily: '"Shippori Mincho", serif' }}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  gallery
                </span>
              </Link>
            </li>
            <li>
              <Link href="/works">
                <span
                  className={`text-sm md:text-base font-bold ${hoverTextColorClass} transition-colors duration-300 cursor-pointer tracking-wide`}
                  style={{ fontFamily: '"Shippori Mincho", serif' }}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  works
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span
                  className={`text-sm md:text-base font-bold ${hoverTextColorClass} transition-colors duration-300 cursor-pointer tracking-wide`}
                  style={{ fontFamily: '"Shippori Mincho", serif' }}
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  contact
                </span>
              </Link>
            </li>
          </ul>
      </nav>
      </div>
    </header>
  );
}

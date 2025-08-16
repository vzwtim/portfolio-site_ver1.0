
import Link from 'next/link';
import { FaInstagram, FaGithub, FaPencilAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="text-[#f7f7f7] py-2 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com/babachan_1222/"
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaInstagram />
              </span>
            </Link>
            <Link
              href="https://x.com/yudaizit"
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaXTwitter />
              </span>
            </Link>
            <Link
              href="https://note.com/yubayuba"
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaPencilAlt />
              </span>
            </Link>
            <Link
              href="https://github.com/vzwtim"
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaGithub />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

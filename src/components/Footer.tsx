
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaGithub, FaPencilAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-[#f7f7f7] py-2 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} YUDAI. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="https://instagram.com" passHref>
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaInstagram />
              </span>
            </Link>
            <Link href="https://twitter.com" passHref>
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaTwitter />
              </span>
            </Link>
            <Link href="https://note.com" passHref>
              <span className="text-xl hover:text-[#bb5555] transition-colors duration-300 cursor-pointer">
                <FaPencilAlt />
              </span>
            </Link>
            <Link href="https://github.com" passHref>
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

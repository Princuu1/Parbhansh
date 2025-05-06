import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-[#2D2D2D] text-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="font-poppins mb-4 md:mb-0">
          © 2024 Professional Portfolio. All rights reserved.
        </p>
        
        <div className="flex space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#64FFDA] transition-colors"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#64FFDA] transition-colors"
          >
            <FiLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#64FFDA] transition-colors"
          >
            <FiTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

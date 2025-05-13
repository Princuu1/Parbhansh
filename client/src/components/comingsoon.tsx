import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navigation from './Navigation';

const ComingSoon: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-white dark:bg-[#111827] text-black dark:text-white transition-colors duration-300 px-4">
      {/* Navigation Bar */}
      <Navigation />

      {/* Lottie Animations */}
      <div className="z-10 flex justify-center items-center w-full h-full">
        {/* Light Mode Animation */}
        <div className="block dark:hidden w-full max-w-[500px]">
          <DotLottieReact
            src="https://lottie.host/79c8dfdf-6007-4885-a11f-e19b2d65b6cb/rSmL2hNFQC.lottie"
            loop
            autoplay
            style={{ width: '100%' }}
          />
        </div>

        {/* Dark Mode Animation */}
        <div className="hidden dark:block w-full max-w-[500px]">
          <DotLottieReact
            src="https://lottie.host/51b6a790-2b03-4bf0-a83a-29c837ece8d4/mhE7bW19li.lottie" // Replace with your dark mode animation URL
            loop
            autoplay
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

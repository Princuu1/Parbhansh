import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import AnimatedSection from "./AnimatedSection";
import BackgroundAnimation from "./BackgroundAnimation";

export default function Hero({
  frontSrc = "/image/profilepic.jpeg",
  backSrc = "/image/profile-pic (1).png",
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <AnimatedSection className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <BackgroundAnimation />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile flip & float */}
        <motion.div
          className="relative w-64 h-64 mx-auto mb-8 cursor-pointer perspective-1000"
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            scale: { duration: 0.6, ease: "easeOut" },
            y: { repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut", delay: 0.6 }
          }}
          onHoverStart={() => setFlipped(true)}
          onHoverEnd={() => setFlipped(false)}
        >
          {/* Aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(100,255,218,0.5), transparent)' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />

          {/* Flip container */}
          <div
            className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front */}
            <motion.img
              src={frontSrc}
              alt="Front Image"
              className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl backface-hidden"
              initial={{ filter: 'grayscale(0%)' }}
              animate={{ filter: flipped ? 'grayscale(100%)' : 'grayscale(0%)' }}
              transition={{ duration: 0.8 }}
            />
            {/* Back */}
            <motion.img
              src={backSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl backface-hidden"
              style={{ transform: 'rotateY(180deg)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: flipped ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="font-heading1 text-[60px] md:text-[60px]  mb-8 h-34"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typewriter
            options={{ loop: true, delay: 50, deleteSpeed: 30 }}
            onInit={(typewriter) => {
              typewriter
                .typeString('<span style="background: linear-gradient(to right, #64FFDA, #00A3FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hello, I am Parbhansh</span>')
                .pauseFor(2000).deleteAll()
                .typeString('<span style="background: linear-gradient(to right, #FF6B6B, #FF8E53); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">I am a Developer</span>')
                .pauseFor(2000).deleteAll()
                .typeString('<span style="background: linear-gradient(to right, #64FFDA, #4CAF50); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">I Create Digital Experiences</span>')
                .pauseFor(2000).deleteAll()
                .typeString('<span style="background: linear-gradient(to right, #9C27B0, #673AB7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome to My Portfolio</span>')
                .pauseFor(2000).start();
            }}
          />
        </motion.div>

        {/* Subtext */}
        <motion.p
  className="text-2xl md:text-[30px] text-[#333333] dark:text-gray-300 font-heading2 mb-8 max-w-2xl mx-auto"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  Specializing in creating innovative solutions and memorable user experiences through modern web technologies and creative design.
</motion.p>

      </div>
    </AnimatedSection>
  );
}

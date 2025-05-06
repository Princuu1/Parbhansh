import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';
import AnimatedSection from "./AnimatedSection";

export default function Hero() {
  return (
    <AnimatedSection className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.img
          src="https://raw.githubusercontent.com/PK-github985/Parbhansh-portfilo/refs/heads/main/profile-pic%20(1).png"
          alt="Professional headshot"
          className="w-48 h-48 rounded-full mx-auto mb-8 object-cover shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div 
          className="font-playfair text-4xl md:text-6xl font-bold mb-6 h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typewriter
            options={{
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('<span style="background: linear-gradient(to right, #64FFDA, #00A3FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hello, I am Parbhansh</span>')
                .pauseFor(2000)
                .deleteAll()
                .typeString('<span style="background: linear-gradient(to right, #FF6B6B, #FF8E53); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">I am a Developer</span>')
                .pauseFor(2000)
                .deleteAll()
                .typeString('<span style="background: linear-gradient(to right, #64FFDA, #4CAF50); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">I Create Digital Experiences</span>')
                .pauseFor(2000)
                .deleteAll()
                .typeString('<span style="background: linear-gradient(to right, #9C27B0, #673AB7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome to My Portfolio</span>')
                .pauseFor(2000)
                .start();
            }}
          />
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-[#333333] dark:text-gray-300 font-poppins mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Specializing in creating innovative solutions and memorable user experiences 
          through modern web technologies and creative design.
        </motion.p>
      </div>
    </AnimatedSection>
  );
}
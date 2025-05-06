import Navigation from "@/components/Navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Code2, Briefcase, GraduationCap, Award } from "lucide-react";

const milestones = [
  {
    icon: <Code2 className="w-6 h-6" />,
    year: "2020 - Present",
    title: "Full Stack Developer",
    description: "Specializing in modern web technologies and creating exceptional digital experiences."
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    year: "2018 - 2020",
    title: "Frontend Developer",
    description: "Focused on creating responsive and intuitive user interfaces."
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    year: "2018",
    title: "Computer Science Degree",
    description: "Graduated with honors, specializing in web technologies."
  },
  {
    icon: <Award className="w-6 h-6" />,
    year: "2017",
    title: "Best Project Award",
    description: "Received recognition for innovative web application development."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="font-playfair text-4xl md:text-5xl font-bold mb-12 text-center text-[#2D2D2D] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              About Me
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                className="prose prose-lg dark:prose-invert"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-[#333333] dark:text-gray-300 font-poppins">
                  I'm a passionate developer with a keen eye for design and a drive for creating exceptional digital experiences. With expertise in both frontend and backend development, I bring ideas to life through clean code and intuitive interfaces.
                </p>

                <p className="text-[#333333] dark:text-gray-300 font-poppins">
                  My journey in web development started with a curiosity for creating interactive experiences. Today, I specialize in building modern web applications using cutting-edge technologies and best practices.
                </p>
              </motion.div>

              <motion.div
                className="prose prose-lg dark:prose-invert"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-[#333333] dark:text-gray-300 font-poppins">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </p>

                <p className="text-[#333333] dark:text-gray-300 font-poppins">
                  I believe in continuous learning and staying updated with the latest industry trends to deliver the best possible solutions to my clients.
                </p>
              </motion.div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-[#2D2D2D] dark:text-white">
                Professional Journey
              </h2>

              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {milestone.icon}
                  </div>
                  <div>
                    <span className="text-sm text-primary font-medium">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-[#2D2D2D] dark:text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-[#333333] dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
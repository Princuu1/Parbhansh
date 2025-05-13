import Navigation from "@/components/Navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Code2, Briefcase, GraduationCap, Award } from "lucide-react";

const milestones = [
  {
    icon: <Code2 className="w-6 h-6" />,
    year: "2020 - Present",
    title: "Full Stack Developer",
    description:
      "Specializing in modern web technologies and creating exceptional digital experiences.",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    year: "2018 - 2020",
    title: "Frontend Developer",
    description:
      "Focused on creating responsive and intuitive user interfaces.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    year: "2018",
    title: "Computer Science Degree",
    description:
      "Graduated with honors, specializing in web technologies.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    year: "2017",
    title: "Best Project Award",
    description:
      "Received recognition for innovative web application development.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />

      {/* About Section */}
      <section className="relative max-w-6xl mx-auto px-4 pt-12 pb-20">
        {/* About Me Heading */}
        <motion.h1
          className="font-heading1 text-[65px] md:text-[65px] mb-8 text-center text-[#2D2D2D] dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Me
        </motion.h1>

        {/* Layout with image + content */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-12">
          {/* Photo */}
          <div className="mx-auto md:mx-0 md:shrink-0">
            <figure className="swing-frame aspect-square w-48 sm:w-64 md:w-80 mb-8 md:mb-0">
              <img
                src="/image/photoportfolio.png"
                alt="Profile"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300"
              />
            </figure>
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="prose prose-lg dark:prose-invert"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-[#333333] dark:text-gray-300 text-[25px] font-handwritting1">
                  I'm a passionate developer with a keen eye for design and a
                  drive for creating exceptional digital experiences. With
                  expertise in both frontend and backend development, I bring
                  ideas to life through clean code and intuitive interfaces.
                </p>
                <p className="text-[#333333] dark:text-gray-300 text-[25px] font-handwritting1">
                  My journey in web development started with a curiosity for
                  creating interactive experiences. Today, I specialize in
                  building modern web applications using cutting-edge
                  technologies and best practices.
                </p>
              </motion.div>

              <motion.div
                className="prose prose-lg dark:prose-invert"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-[#333333] dark:text-gray-300 text-[25px] font-handwritting1">
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community.
                </p>
                <p className="text-[#333333] dark:text-gray-300 text-[25px] font-handwritting1">
                  I believe in continuous learning and staying updated with the
                  latest industry trends to deliver the best possible solutions
                  to my clients.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      {/* <AnimatedSection className="px-4 pb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-playfair font-bold text-center mb-8 text-[#2D2D2D] dark:text-white">
          Professional Journey
        </h2>
        <div className="space-y-8">
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
      </AnimatedSection> */}

      {/* Global Styles for Swing Animation */}
      <style jsx global>{`
        body {
          background: #eee;
        }
        .swing-frame {
          padding: 12px;
          background: #fff;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          transform-origin: center -20px;
          transform: rotate(-4deg);
          animation: swing ease-in-out 1s infinite alternate;
          position: relative;
        }
        .swing-frame:hover {
          animation-play-state: paused;
        }
        .swing-frame:after {
          content: '';
    position: absolute;  
    width: 20px; height: 20px;  
    border: 1px solid #999;
    top: -10px; left: 50%;
    z-index: 0;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
        }
        .swing-frame:before {
          /* Nail point */
          content: '';
          position: absolute;
          width: 6px;
          z-index: 5;
          height: 6px;
          top: -16px;
          left: 168.5px;
          transform: translateX(-50%);
          background: hsl(var(--primary));  /* updated color */
          border-radius: 50%;
        }
        @keyframes swing {
          0% {
            transform: rotate(3deg);
          }
          50% {
            transform: rotate(-3deg);
          }
          100% {
            transform: rotate(2deg);
          }
        }
          @media (max-width: 600px) {
          .swing-frame:before {
          /* Nail point */
          content: '';
          position: absolute;
          width: 6px;
          z-index: 5;
          height: 6px;
          top: -15px;
          left: 105px;
         
        }
      }
          
      `}</style>
    </div>
  );
}

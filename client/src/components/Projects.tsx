import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "Translatalk",
    description: "Real-Time Translation. Real Human Connection.",
    image: "/image/Translatalk.jpeg",
    details:
      "An instant language translator that helps users communicate across different languages in real time—perfect for travel, learning, or global conversations.",
    technologies: [ "Node.js", "Html", "CSS", "JavaScript"],
    live: "https://translatalk.onrender.com",
    source: "/comingsoon",
  },
  {
    title: "WRTC Video call ",
    description: "Face-to-Face, No Matter the Place.",
    image: "/image/Wrtcvideocall.jpeg",
    details:
      "A real-time video calling solution using STUN and TURN servers for secure, peer-to-peer connections, with no plugins required for seamless communication.",
    technologies: ["Node.js", "Socket.io", "JavaScript","CSS","Html"],
    live: "https://proton-video-call.onrender.com",
    source: "/comingsoon",
  },
  {
    title: "Billing page",
    description: "Create and manage bills with easy invoice generator",
    image: "/image/billingpage.jpeg",
    details:
      "A streamlined billing interface for managing invoices, payments, and financial records—designed for simplicity and clarity.",
    technologies: [ "Node.js", "Pdfkit", "JavaScript","CSS","Html"],
    live: "https://billingpage.onrender.com",
    source: "/comingsoon",
  },
  {
    title: "AI chat bot",
    description: "Your AI Companion for Instant Answers.",
    image: "/image/AIchatbot.jpeg",
    details:
      "An intelligent AI chatbot that provides fast, accurate, and conversational responses—ideal for customer support, learning, or automation.",
    technologies: ["Node.js", "Javascript", "CSS", "Html"],
    live: "https://gyanai.vercel.app/",
    source: "/comingsoon",
  },
 
  {
    title: "Qr code scanner",
    description: "Scan and go, quick as a show.",
    image: "/image/qrscanner.jpeg",
    details:
      "A fast and reliable QR code scanner that instantly decodes and redirects users to links, data, or actions with just a tap.",
    technologies: ["Html", "css", "Javascript", ],
    live: "https://qray.netlify.app/",
    source: "/comingsoon",
  },
   {
    title: "Jee mains OMR",
    description: "Fast, accurate OMR answer sheet evaluator.",
    image: "/image/jeemainsomrchecker.jpeg",
    details:
      "An automated tool that quickly checks and grades OMR answer sheets with high accuracy, saving time and reducing grading errors.",
    technologies: ["Html", "css", "Javascript", ],
    live: "https://omrresponsechecker.netlify.app/",
    source: "/comingsoon",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading1 text-[55px] md:text-[55px]  mb-12 text-center text-[#2D2D2D] dark:text-white">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer relative"
            >
              <Card className="overflow-hidden h-full dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300">
                <CardContent className="p-0 h-full">
                  <div className="relative group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white font-medium px-4 py-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                        View Details
                      </span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold mb-2 text-[#2D2D2D] dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-[#333333] dark:text-gray-300 font-poppins">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </AnimatedSection>
  );
}

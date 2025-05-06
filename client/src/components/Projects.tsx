import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "E-commerce Platform",
    description: "Modern shopping experience with React and Node.js",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    details:
      "A full-featured e-commerce platform with real-time inventory management, secure payments, and an intuitive admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    live: "https://ecommerce-demo.example.com",
    source: "https://github.com/username/ecommerce-platform",
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization and reporting system",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    details:
      "Interactive analytics platform with real-time data processing, customizable dashboards, and automated reporting capabilities.",
    technologies: ["Vue.js", "Python", "D3.js", "AWS", "MongoDB"],
    live: "https://analytics.example.com",
    source: "https://github.com/username/analytics-dashboard",
  },
  {
    title: "Social Network",
    description: "Community platform with real-time features",
    image: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
    details:
      "Feature-rich social platform with real-time messaging, content sharing, and comprehensive user profiles.",
    technologies: ["React", "GraphQL", "Node.js", "Socket.io", "PostgreSQL"],
    live: "https://socialnetwork.example.com",
    source: "https://github.com/username/social-network",
  },
  {
    title: "Mobile App",
    description: "Cross-platform application using React Native",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    details:
      "Cross-platform mobile application with offline support, push notifications, and seamless data synchronization.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    live: "https://mobileapp.example.com",
    source: "https://github.com/username/mobile-app",
  },
  {
    title: "AI Assistant",
    description: "Natural language processing interface",
    image: "https://images.unsplash.com/photo-1660592868727-858d28c3ba52",
    details:
      "AI-powered assistant with natural language understanding, task automation, and learning capabilities.",
    technologies: ["Python", "TensorFlow", "NLP", "FastAPI", "Docker"],
    live: "https://aiassistant.example.com",
    source: "https://github.com/username/ai-assistant",
  },
  {
    title: "Blockchain Platform",
    description: "Decentralized application with smart contracts",
    image: "https://images.unsplash.com/photo-1685478237595-f452cb125f27",
    details:
      "Decentralized platform for secure transactions, smart contract automation, and digital asset management.",
    technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
    live: "https://blockchain.example.com",
    source: "https://github.com/username/blockchain-platform",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-12 text-center text-[#2D2D2D] dark:text-white">
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

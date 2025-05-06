import Navigation from "@/components/Navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Globe, Smartphone, Server, Rocket } from "lucide-react";

const services = [
  {
    icon: <Code className="w-12 h-12 text-primary" />,
    title: "Web Development",
    description: "Custom web applications built with modern technologies and best practices.",
    technologies: ["React", "Node.js", "TypeScript", "Next.js"]
  },
  {
    icon: <Palette className="w-12 h-12 text-primary" />,
    title: "UI/UX Design",
    description: "Intuitive and beautiful interfaces that enhance user experience.",
    technologies: ["Figma", "Adobe XD", "Tailwind CSS", "Framer Motion"]
  },
  {
    icon: <Globe className="w-12 h-12 text-primary" />,
    title: "Full Stack Solutions",
    description: "End-to-end development from database to frontend implementation.",
    technologies: ["PostgreSQL", "MongoDB", "Express", "GraphQL"]
  },
  {
    icon: <Smartphone className="w-12 h-12 text-primary" />,
    title: "Mobile Development",
    description: "Cross-platform mobile applications that work seamlessly.",
    technologies: ["React Native", "Flutter", "iOS", "Android"]
  },
  {
    icon: <Server className="w-12 h-12 text-primary" />,
    title: "API Development",
    description: "Robust and scalable APIs that power your applications.",
    technologies: ["REST", "GraphQL", "WebSocket", "Microservices"]
  },
  {
    icon: <Rocket className="w-12 h-12 text-primary" />,
    title: "Performance Optimization",
    description: "Speed up your applications for better user experience.",
    technologies: ["Webpack", "Lighthouse", "CDN", "Caching"]
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <AnimatedSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="font-playfair text-4xl md:text-5xl font-bold mb-12 text-center text-[#2D2D2D] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Services
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <motion.div 
                        className="mb-6"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="font-playfair text-2xl font-semibold mb-3 text-[#2D2D2D] dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-[#333333] dark:text-gray-300 font-poppins mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
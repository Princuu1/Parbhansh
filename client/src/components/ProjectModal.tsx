import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    image: string;
    details?: string;
    technologies?: string[];
    live?: string;
    source?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-playfair text-2xl">
                {project.title}
              </DialogTitle>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="relative group mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Mobile: always-visible icons */}
                {(project.live || project.source) && (
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 rounded-lg sm:hidden">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="w-20 h-20 flex items-center justify-center rounded-full bg-transparent text-gray-900 dark:text-white transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-transparent hover:shadow-lg dark:hover:shadow-white/10"
                      >
                        <img src="https://cdn-icons-png.flaticon.com/512/8815/8815166.png" alt="Live Demo" className="w-6 h-6" />
                      </a>
                    )}
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source Code"
                         className="w-20 h-20 flex items-center justify-center rounded-full bg-transparent text-gray-900 dark:text-white transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-transparent hover:shadow-lg dark:hover:shadow-white/10"
                      >
                        <img src="   https://cdn-icons-png.flaticon.com/512/2282/2282188.png " alt="Source Code" className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}

                {/* Desktop: hover-reveal icons */}
                {(project.live || project.source) && (
                  <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-4 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="w-20 h-20 flex items-center justify-center rounded-full bg-transparent text-gray-900 dark:text-white transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-transparent hover:shadow-lg dark:hover:shadow-white/10"
                      >
                        <img src="https://cdn-icons-png.flaticon.com/512/8815/8815166.png" alt="Live Demo" className="w-6 h-6" />
                      </a>
                    )}
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source Code"
                        className="w-20 h-20 flex items-center justify-center rounded-full bg-transparent text-gray-900 dark:text-white transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-transparent hover:shadow-lg dark:hover:shadow-white/10"
                      >
                        <img src="   https://cdn-icons-png.flaticon.com/512/2282/2282188.png " alt="Source Code" className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <DialogDescription className="text-lg mb-4">
                {project.description}
              </DialogDescription>

              {project.details && (
                <p className="text-muted-foreground mb-4">{project.details}</p>
              )}

              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

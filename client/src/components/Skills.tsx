import { Progress } from "@/components/ui/progress";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const skills = [
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "Mobile Development", level: 75 },
  { name: "DevOps", level: 70 },
];

export default function Skills() {
  return (
    <AnimatedSection className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading1 text-[55px] md:text-[50px]  mb-12 text-center text-[#2D2D2D] dark:text-white">
          Skills & Expertise
        </h2>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-poppins text-lg text-[#333333] dark:text-gray-300">
                  {skill.name}
                </span>
                <span className="font-poppins text-primary">
                  {skill.level}%
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Progress 
                  value={skill.level} 
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
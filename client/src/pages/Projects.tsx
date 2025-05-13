import Navigation from "@/components/Navigation";
import ProjectsComponent from "@/components/Projects";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <ProjectsComponent />
      </div>
    </div>
  );
}

import Navigation from "@/components/Navigation";
import ContactComponent from "@/components/Contact";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <ContactComponent />
      </div>
    </div>
  );
}

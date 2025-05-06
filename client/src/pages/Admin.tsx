import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

export default function Admin() {
  const { toast } = useToast();
  const [content, setContent] = useState({
    hero: {
      title: "Creative Developer",
      description: "Crafting beautiful digital experiences with modern web technologies.",
    },
    about: {
      text: "Your about text here",
    },
    services: [
      { title: "Web Development", description: "Building modern web applications" },
      { title: "UI/UX Design", description: "Creating beautiful user interfaces" },
    ],
  });

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Changes Saved",
      description: "Your content has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-foreground dark:text-white">Admin Dashboard</h1>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  value={content.hero.title}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value }
                  })}
                  placeholder="Hero Title"
                />
                <Textarea
                  value={content.hero.description}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, description: e.target.value }
                  })}
                  placeholder="Hero Description"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.about.text}
                onChange={(e) => setContent({
                  ...content,
                  about: { text: e.target.value }
                })}
                placeholder="About Text"
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

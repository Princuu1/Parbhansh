import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/About", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const NavigationLinks = () => (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <a
            onClick={() => setMenuOpen(false)}
            className={cn(
              "relative font-poppins text-foreground dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors",
              location === link.href && "text-primary dark:text-primary"
            )}
          >
            {link.label}
            {location === link.href && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 h-0.5 bg-primary bottom-[-4px]"
              />
            )}
          </a>
        </Link>
      ))}
    </>
  );

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border dark:bg-gray-900/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {isMobile ? (
            // Mobile Layout: Logo -> Toggle -> Menu Icon
            <div className="flex items-center justify-between w-full">
              {/* Left side: Logo */}
              <Link href="/">
                <a className="font-bastliga text-[50px] text-primary dark:text-primary">
                  Parbhansh
                </a>
              </Link>

              {/* Center: Toggle and Menu */}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  className="p-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                 {menuOpen ? (
  <img src="https://cdn-icons-png.flaticon.com/128/12252/12252279.png" alt="Close menu" className="h-6 w-6" />
) : (
  <img src="https://cdn-icons-png.flaticon.com/128/12252/12252287.png " alt="Open menu" className="h-6 w-6" />
)}

                </button>
              </div>
            </div>
          ) : (
            // Desktop Layout
            <>
              <Link href="/">
                <a className="font-bastliga text-[50px] text-primary dark:text-primary">
                  Parbhansh
                </a>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <NavigationLinks />
                <ThemeToggle />
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Spacer under fixed nav */}
      <div className="h-16" />

      {/* Slide-in Mobile Menu Drawer */}
      {isMobile && (
        <div
          className={cn(
            "fixed top-16 left-0 w-64 h-[calc(100%-4rem)] bg-[#ffffff] dark:bg-[#111827] z-40 shadow-md transition-transform duration-300 ease-in-out",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-6 p-6">
            <NavigationLinks />
          </div>
        </div>
      )}
    </>
  );
}

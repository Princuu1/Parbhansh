import React from 'react';
import { Link } from 'wouter';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative p-4 bg-[#0a0f27] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Designed with ❤️ by Parbhansh</h3>
          <p className="text-sm">
            "Thank you for visiting my personal portfolio. I welcome the opportunity to connect—"
          </p>
          <p className="text-sm">
            "Feel free to reach out through my social platforms 🌐."
          </p>
          <p className="text-sm">
            "You can send me a message directly through the contact form above 📬."
          </p>
        </div>

        {/* Middle Column: Quick Links + Credit */}
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ href, label }) => (
                <li key={href} className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10728/10728977.png" // Use your desired PNG icon
                    alt="Chevron Right"
                    className="mr-2"
                    style={{ width: '16px', height: '16px' }}
                  />
                  <Link href={href} className="hover:text-[#64FFDA] transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Contact Info */}
        <div className="space-y-4 text-sm">
          <h4 className="text-lg font-semibold">Contact Info</h4>
          <p className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/15047/15047587.png"
              alt="Email"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Princuu29@gmail.com
          </p>
          <p className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/18415/18415050.png"
              alt="Map Pin"
              className="mr-2"
              style={{ width: '16px', height: '16px' }}
            />
            Hisar, Haryana, (125033)
          </p>
          <div className="flex space-x-4 mt-2">
            <Link href="/comingsoon" className="hover:text-[#64FFDA] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </Link>
            <Link href="/comingsoon" className="hover:text-[#64FFDA] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/919/919847.png"
                alt="GitHub"
                className="w-6 h-6"
              />
            </Link>
            <a href="mailto:Princuu29@gmail.com?subject=Hello%20There&body=I%20wanted%20to%20reach%20out%20regarding%20our%20project.
" className="hover:text-[#64FFDA] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/15047/15047587.png"
                alt="Email"
                className="w-6 h-6"
              />
            </a>
            <Link href="/comingsoon" className="hover:text-[#64FFDA] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
                alt="Twitter"
                className="w-6 h-6"
              />
            </Link>
            <Link href="/comingsoon" className="hover:text-[#64FFDA] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/15713/15713420.png "
                alt="Instagram"
                className="w-6 h-6"
              />
            </Link>
            <Link href="/comingsoon" className="hover:text-[#64FFDA] transition">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png"
                alt="Telegram"
                className="w-6 h-6"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

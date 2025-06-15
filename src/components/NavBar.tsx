
import React from "react";
import { useCMS } from "./LocalCMSProvider";

const links = [
  { label: "Home", href: "#home" },
  { label: "Performance", href: "#performance" },
  { label: "Branding", href: "#branding" },
  { label: "User Experience", href: "#user-experience" },
  { label: "Contato", href: "#contato" },
];

const NavBar = () => {
  const { admin } = useCMS();
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 shadow transition backdrop-blur-xl border-b border-gray-200">
      <nav className="container flex justify-between items-center h-20">
        <a href="#home" className="flex items-center gap-2 font-display text-2xl font-bold text-primary hover:text-accent transition">
          Kanvas
        </a>
        <ul className="flex gap-8 items-center">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-inter text-lg hover:text-primary transition px-2 py-1 relative"
              >
                {link.label}
              </a>
            </li>
          ))}
          {admin && <span className="px-3 py-1 rounded bg-accent text-xs text-accent-foreground ml-4">Modo admin</span>}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

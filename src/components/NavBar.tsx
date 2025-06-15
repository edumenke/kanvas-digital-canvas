
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
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 shadow backdrop-blur-xl border-b border-gray-200">
      <nav className="container flex justify-between items-center h-20">
        {/* Logo da Kanvas à esquerda */}
        <a href="#home" className="flex items-center gap-2 group">
          <img
            src="/logo-ink.png"
            alt="Kanvas Logo"
            className="h-12 w-auto drop-shadow"
            style={{ marginRight: "0.5rem" }}
          />
          <span className="font-pacifico text-2xl text-splash2 transition group-hover:text-splash5 lowercase">
            kanvas
          </span>
        </a>
        <ul className="flex gap-8 items-center">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-pacifico text-lg hover:text-splash3 transition px-2 py-1 relative lowercase"
              >
                {link.label.toLowerCase()}
              </a>
            </li>
          ))}
          {admin && <span className="px-3 py-1 rounded bg-splash4 text-xs text-gray-700 ml-4 shadow">Modo admin</span>}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

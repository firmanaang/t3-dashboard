"use client";

import MobileMenu from "./MobileMenu";

const HeaderComponent = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#080063]/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-tight">SALT</span>
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-blue-400"
            >
              SALT
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-blue-400"
            >
              Ecosystem
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-blue-400"
            >
              Resources
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-blue-400"
            >
              Milestone
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:text-blue-400"
            >
              About
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            {/* Circle decorations - both on the left */}
            <div className="absolute -left-12 h-3 w-3 rounded-full border border-blue-400/50 bg-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            <div className="absolute -left-6 h-3 w-3 rounded-full border border-blue-400/50 bg-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-blue-700">
              Get SALT
            </button>
          </div>
          <div className="block lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;

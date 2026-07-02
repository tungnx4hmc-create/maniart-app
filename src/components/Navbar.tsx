import React from "react";
import { Sparkles, Settings, Award, Compass, HeartHandshake } from "lucide-react";

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ isAdmin, setIsAdmin, onScrollTo }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C5A022]/20 bg-[#050505]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => onScrollTo("hero")} 
          className="flex cursor-pointer items-center space-x-2 group"
          id="nav-logo"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#C5A022]/30 bg-gradient-to-br from-[#C5A022]/20 to-black shadow-lg shadow-[#C5A022]/5 group-hover:border-[#FFD700] transition-all duration-300">
            <Sparkles className="h-5 w-5 text-[#FFD700] animate-pulse" />
            <div className="absolute inset-0 rounded-lg bg-[#C5A022]/10 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-wider text-white uppercase">
              HỌC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C5A022]">THỰC CHIẾN</span>
            </span>
            <span className="block text-[9px] font-mono tracking-widest text-[#C5A022]/70 uppercase">
              LÀM CHỦ CÔNG CỤ
            </span>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          <button 
            onClick={() => onScrollTo("about-path")} 
            className="flex items-center space-x-1.5 font-medium text-gray-300 hover:text-[#FFD700] transition-colors cursor-pointer"
            id="nav-btn-path"
          >
            <Compass className="h-4 w-4 text-[#C5A022]" />
            <span>Lộ Trình Học</span>
          </button>
          <button 
            onClick={() => onScrollTo("packages")} 
            className="flex items-center space-x-1.5 font-medium text-gray-300 hover:text-[#FFD700] transition-colors cursor-pointer"
            id="nav-btn-packages"
          >
            <Award className="h-4 w-4 text-[#C5A022]" />
            <span>Gói Khóa Học</span>
          </button>
          <button 
            onClick={() => onScrollTo("supports")} 
            className="flex items-center space-x-1.5 font-medium text-gray-300 hover:text-[#FFD700] transition-colors cursor-pointer"
            id="nav-btn-supports"
          >
            <HeartHandshake className="h-4 w-4 text-[#C5A022]" />
            <span>Đồng Hành</span>
          </button>
        </nav>

        {/* Call to Actions & Admin Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center space-x-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono tracking-wide transition-all border ${
              isAdmin 
                ? "bg-[#C5A022]/15 border-[#C5A022] text-[#FFD700] shadow-md shadow-[#C5A022]/10" 
                : "border-gray-800 bg-gray-900/60 text-gray-400 hover:border-[#C5A022]/40 hover:text-[#FFD700]"
            }`}
            title="Khu vực Quản trị Website"
            id="nav-admin-toggle"
          >
            <Settings className={`h-3.5 w-3.5 ${isAdmin ? "animate-spin" : ""}`} />
            <span>{isAdmin ? "ADMIN ON" : "ADMIN MODE"}</span>
          </button>

          <button
            onClick={() => onScrollTo("consultation-form")}
            className="relative hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] px-5 py-2.5 text-xs font-black uppercase text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#C5A022]/20 hover:shadow-[#C5A022]/40 cursor-pointer"
            id="nav-btn-consult"
          >
            Đăng Ký Ngay
          </button>
        </div>
      </div>
    </header>
  );
}

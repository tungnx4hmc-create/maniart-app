import React, { useState } from "react";
import { Settings, Award, Compass, HeartHandshake, LogIn, LogOut, User, Loader2, Sparkles, BookOpen } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ isAdmin, setIsAdmin, onScrollTo }: NavbarProps) {
  const { user, authLoading, purchasedGroups, loginWithGoogle, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  // Group normalizer to human readable names
  const getReadableGroup = (grp: string) => {
    switch (grp.toLowerCase()) {
      case "newbie":
        return "Gói 1: Nhập Môn Thực Chiến";
      case "tiktok":
        return "Gói 2: Làm Chủ Công Cụ (TikTok)";
      case "youtube":
        return "Gói 2: Làm Chủ Công Cụ (YouTube)";
      case "pro":
        return "Gói 3: Chuyên Nghiệp - Studio";
      default:
        return `Khóa Học: ${grp.toUpperCase()}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#C5A022]/20 bg-[#050505]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => onScrollTo("hero")} 
          className="flex cursor-pointer items-center space-x-2 group"
          id="nav-logo"
        >
          <Logo className="h-9" />
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

        {/* Call to Actions & Auth & Admin Toggle */}
        <div className="flex items-center space-x-3">
          {/* Admin Toggle */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center space-x-1.5 rounded-full px-3 py-1 text-[10px] font-mono tracking-wide transition-all border ${
              isAdmin 
                ? "bg-[#C5A022]/15 border-[#C5A022] text-[#FFD700] shadow-md shadow-[#C5A022]/10" 
                : "border-zinc-800 bg-zinc-900/60 text-gray-400 hover:border-[#C5A022]/40 hover:text-[#FFD700]"
            }`}
            title="Khu vực Quản trị Website"
            id="nav-admin-toggle"
          >
            <Settings className={`h-3 w-3 ${isAdmin ? "animate-spin" : ""}`} />
            <span className="hidden xs:inline">{isAdmin ? "ADMIN ON" : "ADMIN"}</span>
          </button>

          {/* User Authentication Section */}
          <div className="relative">
            {authLoading ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-yellow-500" />
              </div>
            ) : user ? (
              <div>
                {/* User Info Avatar & Stats */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/40 hover:border-yellow-500/50 p-1 pr-3 transition-all cursor-pointer"
                  title="Nhấp để xem tài khoản học viên"
                >
                  <img
                    src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                    alt={user.displayName || "Học viên"}
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-full object-cover border border-zinc-700"
                  />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-white max-w-[100px] truncate">
                      {user.displayName || "Học viên"}
                    </div>
                    <div className="text-[9px] text-yellow-500 font-mono flex items-center">
                      <Sparkles className="h-2 w-2 mr-1" />
                      <span>{purchasedGroups.length} Khóa học</span>
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    {/* Overlay click to close */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2.5 w-72 origin-top-right rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl ring-1 ring-black ring-opacity-5 z-20">
                      <div className="flex items-center space-x-3 border-b border-zinc-900 pb-3 mb-3">
                        <img
                          src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                          alt={user.displayName || "Học viên"}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 rounded-full object-cover border border-yellow-500/20"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white truncate">{user.displayName}</h4>
                          <p className="text-[10px] text-gray-500 truncate font-mono">{user.email}</p>
                        </div>
                      </div>

                      {/* Purchased Courses Status */}
                      <div className="space-y-2 mb-4">
                        <h5 className="text-[9px] text-yellow-500 font-mono font-bold uppercase tracking-wider flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          <span>Khoá Học Đã Mua ({purchasedGroups.length})</span>
                        </h5>
                        
                        {purchasedGroups.length === 0 ? (
                          <div className="p-3 text-center border border-dashed border-zinc-900 rounded-lg bg-zinc-900/20">
                            <p className="text-[11px] text-gray-500 italic">
                              Bạn chưa mở khóa khóa học nào. Hãy đăng ký một gói bên dưới để bắt đầu học!
                            </p>
                          </div>
                        ) : (
                          <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                            {purchasedGroups.map((grp) => (
                              <div 
                                key={grp} 
                                className="flex items-center justify-between text-xs p-2 rounded bg-yellow-500/5 border border-yellow-500/10 text-white font-medium"
                              >
                                <span className="truncate">{getReadableGroup(grp)}</span>
                                <span className="text-[9px] text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                                  Đã mua
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          logout();
                        }}
                        className="w-full flex items-center justify-center space-x-1.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 py-2 text-xs font-bold transition-all cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Đăng Xuất</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="inline-flex items-center space-x-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500 text-yellow-500 hover:text-black px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer"
                id="google-login-btn"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Google Sign-In</span>
              </button>
            )}
          </div>

          <button
            onClick={() => onScrollTo("consultation-form")}
            className="relative hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] px-4 py-2 text-xs font-black uppercase text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#C5A022]/20 hover:shadow-[#C5A022]/40 cursor-pointer"
            id="nav-btn-consult"
          >
            Đăng Ký Ngay
          </button>
        </div>
      </div>
    </header>
  );
}

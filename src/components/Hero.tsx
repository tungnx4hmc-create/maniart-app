import React from "react";
import { Sparkles, ArrowRight, Play, Award, Zap, Users, ShieldCheck } from "lucide-react";

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section id="hero" className="relative pt-20 pb-24 md:pt-32 md:pb-36 bg-[#050505] text-[#F5F5F5] overflow-hidden border-b border-[#C5A022]/20">
      
      {/* Decorative Gold Radial Light Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C5A022] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#C5A022] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column - 7 Cols */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/40 bg-[#C5A022]/5 px-4.5 py-1.5 text-xs text-[#FFD700] font-mono tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD700] animate-spin-slow" />
              <span>KHAI PHÁ KỸ NĂNG DỰNG VIDEO THƯƠNG HIỆU</span>
            </div>

            {/* Flagship Headings */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              HỌC THỰC CHIẾN <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#C5A022] to-[#FFD700] drop-shadow-[0_0_20px_rgba(197,160,34,0.15)]">
                LÀM CHỦ CÔNG CỤ
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Lộ trình thực chiến giúp bạn biến chiếc máy tính xách tay thành cỗ máy sản xuất video triệu view. Làm chủ tuyệt đối Premiere, CapCut PC, hiệu ứng chuyển động, chỉnh màu cinematic, kịch bản phân cảnh và thiết kế âm thanh chuyên nghiệp trong 30 ngày.
            </p>

            {/* Mini Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
              <div className="flex items-center space-x-1.5 text-xs text-gray-300">
                <Users className="h-4 w-4 text-[#FFD700]" />
                <span><strong>12.500+</strong> Học viên lành nghề</span>
              </div>
              <div className="hidden sm:block text-zinc-800">|</div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-300">
                <Zap className="h-4 w-4 text-[#FFD700]" />
                <span>Sửa bài thực hành 1-1 hàng tuần</span>
              </div>
              <div className="hidden sm:block text-zinc-800">|</div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-300">
                <ShieldCheck className="h-4 w-4 text-[#FFD700]" />
                <span>Cam kết đầu ra Freelance</span>
              </div>
            </div>

            {/* Call to actions buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onScrollTo("packages")}
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] px-6 sm:px-8 py-4 text-xs font-black uppercase text-black shadow-lg shadow-[#C5A022]/20 hover:shadow-[#C5A022]/40 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
                id="hero-btn-primary"
              >
                <span>Khám Phá Gói Học Học Bổng</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onScrollTo("about-path")}
                className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/30 bg-[#0A0A0A] hover:border-[#FFD700] px-6 sm:px-8 py-4 text-xs font-black uppercase text-gray-300 hover:text-white transition-all cursor-pointer"
                id="hero-btn-secondary"
              >
                <Play className="h-4 w-4 text-[#FFD700] shrink-0 fill-[#FFD700]" />
                <span>Xem Lộ Trình Lập Nghiệp</span>
              </button>
            </div>

          </div>

          {/* Right Bento Visual Column - 5 Cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[360px] sm:max-w-[420px] lg:max-w-none rounded-3xl p-1 bg-gradient-to-tr from-[#C5A022]/20 via-zinc-800/10 to-[#C5A022]/30 shadow-2xl shadow-[#C5A022]/5">
              
              {/* Main Visual Display Card */}
              <div className="rounded-[22px] bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-[#C5A022]/30 p-5 sm:p-7 relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 tracking-wider">HỌC THỰC CHIẾN - PREMIERE.PRPRO</span>
                </div>

                {/* Simulated Timeline Interface */}
                <div className="bg-zinc-900/40 border border-[#C5A022]/20 rounded-xl p-4 relative min-h-[220px] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-[#FFD700] font-mono tracking-widest uppercase">Lớp Học Tháng Này</span>
                      <h3 className="text-sm font-bold text-white mt-1">LÀM CHỦ VIDEO TRIỆU VIEW</h3>
                    </div>
                    <span className="text-xs bg-red-500/10 border border-red-500/20 text-red-500 px-2 py-0.5 rounded font-mono font-bold animate-pulse">LIVE</span>
                  </div>

                  {/* Waveforms / sound design representation */}
                  <div className="my-4 space-y-1.5">
                    <div className="flex items-end space-x-0.5 h-10 border-b border-zinc-800/80 pb-1">
                      {[30, 50, 75, 40, 20, 60, 95, 80, 55, 30, 70, 85, 40, 60, 90, 75, 50, 30, 65, 80, 45, 25, 60, 90, 70, 40, 80, 50, 20].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-full rounded-t-sm transition-all duration-500 ${
                            i % 4 === 0 ? "bg-[#FFD700]" : "bg-zinc-700/60"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>00:00:00:00</span>
                      <span>00:15:23:12</span>
                    </div>
                  </div>

                  {/* Active student avatar and count */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-900/60">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2.5">
                        <div className="h-6 w-6 rounded-full border border-black bg-zinc-700 overflow-hidden text-[8px] flex items-center justify-center text-white font-mono">T</div>
                        <div className="h-6 w-6 rounded-full border border-black bg-zinc-800 overflow-hidden text-[8px] flex items-center justify-center text-white font-mono">H</div>
                        <div className="h-6 w-6 rounded-full border border-black bg-[#C5A022] overflow-hidden text-[8px] flex items-center justify-center text-black font-bold font-mono">C</div>
                      </div>
                      <span className="text-[10px] text-gray-400">Đang có 120+ người xem</span>
                    </div>
                    <span className="text-[10px] text-[#FFD700]/80 font-mono">Audio Sync ✔</span>
                  </div>

                </div>

                {/* Side feature overlay badges */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3.5 rounded-xl border border-[#C5A022]/20 bg-zinc-900/20 text-center">
                    <span className="text-xl font-extrabold text-white block">100%</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5 block">Học Thực Hành</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#C5A022]/20 bg-zinc-900/20 text-center">
                    <span className="text-xl font-extrabold text-[#FFD700] block">65%</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5 block">Học bổng Ưu Đãi</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

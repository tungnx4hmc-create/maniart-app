import React from "react";
import { HeartHandshake, BookOpen, GraduationCap, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import { StudentSupports } from "../types";

interface StudentSupportProps {
  supports: StudentSupports;
  loading: boolean;
}

export default function StudentSupport({ supports, loading }: StudentSupportProps) {
  return (
    <section id="supports" className="relative py-24 bg-[#050505] overflow-hidden border-b border-[#C5A022]/20">
      {/* Decorative Gold Radial Light */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C5A022] rounded-full blur-[110px] opacity-[0.06] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/30 bg-[#C5A022]/5 px-4 py-1.5 text-xs text-[#FFD700] font-mono tracking-widest mb-4">
            <HeartHandshake className="h-3.5 w-3.5 text-[#FFD700]" />
            <span>ĐỒNG HÀNH CÙNG HỌC VIÊN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Chúng Tôi Đồng Hành <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#C5A022] to-[#FFD700]">Trọn Vẹn Từng Lộ Trình</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Học làm video không đơn độc. Học viện cam kết hỗ trợ toàn diện cả về mặt kỹ thuật, tư duy nghệ thuật lẫn kỹ năng gia tăng thu nhập, kết nối việc làm lâu dài.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 font-mono text-xs">Đang tải thông tin đồng hành...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Column 1: Dong Hanh Hoc */}
            <div className="relative group bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-[#C5A022]/20 rounded-2xl p-6 sm:p-8 hover:border-[#FFD700] transition-all duration-300 shadow-2xl">
              {/* Corner Accent Gold Box */}
              <div className="absolute top-0 right-0 h-10 w-10 border-t border-r border-[#C5A022]/40 rounded-tr-2xl group-hover:border-[#FFD700] transition-colors" />

              <div className="flex items-center space-x-3.5 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C5A022]/10 border border-[#C5A022]/20">
                  <BookOpen className="h-5 w-5 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                    ĐỒNG HÀNH HỌC
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A022]/80 uppercase block mt-0.5">
                    Học tập chuyên sâu, rèn luyện kỹ năng
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {supports.learning.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C5A022]/10 text-[#FFD700] border border-[#C5A022]/20 mt-1 shadow-inner">
                      <span className="text-[9px]">✦</span>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Dong Hanh Phat Trien */}
            <div className="relative group bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-[#C5A022]/20 rounded-2xl p-6 sm:p-8 hover:border-[#FFD700] transition-all duration-300 shadow-2xl">
              {/* Corner Accent Gold Box */}
              <div className="absolute top-0 right-0 h-10 w-10 border-t border-r border-[#C5A022]/40 rounded-tr-2xl group-hover:border-[#FFD700] transition-colors" />

              <div className="flex items-center space-x-3.5 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C5A022]/10 border border-[#C5A022]/20">
                  <GraduationCap className="h-5 w-5 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                    ĐỒNG HÀNH PHÁT TRIỂN
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A022]/80 uppercase block mt-0.5">
                    Định hướng thương hiệu, nâng tầm thu nhập
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {supports.development.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C5A022]/10 text-[#FFD700] border border-[#C5A022]/20 mt-1 shadow-inner">
                      <span className="text-[9px]">✦</span>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Support CTA Banner */}
        <div className="mt-16 rounded-2xl border border-[#C5A022]/30 bg-[#0A0A0A] p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl shadow-[#C5A022]/5">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A022]/30 to-transparent" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Bạn có thắc mắc cần giải đáp trực tiếp ngay bây giờ?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              Sử dụng trợ lý <strong>Cố vấn Thực Chiến AI</strong> trực tuyến ngay dưới đây, hoặc điền số điện thoại ở Form Liên Hệ Tư Vấn để chuyên gia của chúng tôi gọi điện hỗ trợ bạn miễn phí trong 15 phút.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("ai-advisor-panel");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] px-6 py-3 text-xs font-black uppercase text-black hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#C5A022]/20"
                id="support-btn-ai-chat"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Trò Chuyện Với AI Advisor</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("consultation-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022] bg-[#C5A022]/5 hover:bg-[#C5A022]/20 px-6 py-3 text-xs font-black uppercase text-[#FFD700] transition-all cursor-pointer"
                id="support-btn-form"
              >
                <span>Yêu Cầu Gọi Lại Miễn Phí</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

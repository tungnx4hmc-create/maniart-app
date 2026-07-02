import React, { useState } from "react";
import { Compass, Sparkles, BookOpen, MonitorPlay, Zap, ArrowRight, Award } from "lucide-react";

interface PathStep {
  title: string;
  duration: string;
  description: string;
  outcome: string;
}

export default function TimelinePlanner() {
  const [level, setLevel] = useState<"beginner" | "intermediate">("beginner");
  const [goal, setGoal] = useState<"tiktok" | "freelance" | "cinematic">("tiktok");

  const getCustomPath = (): PathStep[] => {
    if (level === "beginner") {
      if (goal === "tiktok") {
        return [
          { title: "BƯỚC 1: Làm Quen Giao Diện & Cắt Ghép", duration: "Tuần 1", description: "Làm chủ phần mềm Premiere/CapCut PC, nắm giữ các phím tắt cốt lõi, nhập/xuất tệp tin.", outcome: "Dựng được video thô, nhịp cơ bản." },
          { title: "BƯỚC 2: Thêm Chuyển Cảnh & Âm Thanh", duration: "Tuần 2", description: "Ứng dụng các sound effects kích thích giữ chân, chèn text bắt trend và hiệu ứng chuyển tiếp mượt mà.", outcome: "Video TikTok đạt chuẩn giữ chân 3s đầu." },
          { title: "BƯỚC 3: Xây Dựng Kịch Bản & Thu Âm", duration: "Tuần 3", description: "Cách lên cấu trúc kịch bản phân cảnh kích thích người xem, lọc nhiễu âm thanh giọng đọc.", outcome: "Sản xuất video ngắn hoàn thiện từ kịch bản riêng." },
          { title: "BƯỚC 4: Xuất Bản & Tối Ưu Kênh Triệu View", duration: "Tuần 4", description: "Hiểu thuật toán lên xu hướng, tối ưu hóa tiêu đề, thumbnail và khung giờ vàng đăng bài.", outcome: "Sở hữu kênh TikTok chuẩn SEO, sẵn sàng viral." },
        ];
      } else if (goal === "freelance") {
        return [
          { title: "BƯỚC 1: Làm Chủ Công Cụ Cơ Bản", duration: "Tuần 1-2", description: "Học tư duy cắt dựng phim, quản lý thư mục dự án gọn gàng, đồng bộ hóa âm thanh hình ảnh chuyên nghiệp.", outcome: "Tự tin nhận sửa các clip ngắn cơ bản." },
          { title: "BƯỚC 2: Hiệu Ứng Nâng Cao & Chỉnh Màu", duration: "Tuần 3-4", description: "Thao tác với Keyframes, vẽ mặt nạ Masking nâng cao và cân chỉnh màu sắc cơ bản (Color Correction).", outcome: "Video mượt mà, có chiều sâu thị giác phim ảnh." },
          { title: "BƯỚC 3: Quy Trình Sửa Bài & Nhận Xét Bài Tập", duration: "Tuần 5-6", description: "Nhận yêu cầu giả lập từ khách hàng khó tính, học cách sửa lỗi timeline và tối ưu hóa nhịp phim.", outcome: "Rèn luyện khả năng sửa lỗi nhanh theo feedback." },
          { title: "BƯỚC 4: Tạo Portfolio & Nhận Dự Án", duration: "Tuần 7-8", description: "Hướng dẫn thiết lập trang cá nhân chuyên nghiệp, đóng gói sản phẩm và đàm phán hợp đồng giá cao.", outcome: "Có Portfolio đẹp mắt, nhận Job Freelance đầu tiên." },
        ];
      } else {
        return [
          { title: "BƯỚC 1: Cốt Lõi Quy Trình Dựng Phim", duration: "Tuần 1-2", description: "Hiểu rõ về FPS, Resolution, tỷ lệ khung hình điện ảnh, và tư duy sắp đặt các khung hình chuyển câu chuyện.", outcome: "Nắm vững lý thuyết điện ảnh nền tảng." },
          { title: "BƯỚC 2: Chỉnh Màu Cinematic & Ánh Sáng", duration: "Tuần 3-4", description: "Kỹ thuật chỉnh màu cao cấp (Color Grading), sử dụng LUTs chuyên dụng và giả lập ánh sáng môi trường.", outcome: "Phim ngắn mang tone màu Hollywood sang trọng." },
          { title: "BƯỚC 3: Kỹ Xảo Kịch Tính & Sound Design", duration: "Tuần 5-6", description: "Thiết kế âm thanh vòm sống động, tiếng động môi trường chân thực (Foley) phối hợp nhịp nhàng kỹ xảo.", outcome: "Kích thích cảm xúc khán giả lên đỉnh điểm." },
          { title: "BƯỚC 4: Hoàn Thiện Tác Phẩm Đầu Tay", duration: "Tuần 7-8", description: "Kèm cặp 1-1 tối ưu hóa từng giây trong sản phẩm điện ảnh hoàn chỉnh của bạn.", outcome: "Tác phẩm điện ảnh cá nhân chuẩn Studio." },
        ];
      }
    } else {
      // Intermediate paths
      if (goal === "tiktok") {
        return [
          { title: "BƯỚC 1: Phân Tích Kênh Đối Thủ & Đổi Mới Content", duration: "Tuần 1", description: "Phá vỡ giới hạn cũ, phân tích chỉ số video giữ chân thấp, lên chiến lược cải tiến nội dung.", outcome: "Xác định rõ hướng đi mới cho kênh." },
          { title: "BƯỚC 2: Visual Effects (VFX) & Text Động Cao Cấp", duration: "Tuần 2", description: "Tạo các chuyển động text 3D cuốn hút, cắt ghép vật thể nâng cao tăng độ ảo diệu cho video.", outcome: "Video độc lạ, tạo dấu ấn thương hiệu mạnh mẽ." },
          { title: "BƯỚC 3: Xây Dựng Kịch Bản Giữ Chân Cao", duration: "Tuần 3", description: "Ứng dụng các điểm xoắn kịch tính (Plot twist), kỹ thuật kích thích tò mò lặp lại chu kỳ 5 giây.", outcome: "Tỷ lệ xem hết video tăng vượt trội." },
        ];
      } else if (goal === "freelance") {
        return [
          { title: "BƯỚC 1: Tối Ưu Tốc Độ Quy Trình", duration: "Tuần 1-2", description: "Sử dụng các preset phím tắt nâng cao và tổ chức thư mục tài nguyên thông minh để dựng clip nhanh gấp 3 lần.", outcome: "Tiết kiệm 70% thời gian dựng phim." },
          { title: "BƯỚC 2: Thiết Kế Hiệu Ứng Theo Thương Hiệu", duration: "Tuần 3-4", description: "Dựng motion graphics độc quyền cho khách hàng doanh nghiệp, intro/outro chuyên nghiệp.", outcome: "Gia tăng giá trị hợp đồng dựng phim." },
          { title: "BƯỚC 3: Đấu Thầu Dự Án Lớn & Quản Lý Team", duration: "Tuần 5-6", description: "Xây dựng chiến lược báo giá dự án hàng chục triệu đồng, kết nối đội ngũ cộng tác viên bổ trợ.", outcome: "Chuyển từ Editor tự do lên trưởng nhóm/Studio nhỏ." },
        ];
      } else {
        return [
          { title: "BƯỚC 1: Tư Duy Kịch Bản Điện Ảnh Chuyên Sâu", duration: "Tuần 1-2", description: "Nghiên cứu cấu trúc kịch bản 3 hồi, phát triển mâu thuẫn nhân vật và truyền tải thông điệp ẩn ý.", outcome: "Kịch bản sâu sắc, chạm tới cảm xúc người xem." },
          { title: "BƯỚC 2: Chỉnh Màu Master & Đồng Bộ Đa Camera", duration: "Tuần 3-4", description: "Chỉnh màu phim chuyên sâu, khớp màu (Color Matching) giữa các máy quay khác biệt, xử lý tệp RAW.", outcome: "Chất lượng hình ảnh đồng nhất như phim rạp." },
          { title: "BƯỚC 3: Sản Xuất & Tối Ưu Phân Phối", duration: "Tuần 5-6", description: "Thực hành dựng các dự án phim tài liệu, MV ca nhạc hoặc phim ngắn thương mại có độ phức tạp cao.", outcome: "Tác phẩm thương mại đỉnh cao đạt tiêu chuẩn phát sóng." },
        ];
      }
    }
  };

  const steps = getCustomPath();

  return (
    <section id="about-path" className="relative py-24 bg-[#050505] overflow-hidden border-b border-[#C5A022]/20">
      {/* Decorative Gold Radial Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C5A022] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/30 bg-[#C5A022]/5 px-4 py-1.5 text-xs text-[#FFD700] font-mono tracking-widest mb-4">
            <Compass className="h-3.5 w-3.5 animate-spin-slow text-[#FFD700]" />
            <span>KHẢO SÁT & ĐỊNH HƯỚNG LỘ TRÌNH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Thiết Kế Lộ Trình Học <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#C5A022] to-[#FFD700]">Dành Riêng Cho Bạn</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Chọn trình độ hiện tại và mục tiêu mong muốn để AI của Học Thực Chiến tự động đề xuất sơ đồ lộ trình học tập tối ưu hóa thời gian và hiệu quả nhất.
          </p>
        </div>

        {/* Bento Selector Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls - 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#C5A022]/20 bg-[#0A0A0A]/90 p-6 backdrop-blur-sm shadow-xl shadow-black/40">
              <h3 className="font-display text-base font-bold text-white mb-4 flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-[#FFD700]" />
                <span>1. Trình độ bắt đầu của bạn?</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setLevel("beginner")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    level === "beginner"
                      ? "border-[#FFD700] bg-[#C5A022]/10 text-[#FFD700] shadow-lg shadow-[#C5A022]/10"
                      : "border-zinc-800 bg-zinc-950/40 text-gray-400 hover:border-[#C5A022]/30 hover:text-gray-200"
                  }`}
                  id="planner-lvl-beginner"
                >
                  <Zap className="h-5 w-5 mb-2" />
                  <span className="text-sm font-semibold">Chưa Biết Gì</span>
                  <span className="text-[10px] opacity-70 mt-1">Từ con số không đi lên</span>
                </button>

                <button
                  onClick={() => setLevel("intermediate")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    level === "intermediate"
                      ? "border-[#FFD700] bg-[#C5A022]/10 text-[#FFD700] shadow-lg shadow-[#C5A022]/10"
                      : "border-zinc-800 bg-zinc-950/40 text-gray-400 hover:border-[#C5A022]/30 hover:text-gray-200"
                  }`}
                  id="planner-lvl-inter"
                >
                  <Award className="h-5 w-5 mb-2" />
                  <span className="text-sm font-semibold">Đã Biết Cơ Bản</span>
                  <span className="text-[10px] opacity-70 mt-1">Muốn học nâng cao chuyên nghiệp</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#C5A022]/20 bg-[#0A0A0A]/90 p-6 backdrop-blur-sm shadow-xl shadow-black/40">
              <h3 className="font-display text-base font-bold text-white mb-4 flex items-center space-x-2">
                <MonitorPlay className="h-4 w-4 text-[#FFD700]" />
                <span>2. Mục tiêu lớn nhất của bạn?</span>
              </h3>
              <div className="space-y-3">
                {[
                  { id: "tiktok", title: "Xây kênh TikTok, Reels, Shorts triệu view", desc: "Trở thành Content Creator tự sản xuất video truyền tải giá trị, xây thương hiệu cá nhân." },
                  { id: "freelance", title: "Kiếm tiền Freelancer / Đi làm Editor", desc: "Xây dựng kỹ năng thực chiến nhận job, tối ưu tốc độ bàn giao, thỏa thuận giá cao." },
                  { id: "cinematic", title: "Dựng phim nghệ thuật, cinematic chất lượng cao", desc: "Chỉnh màu Hollywood, biên kịch điện ảnh, sản xuất video đẳng cấp Studio lớn." }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as any)}
                    className={`w-full flex items-start p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      goal === item.id
                        ? "border-[#FFD700] bg-[#C5A022]/10 text-[#FFD700] shadow-lg shadow-[#C5A022]/10"
                        : "border-zinc-800 bg-zinc-950/40 text-gray-400 hover:border-[#C5A022]/30 hover:text-gray-200"
                    }`}
                    id={`planner-goal-${item.id}`}
                  >
                    <div className="mt-1 mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current">
                      <div className={`h-2.5 w-2.5 rounded-full bg-current transition-transform ${goal === item.id ? "scale-100" : "scale-0"}`} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold block text-white">{item.title}</span>
                      <span className="text-xs text-gray-400 mt-1 block leading-relaxed">{item.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sơ đồ lộ trình - 7 Cols */}
          <div className="lg:col-span-7 bg-[#0A0A0A] rounded-2xl border border-[#C5A022]/30 p-6 sm:p-8 backdrop-blur-sm shadow-2xl shadow-black/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-[#FFD700] uppercase tracking-widest">SƠ ĐỒ LỘ TRÌNH ĐỀ XUẤT</span>
                <h4 className="font-display text-lg font-bold text-white mt-1">
                  {level === "beginner" ? "NHẬP MÔN THẦN TỐC" : "BỨT PHÁ TRUNG CẤP"} • {goal === "tiktok" ? "ĐỈNH CAO VIDEO NGẮN" : goal === "freelance" ? "FREELANCE THỰC CHIẾN" : "PHIM ẢNH CINEMATIC"}
                </h4>
              </div>
              <span className="inline-flex items-center rounded-md bg-[#C5A022]/10 px-2.5 py-1 text-xs font-mono font-medium text-[#FFD700] ring-1 ring-inset ring-[#C5A022]/20 mt-2 sm:mt-0">
                Thời gian: {level === "beginner" ? "4-8 Tuần" : "3-6 Tuần"}
              </span>
            </div>

            {/* Timeline Line */}
            <div className="relative border-l border-[#C5A022]/30 pl-6 ml-3 space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot with Glow */}
                  <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#FFD700] bg-black shadow-md shadow-[#FFD700]/50 group-hover:scale-110 transition-transform" />
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-[#FFD700]/95 bg-[#C5A022]/10 border border-[#C5A022]/20 rounded px-1.5 py-0.5">
                      {step.duration}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">GIAI ĐOẠN {idx + 1}</span>
                  </div>

                  <h5 className="font-display text-sm sm:text-base font-bold text-white mt-2 group-hover:text-[#FFD700] transition-colors">
                    {step.title}
                  </h5>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-[#FFD700]/90 font-mono">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <span>Đầu ra: <strong>{step.outcome}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs text-gray-500 block">Gói học tối ưu đề xuất</span>
                <span className="text-sm font-semibold text-white">
                  {goal === "tiktok" && level === "beginner" ? "GÓI 1 & GÓI 2" : "GÓI 2 & GÓI 3"} (Ưu đãi học bổng tới 65%)
                </span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("packages");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-1.5 rounded-full border border-[#C5A022] bg-[#C5A022]/5 hover:bg-[#C5A022]/20 px-4 py-2.5 text-xs font-black uppercase text-[#FFD700] transition-all cursor-pointer"
                id="planner-btn-explore"
              >
                <span>Xem Chi Tiết Ưu Đãi Gói Học</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

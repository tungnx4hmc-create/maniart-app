import React, { useState, useEffect } from "react";
import { User, Phone, Mail, FileText, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { CoursePackage } from "../types";

interface ConsultationFormProps {
  packages: CoursePackage[];
  selectedPackageId: string;
  onSuccessSubmit: () => void;
}

export default function ConsultationForm({ packages, selectedPackageId, onSuccessSubmit }: ConsultationFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [packageId, setPackageId] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sync prop pre-selected package
  useEffect(() => {
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
    }
  }, [selectedPackageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      setStatusMsg({ type: "error", text: "Vui lòng nhập đầy đủ Họ tên và Số điện thoại!" });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          packageId,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gặp sự cố khi gửi biểu mẫu tư vấn.");
      }

      setStatusMsg({
        type: "success",
        text: data.message || "Đăng ký thành công! Đội ngũ tư vấn sẽ gọi cho bạn trong thời gian sớm nhất.",
      });

      // Clear fields
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setNote("");
      
      onSuccessSubmit(); // Trigger reload in admin list
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Lỗi kết nối máy chủ. Vui lòng thử lại sau." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultation-form" className="relative py-24 bg-[#050505] border-b border-[#C5A022]/20">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A022] rounded-full blur-[130px] opacity-[0.06] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/30 bg-[#C5A022]/5 px-4 py-1.5 text-xs text-[#FFD700] font-mono tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#FFD700] animate-spin-slow" />
            <span>NHẬN KHUYẾN MÃI HỌC BỔNG -65%</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Đăng Ký Tư Vấn & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#C5A022] to-[#FFD700]">Giữ Chỗ Ưu Đãi</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            Điền thông tin của bạn vào biểu mẫu bên dưới. Đội ngũ trợ giảng của chúng tôi sẽ liên hệ trong 15-30 phút để hỗ trợ tư vấn lộ trình và áp dụng ưu đãi học phí.
          </p>
        </div>

        {/* Form Container with Gold Gradient Border */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#C5A022]/30 via-zinc-800/20 to-zinc-950 shadow-2xl shadow-[#C5A022]/5">
          <div className="rounded-[22px] bg-[#0A0A0A] p-6 sm:p-10 border border-[#C5A022]/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Alert Message */}
              {statusMsg && (
                <div
                  className={`flex items-start space-x-3 rounded-xl p-4 text-sm ${
                    statusMsg.type === "success"
                      ? "bg-[#C5A022]/10 border border-[#C5A022]/30 text-[#FFD700]"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                  id="form-alert-msg"
                >
                  {statusMsg.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FFD700]" />
                  ) : (
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  )}
                  <span className="leading-relaxed">{statusMsg.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full name input */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Họ và Tên <span className="text-[#FFD700]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      required
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-[#C5A022]/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A022]/20 transition-all"
                      id="form-fullname"
                    />
                  </div>
                </div>

                {/* Phone number input */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Số Điện Thoại <span className="text-[#FFD700]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Ví dụ: 0912345678"
                      required
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-[#C5A022]/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A022]/20 transition-all"
                      id="form-phone"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email input */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Địa chỉ Email (Không bắt buộc)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-[#C5A022]/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A022]/20 transition-all"
                      id="form-email"
                    />
                  </div>
                </div>

                {/* Package dropdown select */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Lựa Chọn Gói Học Mục Tiêu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <select
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#C5A022]/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A022]/20 transition-all appearance-none cursor-pointer"
                      id="form-package"
                    >
                      <option value="" className="bg-zinc-950">--- Chọn Gói Học (Nhận Ưu Đãi) ---</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id} className="bg-zinc-950 text-white">
                          {pkg.name} ({pkg.price} VNĐ)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Note input */}
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Ghi chú khó khăn hoặc mục tiêu của bạn (Ví dụ: Muốn dựng phim ngắn làm kênh TikTok...)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập ghi chú chi tiết để chuyên viên hỗ trợ bạn tốt nhất..."
                  rows={3}
                  className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-[#C5A022]/60 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C5A022]/20 transition-all"
                  id="form-note"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] py-4 text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-[#C5A022]/20 hover:shadow-[#C5A022]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-55 cursor-pointer"
                id="form-submit-btn"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? "Đang xử lý gửi..." : "Đăng Ký Nhận Tư Vấn & Ưu Đãi Ngay"}</span>
              </button>

              <p className="text-center text-[10px] text-gray-500 font-mono">
                Bảo mật thông tin tuyệt đối • Cam kết không spam cuộc gọi phiền hà
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

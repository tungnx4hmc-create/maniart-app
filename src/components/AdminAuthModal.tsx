import React, { useState } from "react";
import { ShieldAlert, X, Eye, EyeOff, LockKeyhole, Loader2 } from "lucide-react";

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifySuccess: () => void;
}

export default function AdminAuthModal({ isOpen, onClose, onVerifySuccess }: AdminAuthModalProps) {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Vui lòng nhập mã truy cập!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store verification state in sessionStorage so they stay authorized within the current tab session
        sessionStorage.setItem("manjart_admin_authorized", "true");
        onVerifySuccess();
        onClose();
        setCode("");
      } else {
        setError(data.error || "Mã truy cập không hợp lệ!");
      }
    } catch (err) {
      console.error("Lỗi xác thực:", err);
      setError("Lỗi kết nối máy chủ. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#C5A022]/30 bg-[#0c0c0c] p-6 shadow-2xl shadow-black/90 sm:p-8 animate-in fade-in zoom-in duration-250">
        
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#C5A022]/10 blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A022]/30 bg-[#C5A022]/5 mb-3 text-[#FFD700]">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h3 
            className="text-lg font-bold tracking-wider text-white uppercase"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Xác Thực Quyền Admin
          </h3>
          <p className="mt-1 text-xs text-zinc-400 leading-relaxed max-w-[280px]">
            Khu vực hạn chế. Vui lòng nhập mã truy cập được cấp quyền để tiếp tục.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5">
              Mã truy cập (Access Code)
            </label>
            <div className="relative">
              <input
                type={showCode ? "text" : "password"}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="Nhập mã xác thực..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C5A022] focus:outline-none focus:ring-1 focus:ring-[#C5A022] transition-colors"
                disabled={isSubmitting}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
              >
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start space-x-2 rounded-lg bg-red-950/30 border border-red-900/30 p-3 text-xs text-red-400">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/40 py-3 text-xs font-bold uppercase text-zinc-400 hover:bg-zinc-800/60 hover:text-white transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 relative flex items-center justify-center rounded-xl bg-gradient-to-r from-[#C5A022] to-[#FFD700] py-3 text-xs font-black uppercase text-black hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-md shadow-[#C5A022]/10 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin text-black" />
              ) : (
                "Xác nhận"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

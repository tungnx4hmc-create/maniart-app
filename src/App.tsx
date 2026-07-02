import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TimelinePlanner from "./components/TimelinePlanner";
import CoursePackages from "./components/CoursePackages";
import StudentSupport from "./components/StudentSupport";
import ConsultationForm from "./components/ConsultationForm";
import AICourseAdvisor from "./components/AICourseAdvisor";
import AdminPanel from "./components/AdminPanel";
import { CoursePackage, StudentSupports, Consultation } from "./types";
import { Sparkles, Phone, Mail, MapPin, Youtube, Instagram, FileVideo, ShieldCheck } from "lucide-react";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [supports, setSupports] = useState<StudentSupports>({ learning: [], development: [] });
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [selectedPackageId, setSelectedPackageId] = useState("");

  // Fetch all initial data from REST API endpoints
  const fetchData = async () => {
    setLoading(true);
    try {
      const [pkgsRes, supsRes, leadsRes] = await Promise.all([
        fetch("/api/packages"),
        fetch("/api/supports"),
        fetch("/api/consultations")
      ]);

      const pkgsData = await pkgsRes.json();
      const supsData = await supsRes.json();
      const leadsData = await leadsRes.json();

      setPackages(pkgsData);
      setSupports(supsData);
      setConsultations(leadsData);
    } catch (err) {
      console.error("Error loading server data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pre-select a package from card selection and scroll to the form
  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    handleScrollTo("consultation-form");
  };

  // API Call: Update Course Packages
  const handleUpdatePackages = async (newPkgs: CoursePackage[]): Promise<boolean> => {
    try {
      const res = await fetch("/api/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPkgs)
      });
      if (res.ok) {
        setPackages(newPkgs);
        return true;
      }
    } catch (err) {
      console.error("Error updating packages on server:", err);
    }
    return false;
  };

  // API Call: Update Student Supports
  const handleUpdateSupports = async (newSups: StudentSupports): Promise<boolean> => {
    try {
      const res = await fetch("/api/supports", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSups)
      });
      if (res.ok) {
        setSupports(newSups);
        return true;
      }
    } catch (err) {
      console.error("Error updating supports on server:", err);
    }
    return false;
  };

  // API Call: Update Consultation Status
  const handleUpdateConsultationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        // Reload all data
        await fetchData();
      }
    } catch (err) {
      console.error("Error updating consultation lead:", err);
    }
  };

  // API Call: Delete Consultation
  const handleDeleteConsultation = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dòng đăng ký tuyển sinh này?")) {
      return;
    }
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        // Reload
        await fetchData();
      }
    } catch (err) {
      console.error("Error deleting consultation lead:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between selection:bg-[#C5A022] selection:text-black font-sans">
      
      {/* Navbar header */}
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} onScrollTo={handleScrollTo} />

      {/* Main content body */}
      <main className="flex-grow">
        
        {/* Admin Management Dashboard Toggle Overlay */}
        {isAdmin && (
          <div className="bg-zinc-900 border-b border-[#C5A022]/20 py-2">
            <AdminPanel
              packages={packages}
              supports={supports}
              consultations={consultations}
              loading={loading}
              onRefreshData={fetchData}
              onUpdatePackages={handleUpdatePackages}
              onUpdateSupports={handleUpdateSupports}
              onUpdateConsultationStatus={handleUpdateConsultationStatus}
              onDeleteConsultation={handleDeleteConsultation}
            />
          </div>
        )}

        {/* Hero Area */}
        <Hero onScrollTo={handleScrollTo} />

        {/* Interactive Timeline Career Planner */}
        <TimelinePlanner />

        {/* Course Packages Section Grid */}
        <CoursePackages
          packages={packages}
          loading={loading}
          onSelectPackage={handleSelectPackage}
          selectedPackageId={selectedPackageId}
        />

        {/* Student Support Section (Learning & Development) */}
        <StudentSupport supports={supports} loading={loading} />

        {/* Dynamic Consultation registration Form */}
        <ConsultationForm
          packages={packages}
          selectedPackageId={selectedPackageId}
          onSuccessSubmit={fetchData}
        />

        {/* Server Side AI Course Mentor chat widget */}
        <AICourseAdvisor />

      </main>

      {/* Premium Dark theme footer with gold neon accents & contact */}
      <footer className="bg-[#050505] border-t border-[#C5A022]/20 py-16 relative overflow-hidden">
        
        {/* Foot glow lighting */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#C5A022]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 border-b border-zinc-900 pb-12 mb-12">
            
            {/* Branding Column */}
            <div className="space-y-4 col-span-1 md:col-span-1.5">
              <div className="flex items-center space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5A022]/30 bg-[#C5A022]/5">
                  <Sparkles className="h-4 w-4 text-[#FFD700] animate-pulse" />
                </div>
                <div>
                  <span className="font-sans text-base font-bold tracking-wider text-white uppercase">
                    HỌC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C5A022]">THỰC CHIẾN</span>
                  </span>
                  <span className="block text-[8px] font-mono tracking-widest text-gray-500 uppercase">
                    LÀM CHỦ CÔNG CỤ
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Học viện đào tạo video và làm phim thế hệ mới. Tiên phong ứng dụng AI, tối ưu hóa quy trình dựng phim chất lượng cao phục vụ truyền thông thương hiệu cá nhân và doanh nghiệp.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Nội Dung Khóa Học</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <button onClick={() => handleScrollTo("packages")} className="hover:text-[#FFD700] transition-colors cursor-pointer">
                    Gói 1: Nhập Môn Thực Chiến
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("packages")} className="hover:text-[#FFD700] transition-colors cursor-pointer">
                    Gói 2: Làm Chủ Công Cụ (Hot)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("packages")} className="hover:text-[#FFD700] transition-colors cursor-pointer">
                    Gói 3: Chuyên Nghiệp - Studio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("about-path")} className="hover:text-[#FFD700] transition-colors cursor-pointer">
                    Sơ đồ Lộ Trình Nghề Nghiệp
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact info Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Liên Hệ Hỗ Trợ</h4>
              <ul className="space-y-3 text-xs text-gray-400">
                <li className="flex items-start space-x-2">
                  <Phone className="h-4 w-4 text-[#FFD700] shrink-0 mt-0.5" />
                  <span>Hotline: <strong>0909 123 456</strong> (8:00 - 22:00)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 text-[#FFD700] shrink-0 mt-0.5" />
                  <span>Email: <strong className="text-gray-300">lienhe@hocthucchien.vn</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-[#FFD700] shrink-0 mt-0.5" />
                  <span>Trụ sở: Tòa nhà Landmark, Ba Đình, Hà Nội</span>
                </li>
              </ul>
            </div>

            {/* Socials Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Mạng Xã Hội</h4>
              <p className="text-gray-400 text-xs">Theo dõi học viện để nhận các video hướng dẫn, thủ thuật dựng phim & tài nguyên miễn phí hàng tuần.</p>
              <div className="flex items-center space-x-3">
                <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-gray-400 hover:border-[#C5A022]/30 hover:text-[#FFD700] transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-gray-400 hover:border-[#C5A022]/30 hover:text-[#FFD700] transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-gray-400 hover:border-[#C5A022]/30 hover:text-[#FFD700] transition-colors">
                  <FileVideo className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Học Viện Học Thực Chiến - Làm Chủ Công Cụ. Bảo lưu mọi quyền.</p>
            <div className="flex items-center space-x-1 text-[#FFD700]/70 font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>Chứng nhận Đào tạo Thực chiến Cao cấp</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

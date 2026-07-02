import React, { useState, useEffect, useRef } from "react";
import { 
  Video, 
  Clapperboard, 
  Mic, 
  Sparkles, 
  Smartphone, 
  BookOpen, 
  Laptop, 
  DollarSign, 
  Award,
  Lock,
  Check,
  CheckCircle2,
  Tv,
  Compass,
  Flame,
  Volume2,
  Maximize2,
  Play,
  Pause,
  X,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  QrCode,
  Loader2
} from "lucide-react";
import { CoursePackage } from "../types";

interface CoursePackagesProps {
  packages: CoursePackage[];
  loading: boolean;
  onSelectPackage: (pkgId: string) => void;
  selectedPackageId: string;
}

interface Lesson {
  id: string;
  moduleNum: string;
  moduleTitle: string;
  number: string;
  title: string;
  description: string;
  tag: "newbie" | "pro" | "tiktok" | "youtube";
  tagLabel: string;
  duration: string;
  icon: "smartphone" | "clapperboard" | "mic" | "sparkles" | "bookOpen" | "laptop" | "dollarSign" | "award";
}

export default function CoursePackages({
  packages,
  loading,
  onSelectPackage,
  selectedPackageId,
}: CoursePackagesProps) {
  // Available groups for filtering
  const groups = [
    { id: "all", label: "Tất cả bài học", count: "26 bài", icon: "⚡" },
    { id: "newbie", label: "Nhóm 1: Newbie Media", count: "6 bài", icon: "🌱" },
    { id: "pro", label: "Nhóm 2: Media Pro (Nâng Cao)", count: "5 bài", icon: "🔥" },
    { id: "tiktok", label: "Nhóm 3: TikTok Creator", count: "8 bài", icon: "📱" },
    { id: "youtube", label: "Nhóm 4: YouTube Vlogger", count: "7 bài", icon: "🎥" },
  ];

  const [exploreAll, setExploreAll] = useState(false);
  const [activeGroup, setActiveGroup] = useState("newbie");
  const [activeVideoLesson, setActiveVideoLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const progressInterval = useRef<any>(null);

  const [expandedModules, setExpandedModules] = useState<string[]>(["01"]);

  const toggleModule = (moduleNum: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleNum)
        ? prev.filter(num => num !== moduleNum)
        : [...prev, moduleNum]
    );
  };

  // State for purchased groups (unlocked courses)
  const [purchasedGroups, setPurchasedGroups] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("purchased_groups");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("purchased_groups", JSON.stringify(purchasedGroups));
  }, [purchasedGroups]);

  const handleResetPurchases = () => {
    setPurchasedGroups([]);
    localStorage.removeItem("purchased_groups");
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 1500);
  };

  // State for QR Payment Modal
  const [showQRModal, setShowQRModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"paying" | "checking" | "success">("paying");
  const [paymentTime, setPaymentTime] = useState(300);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const countdownInterval = useRef<any>(null);
  const autoCheckTimer = useRef<any>(null);

  // Auto-simulation check for payments
  useEffect(() => {
    if (showQRModal && paymentStep === "paying") {
      // Countdown ticking
      countdownInterval.current = setInterval(() => {
        setPaymentTime((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto-simulate scanning & receiving transaction after 8 seconds
      autoCheckTimer.current = setTimeout(() => {
        setPaymentStep("checking");
        
        autoCheckTimer.current = setTimeout(() => {
          setPaymentStep("success");
          setPurchasedGroups(prev => {
            const target = activeGroup;
            if (prev.includes(target)) return prev;
            return [...prev, target];
          });
        }, 3500); // 3.5s for checking animation
      }, 8000); // Wait 8 seconds before auto-detecting
    }

    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
      if (autoCheckTimer.current) clearTimeout(autoCheckTimer.current);
    };
  }, [showQRModal, paymentStep, activeGroup]);

  // Lesson list containing exactly 26 lessons matching the stats perfectly
  const lessons: Lesson[] = [
    // Module 1: TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)
    {
      id: "les-1.1",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.1",
      title: "Tư duy Ngôn ngữ hình ảnh & Bố cục khung dọc (9:16) hút mắt",
      description: "Thiết lập cấu trúc khung dọc tối ưu cho thiết bị di động, cách sắp đặt vị trí chủ thể giữ chân ngay lập tức.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "20 phút",
      icon: "smartphone"
    },
    {
      id: "les-1.2",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.2",
      title: "Bố cục khung ngang (16:9) chuẩn điện ảnh & Dẫn dắt ánh mắt",
      description: "Nguyên lý định vị chủ thể, sử dụng đường dẫn thị giác và thiết lập chiều sâu cho khung ngang chuẩn Cinematic.",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "25 phút",
      icon: "clapperboard"
    },
    {
      id: "les-1.3",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.3",
      title: "Công thức kịch bản giữ chân 3 giây đầu (Hook-Body-CTA)",
      description: "Bẻ gãy hành vi lướt màn hình của người dùng. Tập trung tuyệt đối vào 3 giây đầu kích thích tương tác mạnh.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "15 phút",
      icon: "sparkles"
    },
    {
      id: "les-1.4",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.4",
      title: "Nghệ thuật cấu trúc kịch bản 10 phút truyền cảm hứng",
      description: "Xây dựng nhịp độ kể chuyện lôi cuốn, tạo kịch tính cho Vlog dài mà không gây nhàm chán hoặc đứt đoạn cảm xúc.",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "30 phút",
      icon: "bookOpen"
    },
    {
      id: "les-1.5",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.5",
      title: "Nhập môn Ngành Media: Định vị cá nhân và Lộ trình nghề nghiệp",
      description: "Bản đồ nghề nghiệp cho người mới. Cách xác định thế mạnh bản thân và tư duy định giá chất xám dịch vụ.",
      tag: "newbie",
      tagLabel: "NEWBIE MEDIA",
      duration: "35 phút",
      icon: "award"
    },
    {
      id: "les-1.6",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.6",
      title: "Tư duy Đạo diễn hình ảnh (DOP) nâng cao & Ánh sáng kể chuyện",
      description: "Thiết lập mood-board màu sắc, điều phối ánh sáng phức tạp để bộc lộ nội tâm nhân vật không cần thoại.",
      tag: "pro",
      tagLabel: "MEDIA PRO",
      duration: "45 phút",
      icon: "clapperboard"
    },
    {
      id: "les-1.7",
      moduleNum: "01",
      moduleTitle: "TƯ DUY & KỊCH BẢN (MINDSET & STORYTELLING)",
      number: "BÀI 1.7",
      title: "Ý tưởng kịch bản bắt trend & Kỹ thuật khơi gợi tương tác bình luận",
      description: "Khai thác insight khán giả trẻ, lồng ghép các yếu tố bất ngờ kích thích người xem comment tranh luận.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "18 phút",
      icon: "sparkles"
    },

    // Module 2: THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)
    {
      id: "les-2.1",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.1",
      title: "Làm chủ Camera trên Smartphone: Cài đặt tối ưu nhất",
      description: "Cấu hình độ phân giải, tốc độ khung hình (fps) và khóa nét/sáng tự động để triệt tiêu hiện tượng rung nhấp nháy.",
      tag: "newbie",
      tagLabel: "NEWBIE MEDIA",
      duration: "20 phút",
      icon: "smartphone"
    },
    {
      id: "les-2.2",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.2",
      title: "Kỹ thuật quay Vlog ngắn 1 mình cực nhàn với Gimbal & Tripod",
      description: "Hướng dẫn setup góc máy tự quay, cách di chuyển camera mượt mà tạo nhịp chuyển động hấp dẫn mà không cần trợ lý.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "22 phút",
      icon: "smartphone"
    },
    {
      id: "les-2.3",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.3",
      title: "Quy trình Setup Ánh sáng 3 điểm (Three-Point Lighting) chuyên nghiệp",
      description: "Cách đặt đèn Key, Fill và Rim light hiệu quả cao ngay tại nhà, tôn đường nét khuôn mặt và tách biệt hậu cảnh.",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "30 phút",
      icon: "clapperboard"
    },
    {
      id: "les-2.4",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.4",
      title: "Sử dụng ống kính Cinema & Điều khiển khẩu độ/tiêu cự nâng cao",
      description: "Cách kiểm soát độ sâu trường ảnh (DoF) cực mỏng và tạo hiệu ứng xóa phông bokeh chuẩn rạp chiếu phim.",
      tag: "pro",
      tagLabel: "MEDIA PRO",
      duration: "40 phút",
      icon: "clapperboard"
    },
    {
      id: "les-2.5",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.5",
      title: "Thu âm chuẩn studio: Lựa chọn và Setup Microphone tối ưu",
      description: "Khắc phục tiếng ồn, tiếng vang phòng học và cấu hình microphone cài áo không dây để có âm thanh trong trẻo, sắc nét.",
      tag: "newbie",
      tagLabel: "NEWBIE MEDIA",
      duration: "25 phút",
      icon: "mic"
    },
    {
      id: "les-2.6",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.6",
      title: "Điều khiển Gimbal chuyên dụng (Ronin S/SC) tạo chuyển động điện ảnh",
      description: "Thực hành các kỹ thuật pan, tilt, roll kết hợp chuyển động chân mượt mà như máy ray dolly chuyên nghiệp.",
      tag: "pro",
      tagLabel: "MEDIA PRO",
      duration: "35 phút",
      icon: "clapperboard"
    },
    {
      id: "les-2.7",
      moduleNum: "02",
      moduleTitle: "THIẾT BỊ & KỸ THUẬT QUAY (CAMERA & SHOOTING)",
      number: "BÀI 2.7",
      title: "Kỹ thuật phỏng vấn đường phố & Setup audio 2 người hiện trường",
      description: "Sử dụng mic định hướng và phỏng vấn linh động, xử lý tạp âm gió và tiếng ồn giao thông trực tiếp khi thu.",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "25 phút",
      icon: "mic"
    },

    // Module 3: HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)
    {
      id: "les-3.1",
      moduleNum: "03",
      moduleTitle: "HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)",
      number: "BÀI 3.1",
      title: "Làm quen giao diện CapCut Mobile/PC và Thao tác cắt dựng cơ bản",
      description: "Thành thạo dòng thời gian (timeline), kỹ thuật cắt ghép ghép nối video nhanh gọn, không giật lag.",
      tag: "newbie",
      tagLabel: "NEWBIE MEDIA",
      duration: "15 phút",
      icon: "laptop"
    },
    {
      id: "les-3.2",
      moduleNum: "03",
      moduleTitle: "HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)",
      number: "BÀI 3.2",
      title: "Hiệu ứng chuyển cảnh (Transitions) cuốn hút & Sound Design triệu view",
      description: "Kết hợp sound effect vút qua, tiếng gõ phím với hiệu ứng chuyển động nhanh kích thích nhịp độ video.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "18 phút",
      icon: "sparkles"
    },
    {
      id: "les-3.3",
      moduleNum: "03",
      moduleTitle: "HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)",
      number: "BÀI 3.3",
      title: "Quy trình dựng Vlog hoàn chỉnh: Kể chuyện bằng B-roll lồng ghép",
      description: "Cách chèn hình minh họa B-roll thông minh, chuyển đổi mượt mà giữa camera chính và hậu trường tăng độ tin cậy.",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "35 phút",
      icon: "laptop"
    },
    {
      id: "les-3.4",
      moduleNum: "03",
      moduleTitle: "HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)",
      number: "BÀI 3.4",
      title: "Chỉnh màu phim chuyên sâu (Color Grading) bằng Premiere Pro & Davinci Resolve",
      description: "Đọc biểu đồ sóng màu, cân bằng trắng chuẩn xác và áp dụng LUT màu điện ảnh tạo không khí chuyên nghiệp.",
      tag: "pro",
      tagLabel: "MEDIA PRO",
      duration: "50 phút",
      icon: "laptop"
    },
    {
      id: "les-3.5",
      moduleNum: "03",
      moduleTitle: "HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)",
      number: "BÀI 3.5",
      title: "Cẩm nang quản lý lưu trữ dữ liệu & Đồng bộ file thông minh",
      description: "Xây dựng tư duy đặt tên thư mục, tổ chức source quay khoa học và lưu trữ đám mây giúp làm việc nhóm trơn tru.",
      tag: "newbie",
      tagLabel: "NEWBIE MEDIA",
      duration: "20 phút",
      icon: "laptop"
    },
    {
      id: "les-3.6",
      moduleNum: "03",
      moduleTitle: "HẬU KỲ & EDITING ĐỈNH CAO (EDITING & POST-PRODUCTION)",
      number: "BÀI 3.6",
      title: "Thiết kế phụ đề tự động (Auto-captions) & Chữ chuyển động bắt mắt",
      description: "Tạo sub nhanh chóng, tùy biến font chữ đậm cá tính và thêm icon động trực quan giúp người xem không cần bật âm thanh.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "20 phút",
      icon: "laptop"
    },

    // Module 4: KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)
    {
      id: "les-4.1",
      moduleNum: "04",
      moduleTitle: "KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)",
      number: "BÀI 4.1",
      title: "Xây dựng kênh từ con số 0: Tối ưu hồ sơ thương hiệu cá nhân",
      description: "Quy chuẩn ảnh đại diện, tiểu sử và định hướng tuyến nội dung nhất quán thu hút tệp khán giả mục tiêu.",
      tag: "newbie",
      tagLabel: "NEWBIE MEDIA",
      duration: "30 phút",
      icon: "award"
    },
    {
      id: "les-4.2",
      moduleNum: "04",
      moduleTitle: "KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)",
      number: "BÀI 4.2",
      title: "Thuật toán phân phối Video Ngắn và Chiến lược đẩy xu hướng bền vững",
      description: "Hiểu rõ chỉ số giữ chân khán giả, tỷ lệ hoàn thành video và cách tận dụng hashtag/nhạc thịnh hành để lên xu hướng.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "28 phút",
      icon: "dollarSign"
    },
    {
      id: "les-4.3",
      moduleNum: "04",
      moduleTitle: "KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)",
      number: "BÀI 4.3",
      title: "Bật kiếm tiền YouTube và Các nguồn thu nhập thụ động bền vững",
      description: "Đạt điều kiện Adsense nhanh chóng, liên kết tiếp thị liên kết (Affiliate) và đàm phán hợp đồng tài trợ thương hiệu.",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "40 phút",
      icon: "dollarSign"
    },
    {
      id: "les-4.4",
      moduleNum: "04",
      moduleTitle: "KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)",
      number: "BÀI 4.4",
      title: "Quy trình báo giá, làm việc với khách hàng và Viết hợp đồng Freelance",
      description: "Cách định giá gói sản xuất, quy trình feedback 3 lần chuẩn chỉnh và tự tin thuyết phục agency/brand lớn hợp tác.",
      tag: "pro",
      tagLabel: "MEDIA PRO",
      duration: "45 phút",
      icon: "dollarSign"
    },
    {
      id: "les-4.5",
      moduleNum: "04",
      moduleTitle: "KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)",
      number: "BÀI 4.5",
      title: "Kịch bản Livestream bán hàng & Vận hành giỏ hàng TikTok Shop",
      description: "Thiết lập kịch bản live 2 tiếng, cách giữ nhịp năng lượng cao và chốt đơn liên tục bằng ưu đãi giới hạn giờ.",
      tag: "tiktok",
      tagLabel: "TIKTOK CREATOR",
      duration: "35 phút",
      icon: "dollarSign"
    },
    {
      id: "les-4.6",
      moduleNum: "04",
      moduleTitle: "KIẾM TIỀN & XÂY DỰNG SỰ NGHIỆP (MONETIZE & CAREER)",
      number: "BÀI 4.6",
      title: "Chiến lược SEO tiêu đề, Thumbnail kích thích click chuột tỷ lệ cao",
      description: "Nắm vững tâm lý tò mò của người xem, phương pháp A/B testing hình ảnh đại diện kích hoạt tỷ lệ nhấp chuột (CTR).",
      tag: "youtube",
      tagLabel: "YOUTUBE VLOGGER",
      duration: "35 phút",
      icon: "award"
    }
  ];

  // Map icons
  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case "smartphone":
        return <Smartphone className="h-5 w-5 text-gray-700" />;
      case "clapperboard":
        return <Clapperboard className="h-5 w-5 text-gray-700" />;
      case "mic":
        return <Mic className="h-5 w-5 text-gray-700" />;
      case "sparkles":
        return <Sparkles className="h-5 w-5 text-gray-700" />;
      case "bookOpen":
        return <BookOpen className="h-5 w-5 text-gray-700" />;
      case "laptop":
        return <Laptop className="h-5 w-5 text-gray-700" />;
      case "dollarSign":
        return <DollarSign className="h-5 w-5 text-gray-700" />;
      case "award":
        return <Award className="h-5 w-5 text-gray-700" />;
      default:
        return <Video className="h-5 w-5 text-gray-700" />;
    }
  };

  // Compute stats based on active filter group and purchased groups
  const totalLessonsInActiveGroup = activeGroup === "all"
    ? lessons.length
    : lessons.filter(l => l.tag === activeGroup).length;

  const unlockedLessonsCount = activeGroup === "all"
    ? lessons.filter(l => purchasedGroups.includes("all") || purchasedGroups.includes(l.tag)).length
    : (purchasedGroups.includes("all") || purchasedGroups.includes(activeGroup) ? totalLessonsInActiveGroup : 0);

  const lockedLessonsCount = totalLessonsInActiveGroup - unlockedLessonsCount;
  const matchPercentage = totalLessonsInActiveGroup > 0 
    ? Math.round((unlockedLessonsCount / totalLessonsInActiveGroup) * 100) 
    : 0;

  // Promo Card details based on selected group
  const getPromoDetails = () => {
    switch (activeGroup) {
      case "newbie":
        return {
          title: "GÓI NEWBIE MEDIA",
          badge: "Gói Toàn Diện",
          price: "599.000",
          amount: 599000,
          addInfo: "HTC_NEWBIE",
          benefits: [
            "Trọn bộ 6 bài học kỹ thuật nền tảng",
            "Bộ quà tặng cẩm nang setup ánh sáng",
            "Tư vấn lộ trình cá nhân 1:1"
          ],
          mappedPkgId: "package-1" // Nhập môn thực chiến
        };
      case "pro":
        return {
          title: "GÓI MEDIA PRO",
          badge: "Gói Nâng Cao",
          price: "799.000",
          amount: 799000,
          addInfo: "HTC_PRO",
          benefits: [
            "Giáo trình Đạo diễn hình ảnh DOP nâng cao",
            "Khóa học ánh sáng kể chuyện chuyên nghiệp",
            "Bộ LUT màu Cinematic độc quyền từ Studio"
          ],
          mappedPkgId: "package-3" // Master/Studio package
        };
      case "tiktok":
        return {
          title: "GÓI TIKTOK CREATOR",
          badge: "Gói Chuyên Biệt",
          price: "699.000",
          amount: 699000,
          addInfo: "HTC_TIKTOK",
          benefits: [
            "Công thức kịch bản giữ chân 3 giây đầu",
            "Kỹ thuật quay dựng nhanh trên smartphone",
            "Thư viện nhạc trend & mẫu hiệu ứng bản quyền"
          ],
          mappedPkgId: "package-2" // Làm chủ công cụ
        };
      case "youtube":
        return {
          title: "GÓI YOUTUBE VLOGGER",
          badge: "Gói Chuyên Biệt",
          price: "699.000",
          amount: 699000,
          addInfo: "HTC_YOUTUBE",
          benefits: [
            "Kịch bản Vlog dài 10 phút truyền cảm hứng",
            "Thiết kế bố cục khung ngang cinematic",
            "Quy trình đăng tải tối ưu SEO YouTube"
          ],
          mappedPkgId: "package-2" // Làm chủ công cụ
        };
      case "all":
      default:
        return {
          title: "GÓI MỌI LỘ TRÌNH",
          badge: "Gói Toàn Diện",
          price: "1.490.000",
          amount: 1490000,
          addInfo: "HTC_ALL",
          benefits: [
            "Mở khóa 26/26 bài học nền tảng & chuyên sâu",
            "Tải trọn bộ file tài liệu & mẫu kịch bản gốc",
            "Cam kết hỗ trợ giải đáp 24/7 trực tiếp"
          ],
          mappedPkgId: "package-3" // Master package
        };
    }
  };

  const promo = getPromoDetails();

  // Scroll to consultation form and pre-select the appropriate package
  const handleRegister = (groupOverride?: string) => {
    const targetGroup = groupOverride || activeGroup;
    const isPaid = purchasedGroups.includes("all") || (targetGroup !== "all" && purchasedGroups.includes(targetGroup));
    
    if (isPaid) {
      const el = document.getElementById("packages");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    
    if (groupOverride) {
      setActiveGroup(groupOverride);
    }
    
    setPaymentStep("paying");
    setPaymentTime(300);
    setShowQRModal(true);
  };

  // Video Player Logic
  const openVideo = (lesson: Lesson) => {
    setActiveVideoLesson(lesson);
    setIsPlaying(true);
    setVideoProgress(0);
  };

  const closeVideo = () => {
    setActiveVideoLesson(null);
    setIsPlaying(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  useEffect(() => {
    if (isPlaying && activeVideoLesson) {
      progressInterval.current = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(progressInterval.current);
            return 100;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, activeVideoLesson]);

  // Group lessons by module for a organized view
  const modulesMap = new Map<string, { title: string, lessons: Lesson[] }>();
  lessons.forEach(lesson => {
    const key = lesson.moduleNum;
    if (!modulesMap.has(key)) {
      modulesMap.set(key, { title: lesson.moduleTitle, lessons: [] });
    }
    modulesMap.get(key)!.lessons.push(lesson);
  });

  const modulesList = Array.from(modulesMap.entries()).map(([num, data]) => ({
    num,
    title: data.title,
    lessons: data.lessons
  }));

  return (
    <section id="packages" className="relative py-20 bg-[#0A0A0A] border-b border-zinc-900 overflow-hidden">
      {/* Absolute Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C5A022]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-[#C5A022]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#C5A022]/30 bg-[#C5A022]/5 px-4 py-1.5 text-xs text-[#FFD700] font-mono tracking-widest mb-4">
            <Flame className="h-3.5 w-3.5 text-[#FFD700] animate-pulse" />
            <span>CÁ NHÂN HÓA LỘ TRÌNH THỰC CHIẾN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-snug">
            Khám Phá Chương Trình Đào Tạo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#C5A022] to-[#FFD700]">Tương Tác</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Lựa chọn nhóm đối tượng mục tiêu của bạn để hệ thống tự động cá nhân hóa lộ trình, làm nổi bật những bài học phù hợp nhất.
          </p>
        </div>

        {/* Core Interactive Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar Customizer & Selected Package Promo */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* White Interactive Panel */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 text-black shadow-2xl flex flex-col gap-5 border border-zinc-100">
              
              {/* Sidebar Header */}
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A022] uppercase block mb-1">
                  CÁ NHÂN HÓA LỘ TRÌNH
                </span>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                  Chọn Nhóm Đối Tượng
                </h3>
              </div>

              {/* Custom Toggle Switch for Explore All */}
              <div 
                onClick={() => {
                  const newVal = !exploreAll;
                  setExploreAll(newVal);
                  if (newVal) {
                    setActiveGroup("all");
                  } else {
                    setActiveGroup("newbie");
                  }
                }}
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 select-none ${
                  exploreAll 
                    ? "bg-[#C5A022]/5 border-[#C5A022]/30 shadow-sm" 
                    : "bg-zinc-50 border-zinc-200/80 hover:bg-zinc-100/60"
                }`}
              >
                <div className="flex flex-col pr-2">
                  <span className={`text-xs font-black uppercase tracking-wide flex items-center gap-1.5 ${
                    exploreAll ? "text-[#C5A022]" : "text-zinc-800"
                  }`}>
                    <Sparkles className={`h-3.5 w-3.5 ${exploreAll ? "text-[#C5A022]" : "text-zinc-400"}`} /> Mở khám phá tất cả
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                    Hiển thị trọn bộ 26 bài học
                  </span>
                </div>
                <div
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    exploreAll ? "bg-[#C5A022]" : "bg-zinc-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      exploreAll ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Filtering Group Buttons */}
              <div className="space-y-2.5">
                {groups
                  .filter((group) => group.id !== "all" || exploreAll)
                  .map((group) => {
                    const isSelected = activeGroup === group.id;
                    const isGroupPaid = purchasedGroups.includes("all") || purchasedGroups.includes(group.id);
                    return (
                      <button
                        key={group.id}
                        onClick={() => setActiveGroup(group.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-wide transition-all duration-300 border text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#0F172A] text-white border-transparent shadow-lg shadow-black/15 translate-x-1"
                            : "bg-white text-zinc-700 border-zinc-200/80 hover:bg-zinc-50 hover:border-[#C5A022]/40"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-base leading-none">{group.icon}</span>
                          <span className="flex items-center gap-1.5">
                            {group.label}
                            {isGroupPaid && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono font-bold uppercase animate-pulse">
                                Đã mua
                              </span>
                            )}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                          isSelected ? "bg-[#C5A022] text-black" : "bg-zinc-100 text-zinc-500"
                        }`}>
                          {group.count}
                        </span>
                      </button>
                    );
                  })}
              </div>

              {/* Filtering Meta Details Label */}
              <div className="border-t border-zinc-100 pt-4 flex items-center justify-between text-xs font-sans">
                <span className="text-zinc-400">Đang lọc theo:</span>
                <span className="font-bold text-[#0F172A] flex items-center gap-1">
                  {activeGroup === "all" ? "⚡ Tất cả bài học" : 
                   activeGroup === "newbie" ? "🌱 Newbie Media" :
                   activeGroup === "pro" ? "🔥 Media Pro" :
                   activeGroup === "tiktok" ? "📱 TikTok Creator" : "🎥 YouTube Vlogger"}
                </span>
              </div>

              {/* Stats Unlocked/Locked Widgets */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-center flex flex-col justify-center min-h-[90px]">
                  <span className="text-xs font-medium text-zinc-400 block mb-1">Học mở khóa</span>
                  <span className="text-3xl font-black text-[#0F172A] font-display">
                    {unlockedLessonsCount}
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1 font-sans">bài tập trung</span>
                </div>
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 text-center flex flex-col justify-center min-h-[90px]">
                  <span className="text-xs font-medium text-zinc-400 block mb-1">Bài bị khóa</span>
                  <span className="text-3xl font-black text-zinc-400 font-display">
                    {lockedLessonsCount}
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1 font-sans">bài bị khóa</span>
                </div>
              </div>

              {/* Progress Level bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-zinc-500 uppercase tracking-wide">
                  <span>TỶ LỆ KHÓA HỌC PHÙ HỢP</span>
                  <span className="font-mono text-[#0F172A]">{matchPercentage}%</span>
                </div>
                <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(197,160,34,0.3)]"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Promo Card Wrapper inside white block */}
              {(() => {
                const isCurrentGroupPaid = purchasedGroups.includes("all") || (activeGroup !== "all" && purchasedGroups.includes(activeGroup));
                return (
                  <div className={`rounded-2xl p-5 border relative overflow-hidden flex flex-col justify-between mt-2 transition-all duration-300 ${
                    isCurrentGroupPaid 
                      ? "bg-gradient-to-b from-emerald-50/80 to-teal-50/50 border-emerald-100"
                      : "bg-gradient-to-b from-[#EEF2FF] to-[#F5F7FF] border-indigo-100"
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-black font-mono tracking-wider uppercase ${
                          isCurrentGroupPaid ? "text-emerald-700" : "text-indigo-700"
                        }`}>
                          {promo.title}
                        </span>
                        <span className={`text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full ${
                          isCurrentGroupPaid ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white"
                        }`}>
                          {isCurrentGroupPaid ? "Đã Mua" : promo.badge}
                        </span>
                      </div>
                      
                      {/* Price info */}
                      <div className="flex items-baseline space-x-1.5 mb-4">
                        {isCurrentGroupPaid ? (
                          <span className="text-base font-black text-emerald-800 tracking-tight font-display flex items-center gap-1.5">
                            <Check className="h-5 w-5 text-emerald-600 stroke-[3]" /> Đã kích hoạt hoàn chỉnh
                          </span>
                        ) : (
                          <>
                            <span className="text-3xl font-black text-slate-900 tracking-tight font-display">
                              {promo.price}đ
                            </span>
                            <span className="text-xs text-zinc-500 font-medium">/trọn gói</span>
                          </>
                        )}
                      </div>

                      {/* Benefit Items */}
                      <ul className="space-y-2.5 text-xs text-slate-700 mb-6 font-sans">
                        {promo.benefits.map((ben, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className={`${isCurrentGroupPaid ? "text-emerald-600" : "text-indigo-600"} mt-0.5 shrink-0`}>
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                            <span className="leading-tight font-medium">{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Submit action button */}
                    <button
                      onClick={() => handleRegister()}
                      className={`w-full rounded-xl py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md ${
                        isCurrentGroupPaid
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-[#0F172A] hover:bg-slate-800 text-white"
                      }`}
                    >
                      {isCurrentGroupPaid ? "Vào Học Lộ Trình Này" : "Đăng Ký Gói Ngay"}
                    </button>

                    {!isCurrentGroupPaid && (
                      <button
                        onClick={() => {
                          const formEl = document.getElementById("consultation-form");
                          if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-[11px] text-zinc-400 hover:text-[#0F172A] font-semibold text-center underline block mt-3 w-full transition-colors font-sans"
                      >
                        Nhận tư vấn cá nhân hóa
                      </button>
                    )}
                  </div>
                );
              })()}

              {purchasedGroups.length > 0 && (
                <button
                  onClick={handleResetPurchases}
                  className="w-full text-center text-[10px] font-mono text-zinc-400 hover:text-red-500 transition-colors cursor-pointer mt-1"
                >
                  ✕ Khôi phục trạng thái khóa học (Reset Demo)
                </button>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: The Interactive Curriculum List of Lessons */}
          <div className="lg:col-span-8 space-y-12">
            
            {modulesList.map((module) => {
              // Filter to show only relevant lessons when choosing each specific category, and all lessons when choosing "all"
              const filteredLessons = activeGroup === "all"
                ? module.lessons
                : module.lessons.filter((l) => l.tag === activeGroup);

              // If a module contains zero matching lessons, hide the module entirely
              if (filteredLessons.length === 0) return null;

              const isExpanded = expandedModules.includes(module.num);

              return (
                <div key={module.num} className="space-y-5 bg-zinc-950/20 p-4 rounded-3xl border border-zinc-900">
                  
                  {/* Module Header Title bar */}
                  <div 
                    onClick={() => toggleModule(module.num)}
                    className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-2 cursor-pointer group hover:border-[#C5A022]/60 transition-all duration-300 select-none"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono font-black text-[#FFD700] bg-[#C5A022]/10 border border-[#C5A022]/20 px-2 py-0.5 rounded-md">
                        {module.num}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-wide uppercase group-hover:text-[#FFD700] transition-colors">
                        {module.title}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-3 text-zinc-500">
                      <span className="text-xs font-mono group-hover:text-zinc-300 transition-colors">
                        {module.lessons.filter(l => activeGroup === "all" || l.tag === activeGroup).length} Bài học phù hợp
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[#FFD700] transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-white transition-transform duration-300" />
                      )}
                    </div>
                  </div>

                  {/* Module Lessons list container */}
                  {isExpanded && (
                    <div className="space-y-4 animate-fade-in duration-300">
                      {filteredLessons.map((lesson) => {
                        const isUnlocked = purchasedGroups.includes("all") || purchasedGroups.includes(lesson.tag);
                        
                        return (
                          <div
                            key={lesson.id}
                            className={`relative rounded-2xl bg-white border p-5 shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                              isUnlocked
                                ? "border-zinc-200/70 opacity-100 hover:scale-[1.01] hover:border-[#C5A022]/40 hover:shadow-md"
                                : "border-zinc-100 opacity-40 grayscale-[40%]"
                            }`}
                          >
                            {/* Left contents */}
                            <div className="flex items-start gap-4">
                              
                              {/* Icon Circle */}
                              <div className={`h-11 w-11 shrink-0 flex items-center justify-center rounded-xl border transition-colors ${
                                isUnlocked 
                                  ? "bg-zinc-50 border-zinc-200/80 text-black" 
                                  : "bg-zinc-100 border-zinc-200 text-zinc-400"
                              }`}>
                                {getLessonIcon(lesson.icon)}
                              </div>

                              {/* Text blocks */}
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold text-zinc-400">
                                    {lesson.number}
                                  </span>
                                  
                                  {/* Tag Badges styled beautifully like the screenshot */}
                                  {lesson.tag === "tiktok" && (
                                    <span className="bg-rose-50 text-rose-600 border border-rose-100/60 text-[9px] font-black tracking-wide px-2 py-0.5 rounded uppercase">
                                      {lesson.tagLabel}
                                    </span>
                                  )}
                                  {lesson.tag === "youtube" && (
                                    <span className="bg-blue-50 text-blue-600 border border-blue-100/60 text-[9px] font-black tracking-wide px-2 py-0.5 rounded uppercase">
                                      {lesson.tagLabel}
                                    </span>
                                  )}
                                  {lesson.tag === "newbie" && (
                                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100/60 text-[9px] font-black tracking-wide px-2 py-0.5 rounded uppercase">
                                      {lesson.tagLabel}
                                    </span>
                                  )}
                                  {lesson.tag === "pro" && (
                                    <span className="bg-amber-50 text-amber-600 border border-amber-100/60 text-[9px] font-black tracking-wide px-2 py-0.5 rounded uppercase">
                                      {lesson.tagLabel}
                                    </span>
                                  )}
                                </div>

                                <h5 className="font-display text-sm sm:text-base font-extrabold text-[#0F172A] leading-tight">
                                  {lesson.title}
                                </h5>
                                <p className="font-sans text-xs text-zinc-500 leading-relaxed max-w-xl">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>

                            {/* Right action details */}
                            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2.5 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-zinc-100">
                              
                              {/* Duration label */}
                              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100 font-semibold flex items-center gap-1">
                                <span>🕒</span>
                                <span>{lesson.duration}</span>
                              </span>

                              {/* Status and Click Button Trigger */}
                              {isUnlocked ? (
                                <button
                                  onClick={() => openVideo(lesson)}
                                  className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-indigo-50/50 cursor-pointer font-sans"
                                >
                                  Vào học <span className="text-base">→</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRegister(lesson.tag)}
                                  className="inline-flex items-center space-x-1.5 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2 text-[10px] font-black text-amber-800 hover:bg-amber-100/70 transition-all cursor-pointer shadow-sm active:scale-95 uppercase font-sans tracking-wide"
                                >
                                  <Lock className="h-3 w-3 text-amber-600 shrink-0" />
                                  <span>Mở khóa</span>
                                </button>
                              )}

                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* DETAILED INTERACTIVE VIDEO PLAYER MODAL POPUP */}
      {activeVideoLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px]">
            
            {/* Close modal cross */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-black/60 border border-zinc-700 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Video player screen left block (60% width) */}
            <div className="relative flex-grow bg-black flex flex-col justify-between p-4 min-h-[250px] md:h-full md:w-3/5">
              
              {/* Top video title overlay */}
              <div className="relative z-10 bg-gradient-to-b from-black/80 to-transparent p-2 text-left">
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#FFD700] uppercase block">
                  ĐANG PHÁT HỌC THỬ • {activeVideoLesson.number}
                </span>
                <h4 className="font-display text-sm font-extrabold text-white truncate max-w-md">
                  {activeVideoLesson.title}
                </h4>
              </div>

              {/* Video Graphic Atmosphere */}
              <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Visual Audio Sound Waves when playing */}
                {isPlaying ? (
                  <div className="flex items-end justify-center space-x-1.5 h-16 opacity-30">
                    <div className="w-1.5 bg-[#C5A022] rounded-full animate-[pulse_1.2s_infinite] h-8" />
                    <div className="w-1.5 bg-[#C5A022] rounded-full animate-[pulse_1s_infinite] h-14" />
                    <div className="w-1.5 bg-[#C5A022] rounded-full animate-[pulse_1.5s_infinite] h-10" />
                    <div className="w-1.5 bg-[#C5A022] rounded-full animate-[pulse_1.1s_infinite] h-16" />
                    <div className="w-1.5 bg-[#C5A022] rounded-full animate-[pulse_1.3s_infinite] h-12" />
                  </div>
                ) : (
                  <div className="relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <div className="absolute -inset-1.5 bg-[#C5A022] rounded-full blur opacity-40 group-hover:opacity-75 transition" />
                    <div className="relative h-16 w-16 rounded-full bg-[#C5A022] text-black flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
                      <Play className="h-7 w-7 fill-black ml-1" />
                    </div>
                  </div>
                )}

              </div>

              {/* Custom Player Controls Bar */}
              <div className="relative z-10 bg-gradient-to-t from-black/90 to-transparent p-3 rounded-xl flex flex-col gap-2">
                
                {/* Timeline slider */}
                <div className="relative h-1 w-full bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#C5A022] rounded-full transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                {/* Left/Right actions in controls */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white transition-colors cursor-pointer text-gray-300"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <span className="font-mono text-[10px]">
                      {Math.floor((videoProgress / 100) * 12)}:
                      {String(Math.floor(((videoProgress / 100) * 12 * 60) % 60)).padStart(2, '0')} / 12:00
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Volume2 className="h-3.5 w-3.5" />
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-12 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#C5A022]"
                      />
                    </div>
                    <Maximize2 className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
                  </div>
                </div>

              </div>

            </div>

            {/* Video Chapters sidebar right block (40% width) */}
            <div className="p-6 md:w-2/5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800 bg-zinc-950/40">
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A022] tracking-wider uppercase block mb-1">
                    HỌC THỬ MIỄN PHÍ
                  </span>
                  <h5 className="font-display text-base font-bold text-white uppercase leading-snug">
                    Tài liệu & Bản Ghi Lớp Học
                  </h5>
                </div>

                {/* Segment chapters */}
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 flex items-start space-x-3 text-xs">
                    <span className="font-mono text-[#FFD700] font-bold">1.</span>
                    <div>
                      <p className="font-semibold text-white">Giới thiệu & Tư duy nền tảng</p>
                      <p className="text-zinc-500 mt-0.5 font-mono text-[10px]">Phát ở phút 0:00 - 3:15</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 flex items-start space-x-3 text-xs">
                    <span className="font-mono text-[#FFD700] font-bold">2.</span>
                    <div>
                      <p className="font-semibold text-white">Phân tích Casestudy thực tế</p>
                      <p className="text-zinc-500 mt-0.5 font-mono text-[10px]">Phát ở phút 3:15 - 8:40</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 flex items-start space-x-3 text-xs">
                    <span className="font-mono text-[#FFD700] font-bold">3.</span>
                    <div>
                      <p className="font-semibold text-white">Thực hành & Sửa lỗi thường gặp</p>
                      <p className="text-zinc-500 mt-0.5 font-mono text-[10px]">Phát ở phút 8:40 - 12:00</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                    * Bạn đang trải nghiệm giao diện học thử. Đăng ký tư vấn ngay để mở khóa toàn bộ 26 bài học có giảng viên sửa bài trực tiếp!
                  </p>
                </div>
              </div>

              {/* Sidebar Action button */}
              <div className="pt-4 border-t border-zinc-900">
                <button
                  onClick={() => {
                    closeVideo();
                    handleRegister();
                  }}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#C5A022] to-[#FFD700] py-3 text-xs font-black uppercase text-black shadow-lg shadow-[#C5A022]/10 hover:shadow-[#C5A022]/30 transition-all cursor-pointer"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Đăng Ký Mở Khóa Đầy Đủ</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* AUTOMATIC QR PAYMENT INTERACTIVE MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in text-black">
          
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:min-h-[480px]">
            
            {/* Close modal cross */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-black/60 border border-zinc-700 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* LEFT COLUMN: QR CODE GENERATOR PANEL */}
            <div className="relative w-full md:w-5/12 bg-zinc-900 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 text-center">
              
              {paymentStep !== "success" ? (
                <>
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-[#FFD700] font-black tracking-widest bg-[#C5A022]/10 border border-[#C5A022]/30 px-3 py-1 rounded-full uppercase block">
                      Quét mã để học ngay
                    </span>
                  </div>

                  {/* QR Image Frame with dynamic scanning line */}
                  <div className="relative p-3 bg-white rounded-2xl border border-zinc-800 shadow-xl overflow-hidden group">
                    
                    {/* Scanning red line effect */}
                    {paymentStep === "paying" && (
                      <div className="absolute left-0 right-0 h-0.5 bg-red-500/80 shadow-[0_0_10px_#ef4444] animate-[bounce_3s_infinite] z-10" />
                    )}

                    <img 
                      src={`https://img.vietqr.io/image/mbbank-0909123456-compact2.png?amount=${promo.amount}&addInfo=${promo.addInfo}&accountName=HOC%20VIEN%20HOC%20THUC%20CHIEN`}
                      alt="Thanh toán QR tự động" 
                      className="w-48 h-48 rounded-lg select-none mx-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-center space-x-1.5 text-zinc-400 text-xs">
                      <QrCode className="h-4 w-4 text-[#FFD700]" />
                      <span>Sử dụng ứng dụng ngân hàng</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed">
                      Mã QR chứa sẵn số tiền và nội dung chuyển khoản chuẩn xác của hệ thống Học Thực Chiến.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur animate-pulse" />
                    <div className="relative h-20 w-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="h-10 w-10 stroke-[3]" />
                    </div>
                  </div>
                  <h4 className="text-[#10B981] font-display text-lg font-black tracking-wide uppercase mt-6 mb-1">
                    Kích hoạt thành công!
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-400">
                    GIAO DỊCH ĐÃ ĐƯỢC XÁC THỰC
                  </p>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: ACCOUNT INFORMATION DETAILS */}
            <div className="p-6 md:p-8 w-full md:w-7/12 flex flex-col justify-between text-zinc-300 bg-zinc-950/60">
              
              {paymentStep === "paying" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A022] tracking-wider uppercase block mb-1">
                      HỆ THỐNG THANH TOÁN QUÉT QR TỰ ĐỘNG
                    </span>
                    <h4 className="font-display text-lg font-black text-white uppercase tracking-wide">
                      {promo.title}
                    </h4>
                  </div>

                  {/* Pricing and benefits */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-zinc-400">Học phí trọn gói</p>
                      <p className="text-xl font-black text-white font-display mt-0.5">{promo.price}đ</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono font-bold bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 px-2 py-0.5 rounded-md">
                        {lessons.filter(l => activeGroup === "all" || l.tag === activeGroup).length} bài học tương tác
                      </span>
                    </div>
                  </div>

                  {/* Transfer Details Form */}
                  <div className="space-y-2.5">
                    
                    {/* Bank Name */}
                    <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-xs">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Ngân hàng thụ hưởng</span>
                        <span className="font-bold text-white font-sans">MB BANK (Ngân hàng Quân Đội)</span>
                      </div>
                    </div>

                    {/* Account Number */}
                    <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-xs">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Số tài khoản</span>
                        <span className="font-bold text-white font-mono text-sm">0909123456</span>
                      </div>
                      <button
                        onClick={() => handleCopy("0909123456", "account")}
                        className="text-[10px] text-[#FFD700] hover:underline flex items-center gap-1 cursor-pointer font-bold font-mono bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700 active:scale-95 transition-all"
                      >
                        <Copy className="h-3 w-3" />
                        <span>{copiedField === "account" ? "Đã copy" : "Copy STK"}</span>
                      </button>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-xs">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Số tiền cần chuyển</span>
                        <span className="font-bold text-white font-mono text-sm">{promo.amount.toLocaleString()} đ</span>
                      </div>
                      <button
                        onClick={() => handleCopy(promo.amount.toString(), "amount")}
                        className="text-[10px] text-[#FFD700] hover:underline flex items-center gap-1 cursor-pointer font-bold font-mono bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700 active:scale-95 transition-all"
                      >
                        <Copy className="h-3 w-3" />
                        <span>{copiedField === "amount" ? "Đã copy" : "Copy Số Tiền"}</span>
                      </button>
                    </div>

                    {/* Description */}
                    <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-xs">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Nội dung chuyển khoản chuẩn</span>
                        <span className="font-bold text-white font-mono text-sm text-[#FFD700]">{promo.addInfo}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(promo.addInfo, "addInfo")}
                        className="text-[10px] text-[#FFD700] hover:underline flex items-center gap-1 cursor-pointer font-bold font-mono bg-zinc-800 px-2.5 py-1 rounded-md border border-[#C5A022]/30 active:scale-95 transition-all text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C5A022]"
                      >
                        <Copy className="h-3 w-3 text-[#FFD700]" />
                        <span>{copiedField === "addInfo" ? "Đã copy" : "Copy Nội Dung"}</span>
                      </button>
                    </div>

                  </div>

                  {/* Countdown timer & Live feedback status */}
                  <div className="pt-2 flex items-center justify-between border-t border-zinc-900">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      </span>
                      <span className="text-zinc-400 text-[11px] animate-pulse">
                        🔄 Đang chờ giao dịch tự động...
                      </span>
                    </div>

                    <div className="text-right font-mono text-xs text-zinc-500">
                      Hiệu lực mã: <span className="text-[#FFD700] font-bold">{Math.floor(paymentTime / 60)}:{String(paymentTime % 60).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Main Action trigger simulation bypass */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        if (autoCheckTimer.current) clearTimeout(autoCheckTimer.current);
                        setPaymentStep("checking");
                        autoCheckTimer.current = setTimeout(() => {
                          setPaymentStep("success");
                          setPurchasedGroups(prev => {
                            const target = activeGroup;
                            if (prev.includes(target)) return prev;
                            return [...prev, target];
                          });
                        }, 2000);
                      }}
                      className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-[#C5A022] hover:bg-[#FFD700] text-black text-xs font-black py-3 px-4 shadow-lg shadow-[#C5A022]/10 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Xác nhận đã chuyển khoản</span>
                    </button>
                    <button
                      onClick={() => setShowQRModal(false)}
                      className="rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 text-xs font-bold py-3 px-4 transition-colors cursor-pointer"
                    >
                      Bỏ qua
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === "checking" && (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
                  <div className="relative">
                    <Loader2 className="h-16 w-16 text-[#FFD700] animate-spin stroke-[2.5]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-lg font-extrabold text-white uppercase tracking-wider">
                      Đang Kiểm Tra Giao Dịch Tự Động
                    </h4>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                      Hệ thống đang kiểm tra biến động số dư tài khoản ngân hàng thụ hưởng và kích hoạt học tập tự động cho bạn. Quá trình này thường mất 3 - 5 giây.
                    </p>
                  </div>
                  <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-700">
                    <div className="h-full bg-gradient-to-r from-[#C5A022] to-[#FFD700] rounded-full animate-[pulse_1.5s_infinite] w-2/3" />
                  </div>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="flex flex-col justify-between h-full py-2 space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-mono tracking-wide">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>KÍCH HOẠT THÀNH CÔNG KHÓA HỌC</span>
                    </div>

                    <h3 className="font-display text-2xl font-black text-white leading-tight uppercase">
                      Chào mừng bạn đến với lộ trình {promo.title}!
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Thanh toán của bạn đã được xác nhận tự động thành công. Hệ thống đã chính thức mở khóa toàn bộ bài học, học liệu thực chiến, kịch bản gốc và tài nguyên đi kèm. Bạn có thể bắt đầu nghiên cứu và thực hành ngay lập tức.
                    </p>

                    <div className="border border-emerald-500/20 rounded-2xl bg-emerald-500/5 p-4 space-y-2 text-xs">
                      <p className="font-bold text-white">Quyền lợi vừa được mở khóa:</p>
                      <ul className="space-y-1.5 text-zinc-400">
                        <li className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-emerald-500">✓</span> Mở khóa đầy đủ video bài giảng độ phân giải cao (Full HD)
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-emerald-500">✓</span> Hỗ trợ file mẫu kịch bản gốc và tài liệu setup đi kèm bài học
                        </li>
                        <li className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-emerald-500">✓</span> Đạt quyền lợi được giảng viên hỗ trợ trực tiếp từ diễn đàn
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Close and start studying trigger button */}
                  <div className="pt-4 border-t border-zinc-900">
                    <button
                      onClick={() => {
                        setShowQRModal(false);
                        const el = document.getElementById("packages");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-xs font-black uppercase text-white shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Bắt Đầu Học Ngay</span>
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

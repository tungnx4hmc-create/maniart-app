export interface CoursePackage {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  period: string;
  icon: string;
  popular: boolean;
  description: string;
  features: string[];
}

export interface StudentSupports {
  learning: string[];
  development: string[];
}

export interface Consultation {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  packageId: string;
  note: string;
  status: "Đang chờ" | "Đã liên hệ" | "Đã chốt" | "Hủy bỏ";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

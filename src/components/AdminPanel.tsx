import React, { useState } from "react";
import { Consultation, CoursePackage, StudentSupports } from "../types";
import { Trash2, Check, CheckCircle, Save, Plus, Edit3, X, User, Phone, Calendar, RefreshCcw, ClipboardList } from "lucide-react";

interface AdminPanelProps {
  packages: CoursePackage[];
  supports: StudentSupports;
  consultations: Consultation[];
  loading: boolean;
  onRefreshData: () => void;
  onUpdatePackages: (newPkgs: CoursePackage[]) => Promise<boolean>;
  onUpdateSupports: (newSups: StudentSupports) => Promise<boolean>;
  onUpdateConsultationStatus: (id: string, status: string) => Promise<void>;
  onDeleteConsultation: (id: string) => Promise<void>;
}

export default function AdminPanel({
  packages,
  supports,
  consultations,
  loading,
  onRefreshData,
  onUpdatePackages,
  onUpdateSupports,
  onUpdateConsultationStatus,
  onDeleteConsultation
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"leads" | "packages" | "supports">("leads");

  // Local states for editing packages
  const [editedPackages, setEditedPackages] = useState<CoursePackage[]>([]);
  const [isEditingPkgs, setIsEditingPkgs] = useState(false);

  // Local states for editing supports
  const [editedLearningSupports, setEditedLearningSupports] = useState<string[]>([]);
  const [editedDevSupports, setEditedDevSupports] = useState<string[]>([]);
  const [isEditingSupports, setIsEditingSupports] = useState(false);

  // Alert/Status
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Initialize Edit Mode for Packages
  const startEditingPackages = () => {
    setEditedPackages(JSON.parse(JSON.stringify(packages)));
    setIsEditingPkgs(true);
    setSaveStatus(null);
  };

  const handleSavePackages = async () => {
    const success = await onUpdatePackages(editedPackages);
    if (success) {
      setSaveStatus("Cập nhật Gói khóa học thành công!");
      setIsEditingPkgs(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus("Gặp lỗi khi cập nhật.");
    }
  };

  const handlePackageFieldChange = (idx: number, field: keyof CoursePackage, value: any) => {
    const updated = [...editedPackages];
    updated[idx] = { ...updated[idx], [field]: value };
    setEditedPackages(updated);
  };

  const handleFeatureChange = (pkgIdx: number, featIdx: number, value: string) => {
    const updated = [...editedPackages];
    updated[pkgIdx].features[featIdx] = value;
    setEditedPackages(updated);
  };

  const handleAddFeature = (pkgIdx: number) => {
    const updated = [...editedPackages];
    updated[pkgIdx].features.push("Tính năng/Nội dung học mới");
    setEditedPackages(updated);
  };

  const handleRemoveFeature = (pkgIdx: number, featIdx: number) => {
    const updated = [...editedPackages];
    updated[pkgIdx].features.splice(featIdx, 1);
    setEditedPackages(updated);
  };

  // Initialize Edit Mode for Supports
  const startEditingSupports = () => {
    setEditedLearningSupports([...supports.learning]);
    setEditedDevSupports([...supports.development]);
    setIsEditingSupports(true);
    setSaveStatus(null);
  };

  const handleSaveSupports = async () => {
    const success = await onUpdateSupports({
      learning: editedLearningSupports,
      development: editedDevSupports
    });
    if (success) {
      setSaveStatus("Cập nhật Chính sách Đồng hành thành công!");
      setIsEditingSupports(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus("Lỗi khi lưu.");
    }
  };

  const handleAddSupportBullet = (type: "learning" | "development") => {
    if (type === "learning") {
      setEditedLearningSupports([...editedLearningSupports, "Mục đồng hành học tập mới"]);
    } else {
      setEditedDevSupports([...editedDevSupports, "Mục đồng hành phát triển mới"]);
    }
  };

  const handleRemoveSupportBullet = (type: "learning" | "development", idx: number) => {
    if (type === "learning") {
      const updated = [...editedLearningSupports];
      updated.splice(idx, 1);
      setEditedLearningSupports(updated);
    } else {
      const updated = [...editedDevSupports];
      updated.splice(idx, 1);
      setEditedDevSupports(updated);
    }
  };

  const handleSupportBulletChange = (type: "learning" | "development", idx: number, val: string) => {
    if (type === "learning") {
      const updated = [...editedLearningSupports];
      updated[idx] = val;
      setEditedLearningSupports(updated);
    } else {
      const updated = [...editedDevSupports];
      updated[idx] = val;
      setEditedDevSupports(updated);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-zinc-950 border border-yellow-500/20 rounded-2xl my-10 shadow-2xl relative overflow-hidden" id="admin-panel">
      
      {/* Decorative tag */}
      <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[9px] font-mono font-bold uppercase px-3 py-1 tracking-widest rounded-bl">
        Hệ Thống Quản Trị Hệ CSDL Backend
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <ClipboardList className="h-6 w-6 text-yellow-500" />
            <span>Khu Vực Quản Trị Website & Backend Database</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Thay đổi thông tin trực tiếp, lưu trữ bền vững vào <code className="text-yellow-500/90 font-mono text-xs">database.json</code> và kiểm soát thông tin học viên đăng ký tư vấn.
          </p>
        </div>

        <button
          onClick={onRefreshData}
          disabled={loading}
          className="inline-flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-gray-300 hover:text-white px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-40"
          id="admin-btn-refresh"
        >
          <RefreshCcw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Làm Mới Data</span>
        </button>
      </div>

      {saveStatus && (
        <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium">
          {saveStatus}
        </div>
      )}

      {/* Tabs list */}
      <div className="flex border-b border-zinc-800/80 mb-6">
        {[
          { id: "leads", label: `Yêu Cầu Tư Vấn (${consultations.length})` },
          { id: "packages", label: "Gói Khóa Học" },
          { id: "supports", label: "Đồng Hành Học Viên" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setIsEditingPkgs(false);
              setIsEditingSupports(false);
            }}
            className={`px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-yellow-500 text-yellow-500 bg-yellow-500/5"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
            id={`admin-tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads Tab Content */}
      {activeTab === "leads" && (
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
              <p className="text-gray-500 text-sm font-mono">Chưa có học viên nào đăng ký tư vấn.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-gray-300 border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-gray-400 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Thời gian / Học viên</th>
                    <th className="py-3 px-4">Liên hệ</th>
                    <th className="py-3 px-4">Gói đăng ký</th>
                    <th className="py-3 px-4">Ghi chú từ học viên</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {consultations.map((lead) => {
                    const matchedPkg = packages.find((p) => p.id === lead.packageId);
                    return (
                      <tr key={lead.id} className="hover:bg-zinc-900/20 transition-colors" id={`lead-row-${lead.id}`}>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1 text-gray-500 font-mono text-[10px] mb-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(lead.createdAt).toLocaleString("vi-VN")}</span>
                          </div>
                          <div className="font-bold text-white flex items-center space-x-1.5 text-sm">
                            <User className="h-3.5 w-3.5 text-gray-400" />
                            <span>{lead.fullName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-mono text-xs text-yellow-500 font-bold mb-0.5">
                            <Phone className="inline h-3 w-3 mr-1" />
                            {lead.phoneNumber}
                          </div>
                          {lead.email && <div className="text-gray-500 text-xs">{lead.email}</div>}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center rounded-md bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-500 border border-yellow-500/10">
                            {matchedPkg ? matchedPkg.name.split(":")[0] : "Chưa chọn"}
                          </span>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <p className="text-gray-400 line-clamp-2 text-xs italic">
                            {lead.note || "--- Không có ghi chú ---"}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-bold ${
                            lead.status === "Đang chờ" ? "bg-amber-500/15 text-amber-400" :
                            lead.status === "Đã liên hệ" ? "bg-blue-500/15 text-blue-400" :
                            lead.status === "Đã chốt" ? "bg-green-500/15 text-green-400" :
                            "bg-zinc-800 text-gray-400"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            {lead.status === "Đang chờ" && (
                              <button
                                onClick={() => onUpdateConsultationStatus(lead.id, "Đã liên hệ")}
                                className="p-1 text-xs text-blue-400 hover:bg-blue-500/10 rounded"
                                title="Đánh dấu đã liên hệ"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            {lead.status !== "Đã chốt" && (
                              <button
                                onClick={() => onUpdateConsultationStatus(lead.id, "Đã chốt")}
                                className="p-1 text-xs text-green-400 hover:bg-green-500/10 rounded"
                                title="Chốt đơn khóa học"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => onDeleteConsultation(lead.id)}
                              className="p-1 text-xs text-red-400 hover:bg-red-500/15 rounded"
                              title="Xóa thông tin tuyển sinh"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Packages Tab Content */}
      {activeTab === "packages" && (
        <div>
          {!isEditingPkgs ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400 text-xs sm:text-sm italic">
                  Các thông tin khóa học hiện tại hiển thị ngoài trang chủ.
                </p>
                <button
                  onClick={startEditingPackages}
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2.5 text-xs font-bold cursor-pointer"
                  id="admin-btn-edit-pkgs"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Chỉnh Sửa Gói Học</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-mono text-yellow-500 font-bold">{pkg.period}</span>
                      {pkg.popular && <span className="bg-yellow-500 text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase">Popular</span>}
                    </div>
                    <h4 className="font-bold text-white text-sm uppercase mb-1">{pkg.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{pkg.description}</p>
                    <div className="text-sm font-bold text-yellow-500 mb-4">Học phí: {pkg.price} VNĐ <span className="text-xs text-gray-500 font-normal line-through ml-2">{pkg.originalPrice} VNĐ</span></div>
                    <ul className="space-y-1.5 border-t border-zinc-800 pt-3">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start">
                          <span className="text-yellow-500 mr-1.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-4">
                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-wide">Đang chỉnh sửa Gói Khóa Học</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditingPkgs(false)}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-800 text-gray-300 hover:text-white"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleSavePackages}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 flex items-center space-x-1"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Lưu CSDL</span>
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {editedPackages.map((pkg, pIdx) => (
                  <div key={pkg.id} className="p-6 rounded-xl border border-yellow-500/10 bg-zinc-950 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Tên Gói</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => handlePackageFieldChange(pIdx, "name", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Giá Ưu Đãi (VNĐ)</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => handlePackageFieldChange(pIdx, "price", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Giá Gốc (VNĐ)</label>
                        <input
                          type="text"
                          value={pkg.originalPrice}
                          onChange={(e) => handlePackageFieldChange(pIdx, "originalPrice", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Lộ Trình / Kỳ Học</label>
                        <input
                          type="text"
                          value={pkg.period}
                          onChange={(e) => handlePackageFieldChange(pIdx, "period", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Mô Tả Ngắn</label>
                        <input
                          type="text"
                          value={pkg.description}
                          onChange={(e) => handlePackageFieldChange(pIdx, "description", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    {/* Features Editor */}
                    <div className="space-y-2 border-t border-zinc-800 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">Nội dung chi tiết trong gói:</span>
                        <button
                          onClick={() => handleAddFeature(pIdx)}
                          className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-yellow-500 px-2.5 py-1 rounded flex items-center space-x-1"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Thêm dòng</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-yellow-500/80 shrink-0">#{fIdx + 1}</span>
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleFeatureChange(pIdx, fIdx, e.target.value)}
                              className="flex-1 bg-zinc-900 border border-zinc-850 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                            />
                            <button
                              onClick={() => handleRemoveFeature(pIdx, fIdx)}
                              className="p-1.5 text-red-500 hover:bg-red-500/10 rounded"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Supports Tab Content */}
      {activeTab === "supports" && (
        <div>
          {!isEditingSupports ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400 text-xs sm:text-sm italic">
                  Các tiêu chí đồng hành (Học tập & Phát triển) ngoài trang chủ.
                </p>
                <button
                  onClick={startEditingSupports}
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2.5 text-xs font-bold cursor-pointer"
                  id="admin-btn-edit-sups"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Chỉnh Sửa Đồng Hành</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/20">
                  <h4 className="font-bold text-white text-sm uppercase mb-3 border-b border-zinc-800 pb-2 text-yellow-500">ĐỒNG HÀNH HỌC</h4>
                  <ul className="space-y-2.5">
                    {supports.learning.map((s, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start">
                        <span className="text-yellow-500 mr-2 font-mono">#{idx+1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/20">
                  <h4 className="font-bold text-white text-sm uppercase mb-3 border-b border-zinc-800 pb-2 text-yellow-500">ĐỒNG HÀNH PHÁT TRIỂN</h4>
                  <ul className="space-y-2.5">
                    {supports.development.map((s, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start">
                        <span className="text-yellow-500 mr-2 font-mono">#{idx+1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-4">
                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-wide">Đang chỉnh sửa các tiêu chí Đồng Hành</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditingSupports(false)}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-800 text-gray-300 hover:text-white"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleSaveSupports}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 flex items-center space-x-1"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Lưu CSDL</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Learning edit list */}
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-yellow-500 uppercase">TIÊU CHÍ ĐỒNG HÀNH HỌC:</h4>
                    <button
                      onClick={() => handleAddSupportBullet("learning")}
                      className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-yellow-500 px-2.5 py-1 rounded flex items-center space-x-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Thêm dòng</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {editedLearningSupports.map((bullet, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-xs text-zinc-500 font-mono">#{idx+1}</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleSupportBulletChange("learning", idx, e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                        <button
                          onClick={() => handleRemoveSupportBullet("learning", idx)}
                          className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dev edit list */}
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-yellow-500 uppercase">TIÊU CHÍ ĐỒNG HÀNH PHÁT TRIỂN:</h4>
                    <button
                      onClick={() => handleAddSupportBullet("development")}
                      className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-yellow-500 px-2.5 py-1 rounded flex items-center space-x-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Thêm dòng</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {editedDevSupports.map((bullet, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-xs text-zinc-500 font-mono">#{idx+1}</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleSupportBulletChange("development", idx, e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                        />
                        <button
                          onClick={() => handleRemoveSupportBullet("development", idx)}
                          className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

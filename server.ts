import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "database.json");

app.use(express.json());

// Helper functions for reading/writing local JSON Database
function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      // Fallback default data if file is missing
      const defaultData = {
        packages: [],
        supports: { learning: [], development: [] },
        consultations: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file:", err);
    return { packages: [], supports: { learning: [], development: [] }, consultations: [] };
  }
}

function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing database file:", err);
    return false;
  }
}

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY is not defined. AI Advisor features will be mocked.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// --- REST API ENDPOINTS ---

// 0. Verify Admin Access Code
app.post("/api/admin/verify", (req, res) => {
  const { code } = req.body;
  const configuredCode = process.env.ADMIN_ACCESS_CODE || "MANJART_PRODUCTION_2026";
  
  if (code && code.trim() === configuredCode.trim()) {
    return res.json({ success: true, message: "Xác thực thành công!" });
  }
  
  return res.status(401).json({ success: false, error: "Mã truy cập không chính xác. Vui lòng thử lại!" });
});

// 1. Get Course Packages
app.get("/api/packages", (req, res) => {
  const db = readDatabase();
  res.json(db.packages);
});

// Update Course Packages (Admin interface)
app.put("/api/packages", (req, res) => {
  const newPackages = req.body;
  if (!Array.isArray(newPackages)) {
    return res.status(400).json({ error: "Packages must be an array" });
  }
  const db = readDatabase();
  db.packages = newPackages;
  writeDatabase(db);
  res.json({ message: "Successfully updated packages", packages: db.packages });
});

// 2. Get Student Supports
app.get("/api/supports", (req, res) => {
  const db = readDatabase();
  res.json(db.supports);
});

// Update Student Supports (Admin interface)
app.put("/api/supports", (req, res) => {
  const newSupports = req.body;
  if (!newSupports || !newSupports.learning || !newSupports.development) {
    return res.status(400).json({ error: "Supports must contain learning and development lists" });
  }
  const db = readDatabase();
  db.supports = newSupports;
  writeDatabase(db);
  res.json({ message: "Successfully updated supports", supports: db.supports });
});

// 3. Get Consultation Registrations
app.get("/api/consultations", (req, res) => {
  const db = readDatabase();
  res.json(db.consultations || []);
});

// 4. Register Consultation Form Submission
app.post("/api/consultations", (req, res) => {
  const { fullName, phoneNumber, email, packageId, note } = req.body;
  if (!fullName || !phoneNumber) {
    return res.status(400).json({ error: "Họ tên và Số điện thoại là bắt buộc!" });
  }

  const db = readDatabase();
  const newConsultation = {
    id: `consult-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    fullName,
    phoneNumber,
    email: email || "",
    packageId: packageId || "",
    note: note || "",
    status: "Đang chờ",
    createdAt: new Date().toISOString()
  };

  if (!db.consultations) {
    db.consultations = [];
  }
  db.consultations.unshift(newConsultation); // Prepend to show newest first
  writeDatabase(db);

  res.status(201).json({
    message: "Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.",
    consultation: newConsultation
  });
});

// 5. Update Consultation Status (Admin action)
app.put("/api/consultations/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const db = readDatabase();
  const index = db.consultations.findIndex((c: any) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Consultation not found" });
  }

  db.consultations[index].status = status;
  writeDatabase(db);
  res.json({ message: "Updated status successfully", consultation: db.consultations[index] });
});

// 6. Delete Consultation (Admin action)
app.delete("/api/consultations/:id", (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.consultations.findIndex((c: any) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Consultation not found" });
  }
  db.consultations.splice(index, 1);
  writeDatabase(db);
  res.json({ message: "Deleted consultation successfully" });
});

// 8. Create a Payment Order
app.post("/api/payments/create", (req, res) => {
  const { fullName, phoneNumber, email, packageId, amount, groupName } = req.body;
  if (!fullName || !phoneNumber || !amount || !packageId) {
    return res.status(400).json({ error: "Họ tên, số điện thoại, gói khóa học và số tiền là bắt buộc!" });
  }

  const db = readDatabase();
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const cleanGroup = (groupName || "ALL").toUpperCase();
  const memo = `MJ${cleanPhone}`.toUpperCase();

  const newOrder = {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    fullName,
    phoneNumber: cleanPhone,
    email: email || "",
    packageId,
    groupName: cleanGroup,
    amount: Number(amount),
    memo,
    status: "Pending", // Pending, Completed
    createdAt: new Date().toISOString()
  };

  if (!db.orders) {
    db.orders = [];
  }
  
  db.orders.unshift(newOrder);

  // Auto-create a consultation registration record too
  if (!db.consultations) {
    db.consultations = [];
  }
  
  db.consultations.unshift({
    id: `consult-${Date.now()}`,
    fullName,
    phoneNumber,
    email: email || "",
    packageId,
    note: `Khởi tạo đơn hàng quét QR: Gói ${cleanGroup} (${amount.toLocaleString()}đ) - Nội dung: ${memo}`,
    status: "Đang thanh toán",
    createdAt: new Date().toISOString()
  });

  writeDatabase(db);

  res.status(201).json({
    success: true,
    order: newOrder
  });
});

// 9.5 Get all payment orders (Admin action)
app.get("/api/payments", (req, res) => {
  const db = readDatabase();
  if (!db.orders) {
    db.orders = [];
  }
  res.json(db.orders);
});

// 9.6 Delete a payment order (Admin action)
app.delete("/api/payments/:id", (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  if (!db.orders) {
    db.orders = [];
  }
  const index = db.orders.findIndex((o: any) => o.id === id);
  if (index !== -1) {
    db.orders.splice(index, 1);
    writeDatabase(db);
    return res.json({ success: true, message: "Đã xóa đơn hàng thành công!" });
  }
  res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng!" });
});

// 9. Check status of order by memo
app.get("/api/payments/status/:memo", (req, res) => {
  const { memo } = req.params;
  const db = readDatabase();
  
  if (!db.orders) {
    db.orders = [];
  }

  const order = db.orders.find((o: any) => o.memo.toUpperCase() === memo.toUpperCase());
  if (!order) {
    return res.json({ success: false, status: "NotFound", message: "Không tìm thấy đơn hàng!" });
  }

  res.json({
    success: true,
    status: order.status,
    order
  });
});

// 10. Webhook endpoint for SePay / Casso / Manual Simulator
app.post("/api/payment-webhook", (req, res) => {
  const transactions = [];
  
  if (req.body.requests && Array.isArray(req.body.requests)) {
    transactions.push(...req.body.requests);
  } else if (Array.isArray(req.body)) {
    transactions.push(...req.body);
  } else {
    transactions.push(req.body);
  }

  const db = readDatabase();
  if (!db.orders) db.orders = [];
  if (!db.consultations) db.consultations = [];

  let matchedCount = 0;

  for (const tx of transactions) {
    const amount = Number(tx.amount || tx.transferAmount || 0);
    const content = String(tx.content || tx.description || tx.memo || tx.transactionContent || "");
    const transferType = String(tx.transferType || "in").toLowerCase();

    if (transferType === "out" || amount <= 0) {
      continue;
    }

    const matchedOrder = db.orders.find((order: any) => {
      if (order.status === "Completed") return false;
      const orderMemo = order.memo.toUpperCase();
      const txContent = content.toUpperCase();
      return txContent.includes(orderMemo);
    });

    if (matchedOrder) {
      matchedOrder.status = "Completed";
      matchedCount++;

      // Update consultation status
      const consult = db.consultations.find((c: any) => c.phoneNumber === matchedOrder.phoneNumber && c.packageId === matchedOrder.packageId);
      if (consult) {
        consult.status = "Đã kích hoạt";
        consult.note += ` | Xác thực thanh toán tự động lúc ${new Date().toLocaleString()}`;
      } else {
        db.consultations.unshift({
          id: `consult-${Date.now()}`,
          fullName: matchedOrder.fullName,
          phoneNumber: matchedOrder.phoneNumber,
          email: matchedOrder.email,
          packageId: matchedOrder.packageId,
          note: `Đã tự động kích hoạt thành công qua cổng QR Techcombank. Nội dung CK: "${content}". Số tiền: ${amount.toLocaleString()}đ`,
          status: "Đã kích hoạt",
          createdAt: new Date().toISOString()
        });
      }
    }
  }

  if (matchedCount > 0) {
    writeDatabase(db);
    return res.json({ success: true, message: `Kích hoạt thành công ${matchedCount} đơn hàng!`, matchedCount });
  }

  return res.json({ success: false, message: "Không tìm thấy đơn hàng phù hợp với nội dung chuyển khoản này.", transactionsProcessed: transactions.length });
});

// 7. AI Course Advisor API Endpoint using Gemini 3.5 Flash
app.post("/api/chat-advisor", async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const db = readDatabase();
  const packagesSummary = db.packages.map((p: any) => {
    return `- ${p.name}: Giá bán ${p.price} VNĐ (Giá gốc ${p.originalPrice} VNĐ). ${p.description}\n  Các tính năng:\n  ${p.features.map((f: string) => `  * ${f}`).join("\n")}`;
  }).join("\n\n");

  const supportsSummary = `
Chương trình Đồng hành Học viên:
1. ĐỒNG HÀNH HỌC:
${db.supports.learning.map((s: string, idx: number) => `   - ${idx + 1}. ${s}`).join("\n")}

2. ĐỒNG HÀNH PHÁT TRIỂN:
${db.supports.development.map((s: string, idx: number) => `   - ${idx + 1}. ${s}`).join("\n")}
`;

  const systemInstruction = `
Bạn là Cố Vấn Tuyển Sinh AI chuyên nghiệp, nhiệt huyết và cực kỳ thân thiện đại diện cho học viện đào tạo làm phim/video "HỌC THỰC CHIẾN - LÀM CHỦ CÔNG CỤ".
Hãy tư vấn cho học viên bằng ngôn ngữ tiếng Việt lưu loát, truyền cảm hứng và mang tính thuyết phục cao.

Dưới đây là thông tin chi tiết về các khóa học mà bạn đang tuyển sinh:
${packagesSummary}

Chính sách hỗ trợ học viên đặc quyền:
${supportsSummary}

Nhiệm vụ của bạn:
- Hãy lắng nghe mục tiêu, khó khăn của học viên (ví dụ: muốn làm kênh TikTok, muốn kiếm tiền Freelancer dựng phim, muốn học biên tập video nhanh, không biết bắt đầu từ đâu, lo sợ máy cấu hình yếu...).
- Phân tích nhu cầu của họ và giới thiệu gói khóa học phù hợp nhất (GÓI 1, GÓI 2 hoặc GÓI 3). Giải thích rõ lý do tại sao gói đó đáp ứng mong muốn của họ.
- Nhấn mạnh vào dịch vụ "ĐỒNG HÀNH CÙNG HỌC VIÊN" (hỗ trợ 24/7 qua Discord/Zalo, sửa bài chi tiết hàng tuần, giới thiệu job thực tế) để họ yên tâm đăng ký.
- Khuyên họ điền form đăng ký tư vấn trên website để nhận ưu đãi giảm giá sâu lên tới hơn 60% so với giá gốc ngay hôm nay.
- Giữ câu trả lời súc tích, định dạng chuyên nghiệp với các gạch đầu dòng rõ ràng, dễ nhìn. Không trả lời quá dài dòng gây ngợp cho người học. Trả lời một cách ấm áp và dùng từ xưng hô thân mật là "Cố vấn Thực Chiến" và "bạn" hoặc "anh/chị".
`;

  const ai = getGeminiClient();
  if (!ai) {
    // Graceful fallback response if API key is not configured
    const simulatedResponse = `Chào bạn! Tôi là Cố Vấn Thực Chiến AI. Hiện tại, tính năng kết nối trí tuệ nhân tạo đang chạy ở chế độ mô phỏng (do chưa cấu hình khóa API).

Dựa trên thông tin khóa học của chúng tôi:
- Nếu bạn mới bắt đầu học dựng phim cơ bản, hãy chọn **Gói 1: Nhập Môn Thực Chiến** (199K) để làm quen CapCut/Premiere nhanh chóng.
- Nếu muốn bứt phá kỹ năng, làm chủ hiệu ứng âm thanh và chỉnh màu cinematic, hãy chọn **Gói 2: Làm Chủ Công Cụ** (499K - Gói phổ biến nhất).
- Nếu muốn xây dựng thương hiệu cá nhân triệu view và nhận dự án kiếm tiền Freelance thực tế cùng sự kèm cặp 1-1, bạn nên đăng ký **Gói 3: Chuyên Nghiệp - Studio** (999K).

Bạn hãy để lại thông tin số điện thoại ở Form "Đăng Ký Tư Vấn" bên cạnh, đội ngũ hỗ trợ sẽ gọi điện tư vấn chi tiết cho bạn ngay nhé!`;
    return res.json({ reply: simulatedResponse });
  }

  try {
    // Prepare conversation contents with system instructions
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...(chatHistory || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Xin lỗi bạn, tôi không thể phản hồi vào lúc này. Vui lòng để lại số điện thoại để tư vấn viên liên hệ trực tiếp.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API calling error:", err);
    res.status(500).json({ error: "Lỗi kết nối máy chủ AI: " + err.message });
  }
});

// --- VITE INTERFACES & SERVING STATIC ASSETS ---

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for single-page routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HỌC THỰC CHIẾN Server] Running at http://0.0.0.0:${PORT}`);
  });
}

setupServer();

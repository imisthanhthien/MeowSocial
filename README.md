# 🐾 MeowSocial - Mạng xã hội cho người yêu mèo

**MeowSocial** là một nền tảng mạng xã hội giúp người dùng đăng bài viết, chia sẻ ảnh mèo, thả tim, bình luận và theo dõi nhau. Dự án được xây dựng với **NestJS** (backend) và **ReactJS + TailwindCSS** (frontend).

---

## 🚀 Tính năng

- Đăng nhập / Đăng ký (JWT)
- Đăng bài viết có ảnh (Cloudinary)
- Like, comment, follow người dùng khác
- Trang News Feed và trang cá nhân
- Thông báo tương tác (like/comment/follow)
- Responsive UI (desktop & mobile)

---

## 🛠️ Công nghệ

**Frontend:** ReactJS, TailwindCSS, Axios, React Router  
**Backend:** NestJS, SQL Server, Prisma, JWT, Cloudinary

---

## ⚙️ Cài đặt

```bash
# Backend
cd server
npm install
npx prisma migrate dev
npm run start:dev

# Frontend
cd ../client
npm install
npm run dev

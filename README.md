# WhatsApp Auto Sender 📱

Aplikasi Next.js 14 untuk mengirim pesan WhatsApp secara otomatis dengan QR Code Login, MongoDB Database, dan Tailwind CSS.

## 🚀 Fitur Utama

- ✅ **Authentication** - Register & Login dengan JWT
- ✅ **QR Code Login** - Koneksi WhatsApp via QR Code
- ✅ **Dashboard** - User-friendly dashboard
- ✅ **Kirim Pesan** - Kirim pesan WhatsApp ke kontak
- ✅ **Responsive** - Mobile & Desktop support
- ✅ **Production Ready** - Siap deploy ke Railway
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Modern styling

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB + Prisma ORM |
| **Authentication** | JWT + HTTP-only Cookies |
| **Deployment** | Railway.app |

## 📦 Prerequisites

- Node.js 18+ dan npm 9+
- MongoDB (Atlas atau local)
- Git
- Text Editor (VS Code recommended)

## ⚙️ Setup Local Development

### 1. Clone Repository
```bash
git clone https://github.com/cenoracin/WAAUTOSENDER-NEXTJS.git
cd WAAUTOSENDER-NEXTJS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` dan sesuaikan:

```env
# MongoDB Connection - dapatkan dari MongoDB Atlas
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/waautosender?retryWrites=true&w=majority

# Generate dengan: openssl rand -base64 32
NEXTAUTH_SECRET=your_generated_secret_key_here

# Local development
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
PORT=3000
```

### 4. Setup Prisma Database
```bash
# Generate Prisma Client
npx prisma generate

# Migrate database
npx prisma migrate dev --name init

# (Optional) Buka Prisma Studio
npx prisma studio
```

### 5. Run Development Server
```bash
npm run dev
```

Buka browser ke: **http://localhost:3000**

### 6. Test Aplikasi

1. **Register** - Klik "Register" di halaman home
2. **Login** - Masuk dengan akun yang baru dibuat
3. **Generate QR** - Klik tombol "Generate QR Code"
4. **Kirim Pesan** - Isi nomor dan pesan, lalu kirim

## 🚀 Deploy ke Railway.app

### Step 1: Persiapkan Repository

```bash
# Pastikan semua sudah ter-commit
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Setup MongoDB Atlas

1. Buka https://mongodb.com/cloud/atlas
2. Create account atau login
3. Create cluster (free tier)
4. Get connection string (DATABASE_URL)

### Step 3: Deploy ke Railway

1. Buka https://railway.app
2. Login dengan GitHub account
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select repository: `cenoracin/WAAUTOSENDER-NEXTJS`
5. Railway akan auto-detect `package.json`

### Step 4: Add Environment Variables di Railway

Klik **"Variables"** tab dan tambahkan:

```env
# Dari MongoDB Atlas
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/waautosender?retryWrites=true&w=majority

# Generate baru: openssl rand -base64 32
NEXTAUTH_SECRET=generate_your_secret_key_here

# Railway akan assign URL otomatis
NEXTAUTH_URL=https://your-project-name.railway.app

# Production
NODE_ENV=production
```

### Step 5: Deploy

1. Klik **"Deploy"** button
2. Tunggu ~3-5 menit
3. Cek logs di tab **"Logs"**
4. Akses aplikasi di Railway URL

## 📚 API Documentation

### Authentication

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```bash
GET /api/auth/me
```

#### Logout
```bash
GET /api/auth/logout
```

### WhatsApp

#### Get QR Code
```bash
GET /api/wa/qrcode
```

#### Get Connection Status
```bash
GET /api/wa/status
```

### Messages

#### Send Message
```bash
POST /api/messages/send
Content-Type: application/json

{
  "phone": "812345678",
  "message": "Hello World!"
}
```

## 🔒 Security Features

- ✅ Password hashing dengan bcryptjs
- ✅ JWT token dengan expiry 7 hari
- ✅ HTTP-only cookies (CSRF protection)
- ✅ Input validation dengan Zod
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection

## 🐛 Troubleshooting

### ❌ Build Error
```bash
npm install
npm run build
```

### ❌ Database Connection Error
- Cek MongoDB connection string di .env.local
- Pastikan IP address whitelisted di MongoDB Atlas
- Test connection: `mongosh "your-connection-string"`

### ❌ QR Code Tidak Muncul
- Refresh browser
- Clear browser cache
- Check console logs

### ❌ Login Gagal Setelah Deploy ke Railway
- Pastikan `NEXTAUTH_SECRET` sudah di-set
- Pastikan `NEXTAUTH_URL` sesuai dengan Railway domain
- Clear cookies browser

## 📄 License

MIT License - Bebas digunakan untuk project pribadi dan komersial

## 👤 Author

Created by [cenoracin](https://github.com/cenoracin)

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

**Happy Coding! 🚀**

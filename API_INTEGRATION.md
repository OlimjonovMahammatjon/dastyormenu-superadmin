# API Integratsiya Yo'riqnomasi

## 📋 Umumiy Ma'lumot

Loyiha Django REST Framework API bilan to'liq integratsiya qilingan. Barcha ma'lumotlar `http://localhost:8000` dan olinadi.

## 🔑 API Endpoints

### Authentication

#### Login
```
POST /api/auth/login/
```

**Request Body:**
```json
{
  "login": "superadmin",
  "password": "admin1idin"
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "user": {
    "id": "uuid",
    "username": "superadmin",
    "email": "admin@example.com",
    "first_name": "Admin",
    "last_name": "User",
    "role": "super_admin",
    "is_active": true,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

#### Get Current User
```
GET /api/auth/user/
Headers: Authorization: Bearer {access_token}
```

#### Update Profile
```
PATCH /api/auth/user/
Headers: Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "first_name": "Yangi Ism",
  "last_name": "Yangi Familiya",
  "email": "yangi@email.com"
}
```

#### Change Password
```
POST /api/auth/change-password/
Headers: Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "old_password": "eski_parol",
  "new_password": "yangi_parol"
}
```

#### Refresh Token
```
POST /api/auth/refresh/
```

**Request Body:**
```json
{
  "refresh": "refresh_token"
}
```

## 🏗️ Loyiha Strukturasi

```
src/
├── lib/
│   └── api.ts              # API client va barcha endpoint funksiyalari
├── app/
│   ├── pages/
│   │   ├── Login.tsx       # Login sahifasi (API bilan ulangan)
│   │   ├── Profile.tsx     # Profil sahifasi (API bilan ulangan)
│   │   └── ...
│   └── routes.tsx          # Routing konfiguratsiyasi
```

## 🔐 Authentication Flow

1. **Login:**
   - Foydalanuvchi login va parol kiritadi
   - `authAPI.login()` chaqiriladi
   - Access va refresh tokenlar localStorage ga saqlanadi
   - User ma'lumotlari localStorage ga saqlanadi
   - Dashboard ga yo'naltiriladi

2. **Protected Routes:**
   - Har bir so'rov `Authorization: Bearer {token}` header bilan yuboriladi
   - Token localStorage dan avtomatik olinadi

3. **Logout:**
   - `authAPI.logout()` chaqiriladi
   - Barcha tokenlar va user ma'lumotlari o'chiriladi
   - Login sahifasiga yo'naltiriladi

## 💻 Ishlatish

### Login Sahifasi

```typescript
import { authAPI } from '../../lib/api';

const response = await authAPI.login(email, password);
// Token va user ma'lumotlari avtomatik saqlanadi
```

### Profile Sahifasi

```typescript
import { profileAPI } from '../../lib/api';

// Profil ma'lumotlarini olish
const profile = await profileAPI.getProfile();

// Profil yangilash
await profileAPI.updateProfile({
  first_name: 'Yangi Ism',
  last_name: 'Yangi Familiya',
  email: 'yangi@email.com'
});

// Parolni o'zgartirish
await profileAPI.changePassword('eski_parol', 'yangi_parol');
```

## 🚀 Ishga Tushirish

### 1. Backend (Django) ni ishga tushiring:

```bash
cd backend
python manage.py runserver
```

Backend `http://localhost:8000` da ishga tushadi.

### 2. Frontend ni ishga tushiring:

```bash
npm run dev
```

Frontend `http://localhost:5173` da ishga tushadi.

### 3. Login qiling:

- URL: `http://localhost:5173/login`
- Username: `superadmin`
- Parol: `admin1idin`

## 🔧 Konfiguratsiya

### Base URL ni o'zgartirish

`src/lib/api.ts` faylida:

```typescript
// Development
const BASE_URL = 'http://localhost:8000';

// Production
const BASE_URL = 'https://api.dastyor.uz';
```

### Environment Variables (Tavsiya etiladi)

`.env` fayl yarating:

```env
VITE_API_BASE_URL=http://localhost:8000
```

`src/lib/api.ts` da:

```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

## 🐛 Xatolarni Hal Qilish

### CORS Xatolari

Agar CORS xatolari bo'lsa, Django settings.py da:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### 401 Unauthorized

- Token muddati tugagan bo'lishi mumkin
- Refresh token bilan yangi access token oling
- Yoki qayta login qiling

### Network Error

- Backend ishga tushganligini tekshiring
- Base URL to'g'ri ekanligini tekshiring
- Browser console da xatolarni ko'ring

## 📝 Xususiyatlar

✅ **Login sahifasi:**
- Email/Username va parol bilan kirish
- Token-based authentication
- Xatoliklarni ko'rsatish
- Loading holati

✅ **Profile sahifasi:**
- Foydalanuvchi ma'lumotlarini ko'rsatish
- Profil ma'lumotlarini tahrirlash
- Parolni o'zgartirish
- Real-time yangilanishlar

✅ **API Client:**
- Avtomatik token boshqaruvi
- Xatolarni boshqarish
- TypeScript support
- Kengaytiriladigan struktura

## 🔜 Keyingi Qadamlar

1. **Restaurants API ni ulash:**
   - `restaurantsAPI` dan foydalaning
   - RestaurantsNew.tsx ni API bilan ulang

2. **Token Refresh:**
   - Avtomatik token yangilash mexanizmini qo'shing
   - 401 xatolarda avtomatik refresh

3. **Error Handling:**
   - Global error handler
   - Retry mexanizmi

4. **Loading States:**
   - Skeleton loaderlar
   - Progress indicators

## 📞 Yordam

Muammolar yuzaga kelsa:
1. Browser console ni tekshiring
2. Network tab da API so'rovlarni ko'ring
3. Backend logs ni tekshiring
4. API documentation ni qayta ko'rib chiqing

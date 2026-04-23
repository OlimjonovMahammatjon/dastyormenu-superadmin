# Supabase Sozlash Yo'riqnomasi

## 1. Supabase Loyihasiga Kirish

1. [https://supabase.com](https://supabase.com) saytiga kiring
2. Loyihangizga kiring: `https://skinjssrxmheezorfalc.supabase.com`

## 2. Ma'lumotlar Bazasini Sozlash

### SQL Editor orqali jadval yaratish:

1. Supabase dashboard da **SQL Editor** bo'limiga o'ting
2. `supabase-setup.sql` faylidagi barcha SQL kodini nusxalang
3. SQL Editor ga joylashtiring va **Run** tugmasini bosing

Bu quyidagilarni yaratadi:
- `restaurants` jadvali
- Row Level Security (RLS) siyosatlari
- Avtomatik `updated_at` yangilanishi uchun trigger
- 10 ta demo restoran ma'lumotlari

## 3. Authentication Sozlash

### Admin foydalanuvchi yaratish:

1. Supabase dashboard da **Authentication** > **Users** bo'limiga o'ting
2. **Add user** tugmasini bosing
3. Email va parol kiriting:
   - Email: `admin@dastyor.uz`
   - Parol: o'zingizning xavfsiz parolingiz
4. **Create user** tugmasini bosing

## 4. API Kalitlarini Tekshirish

1. **Settings** > **API** bo'limiga o'ting
2. Quyidagi ma'lumotlarni tekshiring:
   - **Project URL**: `https://skinjssrxmheezorfalc.supabase.com`
   - **anon/public key**: Sizning public API kalitingiz

## 5. Loyihani Ishga Tushirish

```bash
# Kutubxonalarni o'rnatish
npm install

# Development serverini ishga tushirish
npm run dev
```

## 6. Kirish

Brauzerda `http://localhost:5173/login` ga o'ting va yaratgan admin hisobingiz bilan kiring.

## Xavfsizlik Eslatmalari

- ⚠️ **MUHIM**: `src/lib/supabase.ts` faylidagi API kalitini to'g'ri kiriting
- ⚠️ Production muhitda environment variables ishlatish tavsiya etiladi
- ⚠️ RLS siyosatlarini loyihangiz talablariga moslang

## Muammolarni Hal Qilish

### Agar login ishlamasa:
1. Supabase dashboard da foydalanuvchi yaratilganligini tekshiring
2. Email tasdiqlangan bo'lishi kerak
3. Browser console da xatolarni tekshiring

### Agar restoranlar yuklanmasa:
1. SQL jadval to'g'ri yaratilganligini tekshiring
2. RLS siyosatlari to'g'ri sozlanganligini tekshiring
3. Network tab da API so'rovlarni tekshiring

## Qo'shimcha Xususiyatlar

Kelajakda qo'shish mumkin:
- Email tasdiqlash
- Parolni tiklash
- Foydalanuvchi rollari (admin, manager)
- Audit log (kim, qachon, nima o'zgartirgan)
- File upload (restoran rasmlari)

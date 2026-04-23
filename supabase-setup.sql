-- Restoranlar jadvali
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  location TEXT NOT NULL,
  join_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Expired')),
  tier TEXT DEFAULT 'Basic' CHECK (tier IN ('Basic', 'Pro', 'Premium')),
  expiry_date DATE,
  monthly_revenue INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Row Level Security (RLS) ni yoqish
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- Barcha foydalanuvchilar o'qiy oladi
CREATE POLICY "Hamma o'qiy oladi" ON restaurants
  FOR SELECT
  USING (true);

-- Faqat autentifikatsiya qilingan foydalanuvchilar qo'sha oladi
CREATE POLICY "Autentifikatsiya qilinganlar qo'sha oladi" ON restaurants
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Faqat autentifikatsiya qilingan foydalanuvchilar yangilashi oladi
CREATE POLICY "Autentifikatsiya qilinganlar yangilashi oladi" ON restaurants
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Faqat autentifikatsiya qilingan foydalanuvchilar o'chira oladi
CREATE POLICY "Autentifikatsiya qilinganlar o'chira oladi" ON restaurants
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Updated_at ni avtomatik yangilash uchun trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Demo ma'lumotlar qo'shish
INSERT INTO restaurants (name, owner, owner_email, location, tier, status, join_date, expiry_date, monthly_revenue, total_orders) VALUES
  ('Oltin Qoshiq', 'Ahmad Hasanov', 'ahmad@oltinqoshiq.uz', 'Toshkent, O''zbekiston', 'Premium', 'Active', '2025-01-15', '2026-01-15', 2500000, 3420),
  ('Toshkent Oshxonasi', 'Fotima Ahmadova', 'fotima@toshkentoshxona.uz', 'Toshkent, O''zbekiston', 'Pro', 'Active', '2025-03-20', '2026-03-20', 1800000, 2850),
  ('Samarqand Saroyi', 'Muhammad Karimov', 'muhammad@samarqandsaroy.uz', 'Samarqand, O''zbekiston', 'Premium', 'Active', '2024-11-10', '2025-11-10', 3100000, 4200),
  ('Buxoro Ta''mlari', 'Xolid Rahimov', 'xolid@buxorotam.uz', 'Buxoro, O''zbekiston', 'Basic', 'Suspended', '2025-02-05', '2026-02-05', 950000, 1200),
  ('Farg''ona Oshxonasi', 'Hamid Nazarov', 'hamid@fargonaosh.uz', 'Farg''ona, O''zbekiston', 'Pro', 'Active', '2024-08-12', '2025-08-12', 2200000, 2980),
  ('Andijon Milliy Taomlar', 'Noor Ali', 'noor@andijonmilliy.uz', 'Andijon, O''zbekiston', 'Basic', 'Expired', '2025-04-18', '2026-01-18', 0, 850),
  ('Ipak Yo''li Kafe', 'Zaynab Husaynova', 'zaynab@ipakyoli.uz', 'Toshkent, O''zbekiston', 'Premium', 'Active', '2025-01-22', '2026-01-22', 2900000, 3750),
  ('O''zbek Merosi Kafe', 'Rashid Popal', 'rashid@ozbekmerosi.uz', 'Toshkent, O''zbekiston', 'Pro', 'Active', '2024-12-01', '2025-12-01', 1650000, 2100),
  ('Tog'' Ko''rinishi Restoran', 'Jamila Safiyeva', 'jamila@togkorinish.uz', 'Chimyon, O''zbekiston', 'Basic', 'Active', '2025-03-10', '2026-03-10', 1100000, 1450),
  ('Pamir Bog''i', 'Abdulvohid Rahmonov', 'abdul@pamirbogi.uz', 'Toshkent, O''zbekiston', 'Pro', 'Active', '2024-10-25', '2025-10-25', 1900000, 2400);

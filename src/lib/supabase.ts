import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://skinjssrxmheezorfalc.supabase.com';
// MUHIM: Bu yerga to'g'ri anon key ni kiriting
// Supabase Dashboard > Settings > API > anon public key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNraW5qc3NyeG1oZWV6b3JmYWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.XXXXXX';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Restaurant {
  id: string;
  name: string;
  owner: string;
  owner_email: string;
  location: string;
  join_date: string;
  status: 'Active' | 'Suspended' | 'Expired';
  tier: 'Basic' | 'Pro' | 'Premium';
  expiry_date: string;
  monthly_revenue: number;
  total_orders: number;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'manager';
  created_at?: string;
}

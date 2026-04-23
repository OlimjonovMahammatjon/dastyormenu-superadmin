import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { User, Mail, Shield, Calendar, Loader2, Save } from 'lucide-react';
import { profileAPI, ApiError } from '../../lib/api';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileAPI.getProfile();
      setProfile(data);
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
      setEmail(data.email || '');
    } catch (error) {
      console.error('Error loading profile:', error);
      if (error instanceof ApiError) {
        toast.error('Profil ma\'lumotlarini yuklashda xatolik');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updatedData = await profileAPI.updateProfile({
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      
      setProfile(updatedData);
      toast.success('Profil muvaffaqiyatli yangilandi');
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error instanceof ApiError) {
        toast.error(error.message || 'Profilni yangilashda xatolik');
      } else {
        toast.error('Profilni yangilashda xatolik');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Yangi parollar mos kelmaydi');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Yangi parol kamida 8 ta belgidan iborat bo\'lishi kerak');
      return;
    }

    setIsChangingPassword(true);
    try {
      await profileAPI.changePassword(oldPassword, newPassword);
      toast.success('Parol muvaffaqiyatli o\'zgartirildi');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      if (error instanceof ApiError) {
        if (error.status === 400) {
          toast.error('Joriy parol noto\'g\'ri');
        } else {
          toast.error(error.message || 'Parolni o\'zgartirishda xatolik');
        }
      } else {
        toast.error('Parolni o\'zgartirishda xatolik');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#121828]">
        <div className="text-center space-y-3">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
          <p className="text-slate-600 dark:text-slate-400">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#121828]">
        <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] p-8">
          <div className="text-center space-y-3">
            <p className="text-slate-600 dark:text-slate-400">Profil ma\'lumotlari topilmadi</p>
            <Button onClick={loadProfile}>Qayta yuklash</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 max-w-4xl bg-slate-50 dark:bg-[#121828] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profil</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Shaxsiy ma'lumotlaringizni boshqaring</p>
      </div>

      {/* User Info Card */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 dark:text-white">Foydalanuvchi Ma'lumotlari</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Sizning asosiy ma'lumotlaringiz</CardDescription>
            </div>
            <Badge variant={profile.is_active ? 'default' : 'secondary'} className="h-6">
              {profile.is_active ? 'Faol' : 'Nofaol'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#0f1419] rounded-lg">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Username</p>
                <p className="font-medium text-slate-900 dark:text-white">{profile.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#0f1419] rounded-lg">
              <Shield className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Rol</p>
                <p className="font-medium text-slate-900 dark:text-white capitalize">{profile.role}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#0f1419] rounded-lg">
            <Calendar className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Ro'yxatdan o'tgan</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {new Date(profile.created_at).toLocaleDateString('uz-UZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Profilni Tahrirlash</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Shaxsiy ma'lumotlaringizni yangilang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-slate-900 dark:text-white">Ism</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ismingiz"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-slate-900 dark:text-white">Familiya</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Familiyangiz"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="text-slate-900 dark:text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="pl-10"
              />
            </div>
          </div>
          
          <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saqlanmoqda...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Saqlash
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Parolni O'zgartirish</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Xavfsizlik uchun parolingizni yangilang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="oldPassword" className="text-slate-900 dark:text-white">Joriy Parol</Label>
            <Input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Joriy parolingiz"
            />
          </div>
          
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          
          <div>
            <Label htmlFor="newPassword" className="text-slate-900 dark:text-white">Yangi Parol</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Yangi parol (kamida 8 ta belgi)"
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword" className="text-slate-900 dark:text-white">Yangi Parolni Tasdiqlang</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Yangi parolni qayta kiriting"
            />
          </div>
          
          <Button 
            onClick={handleChangePassword} 
            disabled={isChangingPassword}
            variant="outline"
            className="w-full"
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                O'zgartirilmoqda...
              </>
            ) : (
              'Parolni O\'zgartirish'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

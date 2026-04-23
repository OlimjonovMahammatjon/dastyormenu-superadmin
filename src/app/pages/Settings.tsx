import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

export default function Settings() {
  const handleSaveGeneral = () => {
    toast.success('Umumiy sozlamalar saqlandi');
  };

  const handleSaveNotifications = () => {
    toast.success('Bildirishnoma sozlamalari saqlandi');
  };

  const handleSaveSecurity = () => {
    toast.success('Xavfsizlik sozlamalari yangilandi');
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl bg-slate-50 dark:bg-[#121828] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sozlamalar</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Platforma sozlamalarini boshqaring</p>
      </div>

      {/* General Settings */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Umumiy Sozlamalar</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Asosiy platforma sozlamalarini sozlang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform-name" className="text-slate-900 dark:text-white">Platforma Nomi</Label>
              <Input id="platform-name" defaultValue="Dastyor" />
            </div>
            <div>
              <Label htmlFor="support-email" className="text-slate-900 dark:text-white">Yordam Email</Label>
              <Input id="support-email" type="email" defaultValue="yordam@dastyor.uz" />
            </div>
          </div>
          <div>
            <Label htmlFor="company-address" className="text-slate-900 dark:text-white">Kompaniya Manzili</Label>
            <Input id="company-address" defaultValue="Toshkent, O'zbekiston" />
          </div>
          <div>
            <Label htmlFor="contact-number" className="text-slate-900 dark:text-white">Aloqa Raqami</Label>
            <Input id="contact-number" defaultValue="+998 (90) 123 45 67" />
          </div>
          <Button onClick={handleSaveGeneral}>Umumiy Sozlamalarni Saqlash</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Bildirishnoma Sozlamalari</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Bildirishnomalarni qanday qabul qilishni boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Email Bildirishnomalar</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Muhim voqealar uchun email ogohlantirishlari</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Yangi Restoran Ro'yxatdan O'tishi</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Yangi restoran qo'shilganda xabar olish</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">To'lov Bildirishnomalari</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Muvaffaqiyatli va muvaffaqiyatsiz to'lovlar haqida</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Yordam So'rovlari Ogohlantirishlari</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Yangi yordam so'rovlari uchun bildirishnomalar</p>
            </div>
            <Switch />
          </div>
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Tizim Holati Ogohlantirishlari</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Muhim tizim xatoliklari va ogohlantirishlar</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button onClick={handleSaveNotifications}>Bildirishnoma Sozlamalarini Saqlash</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Xavfsizlik Sozlamalari</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Hisob xavfsizligi va kirish nazoratini boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Ikki Bosqichli Autentifikatsiya</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Qo'shimcha xavfsizlik qatlami qo'shing</p>
            </div>
            <Switch />
          </div>
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Sessiya Vaqti Tugashi</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">30 daqiqa faoliyatsizlikdan keyin avtomatik chiqish</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-slate-200 dark:bg-[#2a3441]" />
          <div>
            <Label htmlFor="current-password" className="text-slate-900 dark:text-white">Joriy Parol</Label>
            <Input id="current-password" type="password" placeholder="Joriy parolni kiriting" />
          </div>
          <div>
            <Label htmlFor="new-password" className="text-slate-900 dark:text-white">Yangi Parol</Label>
            <Input id="new-password" type="password" placeholder="Yangi parolni kiriting" />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="text-slate-900 dark:text-white">Yangi Parolni Tasdiqlang</Label>
            <Input id="confirm-password" type="password" placeholder="Yangi parolni tasdiqlang" />
          </div>
          <Button onClick={handleSaveSecurity}>Parolni Yangilash</Button>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card className="bg-white dark:bg-[#1a2332] border-slate-200 dark:border-[#2a3441] hover:bg-slate-50 dark:hover:bg-[#1d2c47] transition-all">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">API Sozlamalari</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">API kalitlari va integratsiyalarni boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key" className="text-slate-900 dark:text-white">Asosiy API Kaliti</Label>
            <Input
              id="api-key"
              type="password"
              defaultValue="sk_live_abc123xyz789"
              readOnly
            />
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Bu kalit platforma API ga to'liq kirish huquqini beradi</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-900 dark:text-white">Webhook Bildirishnomalari</Label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Platforma voqealari uchun webhook yuborish</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button variant="outline">API Kalitini Qayta Yaratish</Button>
        </CardContent>
      </Card>
    </div>
  );
}

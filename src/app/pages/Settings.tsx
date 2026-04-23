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
    <div className="p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sozlamalar</h1>
        <p className="text-gray-500 mt-1">Platforma sozlamalarini boshqaring</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Umumiy Sozlamalar</CardTitle>
          <CardDescription>Asosiy platforma sozlamalarini sozlang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform-name">Platforma Nomi</Label>
              <Input id="platform-name" defaultValue="Dastyor" />
            </div>
            <div>
              <Label htmlFor="support-email">Yordam Email</Label>
              <Input id="support-email" type="email" defaultValue="yordam@dastyor.uz" />
            </div>
          </div>
          <div>
            <Label htmlFor="company-address">Kompaniya Manzili</Label>
            <Input id="company-address" defaultValue="Toshkent, O'zbekiston" />
          </div>
          <div>
            <Label htmlFor="contact-number">Aloqa Raqami</Label>
            <Input id="contact-number" defaultValue="+998 (90) 123 45 67" />
          </div>
          <Button onClick={handleSaveGeneral}>Umumiy Sozlamalarni Saqlash</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Bildirishnoma Sozlamalari</CardTitle>
          <CardDescription>Bildirishnomalarni qanday qabul qilishni boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Bildirishnomalar</Label>
              <p className="text-sm text-gray-500">Muhim voqealar uchun email ogohlantirishlari</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Yangi Restoran Ro'yxatdan O'tishi</Label>
              <p className="text-sm text-gray-500">Yangi restoran qo'shilganda xabar olish</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>To'lov Bildirishnomalari</Label>
              <p className="text-sm text-gray-500">Muvaffaqiyatli va muvaffaqiyatsiz to'lovlar haqida</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Yordam So'rovlari Ogohlantirishlari</Label>
              <p className="text-sm text-gray-500">Yangi yordam so'rovlari uchun bildirishnomalar</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Tizim Holati Ogohlantirishlari</Label>
              <p className="text-sm text-gray-500">Muhim tizim xatoliklari va ogohlantirishlar</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button onClick={handleSaveNotifications}>Bildirishnoma Sozlamalarini Saqlash</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Xavfsizlik Sozlamalari</CardTitle>
          <CardDescription>Hisob xavfsizligi va kirish nazoratini boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Ikki Bosqichli Autentifikatsiya</Label>
              <p className="text-sm text-gray-500">Qo'shimcha xavfsizlik qatlami qo'shing</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Sessiya Vaqti Tugashi</Label>
              <p className="text-sm text-gray-500">30 daqiqa faoliyatsizlikdan keyin avtomatik chiqish</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div>
            <Label htmlFor="current-password">Joriy Parol</Label>
            <Input id="current-password" type="password" placeholder="Joriy parolni kiriting" />
          </div>
          <div>
            <Label htmlFor="new-password">Yangi Parol</Label>
            <Input id="new-password" type="password" placeholder="Yangi parolni kiriting" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Yangi Parolni Tasdiqlang</Label>
            <Input id="confirm-password" type="password" placeholder="Yangi parolni tasdiqlang" />
          </div>
          <Button onClick={handleSaveSecurity}>Parolni Yangilash</Button>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle>API Sozlamalari</CardTitle>
          <CardDescription>API kalitlari va integratsiyalarni boshqaring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">Asosiy API Kaliti</Label>
            <Input
              id="api-key"
              type="password"
              defaultValue="sk_live_abc123xyz789"
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">Bu kalit platforma API ga to'liq kirish huquqini beradi</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Webhook Bildirishnomalari</Label>
              <p className="text-sm text-gray-500">Platforma voqealari uchun webhook yuborish</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button variant="outline">API Kalitini Qayta Yaratish</Button>
        </CardContent>
      </Card>
    </div>
  );
}

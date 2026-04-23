import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

export default function Settings() {
  const handleSaveGeneral = () => {
    toast.success('General settings saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved successfully');
  };

  const handleSaveSecurity = () => {
    toast.success('Security settings updated successfully');
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your platform configuration</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure basic platform settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="Dastyor" />
            </div>
            <div>
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" type="email" defaultValue="support@dastyor.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="company-address">Company Address</Label>
            <Input id="company-address" defaultValue="Kabul, Afghanistan" />
          </div>
          <div>
            <Label htmlFor="contact-number">Contact Number</Label>
            <Input id="contact-number" defaultValue="+93 (0) 700 123 456" />
          </div>
          <Button onClick={handleSaveGeneral}>Save General Settings</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive email alerts for important events</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>New Restaurant Registration</Label>
              <p className="text-sm text-gray-500">Get notified when a new restaurant joins</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Payment Notifications</Label>
              <p className="text-sm text-gray-500">Alerts for successful and failed payments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Support Ticket Alerts</Label>
              <p className="text-sm text-gray-500">Notifications for new support tickets</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>System Health Alerts</Label>
              <p className="text-sm text-gray-500">Critical system errors and warnings</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage account security and access control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Session Timeout</Label>
              <p className="text-sm text-gray-500">Auto logout after 30 minutes of inactivity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button onClick={handleSaveSecurity}>Update Password</Button>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage API keys and integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">Master API Key</Label>
            <Input
              id="api-key"
              type="password"
              defaultValue="sk_live_abc123xyz789"
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">This key grants full access to your platform API</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Webhook Notifications</Label>
              <p className="text-sm text-gray-500">Send webhooks for platform events</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button variant="outline">Regenerate API Key</Button>
        </CardContent>
      </Card>
    </div>
  );
}

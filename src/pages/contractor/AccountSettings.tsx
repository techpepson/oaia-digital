
// OAIA Digital - Contractor Account Settings
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import ContractorSidebar from '@/components/ContractorSidebar';
import { 
  Menu, 
  X, 
  User, 
  Building, 
  CreditCard, 
  Key, 
  Save,
  Edit,
  Upload
} from 'lucide-react';

const AccountSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'ABC Construction Ltd',
    contactPerson: 'John Doe',
    email: 'john@abcconstruction.com',
    phone: '+254 712 345 678',
    address: '123 Business Ave, Nairobi',
    taxPin: 'P051234567A',
    bankName: 'KCB Bank',
    accountNumber: '1234567890',
    accountName: 'ABC Construction Ltd',
    swiftCode: 'KCBLKENX'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Saving account settings:', formData);
  };

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <ContractorSidebar isCollapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
              <Link to="/">
                <Logo showText={false} />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">Welcome back, John Doe</span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-oaia-gray mt-1">Manage your profile, bank details, and security settings</p>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-oaia-blue hover:bg-oaia-blue/90"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Company Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Update your company details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="taxPin">Tax PIN</Label>
                  <Input
                    id="taxPin"
                    value={formData.taxPin}
                    onChange={(e) => handleInputChange('taxPin', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-32 h-32 bg-oaia-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-16 w-16 text-oaia-blue" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </CardContent>
            </Card>

            {/* Bank Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Bank Information
                </CardTitle>
                <CardDescription>
                  Update your banking details for payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => handleInputChange('accountName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="swiftCode">SWIFT Code</Label>
                    <Input
                      id="swiftCode"
                      value={formData.swiftCode}
                      onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-oaia-blue flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Setup 2FA
                </Button>
                <Button variant="outline" className="w-full">
                  Digital Signature
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

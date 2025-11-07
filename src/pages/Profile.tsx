import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, ShoppingBag, Heart, MapPin, Mail, Phone, Clock, Edit, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api/client";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  addresses?: Array<{
    id: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>;
  orders?: Array<{
    id: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
  }>;
  wishlist?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    addedAt: string;
  }>;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/auth/me');
        // Backend returns { success: true, user: { ... } }
        const data = response.data?.user || response.data;

        setProfileData(data);
        setFormData({
          name: data?.name || '',
          email: data?.email || '',
          phone: data?.phone || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to load profile data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update active tab based on URL
  useEffect(() => {
    const tab = location.hash.replace('#', '') || 'overview';
    setActiveTab(tab);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Backend exposes PATCH /api/auth/me
      const response = await apiClient.patch('/auth/me', formData);
      const updated = response.data?.user || response.data;

      setProfileData(updated);
      setFormData({
        name: updated?.name || '',
        email: updated?.email || '',
        phone: updated?.phone || '',
      });
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Change password state & handler
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ title: 'Error', description: 'Please fill all password fields', variant: 'destructive' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'New passwords do not match', variant: 'destructive' });
      return;
    }

    try {
      setPasswordLoading(true);
      const response = await apiClient.patch('/auth/password', { currentPassword, newPassword });
      // expecting { success: true }
      toast({ title: 'Success', description: response.data?.message || 'Password updated successfully' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to change password', variant: 'destructive' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-4xl flex justify-center">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={(value) => navigate(`#${value}`, { replace: true })} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-1/4 space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{profileData?.name || user?.email?.split('@')[0]}</h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        {profileData?.createdAt && (
                          <div className="flex items-center justify-center mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Member since {new Date(profileData.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <TabsList className="grid w-full mt-8">
                      <TabsTrigger value="overview" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="orders" className="justify-start">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        My Orders
                      </TabsTrigger>
                      <TabsTrigger value="wishlist" className="justify-start">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </TabsTrigger>
                      <TabsTrigger value="addresses" className="justify-start">
                        <MapPin className="mr-2 h-4 w-4" />
                        Addresses
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.1a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Settings
                      </TabsTrigger>
                      <TabsTrigger value="password" className="justify-start">
                        <Lock className="mr-2 h-4 w-4" />
                        Password
                      </TabsTrigger>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive hover:text-destructive mt-4"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </TabsList>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/4">
                <TabsContent value="overview" className="space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Account Overview</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => navigate('#settings')}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-medium">{profileData?.name || 'Not provided'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{user?.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{profileData?.phone || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Account Details</h3>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Member Since</p>
                              <p className="font-medium">
                                {profileData?.createdAt ? (
                                  new Date(profileData.createdAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })
                                ) : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Account Status</p>
                              <div className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                <span className="font-medium">Active</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => navigate('#orders')}
                        >
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {profileData?.orders && profileData.orders.length > 0 ? (
                        <div className="space-y-4">
                          {profileData.orders.slice(0, 3).map((order) => (
                            <div key={order.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div>
                                  <p className="font-medium">Order #{order.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.date).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    order.status === 'delivered' 
                                      ? 'bg-green-100 text-green-800' 
                                      : order.status === 'cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                          <p className="text-muted-foreground">No orders yet</p>
                          <Button variant="outline" className="mt-4" onClick={() => navigate('/shop')}>
                            Start Shopping
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle>My Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {profileData?.orders && profileData.orders.length > 0 ? (
                        <div className="space-y-6">
                          {profileData.orders.map((order) => (
                            <div key={order.id} className="border border-border/50 rounded-lg overflow-hidden">
                              <div className="bg-muted/50 px-6 py-3 flex justify-between items-center border-b border-border/50">
                                <div>
                                  <span className="font-medium">Order #{order.id}</span>
                                  <span className="text-sm text-muted-foreground ml-4">
                                    Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    order.status === 'delivered' 
                                      ? 'bg-green-100 text-green-800' 
                                      : order.status === 'cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="space-y-4">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center">
                                      <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-16 w-16 object-cover rounded-md"
                                      />
                                      <div className="ml-4 flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                      </div>
                                      <p className="font-medium">₹{item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                                  <p className="text-sm text-muted-foreground">
                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                  </p>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="text-lg font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                          <h3 className="text-lg font-medium">No orders yet</h3>
                          <p className="text-muted-foreground mt-2">You haven't placed any orders yet.</p>
                          <Button className="mt-6" onClick={() => navigate('/shop')}>
                            Start Shopping
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Wishlist Tab */}
                <TabsContent value="wishlist" className="space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {profileData?.wishlist && profileData.wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {profileData.wishlist.map((item) => (
                            <div key={item.id} className="border border-border/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <div className="aspect-square bg-muted/50 relative">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                                  onClick={() => {}}
                                >
                                  <Heart className="h-4 w-4 fill-current text-destructive" />
                                </Button>
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-lg font-medium mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                                <div className="mt-4 flex justify-between items-center">
                                  <Button variant="outline" size="sm" onClick={() => {}}>
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Heart className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                          <h3 className="text-lg font-medium">Your wishlist is empty</h3>
                          <p className="text-muted-foreground mt-2">Save items you love for easy access later.</p>
                          <Button className="mt-6" onClick={() => navigate('/shop')}>
                            Browse Products
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Addresses Tab */}
                <TabsContent value="addresses" className="space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Saved Addresses</CardTitle>
                        <Button size="sm" onClick={() => {}}>
                          Add New Address
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {profileData?.addresses && profileData.addresses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {profileData.addresses.map((address) => (
                            <div 
                              key={address.id} 
                              className={`border rounded-lg p-4 relative ${
                                address.isDefault ? 'border-primary' : 'border-border/50'
                              }`}
                            >
                              {address.isDefault && (
                                <span className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                              <div className="space-y-1">
                                <p className="font-medium">
                                  {address.street}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                              </div>
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm" className="text-xs">
                                  Edit
                                </Button>
                                {!address.isDefault && (
                                  <Button variant="ghost" size="sm" className="text-xs">
                                    Remove
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <MapPin className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
                          <h3 className="text-lg font-medium">No saved addresses</h3>
                          <p className="text-muted-foreground mt-2">Add an address for faster checkout.</p>
                          <Button className="mt-6" onClick={() => {}}>
                            Add Address
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Update your account information and preferences
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                disabled
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                name="phone" 
                                type="tel" 
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleCancel}
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={loading}
                          >
                            {loading ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                                  name="currentPassword" 
                                  type="password" 
                                  value={currentPassword}
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                  placeholder="Enter your current password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                                  name="newPassword" 
                                  type="password" 
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  placeholder="Enter your new password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                                  name="confirmPassword" 
                                  type="password" 
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  placeholder="Confirm your new password"
                          />
                        </div>
                        <div className="flex justify-end">
                                <Button type="submit" disabled={passwordLoading}>
                                  {passwordLoading ? 'Updating...' : 'Update Password'}
                                </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Add a default export for the Profile component
export default Profile;

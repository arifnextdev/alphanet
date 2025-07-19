'use client';

import { Camera, LoaderIcon, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '@/lib/services/usersApi';
import { RootState } from '@/lib/store';
import { formateDate } from '@/lib/utils';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Orders from './Orders';
import Transection from './Transection';

export default function CustomerProfile({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const authuser = useSelector((state: RootState) => state.auth.user);
  if (!authuser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg mb-6">
            You must be logged in to view this page.
          </p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>
        <h1 className="text-2xl font-bold">
          Please log in to view your profile
        </h1>
      </div>
    );
  }

  const { data, isLoading } = useGetUserByIdQuery(id as string);
  const [updateUser, { isLoading: isUpdating, data: updatedUser }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.userInfo?.street ?? '',
        city: data.userInfo?.city ?? '',
        state: data.userInfo?.state ?? '',
        country: data.userInfo?.country ?? '',
        postalCode: data.userInfo?.postalCode ?? '',
      });
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    updateUser({
      id: data.id,
      data: {
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      },
    })
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully');
      })
      .catch((error) => {
        toast.error('Failed to update profile');
        console.error('Error updating profile:', error);
      })
      .finally(() => {
        // Reset form data after successful update
        setIsEditing(false);
      });
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto px-4 py-6 max-w-6xl lg:max-w-[80vw]">
        {/* Profile Header */}
        <Card className="  mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={data.avatar || '/placeholder.svg'} />
                  <AvatarFallback className="text-2xl ">
                    {data.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full "
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold ">{data.name}</h2>
                    <p className="text-gray-400">{data.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-green-600 hover:bg-green-700">
                        {data.status}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Member since{' '}
                        {data.createdAt && formateDate(data.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className=" "
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isUpdating ? (
                            <LoaderIcon className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Cards */}
        {isEditing && (
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <Card className="">
              <CardHeader>
                <CardTitle className="">Basic Information</CardTitle>
                <CardDescription className="">
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName" className="">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className=""
                    />
                    {/* {customerProfile.emailVerified ? (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unverified</Badge>
                    )} */}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="">
                    Phone Number
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="phone"
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className=""
                    />
                    {/* {customerProfile.phoneVerified ? (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unverified</Badge>
                    )} */}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle className="">Address Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Your billing and contact address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="street" className="">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) =>
                      handleInputChange('street', e.target.value)
                    }
                    className=""
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city" className="">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange('city', e.target.value)
                      }
                      className=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state" className="">
                      State/Province
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange('state', e.target.value)
                      }
                      className=""
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="country" className="">
                      Country
                    </Label>
                    <Select>
                      <SelectTrigger className="">
                        <SelectValue placeholder={formData.country} />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="postalCode" className="">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange('postalCode', e.target.value)
                      }
                      className=""
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-blue-500 data-[state=active]:"
            >
              Order History
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-primary"
            >
              Payment History
            </TabsTrigger>
          </TabsList>

          {/* Order History Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Orders id={id} />
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Transection id={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

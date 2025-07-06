'use client';

import { Camera, Eye, LoaderIcon, Save, Search } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Order,
  Payment,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '@/lib/services/usersApi';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { formateDate } from '@/lib/utils';
import { toast } from 'sonner';

// Static data - replace with API calls
const customerProfile = {
  id: 'cust_123456789',
  name: 'Md Ariful Islam',
  email: 'ariful@example.com',
  phone: '+880 1712-345678',
  avatar: '/placeholder.svg?height=100&width=100',
  joinDate: 'January 15, 2023',
  lastLogin: '2 hours ago',
  accountStatus: 'Active',
  emailVerified: true,
  phoneVerified: false,
  address: {
    street: '123 Main Street',
    city: 'Dhaka',
    state: 'Dhaka Division',
    country: 'Bangladesh',
    postalCode: '1000',
  },
};

// const orders = [
//   {
//     id: 'e410ccdf-669b-4aff-9375-d027f2417b7b',
//     product: 'Linux Server VPS',
//     amount: '$150.00',
//     status: 'Pending',
//     date: '7/20/2025',
//     expiresAt: '7/20/2026',
//   },
//   {
//     id: '1307059d-d74f-4c01-8482-adf533345dae',
//     product: 'Windows Server VPS',
//     amount: '$150.00',
//     status: 'Pending',
//     date: '7/20/2025',
//     expiresAt: '7/20/2026',
//   },
//   {
//     id: 'e40bf3c5-6415-490a-867e-a0adab02d301',
//     product: 'Linux Server VPS',
//     amount: '$120.00',
//     status: 'Completed',
//     date: '7/15/2025',
//     expiresAt: '7/15/2026',
//   },
//   {
//     id: '4b9a4502-d79a-44dc-8de8-c22e4078f92f',
//     product: '2GB ASP.NET Hosting',
//     amount: '$25.00',
//     status: 'Completed',
//     date: '7/10/2025',
//     expiresAt: '7/10/2026',
//   },
//   {
//     id: '566ba8d7-3cae-4d1f-b7da-d8bb404d2a4a',
//     product: 'Windows Server Pro',
//     amount: '$200.00',
//     status: 'Cancelled',
//     date: '7/05/2025',
//     expiresAt: '—',
//   },
// ];

// const transactions = [
//   {
//     id: 1,
//     product: 'Windows Server',
//     method: 'CUSTOM',
//     amount: '$150.00',
//     subTotal: '$132.00',
//     status: 'DUE',
//     date: 'June 20th, 2025',
//     billingCycle: 'MONTHLY',
//     expiresAt: 'July 20th, 2025',
//     invoiceId: 'INV-2025-001',
//   },
//   {
//     id: 2,
//     product: 'Linux Server',
//     method: 'CUSTOM',
//     amount: '$120.00',
//     subTotal: '$108.00',
//     status: 'PAID',
//     date: 'June 20th, 2025',
//     billingCycle: 'MONTHLY',
//     expiresAt: 'July 20th, 2025',
//     invoiceId: 'INV-2025-002',
//   },
//   {
//     id: 3,
//     product: 'Windows Server',
//     method: 'CUSTOM',
//     amount: '$500.00',
//     subTotal: '$495.00',
//     status: 'DUE',
//     date: 'June 20th, 2025',
//     billingCycle: 'MONTHLY',
//     expiresAt: 'July 20th, 2025',
//     invoiceId: 'INV-2025-003',
//   },
//   {
//     id: 4,
//     product: '2GB ASP.NET Hosting',
//     method: 'CUSTOM',
//     amount: '$25.00',
//     subTotal: '$23.00',
//     status: 'PAID',
//     date: 'May 15th, 2025',
//     billingCycle: 'MONTHLY',
//     expiresAt: 'June 15th, 2025',
//     invoiceId: 'INV-2025-004',
//   },
//   {
//     id: 5,
//     product: 'Linux Server',
//     method: 'CUSTOM',
//     amount: '$120.00',
//     subTotal: '$108.00',
//     status: 'PAID',
//     date: 'May 20th, 2025',
//     billingCycle: 'MONTHLY',
//     expiresAt: 'June 20th, 2025',
//     invoiceId: 'INV-2025-005',
//   },
// ];

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
  const { data, isLoading, isError } = useGetUserByIdQuery(id as string);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        street: data.userInfo?.street || '',
        city: data.userInfo?.city || '',
        state: data.userInfo?.state || '',
        country: data.userInfo?.country || '',
        postalCode: data.userInfo?.postalCode || '',
      });
    }
  }, [data]);

  if (!authuser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg mb-6">
            You must be logged in to view this page.
          </p>
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
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

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error loading profile.</h1>
          <p className="text-lg mb-6">Please try again later.</p>
        </div>
      </div>
    );
  }

  const orders = data.orders || [];
  const transactions = data.payments || [];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    updateUser({
      id: data.id,
      name: formData.name,
      phone: formData.phone,
      userInfo: {
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
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error('Failed to update profile');
        console.error('Error updating profile:', error);
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
                          {isUpdating ? <LoaderIcon className='h-4 w-4 animate-spin'/> : <Save className="h-4 w-4 mr-2" />}
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold ">Order History</h2>
                <p className="">View and track your orders</p>
              </div>
            </div>

            <Card className="">
              <CardContent className="p-3">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead className="">Order No</TableHead>
                        <TableHead className="">Product Name</TableHead>
                        <TableHead className="">Type</TableHead>
                        <TableHead className="">Amount</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Paid At</TableHead>
                        <TableHead className="">Expires At</TableHead>
                        <TableHead className="">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow key={order.id} className="py-5">
                          <TableCell className="font-mono text-sm ">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-mono text-sm ">
                            {order.product.name.substring(0, 20)}{' '}
                            {order.product.name.length > 20 ? '...' : ''}
                          </TableCell>
                          <TableCell className="">
                            {order.product.type}
                          </TableCell>
                          <TableCell className="">{order.amount}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                order.status === 'Completed'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : order.status === 'Pending'
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="">
                            {order.paidAt ? formateDate(order.paidAt) : '—'}
                          </TableCell>
                          <TableCell
                            className={`${order.expiresAt ? (order.expiresAt < new Date() ? 'text-red-600' : '') : ''}`}
                          >
                            {order.expiresAt
                              ? formateDate(String(order.expiresAt))
                              : '—'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2">
                              <Link
                                href={`/users/orders/${order.id}`}
                                className="hover:bg-gray-700"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold ">Payment History</h2>
                <p className="">View your payment and billing history</p>
              </div>
              <div className="flex gap-2">
                <Select
                  defaultValue="last30days"
                  onValueChange={(value) => {
                    // Handle date range change
                    console.log('Selected date range:', value);
                  }}
                >
                  <SelectTrigger className="w-36  ">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="">
              <CardContent className="p-3">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="">Payment No</TableHead>
                        <TableHead className="">Transaction ID</TableHead>
                        <TableHead className="">Method</TableHead>
                        <TableHead className="">Amount</TableHead>
                        <TableHead className="">Sub Total</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Paid At</TableHead>

                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction, i) => (
                        <TableRow key={transaction.id} className="">
                          <TableCell className="font-mono text-sm ">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-mono text-sm ">
                            {transaction.transId
                              ? transaction.transId
                              : transaction.id}
                          </TableCell>
                          <TableCell className="">
                            {transaction.method}
                          </TableCell>
                          <TableCell className="">
                            {transaction.amount}
                          </TableCell>
                          <TableCell className="">
                            {transaction.subtotal}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                transaction.status === 'PAID'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-orange-600 hover:bg-orange-700 text-white'
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="">
                            {transaction.paidAt
                              ? formateDate(transaction.paidAt)
                              : '—'}
                          </TableCell>

                          <TableCell className="text-right">
                            <Link
                              href={`/users/orders/invoice/${transaction.id}`}
                              className="bg-blue-600 hover:bg-blue-700 border-blue-600 px-2 py-1 rounded-xl"
                            >
                              View Invoice
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

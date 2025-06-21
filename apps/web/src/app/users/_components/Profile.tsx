'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Camera,
  ChevronDown,
  Download,
  Eye,
  Save,
  Search,
} from 'lucide-react';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Order, Payment, useGetUserByIdQuery } from '@/lib/services/usersApi';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([]); // Placeholder for orders data
  const [transactions, setTransactions] = useState<Payment[]>([]); // Placeholder for transactions data

  const authuser = useSelector((state: RootState) => state.auth.user);
  if (!authuser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
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

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
      setTransactions(data.payments);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    name: customerProfile.name,
    email: customerProfile.email,
    phone: customerProfile.phone,
    street: customerProfile.address.street,
    city: customerProfile.address.city,
    state: customerProfile.address.state,
    country: customerProfile.address.country,
    postalCode: customerProfile.address.postalCode,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur">
        <div className="flex h-16 items-center px-4 lg:px-6">
          <Link href="/" className="mr-4 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Profile Settings</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={customerProfile.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback className="bg-blue-600">
                      {customerProfile.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-800 border-gray-700"
              >
                <DropdownMenuLabel className="text-gray-200">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 text-gray-200">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 text-gray-200">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 text-gray-200">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl lg:max-w-[80vw]">
        {/* Profile Header */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={customerProfile.avatar || '/placeholder.svg'}
                  />
                  <AvatarFallback className="text-2xl bg-blue-600">
                    {customerProfile.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {customerProfile.name}
                    </h2>
                    <p className="text-gray-400">{customerProfile.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-green-600 hover:bg-green-700">
                        {customerProfile.accountStatus}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Member since {customerProfile.joinDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="border-gray-600 text-gray-200 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Save className="mr-2 h-4 w-4" />
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-200">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.name.split(' ')[0]}
                      onChange={(e) =>
                        handleInputChange(
                          'name',
                          `${e.target.value} ${formData.name.split(' ')[1] || ''}`,
                        )
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-200">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.name.split(' ')[1] || ''}
                      onChange={(e) =>
                        handleInputChange(
                          'name',
                          `${formData.name.split(' ')[0]} ${e.target.value}`,
                        )
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-200">
                    Email Address
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    {customerProfile.emailVerified ? (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unverified</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-200">
                    Phone Number
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    {customerProfile.phoneVerified ? (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unverified</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Address Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your billing and contact address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street" className="text-gray-200">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) =>
                      handleInputChange('street', e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city" className="text-gray-200">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange('city', e.target.value)
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-200">
                      State/Province
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange('state', e.target.value)
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="country" className="text-gray-200">
                      Country
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder={formData.country} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-200">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange('postalCode', e.target.value)
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-6">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Order History
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Payment History
            </TabsTrigger>
          </TabsList>

          {/* Order History Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Order History</h2>
                <p className="text-gray-400">View and track your orders</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-3">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">
                          Order ID
                        </TableHead>
                        <TableHead className="text-gray-300">
                          Product Name
                        </TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Amount</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">
                          Expires At
                        </TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="border-gray-700">
                          <TableCell className="font-mono text-sm text-gray-300">
                            {order.id.substring(0, 8)}...
                          </TableCell>
                          <TableCell className="font-mono text-sm text-gray-300">
                            {order.product.name.substring(0, 8)}...
                          </TableCell>
                          <TableCell className="text-white">
                            {order.product.type}
                          </TableCell>
                          <TableCell className="text-white">
                            {order.amount}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                order.status === 'Completed'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : order.status === 'Pending'
                                    ? 'bg-orange-600 hover:bg-orange-700'
                                    : 'bg-red-600 hover:bg-red-700'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {order.paidAt ? order.paidAt : '—'}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {order.expiresAt}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-700"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-700"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
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
                <h2 className="text-2xl font-bold text-white">
                  Payment History
                </h2>
                <p className="text-gray-400">
                  View your payment and billing history
                </p>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="last30days">
                  <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-24 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="due">Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-3">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Method</TableHead>
                        <TableHead className="text-gray-300">Amount</TableHead>
                        <TableHead className="text-gray-300">
                          Sub Total
                        </TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>

                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          className="border-gray-700"
                        >
                          <TableCell className="text-gray-300">
                            {transaction.method}
                          </TableCell>
                          <TableCell className="text-white">
                            {transaction.amount}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {transaction.subtotal}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                transaction.status === 'PAID'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-orange-600 hover:bg-orange-700'
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {transaction.paidAt}
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                            >
                              View Invoice
                            </Button>
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

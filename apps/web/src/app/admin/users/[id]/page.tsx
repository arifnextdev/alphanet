'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useGetUserByIdQuery } from '@/lib/services/usersApi'; // Update this path as needed
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const { data, isLoading } = useGetUserByIdQuery(id as string);

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  const {
    name,
    email,
    roles,
    status,
    createdAt,
    updatedAt,
    orders,
    loginHistories,
  } = user;

  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>User Info</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Email:</strong> {email}
          </div>
          <div>
            <strong>Status:</strong>
            <Badge
              className={status === 'ACTIVE' ? 'bg-green-600' : 'bg-gray-600'}
            >
              {status}
            </Badge>
          </div>
          <div>
            <strong>Roles:</strong> {roles?.join(', ')}
          </div>
          <div>
            <strong>Created:</strong> {format(new Date(createdAt), 'PPPpp')}
          </div>
          <div>
            <strong>Updated:</strong> {format(new Date(updatedAt), 'PPPpp')}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <div className="">
          {/* Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid At</TableHead>
                    <TableHead>Expires At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.length > 0 ? (
                    orders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.domainName}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              order.status === 'PAID'
                                ? 'bg-green-600'
                                : order.status === 'PENDING'
                                  ? 'bg-yellow-600'
                                  : 'bg-secondary-foreground'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${order.amount}</TableCell>
                        <TableCell>
                          {order.paidAt
                            ? format(new Date(order.paidAt), 'PPP')
                            : '—'}
                        </TableCell>
                        <TableCell>
                          {order.expiresAt
                            ? format(new Date(order.expiresAt), 'PPP')
                            : '—'}
                        </TableCell>
                        <TableCell>
                          <Link href={`/admin/orders/${order.id}`}>
                            <EyeIcon className='w-4 h-4 hover:text-primary'/>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="">
          {/* Login History */}
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attempt</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>User Agent</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginHistories?.length > 0 ? (
                    loginHistories.map((login: any) => (
                      <TableRow key={login.id}>
                        <TableCell>
                          <Badge
                            className={
                              login.attempt === 'FAILED'
                                ? 'bg-red-600'
                                : 'bg-green-600'
                            }
                          >
                            {login.attempt}
                          </Badge>
                        </TableCell>
                        <TableCell>{login.ip}</TableCell>
                        <TableCell>{login.country || 'N/A'}</TableCell>
                        <TableCell className="truncate max-w-xs">
                          {login.userAgent}
                        </TableCell>
                        <TableCell>
                          {format(new Date(login.createdAt), 'PPPpp')}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No login history found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

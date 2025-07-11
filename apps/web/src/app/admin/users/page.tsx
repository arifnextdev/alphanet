'use client';

import {
  useChangeUserRoleMutation,
  useGetUsersQuery,
  useToggleUserStatusMutation,
} from '@/lib/services/usersApi';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useGetUsersQuery({
    page,
    limit: pageSize,
    search: query,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    role: roleFilter !== 'ALL' ? roleFilter : undefined,
  });
  const [toggleUserStatus] = useToggleUserStatusMutation();
  const [changeUserRole] = useChangeUserRoleMutation();

  const users = data?.users || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  // Handler for changing role
  const handleRoleChange = (userId: string, newRole: string) => {
    changeUserRole({ id: userId, roles: [newRole] });
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    toggleUserStatus({ id: userId, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle>User List</CardTitle>
          <div className="flex space-x-3">
            <Input
              type="search"
              placeholder="Search by name or email..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1); // reset to first page when searching
              }}
              className="max-w-sm"
            />

            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1); // reset to first page when filtering
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="BANNED">BANNED</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={roleFilter}
              onValueChange={(v) => {
                setRoleFilter(v);
                setPage(1); // reset to first page when filtering
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                  <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading users</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="group">
                    <TableCell>{user.name || '—'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.roles[0] || ''}
                        onValueChange={(role) =>
                          handleRoleChange(user.id, role)
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                            <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                            <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                            {/* Add more roles as needed */}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{user.provider}</TableCell>
                    <TableCell>
                      <Select
                        value={user.status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(user.id, newStatus)
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right space-x-2 flex items-center justify-end">
                      <Link href={`/admin/users/${user.id}`}>
                        <EyeIcon className="w-4 h-4 text-blue-500" />
                      </Link>

                      {/* Status update dropdown */}
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="space-x-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="default"
                className="cursor-pointer dark:text-white"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

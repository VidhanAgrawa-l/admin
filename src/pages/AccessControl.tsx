import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Eye,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Define the Recruiter type
type Recruiter = {
  id: number;
  name: string;
  profileImage: string;
  bidsCount: number;
  chatsInitiated: number;
  candidatesListed: number;
  successfulTransactions: number;
  suspended: boolean;
};

const AccessControl: React.FC = () => {
  const navigate = useNavigate();

  // Sample data for recruiters - you would fetch this from your API
  const [recruiters, setRecruiters] = useState<Recruiter[]>([
    {
      id: 1,
      name: "Jane Smith",
      profileImage: "/api/placeholder/64/64",
      bidsCount: 145,
      chatsInitiated: 98,
      candidatesListed: 72,
      successfulTransactions: 34,
      suspended: false,
    },
    {
      id: 2,
      name: "John Doe",
      profileImage: "/api/placeholder/64/64",
      bidsCount: 210,
      chatsInitiated: 154,
      candidatesListed: 126,
      successfulTransactions: 65,
      suspended: false,
    },
    {
      id: 3,
      name: "Alex Johnson",
      profileImage: "/api/placeholder/64/64",
      bidsCount: 89,
      chatsInitiated: 62,
      candidatesListed: 45,
      successfulTransactions: 19,
      suspended: true,
    },
    {
      id: 4,
      name: "Sarah Williams",
      profileImage: "/api/placeholder/64/64",
      bidsCount: 178,
      chatsInitiated: 120,
      candidatesListed: 88,
      successfulTransactions: 41,
      suspended: false,
    },
  ]);

  // Function to handle viewing a recruiter's profile
  const handleViewProfile = (recruiterId: number) => {
    console.log(`Viewing profile of recruiter with ID: ${recruiterId}`);
    // Navigate to the detailed profile page with the recruiter ID
    navigate(`/recruiters/${recruiterId}`);
  };

  // Function to handle suspending/unsuspending a recruiter with toast notification
  const handleToggleSuspension = (recruiterId: number) => {
    const recruiter = recruiters.find((r) => r.id === recruiterId);

    // Update the recruiters state
    setRecruiters(
      recruiters.map((recruiter) =>
        recruiter.id === recruiterId
          ? { ...recruiter, suspended: !recruiter.suspended }
          : recruiter
      )
    );

    // Show toast notification based on the action
    if (recruiter) {
      const isSuspending = !recruiter.suspended;

      toast({
        title: isSuspending ? "Account Suspended" : "Account Activated",
        description: isSuspending
          ? `${recruiter.name}'s account has been suspended. They cannot access the platform until reactivated.`
          : `${recruiter.name}'s account has been reactivated. They now have full platform access.`,
        variant: isSuspending ? "destructive" : "default",
        duration: 3000,
      });
    }
  };

  // Global filter state
  const [globalFilter, setGlobalFilter] = useState("");

  // Define columns for the data table
  const columns: ColumnDef<Recruiter>[] = [
    {
      accessorKey: "name",
      header: "Recruiter",
      cell: ({ row }) => {
        const recruiter = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={recruiter.profileImage} alt={recruiter.name} />
              <AvatarFallback>{recruiter.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{recruiter.name}</p>
              <p className="text-xs text-muted-foreground">
                ID: {recruiter.id}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "bidsCount",
      header: () => <div className="text-center">Bids</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("bidsCount")}
          </div>
        );
      },
    },
    {
      accessorKey: "chatsInitiated",
      header: () => <div className="text-center">Chats</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("chatsInitiated")}</div>
        );
      },
    },
    {
      accessorKey: "candidatesListed",
      header: () => <div className="text-center">Candidates</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("candidatesListed")}</div>
        );
      },
    },
    {
      accessorKey: "successfulTransactions",
      header: () => <div className="text-center">Transactions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.getValue("successfulTransactions")}
          </div>
        );
      },
    },
    {
      accessorKey: "suspended",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const suspended = row.getValue("suspended");
        return (
          <div className="text-center">
            <Badge
              variant={suspended ? "destructive" : "success"}
              className="gap-1"
            >
              {suspended ? (
                <>
                  <AlertCircle className="h-3 w-3" />
                  Suspended
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3" />
                  Active
                </>
              )}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const recruiter = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleViewProfile(recruiter.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToggleSuspension(recruiter.id)}
                  className={
                    recruiter.suspended ? "text-green-600" : "text-red-600"
                  }
                >
                  {recruiter.suspended ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Unsuspend Account
                    </>
                  ) : (
                    <>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Suspend Account
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // Initialize the table
  const table = useReactTable({
    data: recruiters,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-6">
      {/* Toast component to show notifications */}
      <Toaster />

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">App Metrics</CardTitle>
          <CardDescription>
            Manage recruiter accounts, view stats, and control platform access
          </CardDescription>
          <div className="flex items-center py-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recruiters..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={row.original.suspended ? "bg-red-50" : ""}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No recruiters found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControl;

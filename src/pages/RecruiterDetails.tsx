import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  Users,
  CheckCircle,
  MessageSquare,
  User,
  Mail,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define the valid status types
type StatusType = "Available" | "Sold";

const RecruiterDetails = () => {
  // Sample data - replace with your actual data
  const recruiterData = {
    name: "Jane Smith",
    email: "jane.smith@recruit.co",
    role: "Senior Recruiter",
    avatar: "/api/placeholder/64/64",
    performance: {
      bidsCount: 145,
      chatsInitiated: 98,
      candidatesListed: 72,
      successfulTransactions: 34,
    },
    completionRate: 78,
  };

  // Sample data for tables
  const bidsData = [
    {
      id: "BID-7829",
      position: "Senior Developer",
      company: "TechCorp",
      date: "2025-04-01",
      status: "Available" as StatusType,
      amount: "$2,400",
    },
    {
      id: "BID-7823",
      position: "UX Designer",
      company: "DesignHub",
      date: "2025-03-29",
      status: "Sold" as StatusType,
      amount: "$1,800",
    },
    {
      id: "BID-7819",
      position: "Product Manager",
      company: "InnovateCo",
      date: "2025-03-28",
      status: "Available" as StatusType,
      amount: "$3,200",
    },
    {
      id: "BID-7814",
      position: "Data Scientist",
      company: "DataMinds",
      date: "2025-03-25",
      status: "Sold" as StatusType,
      amount: "$2,600",
    },
    {
      id: "BID-7809",
      position: "Backend Engineer",
      company: "CloudSys",
      date: "2025-03-22",
      status: "Sold" as StatusType,
      amount: "$2,100",
    },
  ];

  const chatsData = [
    {
      id: "CHT-4532",
      candidate: "Alex Johnson",
      position: "Senior Developer",
      lastMessage: "2025-04-02",
      status: "Closed" as StatusType,
    },
    {
      id: "CHT-4527",
      candidate: "Maria Garcia",
      position: "UX Designer",
      lastMessage: "2025-04-01",
      status: "Pending" as StatusType,
    },
    {
      id: "CHT-4521",
      candidate: "David Kim",
      position: "Product Manager",
      lastMessage: "2025-03-29",
      status: "Pending" as StatusType,
    },
    {
      id: "CHT-4518",
      candidate: "Sarah Williams",
      position: "Data Scientist",
      lastMessage: "2025-03-27",
      status: "Closed" as StatusType,
    },
    {
      id: "CHT-4512",
      candidate: "James Brown",
      position: "Backend Engineer",
      lastMessage: "2025-03-25",
      status: "Closed" as StatusType,
    },
  ];

  const candidatesData = [
    {
      id: "CAN-6721",
      name: "Alex Johnson",
      skills: "React, Node.js",
      experience: "5 years",
      status: "Available" as StatusType,
    },
    {
      id: "CAN-6715",
      name: "Maria Garcia",
      skills: "UI/UX, Figma",
      experience: "4 years",
      status: "Sold" as StatusType,
    },
    {
      id: "CAN-6710",
      name: "David Kim",
      skills: "Product Management, Agile",
      experience: "7 years",
      status: "Available" as StatusType,
    },
    {
      id: "CAN-6705",
      name: "Sarah Williams",
      skills: "Python, Data Analysis",
      experience: "3 years",
      status: "Sold" as StatusType,
    },
    {
      id: "CAN-6698",
      name: "James Brown",
      skills: "Java, SQL",
      experience: "6 years",
      status: "Sold" as StatusType,
    },
  ];

  const transactionsData = [
    {
      id: "TRX-3421",
      candidate: "Sarah Williams",
      company: "DataMinds",
      position: "Data Scientist",
      date: "2025-03-15",
      amount: "$5,200",
    },
    {
      id: "TRX-3418",
      candidate: "James Brown",
      company: "CloudSys",
      position: "Backend Engineer",
      date: "2025-03-10",
      amount: "$4,800",
    },
    {
      id: "TRX-3412",
      candidate: "Elena Rodriguez",
      company: "TechCorp",
      position: "Frontend Developer",
      date: "2025-03-05",
      amount: "$4,600",
    },
    {
      id: "TRX-3409",
      candidate: "Michael Chen",
      company: "FinTech Inc",
      position: "DevOps Engineer",
      date: "2025-02-28",
      amount: "$5,500",
    },
    {
      id: "TRX-3402",
      candidate: "Lisa Taylor",
      company: "HealthTech",
      position: "Project Manager",
      date: "2025-02-20",
      amount: "$6,200",
    },
  ];

  const getStatusColor = (status: StatusType): string => {
    const statusColors: Record<StatusType, string> = {
      Available: "bg-green-100 text-green-800",
      Sold: "bg-red-500 text-white",
      Closed: "bg-green-100 text-green-800",
    };

    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile and Stats Overview */}
        <div className="grid gap-6 mb-8 md:grid-cols-4">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage
                  src={recruiterData.avatar}
                  alt={recruiterData.name}
                />
                <AvatarFallback>
                  {recruiterData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{recruiterData.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {recruiterData.role}
              </CardDescription>
              <Badge className="mt-2">{recruiterData.email}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm font-medium">
                      {recruiterData.completionRate}%
                    </span>
                  </div>
                  <Progress
                    value={recruiterData.completionRate}
                    className="h-2"
                  />
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bids
                </CardTitle>
                <BarChart className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recruiterData.performance.bidsCount}
                </div>
                <p className="text-xs text-gray-500">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Chats Initiated
                </CardTitle>
                <MessageSquare className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recruiterData.performance.chatsInitiated}
                </div>
                <p className="text-xs text-gray-500">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Listed
                </CardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recruiterData.performance.candidatesListed}
                </div>
                <p className="text-xs text-gray-500">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Successful Transactions
                </CardTitle>
                <CheckCircle className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {recruiterData.performance.successfulTransactions}
                </div>
                <p className="text-xs text-gray-500">+15% from last month</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="bids" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bids">Bids</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* Bids Tab */}
          <TabsContent value="bids" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bids Activity</CardTitle>
                <CardDescription>
                  {recruiterData.name} submitted{" "}
                  {recruiterData.performance.bidsCount} bids in total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bidsData.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.id}</TableCell>
                        <TableCell>{bid.position}</TableCell>
                        <TableCell>{bid.company}</TableCell>
                        <TableCell>{bid.date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              bid.status
                            )}`}
                          >
                            {bid.status}
                          </span>
                        </TableCell>
                        <TableCell>{bid.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    View All Bids
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chat History</CardTitle>
                <CardDescription>
                  {recruiterData.name} initiated{" "}
                  {recruiterData.performance.chatsInitiated} conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Last Message</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chatsData.map((chat) => (
                      <TableRow key={chat.id}>
                        <TableCell className="font-medium">{chat.id}</TableCell>
                        <TableCell>{chat.candidate}</TableCell>
                        <TableCell>{chat.position}</TableCell>
                        <TableCell>{chat.lastMessage}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              chat.status
                            )}`}
                          >
                            {chat.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    View All Chats
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Database</CardTitle>
                <CardDescription>
                  {recruiterData.name} listed{" "}
                  {recruiterData.performance.candidatesListed} candidates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidatesData.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="font-medium">
                          {candidate.id}
                        </TableCell>
                        <TableCell>{candidate.name}</TableCell>
                        <TableCell>{candidate.skills}</TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              candidate.status
                            )}`}
                          >
                            {candidate.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    View All Candidates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Successful Placements</CardTitle>
                <CardDescription>
                  {recruiterData.name} completed{" "}
                  {recruiterData.performance.successfulTransactions} successful
                  transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionsData.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.id}
                        </TableCell>
                        <TableCell>{transaction.candidate}</TableCell>
                        <TableCell>{transaction.company}</TableCell>
                        <TableCell>{transaction.position}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RecruiterDetails;

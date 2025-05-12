
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, User, UserCheck, UserX, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample user data
const sampleUsers = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    type: "customer",
    status: "active",
    createdAt: "2023-03-15T10:30:00Z",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: "u2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 234-5678",
    type: "customer",
    status: "active",
    createdAt: "2023-04-22T14:45:00Z",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
  },
  {
    id: "u3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 345-6789",
    type: "vendor",
    status: "active",
    createdAt: "2023-02-10T09:15:00Z",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f"
  },
  {
    id: "u4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 456-7890",
    type: "customer",
    status: "inactive",
    createdAt: "2023-05-05T16:20:00Z",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704g"
  },
  {
    id: "u5",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 567-8901",
    type: "vendor",
    status: "suspended",
    createdAt: "2023-01-30T11:10:00Z",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704h"
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const { toast } = useToast();
  
  // Filter users based on search query and filter type
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || user.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Update user status
  const updateUserStatus = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "User Status Updated",
      description: `User status has been changed to ${newStatus}.`
    });
  };

  // Get appropriate badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get appropriate icon based on user type
  const getUserTypeIcon = (type) => {
    switch (type) {
      case "customer":
        return <User className="h-4 w-4 mr-1" />;
      case "vendor":
        return <UserCheck className="h-4 w-4 mr-1" />;
      case "admin":
        return <UserX className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {filterType === "all" ? "All Users" : 
                 filterType === "customer" ? "Customers" : "Vendors"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterType("all")}>
                All Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("customer")}>
                <User className="h-4 w-4 mr-2" />
                Customers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("vendor")}>
                <UserCheck className="h-4 w-4 mr-2" />
                Vendors
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="bg-catering-orange hover:bg-catering-orange/90">
            Add User
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getUserTypeIcon(user.type)}
                      <span className="capitalize">{user.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status !== "active" && (
                          <DropdownMenuItem onClick={() => updateUserStatus(user.id, "active")}>
                            Activate User
                          </DropdownMenuItem>
                        )}
                        {user.status !== "inactive" && (
                          <DropdownMenuItem onClick={() => updateUserStatus(user.id, "inactive")}>
                            Deactivate User
                          </DropdownMenuItem>
                        )}
                        {user.status !== "suspended" && (
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => updateUserStatus(user.id, "suspended")}
                          >
                            Suspend User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View complete information for this user.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedUser.avatarUrl} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">User Type</p>
                  <p className="capitalize">{selectedUser.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedUser.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedUser.status)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Joined Date</p>
                  <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                {selectedUser.status !== "active" && (
                  <Button 
                    onClick={() => {
                      updateUserStatus(selectedUser.id, "active");
                      setSelectedUser(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Activate User
                  </Button>
                )}
                
                {selectedUser.status !== "suspended" && (
                  <Button 
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      updateUserStatus(selectedUser.id, "suspended");
                      setSelectedUser(null);
                    }}
                  >
                    Suspend User
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminUsers;

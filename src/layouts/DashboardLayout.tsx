import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, Home, Shield, Users } from "lucide-react";

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    {
      name: "Access Control",
      path: "/access-control",
      icon: <Shield size={20} />,
    },
    {
      name: "Admin Management",
      path: "/admin-management",
      icon: <Users size={20} />,
    },
  ];

  // Extract current page name for the header
  const currentPage =
    navItems.find((item) => location.pathname.startsWith(item.path))?.name ||
    "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white dark:bg-gray-800 border-r transition-all duration-300 ease-in-out z-20",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                RC Admin
              </h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {collapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-3 rounded-lg transition-all",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300",
                    collapsed ? "justify-center" : "space-x-3"
                  )
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          {/* User profile section */}
          {/* <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div
              className={cn(
                "flex items-center",
                collapsed ? "justify-center" : "space-x-3"
              )}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    admin@example.com
                  </p>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              {currentPage}
            </h2>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

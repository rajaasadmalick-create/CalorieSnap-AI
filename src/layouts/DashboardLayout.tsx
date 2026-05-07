import { Outlet, NavLink } from "react-router-dom";
import { ScanLine, History, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

export default function DashboardLayout() {
  const { logout } = useAuth();

  const navItems = [
    { to: "/app/scan", icon: <ScanLine className="w-5 h-5" />, label: "Scan Now" },
    { to: "/app/history", icon: <History className="w-5 h-5" />, label: "History" },
    { to: "/app/account", icon: <User className="w-5 h-5" />, label: "Account" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
          <ScanLine size={24} />
          <span>CalorieSnap</span>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="text-slate-600" />}>
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0 flex flex-col border-l border-slate-200">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Access different sections of the app</SheetDescription>
            <div className="p-6 border-b border-slate-100 flex items-center gap-2 text-emerald-600 font-bold text-lg">
              <ScanLine size={24} />
              <span>CalorieSnap AI</span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  // Let Sheet handle close using custom logic if we wanted, but standard Link triggers layout render
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <Button onClick={logout} variant="outline" className="w-full text-slate-700 gap-2 border-slate-200 bg-white">
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 text-emerald-600 font-bold text-xl">
          <ScanLine size={28} />
          <span>CalorieSnap AI</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <Button onClick={logout} variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 gap-3">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 h-[calc(100vh-65px)] md:h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

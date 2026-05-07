import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Mail, ShieldAlert } from "lucide-react";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account</h1>
        <p className="text-slate-500 mt-2">Manage your profile and settings.</p>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden mb-8">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-500" /> My Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-sm overflow-hidden flex-shrink-0">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{user?.displayName || "Anonymous User"}</h3>
                <div className="flex items-center justify-center sm:justify-start text-slate-500 text-sm mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
              </div>
              <div className="inline-flex items-center text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                <ShieldAlert className="w-3 h-3 mr-1.5" />
                Verified Google Account
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">Sign Out</h4>
            <p className="text-sm text-slate-500">Log out of your account on this device.</p>
          </div>
          <Button onClick={logout} variant="outline" className="text-slate-600 rounded-full px-6">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

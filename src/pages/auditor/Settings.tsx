// OAIA Digital - Auditor Settings
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import AuditorSidebar from "@/components/AuditorSidebar";

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [auditorName, setAuditorName] = useState("Auditor General's Office");
  const [contactEmail, setContactEmail] = useState("audit@audit.gov.gh");
  const [auditYear, setAuditYear] = useState("2024");

  return (
    <div className="min-h-screen bg-oaia-light flex">
      <AuditorSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard/auditor">
              <Logo />
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-oaia-gray">
                Auditor General's Office - Settings
              </span>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-oaia-gray mt-1">
              Update auditor profile and preferences
            </p>
          </div>
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Auditor Profile</CardTitle>
              <CardDescription>
                Basic information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office Name
                  </label>
                  <Input
                    value={auditorName}
                    onChange={(e) => setAuditorName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <Input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Audit Year
                  </label>
                  <Input
                    value={auditYear}
                    onChange={(e) => setAuditYear(e.target.value)}
                  />
                </div>
                <Button type="submit" className="mt-2">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

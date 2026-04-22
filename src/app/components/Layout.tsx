import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/dashboard/history", label: "Riwayat Nilai", icon: BookOpen },
  { path: "/dashboard/profile", label: "Profil", icon: User },
];

export function Layout() {
  const { darkMode, toggleDarkMode, studentName, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const bg = darkMode ? "#121212" : "#F2F4F8";
  const sidebarBg = darkMode ? "#1A1A2E" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#222222";
  const subtextColor = darkMode ? "#AAAAAA" : "#777777";
  const borderColor = darkMode ? "#2A2A2A" : "#F0F0F0";
  const activeItemBg = "#4CAF50";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial = studentName ? studentName.charAt(0).toUpperCase() : "S";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 pb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}
        >
          <GraduationCap size={20} />
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: textColor, fontFamily: "Poppins, sans-serif" }}>
            Student Daily
          </div>
          <div className="text-xs" style={{ color: subtextColor, fontFamily: "Poppins, sans-serif" }}>
            Tracker
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
              style={{
                backgroundColor: isActive ? activeItemBg : "transparent",
                color: isActive ? "#FFFFFF" : subtextColor,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <Icon size={20} />
              <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight size={16} />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
          style={{ color: subtextColor, fontFamily: "Poppins, sans-serif" }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-sm font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Divider */}
        <div className="border-t" style={{ borderColor }} />

        {/* User profile */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #2196F3, #1565C0)" }}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: textColor, fontFamily: "Poppins, sans-serif" }}>
              {studentName || "Siswa"}
            </div>
            <div className="text-xs" style={{ color: subtextColor, fontFamily: "Poppins, sans-serif" }}>
              Pelajar
            </div>
          </div>
          <button onClick={handleLogout} title="Keluar">
            <LogOut size={18} style={{ color: "#FF5252" }} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: bg, fontFamily: "Poppins, sans-serif" }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0 fixed top-0 left-0 h-full z-20"
        style={{
          backgroundColor: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className="fixed top-0 left-0 h-full w-72 z-40 lg:hidden transition-transform duration-300 flex flex-col"
        style={{
          backgroundColor: sidebarBg,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: sidebarOpen ? "4px 0 20px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl"
            style={{ backgroundColor: darkMode ? "#2A2A2A" : "#F2F4F8" }}
          >
            <X size={20} style={{ color: textColor }} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Top Bar */}
        <header
          className="lg:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-10"
          style={{
            backgroundColor: sidebarBg,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl"
            style={{ backgroundColor: darkMode ? "#2A2A2A" : "#F2F4F8" }}
          >
            <Menu size={22} style={{ color: textColor }} />
          </button>

          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}
            >
              <GraduationCap size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ color: textColor }}>
              Student Tracker
            </span>
          </div>

          <button onClick={toggleDarkMode} className="p-2 rounded-xl" style={{ backgroundColor: darkMode ? "#2A2A2A" : "#F2F4F8" }}>
            {darkMode ? <Sun size={18} style={{ color: textColor }} /> : <Moon size={18} style={{ color: textColor }} />}
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 pb-24 lg:pb-0">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        <nav
          className="lg:hidden fixed bottom-0 left-0 right-0 z-20 flex"
          style={{
            backgroundColor: sidebarBg,
            borderTop: `1px solid ${borderColor}`,
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200"
              >
                <Icon
                  size={22}
                  style={{ color: isActive ? "#4CAF50" : subtextColor }}
                />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: isActive ? "#4CAF50" : subtextColor,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {item.label.split(" ")[0]}
                </span>
                {isActive && (
                  <div
                    className="absolute bottom-0 rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "#4CAF50",
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}

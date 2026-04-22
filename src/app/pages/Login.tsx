import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, GraduationCap, BookOpen, TrendingUp, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setStudentName, darkMode } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    if (savedName) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Nama tidak boleh kosong");
      return;
    }
    if (password.length < 4) {
      setError("Password minimal 4 karakter");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setStudentName(name.trim());
    navigate("/dashboard");
  };

  const features = [
    { icon: BookOpen, text: "Catat nilai semua mata pelajaran" },
    { icon: TrendingUp, text: "Pantau progress belajar harian" },
    { icon: Star, text: "Dapatkan insight & rekomendasi AI" },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{
        fontFamily: "Poppins, sans-serif",
        background: darkMode
          ? "linear-gradient(135deg, #121212 0%, #1a1a2e 100%)"
          : "linear-gradient(135deg, #F2F4F8 0%, #E8F5E9 100%)",
      }}
    >
      {/* Left Panel — Desktop only */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{
          background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 50%, #0D3B10 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-base">Student Daily Tracker</div>
            <div className="text-green-300 text-xs">Platform Belajar Cerdas</div>
          </div>
        </div>

        <div>
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Wujudkan <br />
            <span className="text-green-300">Prestasi</span> <br />
            Terbaikmu 🎯
          </h1>
          <p className="text-green-200 text-sm leading-relaxed mb-10">
            Pantau perkembangan belajarmu setiap hari dan raih target nilai impianmu.
          </p>

          <div className="space-y-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-white/90 text-sm">{f.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-green-400 text-xs">© 2025 Student Daily Tracker</div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}
            >
              <GraduationCap size={30} className="text-white" />
            </div>
            <div className="text-center">
              <div
                className="font-bold text-lg"
                style={{ color: darkMode ? "#FFFFFF" : "#1B5E20" }}
              >
                Student Daily Tracker
              </div>
              <div style={{ color: darkMode ? "#AAAAAA" : "#777777" }} className="text-xs">
                Platform Belajar Cerdas
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            className="rounded-2xl p-8 shadow-xl"
            style={{
              backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
              boxShadow: darkMode
                ? "0 20px 60px rgba(0,0,0,0.5)"
                : "0 20px 60px rgba(76,175,80,0.12)",
            }}
          >
            <div className="mb-7">
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: darkMode ? "#FFFFFF" : "#1B5E20" }}
              >
                Selamat Datang 👋
              </h2>
              <p className="text-sm" style={{ color: darkMode ? "#AAAAAA" : "#777777" }}>
                Masuk untuk melanjutkan perjalanan belajarmu
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: darkMode ? "#CCCCCC" : "#444444" }}
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-3.5 border-2 outline-none transition-all duration-200"
                  style={{
                    borderRadius: "12px",
                    borderColor: darkMode ? "#333333" : "#E8E8E8",
                    backgroundColor: darkMode ? "#2A2A2A" : "#FAFAFA",
                    color: darkMode ? "#FFFFFF" : "#222222",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                  onBlur={(e) => (e.target.style.borderColor = darkMode ? "#333333" : "#E8E8E8")}
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: darkMode ? "#CCCCCC" : "#444444" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 4 karakter"
                    className="w-full px-4 py-3.5 border-2 outline-none transition-all duration-200 pr-12"
                    style={{
                      borderRadius: "12px",
                      borderColor: darkMode ? "#333333" : "#E8E8E8",
                      backgroundColor: darkMode ? "#2A2A2A" : "#FAFAFA",
                      color: darkMode ? "#FFFFFF" : "#222222",
                      fontSize: "14px",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                    onBlur={(e) => (e.target.style.borderColor = darkMode ? "#333333" : "#E8E8E8")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={18} style={{ color: darkMode ? "#777777" : "#AAAAAA" }} />
                    ) : (
                      <Eye size={18} style={{ color: darkMode ? "#777777" : "#AAAAAA" }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                    color: "#F44336",
                    border: "1px solid rgba(244, 67, 54, 0.2)",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-4 transition-all duration-200 font-semibold text-sm relative overflow-hidden"
                style={{
                  background: isLoading
                    ? "#A5D6A7"
                    : "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: "12px",
                  boxShadow: isLoading ? "none" : "0 4px 20px rgba(76,175,80,0.35)",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Masuk...
                  </span>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
            </form>

            <p className="text-center text-xs mt-6" style={{ color: darkMode ? "#555555" : "#BBBBBB" }}>
              Data tersimpan secara lokal di perangkat ini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

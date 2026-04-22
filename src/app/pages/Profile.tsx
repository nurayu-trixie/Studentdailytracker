import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Trophy,
  Target,
  BarChart3,
  Star,
  LogOut,
  Edit3,
  Check,
  BookOpen,
  Flame,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useApp } from "../context/AppContext";

const SUBJECT_COLORS: Record<string, string> = {
  Matematika: "#4CAF50",
  IPA: "#2196F3",
  "Bahasa Indonesia": "#FF9800",
  "Bahasa Inggris": "#9C27B0",
  IPS: "#F44336",
  PKN: "#00BCD4",
  "Seni Budaya": "#E91E63",
  PJOK: "#FF5722",
};

const BADGES = [
  { id: "first", label: "Nilai Pertama", icon: Star, color: "#FFB300", condition: (g: any[]) => g.length >= 1 },
  { id: "ten", label: "10 Nilai", icon: BookOpen, color: "#2196F3", condition: (g: any[]) => g.length >= 10 },
  { id: "perfect", label: "Nilai 100", icon: Trophy, color: "#4CAF50", condition: (g: any[]) => g.some((x: any) => x.score === 100) },
  { id: "hot", label: "Nilai Konsisten", icon: Flame, color: "#FF5722", condition: (g: any[]) => g.length >= 5 },
  { id: "award", label: "Rata-rata 85+", icon: Award, color: "#9C27B0", condition: (g: any[]) => g.length > 0 && g.reduce((a: number, b: any) => a + b.score, 0) / g.length >= 85 },
  { id: "trend", label: "Nilai Meningkat", icon: TrendingUp, color: "#00BCD4", condition: (g: any[]) => g.length >= 3 && g[0].score > g[g.length - 1].score },
];

export function Profile() {
  const { darkMode, studentName, setStudentName, grades, targetScore, logout } = useApp();
  const navigate = useNavigate();
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const textColor = darkMode ? "#FFFFFF" : "#1A1A1A";
  const subtextColor = darkMode ? "#AAAAAA" : "#777777";
  const cardBg = darkMode ? "#1E1E1E" : "#FFFFFF";
  const borderColor = darkMode ? "#2A2A2A" : "#F0F0F0";
  const inputBg = darkMode ? "#2A2A2A" : "#FAFAFA";

  const stats = useMemo(() => {
    if (!grades.length) return { avg: 0, highest: 0, lowest: 0, total: 0, passRate: 0 };
    const scores = grades.map((g) => g.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return {
      avg,
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
      total: grades.length,
      passRate: Math.round((grades.filter((g) => g.score >= targetScore).length / grades.length) * 100),
    };
  }, [grades, targetScore]);

  const radarData = useMemo(() => {
    const map: Record<string, number[]> = {};
    grades.forEach((g) => {
      if (!map[g.subject]) map[g.subject] = [];
      map[g.subject].push(g.score);
    });
    return Object.entries(map)
      .slice(0, 6)
      .map(([subject, scores]) => ({
        subject: subject.length > 8 ? subject.slice(0, 8) + ".." : subject,
        nilai: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        fullMark: 100,
      }));
  }, [grades]);

  const earnedBadges = BADGES.filter((b) => b.condition(grades));

  const getLevel = () => {
    if (stats.avg >= 90) return { label: "Master", color: "#FFB300", next: null };
    if (stats.avg >= 80) return { label: "Expert", color: "#9C27B0", next: 90 };
    if (stats.avg >= 70) return { label: "Intermediate", color: "#2196F3", next: 80 };
    return { label: "Beginner", color: "#4CAF50", next: 70 };
  };
  const level = getLevel();

  const handleSaveName = () => {
    if (tempName.trim()) {
      setStudentName(tempName.trim());
    }
    setEditingName(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial = studentName ? studentName.charAt(0).toUpperCase() : "S";

  return (
    <div className="p-5 lg:p-8 max-w-4xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Profile Header */}
      <div
        className="rounded-2xl p-6 mb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)",
          boxShadow: "0 8px 30px rgba(46,125,50,0.35)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: "white", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 right-12 w-24 h-24 rounded-full opacity-10" style={{ background: "white", transform: "translateY(50%)" }} />

        <div className="flex items-center gap-5 relative z-10">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.4)",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                />
                <button onClick={handleSaveName} className="p-1.5 bg-white/20 rounded-lg">
                  <Check size={16} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white truncate">{studentName || "Siswa"}</h1>
                <button onClick={() => { setTempName(studentName); setEditingName(true); }} className="p-1 bg-white/20 rounded-lg flex-shrink-0">
                  <Edit3 size={14} className="text-white" />
                </button>
              </div>
            )}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: `${level.color}30`, color: level.color, border: `1px solid ${level.color}50` }}
            >
              <Star size={12} />
              Level {level.label}
            </div>
            {level.next && (
              <p className="text-white/60 text-xs mt-1">
                Perlu rata-rata {level.next} untuk naik level
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Rata-rata", value: stats.avg, icon: BarChart3, color: "#2196F3" },
          { label: "Total Nilai", value: stats.total, icon: BookOpen, color: "#4CAF50" },
          { label: "Tertinggi", value: stats.highest, icon: Trophy, color: "#FFB300" },
          { label: "Pass Rate", value: `${stats.passRate}%`, icon: Target, color: "#9C27B0" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: cardBg,
                boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <Icon size={18} style={{ color: s.color }} className="mb-2" />
              <div className="text-xl font-bold" style={{ color: textColor }}>{s.value}</div>
              <div className="text-xs" style={{ color: subtextColor }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Radar Chart */}
        {radarData.length >= 3 && (
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: cardBg,
              boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="font-semibold mb-4" style={{ color: textColor }}>
              Peta Kemampuan 🕸️
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={darkMode ? "#2A2A2A" : "#F0F0F0"} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: subtextColor, fontSize: 10, fontFamily: "Poppins" }}
                />
                <Radar
                  dataKey="nilai"
                  stroke="#4CAF50"
                  fill="#4CAF50"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: "12px",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    color: textColor,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Badges */}
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: cardBg,
            boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="font-semibold mb-4" style={{ color: textColor }}>
            Pencapaian 🏅
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map((badge) => {
              const Icon = badge.icon;
              const earned = badge.condition(grades);
              return (
                <div
                  key={badge.id}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: earned
                      ? `${badge.color}15`
                      : darkMode ? "#1A1A1A" : "#F5F5F5",
                    opacity: earned ? 1 : 0.4,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: earned ? `${badge.color}25` : "transparent" }}
                  >
                    <Icon size={20} style={{ color: earned ? badge.color : subtextColor }} />
                  </div>
                  <span
                    className="text-xs text-center leading-tight"
                    style={{ color: earned ? textColor : subtextColor }}
                  >
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs mt-3" style={{ color: subtextColor }}>
            {earnedBadges.length}/{BADGES.length} pencapaian terbuka
          </p>
        </div>
      </div>

      {/* Subject Breakdown */}
      {grades.length > 0 && (
        <div
          className="rounded-2xl p-5 mb-5"
          style={{
            backgroundColor: cardBg,
            boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="font-semibold mb-4" style={{ color: textColor }}>
            Nilai per Mata Pelajaran 📚
          </h2>
          <div className="space-y-3">
            {radarData.map((d) => {
              const color = Object.entries(SUBJECT_COLORS).find(([k]) => d.subject.startsWith(k.slice(0, 4)))?.[1] || "#4CAF50";
              return (
                <div key={d.subject}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm" style={{ color: textColor }}>{d.subject}</span>
                    <span className="text-sm font-semibold" style={{ color }}>{d.nilai}</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: "8px", backgroundColor: darkMode ? "#2A2A2A" : "#F0F0F0" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${d.nilai}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all font-semibold text-sm"
        style={{
          color: "#F44336",
          border: "2px solid rgba(244,67,54,0.2)",
          backgroundColor: "rgba(244,67,54,0.05)",
        }}
      >
        <LogOut size={18} />
        Keluar dari Akun
      </button>
    </div>
  );
}

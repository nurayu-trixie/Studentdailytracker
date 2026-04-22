import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  BarChart3,
  Target,
  TrendingUp,
  Trophy,
  Plus,
  BookOpen,
  CheckCircle,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useApp } from "../context/AppContext";
import { AIAssistant } from "../components/AIAssistant";

const SUBJECTS = [
  "Matematika",
  "IPA",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "IPS",
  "PKN",
  "Seni Budaya",
  "PJOK",
];

const SCORE_COLORS: Record<string, string> = {
  Matematika: "#4CAF50",
  IPA: "#2196F3",
  "Bahasa Indonesia": "#FF9800",
  "Bahasa Inggris": "#9C27B0",
  IPS: "#F44336",
  PKN: "#00BCD4",
  "Seni Budaya": "#E91E63",
  PJOK: "#FF5722",
};

export function Dashboard() {
  const { darkMode, studentName, grades, addGrade, targetScore, setTargetScore } = useApp();
  const navigate = useNavigate();
  const [newScore, setNewScore] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Matematika");
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const bg = darkMode ? "#121212" : "#F2F4F8";
  const cardBg = darkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#1A1A1A";
  const subtextColor = darkMode ? "#AAAAAA" : "#777777";
  const borderColor = darkMode ? "#2A2A2A" : "#F0F0F0";
  const inputBg = darkMode ? "#2A2A2A" : "#FAFAFA";

  const avg = useMemo(() => {
    if (!grades.length) return 0;
    return Math.round(grades.reduce((a, g) => a + g.score, 0) / grades.length);
  }, [grades]);

  const highest = useMemo(() => {
    if (!grades.length) return 0;
    return Math.max(...grades.map((g) => g.score));
  }, [grades]);

  const progress = useMemo(() => Math.min(Math.round((avg / targetScore) * 100), 100), [avg, targetScore]);

  const chartData = useMemo(() => {
    const map: Record<string, number[]> = {};
    grades.forEach((g) => {
      if (!map[g.subject]) map[g.subject] = [];
      map[g.subject].push(g.score);
    });
    return Object.entries(map).map(([subject, scores]) => ({
      name: subject.length > 6 ? subject.slice(0, 6) + ".." : subject,
      fullName: subject,
      nilai: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      color: SCORE_COLORS[subject] || "#4CAF50",
    }));
  }, [grades]);

  const handleAddGrade = () => {
    const score = Number(newScore);
    if (!newScore || isNaN(score) || score < 0 || score > 100) return;
    addGrade({ subject: selectedSubject, score, note });
    setNewScore("");
    setNote("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const recentGrades = grades.slice(0, 3);
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#4CAF50";
    if (score >= 75) return "#2196F3";
    if (score >= 60) return "#FF9800";
    return "#F44336";
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Selamat Pagi";
    if (h < 15) return "Selamat Siang";
    if (h < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div
          className="px-3 py-2 rounded-xl shadow-lg"
          style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
        >
          <p className="text-xs font-semibold" style={{ color: textColor }}>
            {payload[0].payload.fullName}
          </p>
          <p className="text-lg font-bold" style={{ color: payload[0].payload.color }}>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 lg:p-8 max-w-5xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Greeting Header */}
      <div className="mb-7">
        <p className="text-sm mb-1" style={{ color: subtextColor }}>
          {getGreeting()},{" "}
          {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h1 className="text-2xl font-bold" style={{ color: textColor }}>
          Halo, {studentName || "Siswa"}! 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: subtextColor }}>
          {grades.length === 0
            ? "Mulai catat nilaimu hari ini"
            : `${grades.length} nilai tercatat • Terus semangat belajar!`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Rata-rata",
            value: avg,
            icon: BarChart3,
            color: "#2196F3",
            bg: "rgba(33,150,243,0.1)",
            suffix: "",
          },
          {
            label: "Target",
            value: targetScore,
            icon: Target,
            color: "#4CAF50",
            bg: "rgba(76,175,80,0.1)",
            suffix: "",
          },
          {
            label: "Progress",
            value: progress,
            icon: TrendingUp,
            color: "#FF9800",
            bg: "rgba(255,152,0,0.1)",
            suffix: "%",
          },
          {
            label: "Tertinggi",
            value: highest,
            icon: Trophy,
            color: "#FFB300",
            bg: "rgba(255,179,0,0.1)",
            suffix: "",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-4 lg:p-5 transition-all duration-200"
              style={{
                backgroundColor: cardBg,
                boxShadow: darkMode
                  ? "0 2px 12px rgba(0,0,0,0.3)"
                  : "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: stat.bg }}
              >
                <Icon size={18} style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: textColor }}>
                {stat.value}
                <span className="text-base">{stat.suffix}</span>
              </div>
              <div className="text-xs mt-1" style={{ color: subtextColor }}>
                {stat.label}
              </div>
              {/* Progress bar for progress card */}
              {stat.label === "Progress" && (
                <div
                  className="mt-2 rounded-full overflow-hidden"
                  style={{ height: "4px", backgroundColor: darkMode ? "#333" : "#F0F0F0" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Input Nilai Card */}
        <div
          className="rounded-2xl p-5 lg:p-6"
          style={{
            backgroundColor: cardBg,
            boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4CAF50, #2E7D32)" }}
            >
              <Plus size={16} className="text-white" />
            </div>
            <h2 className="font-semibold" style={{ color: textColor }}>
              Input Nilai Baru
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: subtextColor }}>
                Mata Pelajaran
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 border-2 outline-none rounded-xl text-sm transition-all"
                style={{
                  borderColor: darkMode ? "#333333" : "#EEEEEE",
                  backgroundColor: inputBg,
                  color: textColor,
                  fontFamily: "Poppins, sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                onBlur={(e) => (e.target.style.borderColor = darkMode ? "#333333" : "#EEEEEE")}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: subtextColor }}>
                Nilai (0–100)
              </label>
              <input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Contoh: 87"
                min="0"
                max="100"
                className="w-full px-4 py-3 border-2 outline-none rounded-xl text-sm transition-all"
                style={{
                  borderColor: darkMode ? "#333333" : "#EEEEEE",
                  backgroundColor: inputBg,
                  color: textColor,
                  fontFamily: "Poppins, sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                onBlur={(e) => (e.target.style.borderColor = darkMode ? "#333333" : "#EEEEEE")}
                onKeyDown={(e) => e.key === "Enter" && handleAddGrade()}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: subtextColor }}>
                Catatan (opsional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Misal: Ulangan Harian Bab 3"
                className="w-full px-4 py-3 border-2 outline-none rounded-xl text-sm transition-all"
                style={{
                  borderColor: darkMode ? "#333333" : "#EEEEEE",
                  backgroundColor: inputBg,
                  color: textColor,
                  fontFamily: "Poppins, sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                onBlur={(e) => (e.target.style.borderColor = darkMode ? "#333333" : "#EEEEEE")}
              />
            </div>

            <button
              onClick={handleAddGrade}
              disabled={!newScore}
              className="w-full py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background:
                  !newScore
                    ? darkMode ? "#333" : "#E0E0E0"
                    : "linear-gradient(135deg, #4CAF50, #2E7D32)",
                color: !newScore ? subtextColor : "white",
                boxShadow: !newScore ? "none" : "0 4px 15px rgba(76,175,80,0.3)",
              }}
            >
              {showSuccess ? (
                <>
                  <CheckCircle size={16} />
                  Nilai Tersimpan!
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Tambah Nilai
                </>
              )}
            </button>
          </div>
        </div>

        {/* Target + Recent Grades */}
        <div className="space-y-4">
          {/* Target */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: cardBg,
              boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2196F3, #1565C0)" }}
              >
                <Target size={16} className="text-white" />
              </div>
              <h2 className="font-semibold" style={{ color: textColor }}>
                Target Nilai
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min={50}
                max={100}
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #2196F3 0%, #2196F3 ${((targetScore - 50) / 50) * 100}%, ${darkMode ? "#333" : "#E0E0E0"} ${((targetScore - 50) / 50) * 100}%, ${darkMode ? "#333" : "#E0E0E0"} 100%)`,
                }}
              />
              <div
                className="text-xl font-bold min-w-[3rem] text-center"
                style={{ color: "#2196F3" }}
              >
                {targetScore}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div
                className="flex-1 rounded-full overflow-hidden"
                style={{ height: "8px", backgroundColor: darkMode ? "#333" : "#F0F0F0" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background:
                      progress >= 100
                        ? "linear-gradient(90deg, #4CAF50, #00E676)"
                        : "linear-gradient(90deg, #2196F3, #03A9F4)",
                  }}
                />
              </div>
              <span className="text-xs font-semibold" style={{ color: progress >= 100 ? "#4CAF50" : "#2196F3" }}>
                {progress}%
              </span>
            </div>
            <p className="text-xs mt-2" style={{ color: subtextColor }}>
              {progress >= 100 ? "🎉 Target tercapai!" : `Butuh ${targetScore - avg} poin lagi untuk mencapai target`}
            </p>
          </div>

          {/* Recent Grades */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: cardBg,
              boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #FF9800, #E65100)" }}
                >
                  <Zap size={16} className="text-white" />
                </div>
                <h2 className="font-semibold" style={{ color: textColor }}>
                  Nilai Terbaru
                </h2>
              </div>
              {grades.length > 3 && (
                <button
                  onClick={() => navigate("/dashboard/history")}
                  className="text-xs font-medium"
                  style={{ color: "#2196F3" }}
                >
                  Lihat semua →
                </button>
              )}
            </div>

            {recentGrades.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6">
                <BookOpen size={32} style={{ color: darkMode ? "#444" : "#DDDDDD" }} className="mb-2" />
                <p className="text-xs" style={{ color: subtextColor }}>Belum ada nilai</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentGrades.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                    style={{ backgroundColor: darkMode ? "#2A2A2A" : "#F8F8F8" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: SCORE_COLORS[g.subject] || "#4CAF50" }}
                      />
                      <div>
                        <div className="text-sm font-medium" style={{ color: textColor }}>
                          {g.subject}
                        </div>
                        <div className="text-xs" style={{ color: subtextColor }}>
                          {g.date}
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-sm font-bold px-3 py-1 rounded-lg"
                      style={{
                        color: getScoreColor(g.score),
                        backgroundColor: `${getScoreColor(g.score)}18`,
                      }}
                    >
                      {g.score}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      {chartData.length > 0 && (
        <div
          className="rounded-2xl p-5 lg:p-6 mb-5"
          style={{
            backgroundColor: cardBg,
            boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold" style={{ color: textColor }}>
                Rata-rata per Mata Pelajaran
              </h2>
              <p className="text-xs mt-0.5" style={{ color: subtextColor }}>
                Garis merah = target nilai
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={28} barCategoryGap="30%">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#2A2A2A" : "#F0F0F0"}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: subtextColor, fontSize: 11, fontFamily: "Poppins" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: subtextColor, fontSize: 11, fontFamily: "Poppins" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: darkMode ? "#ffffff08" : "#00000006", radius: 8 }} />
              <ReferenceLine y={targetScore} stroke="#F44336" strokeDasharray="4 4" strokeWidth={1.5} />
              <Bar
                dataKey="nilai"
                radius={[8, 8, 0, 0]}
                fill="#4CAF50"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* AI Assistant */}
      <AIAssistant grades={grades} targetScore={targetScore} darkMode={darkMode} />
    </div>
  );
}

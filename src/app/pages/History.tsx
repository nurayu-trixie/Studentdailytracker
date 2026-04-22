import { useState, useMemo } from "react";
import { Trash2, Search, Filter, BookOpen, TrendingUp, Award } from "lucide-react";
import { useApp } from "../context/AppContext";

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

export function History() {
  const { darkMode, grades, deleteGrade, targetScore } = useApp();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("Semua");
  const [sortBy, setSortBy] = useState<"date" | "score-asc" | "score-desc">("date");

  const bg = darkMode ? "#121212" : "#F2F4F8";
  const cardBg = darkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#1A1A1A";
  const subtextColor = darkMode ? "#AAAAAA" : "#777777";
  const borderColor = darkMode ? "#2A2A2A" : "#F0F0F0";
  const inputBg = darkMode ? "#2A2A2A" : "#FAFAFA";

  const subjects = ["Semua", ...Array.from(new Set(grades.map((g) => g.subject)))];

  const filtered = useMemo(() => {
    let result = [...grades];
    if (filterSubject !== "Semua") result = result.filter((g) => g.subject === filterSubject);
    if (search) result = result.filter((g) => g.subject.toLowerCase().includes(search.toLowerCase()) || (g.note && g.note.toLowerCase().includes(search.toLowerCase())));
    if (sortBy === "score-asc") result.sort((a, b) => a.score - b.score);
    else if (sortBy === "score-desc") result.sort((a, b) => b.score - a.score);
    return result;
  }, [grades, filterSubject, search, sortBy]);

  const getScoreLabel = (score: number) => {
    if (score >= 90) return { label: "Sangat Baik", color: "#4CAF50" };
    if (score >= 80) return { label: "Baik", color: "#2196F3" };
    if (score >= 70) return { label: "Cukup", color: "#FF9800" };
    return { label: "Perlu Peningkatan", color: "#F44336" };
  };

  const stats = useMemo(() => {
    if (!grades.length) return { avg: 0, pass: 0, best: "-" };
    const avg = Math.round(grades.reduce((a, g) => a + g.score, 0) / grades.length);
    const pass = grades.filter((g) => g.score >= targetScore).length;
    const subMap: Record<string, number[]> = {};
    grades.forEach((g) => {
      if (!subMap[g.subject]) subMap[g.subject] = [];
      subMap[g.subject].push(g.score);
    });
    const best = Object.entries(subMap).reduce(
      (best, [sub, scores]) => {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return avg > best.avg ? { sub, avg } : best;
      },
      { sub: "-", avg: 0 }
    );
    return { avg, pass, best: best.sub };
  }, [grades, targetScore]);

  return (
    <div className="p-5 lg:p-8 max-w-4xl mx-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold" style={{ color: textColor }}>
          Riwayat Nilai 📊
        </h1>
        <p className="text-sm mt-1" style={{ color: subtextColor }}>
          {grades.length} nilai total tersimpan
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Rata-rata", value: stats.avg, icon: TrendingUp, color: "#2196F3", bg: "rgba(33,150,243,0.1)" },
          { label: "Di atas target", value: stats.pass, icon: Award, color: "#4CAF50", bg: "rgba(76,175,80,0.1)" },
          { label: "Terbaik", value: stats.best === "-" ? "-" : stats.best.split(" ")[0], icon: BookOpen, color: "#FF9800", bg: "rgba(255,152,0,0.1)" },
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
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: s.bg }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div className="text-lg font-bold" style={{ color: textColor }}>{s.value}</div>
              <div className="text-xs" style={{ color: subtextColor }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-4 mb-5"
        style={{
          backgroundColor: cardBg,
          boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: subtextColor }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari mata pelajaran atau catatan..."
              className="w-full pl-9 pr-4 py-2.5 border-2 outline-none rounded-xl text-sm"
              style={{
                borderColor: darkMode ? "#333" : "#EEEEEE",
                backgroundColor: inputBg,
                color: textColor,
                fontFamily: "Poppins, sans-serif",
              }}
            />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: subtextColor }} />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="pl-9 pr-4 py-2.5 border-2 outline-none rounded-xl text-sm"
              style={{
                borderColor: darkMode ? "#333" : "#EEEEEE",
                backgroundColor: inputBg,
                color: textColor,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2.5 border-2 outline-none rounded-xl text-sm"
            style={{
              borderColor: darkMode ? "#333" : "#EEEEEE",
              backgroundColor: inputBg,
              color: textColor,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <option value="date">Terbaru</option>
            <option value="score-desc">Nilai Tertinggi</option>
            <option value="score-asc">Nilai Terendah</option>
          </select>
        </div>
      </div>

      {/* Grade List */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-12 flex flex-col items-center justify-center"
          style={{ backgroundColor: cardBg }}
        >
          <BookOpen size={48} style={{ color: darkMode ? "#333" : "#DDDDDD" }} className="mb-3" />
          <p className="font-semibold" style={{ color: subtextColor }}>
            {grades.length === 0 ? "Belum ada nilai tercatat" : "Tidak ada hasil yang cocok"}
          </p>
          <p className="text-sm mt-1" style={{ color: darkMode ? "#555" : "#BBBBBB" }}>
            {grades.length === 0 ? "Tambahkan nilai dari halaman Dashboard" : "Coba ubah filter pencarian"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((grade, index) => {
            const scoreInfo = getScoreLabel(grade.score);
            return (
              <div
                key={grade.id}
                className="rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 group"
                style={{
                  backgroundColor: cardBg,
                  boxShadow: darkMode ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.05)",
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Subject Color Indicator */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                  style={{
                    backgroundColor: SCORE_COLORS[grade.subject] || "#4CAF50",
                    opacity: 0.9,
                  }}
                >
                  {grade.subject.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm truncate" style={{ color: textColor }}>
                        {grade.subject}
                      </div>
                      {grade.note && (
                        <div className="text-xs truncate mt-0.5" style={{ color: subtextColor }}>
                          {grade.note}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Score Badge */}
                      <div
                        className="text-lg font-bold px-3 py-1 rounded-xl"
                        style={{
                          color: scoreInfo.color,
                          backgroundColor: `${scoreInfo.color}15`,
                        }}
                      >
                        {grade.score}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        color: scoreInfo.color,
                        backgroundColor: `${scoreInfo.color}15`,
                      }}
                    >
                      {scoreInfo.label}
                    </span>
                    <span className="text-xs" style={{ color: subtextColor }}>
                      {grade.date}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteGrade(grade.id)}
                  className="p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
                  style={{ backgroundColor: "rgba(244,67,54,0.1)" }}
                  title="Hapus"
                >
                  <Trash2 size={16} style={{ color: "#F44336" }} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

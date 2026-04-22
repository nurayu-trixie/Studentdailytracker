import { useState, useEffect } from "react";
import {
  Sparkles,
  Brain,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Grade {
  id: string;
  subject: string;
  score: number;
  date: string;
}

interface AIInsight {
  type: "success" | "warning" | "info";
  message: string;
  icon: typeof CheckCircle;
}

interface AIAssistantProps {
  grades: Grade[];
  targetScore: number;
  darkMode: boolean;
}

export function AIAssistant({ grades, targetScore, darkMode }: AIAssistantProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(true);

  const cardBg = darkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#1A1A1A";
  const subtextColor = darkMode ? "#AAAAAA" : "#777777";
  const borderColor = darkMode ? "#2A2A2A" : "#F0F0F0";

  useEffect(() => {
    analyzePerformance();
  }, [grades, targetScore]);

  const analyzePerformance = () => {
    if (grades.length === 0) {
      setInsights([
        {
          type: "info",
          message: "Tambahkan nilai pertamamu untuk mendapatkan analisis AI yang personal",
          icon: AlertCircle,
        },
      ]);
      setRecommendations([]);
      return;
    }

    const newInsights: AIInsight[] = [];
    const newRecommendations: string[] = [];
    const average = grades.reduce((acc, g) => acc + g.score, 0) / grades.length;

    if (average >= targetScore) {
      newInsights.push({
        type: "success",
        message: `🎉 Rata-rata ${Math.round(average)} sudah melampaui target ${targetScore}! Pertahankan!`,
        icon: CheckCircle,
      });
      newRecommendations.push("Tetap konsisten dengan jadwal belajar yang sekarang");
      newRecommendations.push("Mulai pelajari materi lebih mendalam atau lanjutan");
    } else {
      const gap = targetScore - average;
      newInsights.push({
        type: "warning",
        message: `Rata-rata ${Math.round(average)} masih ${Math.round(gap)} poin di bawah target ${targetScore}`,
        icon: AlertCircle,
      });
      newRecommendations.push(`Tingkatkan intensitas belajar untuk mengejar ${Math.round(gap)} poin yang kurang`);
    }

    const subjectScores: Record<string, number[]> = {};
    grades.forEach((grade) => {
      if (!subjectScores[grade.subject]) subjectScores[grade.subject] = [];
      subjectScores[grade.subject].push(grade.score);
    });

    const subjectAverages = Object.entries(subjectScores).map(([subject, scores]) => ({
      subject,
      average: scores.reduce((a, b) => a + b, 0) / scores.length,
    }));

    if (subjectAverages.length > 1) {
      const weakest = subjectAverages.reduce((min, curr) => (curr.average < min.average ? curr : min));
      const strongest = subjectAverages.reduce((max, curr) => (curr.average > max.average ? curr : max));

      if (weakest.average < targetScore) {
        newInsights.push({
          type: "warning",
          message: `${weakest.subject} perlu perhatian ekstra (rata-rata: ${Math.round(weakest.average)})`,
          icon: TrendingDown,
        });
        newRecommendations.push(`Alokasikan 30-45 menit khusus setiap hari untuk ${weakest.subject}`);
        newRecommendations.push(`Gunakan latihan soal dan diskusi untuk meningkatkan ${weakest.subject}`);
      }

      if (strongest.average >= 80) {
        newInsights.push({
          type: "success",
          message: `${strongest.subject} adalah kekuatanmu! (rata-rata: ${Math.round(strongest.average)})`,
          icon: CheckCircle,
        });
      }
    }

    if (grades.length >= 3) {
      const recent = grades.slice(0, 3);
      const recentAvg = recent.reduce((acc, g) => acc + g.score, 0) / recent.length;
      const overall = grades.reduce((acc, g) => acc + g.score, 0) / grades.length;

      if (recentAvg > overall + 5) {
        newInsights.push({
          type: "success",
          message: "📈 Tren positif! Nilai kamu meningkat dalam 3 entri terakhir",
          icon: CheckCircle,
        });
        newRecommendations.push("Teruskan strategi belajar yang sedang kamu terapkan!");
      } else if (recentAvg < overall - 5) {
        newInsights.push({
          type: "warning",
          message: "📉 Nilai kamu sedikit menurun belakangan ini. Yuk evaluasi!",
          icon: AlertCircle,
        });
        newRecommendations.push("Evaluasi kembali jadwal dan metode belajarmu");
        newRecommendations.push("Pastikan istirahat cukup dan kelola stres dengan baik");
      }
    }

    if (grades.length >= 5) {
      newRecommendations.push("Buat mind map atau ringkasan untuk setiap mata pelajaran");
      newRecommendations.push("Lakukan review mingguan setiap akhir pekan");
    }

    setInsights(newInsights);
    setRecommendations(newRecommendations);
  };

  return (
    <div className="space-y-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* AI Insights Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: cardBg,
          boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 p-5 transition-all"
          style={{ borderBottom: expanded ? `1px solid ${borderColor}` : "none" }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #9C27B0, #6A1B9A)" }}
          >
            <Brain size={18} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: textColor }}>
                AI Learning Insights
              </span>
              <Sparkles size={14} style={{ color: "#9C27B0" }} />
            </div>
            <p className="text-xs mt-0.5" style={{ color: subtextColor }}>
              Analisis berbasis data nilaimu
            </p>
          </div>
          {expanded ? (
            <ChevronUp size={18} style={{ color: subtextColor }} />
          ) : (
            <ChevronDown size={18} style={{ color: subtextColor }} />
          )}
        </button>

        {/* Content */}
        {expanded && (
          <div className="p-5 space-y-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const colorMap = {
                success: "#4CAF50",
                warning: "#FF9800",
                info: "#2196F3",
              };
              const color = colorMap[insight.type];

              return (
                <div
                  key={index}
                  className="flex gap-3 p-3.5 rounded-xl"
                  style={{
                    backgroundColor: `${color}10`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Icon size={17} style={{ color, marginTop: "1px", flexShrink: 0 }} />
                  <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                    {insight.message}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommendations Card */}
      {recommendations.length > 0 && (
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: cardBg,
            boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #FFC107, #F57F17)" }}
            >
              <Lightbulb size={18} className="text-white" />
            </div>
            <div>
              <span className="font-semibold text-sm" style={{ color: textColor }}>
                Rekomendasi AI
              </span>
              <p className="text-xs" style={{ color: subtextColor }}>
                Strategi belajar yang dipersonalisasi
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex gap-3 p-3.5 rounded-xl"
                style={{ backgroundColor: darkMode ? "#2A2A2A" : "#F8F8F8" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{
                    background: "linear-gradient(135deg, #FFC107, #FF8F00)",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

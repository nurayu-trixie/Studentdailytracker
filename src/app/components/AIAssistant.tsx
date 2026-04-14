import { useState, useEffect } from "react";
import { Sparkles, Brain, TrendingDown, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";

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

  const cardBg = darkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#222222";
  const subtextColor = darkMode ? "#AAAAAA" : "#999999";

  useEffect(() => {
    analyzePerformance();
  }, [grades, targetScore]);

  const analyzePerformance = () => {
    if (grades.length === 0) {
      setInsights([
        {
          type: "info",
          message: "Mulai tambahkan nilai untuk mendapatkan analisis AI",
          icon: AlertCircle,
        },
      ]);
      setRecommendations([]);
      return;
    }

    const newInsights: AIInsight[] = [];
    const newRecommendations: string[] = [];

    // Calculate average
    const average = grades.reduce((acc, g) => acc + g.score, 0) / grades.length;

    // Analyze overall performance
    if (average >= targetScore) {
      newInsights.push({
        type: "success",
        message: `Hebat! Rata-rata nilai kamu ${Math.round(average)} sudah melampaui target ${targetScore}`,
        icon: CheckCircle,
      });
      newRecommendations.push("Pertahankan konsistensi belajar untuk mempertahankan prestasi ini");
    } else {
      const gap = targetScore - average;
      newInsights.push({
        type: "warning",
        message: `Rata-rata nilai ${Math.round(average)} masih ${Math.round(gap)} poin di bawah target`,
        icon: AlertCircle,
      });
      newRecommendations.push(`Fokus meningkatkan nilai sebesar ${Math.round(gap)} poin untuk mencapai target`);
    }

    // Analyze by subject
    const subjectScores: { [key: string]: number[] } = {};
    grades.forEach((grade) => {
      if (!subjectScores[grade.subject]) {
        subjectScores[grade.subject] = [];
      }
      subjectScores[grade.subject].push(grade.score);
    });

    // Find weakest subject
    const subjectAverages = Object.entries(subjectScores).map(([subject, scores]) => ({
      subject,
      average: scores.reduce((a, b) => a + b, 0) / scores.length,
    }));

    if (subjectAverages.length > 0) {
      const weakest = subjectAverages.reduce((min, curr) => (curr.average < min.average ? curr : min));
      const strongest = subjectAverages.reduce((max, curr) => (curr.average > max.average ? curr : max));

      if (weakest.average < targetScore) {
        newInsights.push({
          type: "warning",
          message: `${weakest.subject} perlu perhatian lebih (rata-rata: ${Math.round(weakest.average)})`,
          icon: TrendingDown,
        });
        newRecommendations.push(`Alokasikan 30-45 menit ekstra untuk belajar ${weakest.subject} setiap hari`);
        newRecommendations.push(`Gunakan metode pembelajaran aktif seperti latihan soal dan diskusi kelompok untuk ${weakest.subject}`);
      }

      if (strongest.average > 80) {
        newInsights.push({
          type: "success",
          message: `${strongest.subject} adalah mata pelajaran terbaikmu (rata-rata: ${Math.round(strongest.average)})`,
          icon: CheckCircle,
        });
      }
    }

    // Analyze recent trend (last 3 grades)
    if (grades.length >= 3) {
      const recent = grades.slice(-3);
      const recentAvg = recent.reduce((acc, g) => acc + g.score, 0) / recent.length;
      const overall = grades.reduce((acc, g) => acc + g.score, 0) / grades.length;

      if (recentAvg > overall + 5) {
        newInsights.push({
          type: "success",
          message: "Tren positif! Nilai kamu meningkat dalam 3 entri terakhir",
          icon: CheckCircle,
        });
        newRecommendations.push("Teruskan strategi belajar yang sedang kamu terapkan");
      } else if (recentAvg < overall - 5) {
        newInsights.push({
          type: "warning",
          message: "Perhatian: Nilai kamu menurun dalam 3 entri terakhir",
          icon: AlertCircle,
        });
        newRecommendations.push("Evaluasi jadwal dan metode belajar kamu");
        newRecommendations.push("Pastikan kamu mendapatkan istirahat yang cukup");
      }
    }

    // Add general recommendations based on data
    if (grades.length >= 5) {
      newRecommendations.push("Buat catatan ringkasan untuk setiap mata pelajaran");
      newRecommendations.push("Lakukan review rutin setiap akhir pekan");
    }

    setInsights(newInsights);
    setRecommendations(newRecommendations);
  };

  return (
    <div className="space-y-4">
      {/* AI Insights Card */}
      <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: cardBg }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
            <Brain size={20} style={{ color: "#9C27B0" }} />
          </div>
          <h2 className="text-base" style={{ color: textColor }}>
            AI Insights
          </h2>
          <Sparkles size={16} style={{ color: "#9C27B0" }} className="ml-auto" />
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const color =
              insight.type === "success"
                ? "#4CAF50"
                : insight.type === "warning"
                ? "#FF9800"
                : "#2196F3";

            return (
              <div
                key={index}
                className="flex gap-3 p-3 rounded-xl"
                style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}
              >
                <Icon size={18} style={{ color, marginTop: "2px", flexShrink: 0 }} />
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                  {insight.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations Card */}
      {recommendations.length > 0 && (
        <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: cardBg }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
              <Lightbulb size={20} style={{ color: "#FFC107" }} />
            </div>
            <h2 className="text-base" style={{ color: textColor }}>
              Rekomendasi AI
            </h2>
          </div>

          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex gap-3 p-3 rounded-xl"
                style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#FFC107" }}
                />
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

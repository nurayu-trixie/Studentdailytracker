import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Moon, Sun, TrendingUp, Target, BarChart3, Trophy } from "lucide-react";
import { AIAssistant } from "../components/AIAssistant";

interface Grade {
  id: string;
  subject: string;
  score: number;
  date: string;
}

export function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [newScore, setNewScore] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Matematika");
  const [targetScore, setTargetScore] = useState(85);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    if (!name) {
      navigate("/");
      return;
    }
    setStudentName(name);

    // Load saved grades
    const savedGrades = localStorage.getItem("grades");
    if (savedGrades) {
      setGrades(JSON.parse(savedGrades));
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const subjects = ["Matematika", "IPA", "Bahasa Indonesia", "Bahasa Inggris", "IPS"];

  const handleAddGrade = () => {
    if (newScore && !isNaN(Number(newScore))) {
      const newGrade: Grade = {
        id: Date.now().toString(),
        subject: selectedSubject,
        score: Number(newScore),
        date: new Date().toLocaleDateString("id-ID"),
      };
      const updatedGrades = [...grades, newGrade];
      setGrades(updatedGrades);
      localStorage.setItem("grades", JSON.stringify(updatedGrades));
      setNewScore("");
    }
  };

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.score, 0);
    return Math.round(sum / grades.length);
  };

  const getHighestScore = () => {
    if (grades.length === 0) return 0;
    return Math.max(...grades.map((g) => g.score));
  };

  const calculateProgress = () => {
    const avg = calculateAverage();
    return Math.min(Math.round((avg / targetScore) * 100), 100);
  };

  const chartData = useMemo(() => {
    const subjectScores: { [key: string]: number[] } = {};
    grades.forEach((grade) => {
      if (!subjectScores[grade.subject]) {
        subjectScores[grade.subject] = [];
      }
      subjectScores[grade.subject].push(grade.score);
    });

    return Object.entries(subjectScores).map(([subject, scores], index) => ({
      id: `${subject}-${index}-${scores.length}`,
      subject: subject,
      name: subject.length > 10 ? subject.substring(0, 10) + "..." : subject,
      nilai: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    }));
  }, [grades]);

  const bgColor = darkMode ? "#121212" : "#F2F4F8";
  const cardBg = darkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#222222";
  const subtextColor = darkMode ? "#AAAAAA" : "#999999";

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl mb-1" style={{ color: textColor }}>
              Student Daily Tracker
            </h1>
            <p className="text-sm" style={{ color: subtextColor }}>
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-sm mt-1" style={{ color: subtextColor }}>
              Halo, {studentName}! 👋
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: cardBg }}
          >
            {darkMode ? (
              <Sun size={20} style={{ color: textColor }} />
            ) : (
              <Moon size={20} style={{ color: textColor }} />
            )}
          </button>
        </div>

        {/* Card Input Nilai */}
        <div className="rounded-2xl p-5 mb-4 shadow-sm" style={{ backgroundColor: cardBg }}>
          <h2 className="text-base mb-4" style={{ color: textColor }}>
            Input Nilai
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block mb-2 text-sm" style={{ color: textColor }}>
                Mata Pelajaran
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2.5 border outline-none"
                style={{
                  borderRadius: "10px",
                  borderColor: darkMode ? "#333333" : "#E0E0E0",
                  backgroundColor: cardBg,
                  color: textColor,
                }}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm" style={{ color: textColor }}>
                Nilai
              </label>
              <input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Masukkan nilai"
                className="w-full px-4 py-2.5 border outline-none"
                style={{
                  borderRadius: "10px",
                  borderColor: darkMode ? "#333333" : "#E0E0E0",
                  backgroundColor: cardBg,
                  color: textColor,
                }}
                min="0"
                max="100"
              />
            </div>
            <button
              onClick={handleAddGrade}
              className="w-full text-white py-2.5 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: "10px",
                height: "44px",
              }}
            >
              Tambah Nilai
            </button>
          </div>
        </div>

        {/* Card Target */}
        <div className="rounded-2xl p-5 mb-4 shadow-sm" style={{ backgroundColor: cardBg }}>
          <h2 className="text-base mb-4" style={{ color: textColor }}>
            Target Nilai
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="flex-1 px-4 py-2.5 border outline-none"
              style={{
                borderRadius: "10px",
                borderColor: darkMode ? "#333333" : "#E0E0E0",
                backgroundColor: cardBg,
                color: textColor,
              }}
              min="0"
              max="100"
            />
            <div className="px-4 py-2.5 rounded-lg" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
              <span className="text-sm" style={{ color: textColor }}>Target: {targetScore}</span>
            </div>
          </div>
        </div>

        {/* Card Dashboard */}
        <div className="rounded-2xl p-5 mb-4 shadow-sm" style={{ backgroundColor: cardBg }}>
          <h2 className="text-base mb-4" style={{ color: textColor }}>
            Dashboard
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Rata-rata */}
            <div className="rounded-xl p-4" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={18} style={{ color: "#2196F3" }} />
                <span className="text-xs" style={{ color: subtextColor }}>
                  Rata-rata
                </span>
              </div>
              <div className="text-2xl" style={{ color: textColor }}>
                {calculateAverage()}
              </div>
            </div>

            {/* Target */}
            <div className="rounded-xl p-4" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} style={{ color: "#4CAF50" }} />
                <span className="text-xs" style={{ color: subtextColor }}>
                  Target
                </span>
              </div>
              <div className="text-2xl" style={{ color: textColor }}>
                {targetScore}
              </div>
            </div>

            {/* Progres */}
            <div className="rounded-xl p-4" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} style={{ color: "#FF9800" }} />
                <span className="text-xs" style={{ color: subtextColor }}>
                  Progres
                </span>
              </div>
              <div className="text-2xl" style={{ color: textColor }}>
                {calculateProgress()}%
              </div>
            </div>

            {/* Nilai Tertinggi */}
            <div className="rounded-xl p-4" style={{ backgroundColor: darkMode ? "#2d2d2d" : "#F2F4F8" }}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={18} style={{ color: "#FFD700" }} />
                <span className="text-xs" style={{ color: subtextColor }}>
                  Tertinggi
                </span>
              </div>
              <div className="text-2xl" style={{ color: textColor }}>
                {getHighestScore()}
              </div>
            </div>
          </div>
        </div>

        {/* Card Grafik */}
        <div className="rounded-2xl p-5 mb-4 shadow-sm" style={{ backgroundColor: cardBg }}>
          <h2 className="text-base mb-4" style={{ color: textColor }}>
            Grafik Nilai per Mata Pelajaran
          </h2>
          {grades.length > 0 ? (
            <div className="space-y-4">
              {chartData.map((data) => {
                const maxScore = 100;
                const percentage = (data.nilai / maxScore) * 100;
                return (
                  <div key={data.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm" style={{ color: textColor }}>
                        {data.subject}
                      </span>
                      <span className="text-sm font-medium" style={{ color: textColor }}>
                        {data.nilai}
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full overflow-hidden"
                      style={{
                        backgroundColor: darkMode ? "#2d2d2d" : "#E0E0E0",
                        height: "32px",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: "#2196F3",
                        }}
                      >
                        {percentage > 15 && (
                          <span className="text-xs font-medium text-white">
                            {data.nilai}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <p className="text-sm" style={{ color: subtextColor }}>
                Belum ada data nilai
              </p>
            </div>
          )}
        </div>

        {/* AI Assistant */}
        <AIAssistant grades={grades} targetScore={targetScore} darkMode={darkMode} />
      </div>
    </div>
  );
}
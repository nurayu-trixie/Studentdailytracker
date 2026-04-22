import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Grade {
  id: string;
  subject: string;
  score: number;
  date: string;
  note?: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  studentName: string;
  setStudentName: (name: string) => void;
  grades: Grade[];
  addGrade: (grade: Omit<Grade, "id" | "date">) => void;
  deleteGrade: (id: string) => void;
  targetScore: number;
  setTargetScore: (score: number) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [studentName, setStudentNameState] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [targetScore, setTargetScoreState] = useState(85);

  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    if (savedDark === "true") setDarkMode(true);

    const savedName = localStorage.getItem("studentName");
    if (savedName) setStudentNameState(savedName);

    const savedGrades = localStorage.getItem("grades");
    if (savedGrades) setGrades(JSON.parse(savedGrades));

    const savedTarget = localStorage.getItem("targetScore");
    if (savedTarget) setTargetScoreState(Number(savedTarget));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", (!prev).toString());
      return !prev;
    });
  };

  const setStudentName = (name: string) => {
    setStudentNameState(name);
    localStorage.setItem("studentName", name);
  };

  const addGrade = (grade: Omit<Grade, "id" | "date">) => {
    const newGrade: Grade = {
      ...grade,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setGrades((prev) => {
      const updated = [newGrade, ...prev];
      localStorage.setItem("grades", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGrade = (id: string) => {
    setGrades((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      localStorage.setItem("grades", JSON.stringify(updated));
      return updated;
    });
  };

  const setTargetScore = (score: number) => {
    setTargetScoreState(score);
    localStorage.setItem("targetScore", score.toString());
  };

  const logout = () => {
    localStorage.removeItem("studentName");
    setStudentNameState("");
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        studentName,
        setStudentName,
        grades,
        addGrade,
        deleteGrade,
        targetScore,
        setTargetScore,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

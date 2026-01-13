
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Loader2, FileSpreadsheet, Sun, Moon } from 'lucide-react';
import { fetchGradesFromExcel } from './services/excelService';
import { StudentRecord, AuthCredentials, ViewState } from './types';
import LoginForm from './components/LoginForm';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [data, setData] = useState<StudentRecord[]>([]);
  const [view, setView] = useState<ViewState>('loading');
  const [currentStudent, setCurrentStudent] = useState<StudentRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      const grades = await fetchGradesFromExcel();
      setData(grades);
      setTimeout(() => setView('login'), 800);
    };
    loadData();
  }, []);

  const handleLogin = useCallback((creds: AuthCredentials) => {
    const found = data.find(record => {
      const idMatch = String(record["Student ID"]).trim().toLowerCase() === creds.studentId.trim().toLowerCase();
      const nameMatch = record["Student Name"].trim().toLowerCase() === creds.studentName.trim().toLowerCase();
      return idMatch && nameMatch;
    });

    if (found) {
      setErrorMessage('');
      setCurrentStudent(found);
      setView('result');
    } else {
      setErrorMessage('Student not found. Please verify your ID and Name.');
    }
  }, [data]);

  const handleReset = () => {
    setCurrentStudent(null);
    setErrorMessage('');
    setView('login');
  };

  return (
    <div className="min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-teal-50/30 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      
      {/* Theme Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-all z-50"
        aria-label="Toggle Dark Mode"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Decorative Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-4 border border-indigo-100 dark:border-slate-700 transition-colors">
          <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-outfit transition-colors">Grade Retrieval Portal</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Securely access your academic achievements</p>
      </motion.div>

      <main className="w-full max-w-md relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {view === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl"
            >
              <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
              <p className="text-slate-700 dark:text-slate-300 font-semibold">Initializing Database...</p>
            </motion.div>
          )}

          {view === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <LoginForm 
                onSubmit={handleLogin} 
                errorMessage={errorMessage}
                clearError={() => setErrorMessage('')}
              />
            </motion.div>
          )}

          {view === 'result' && currentStudent && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <ResultCard student={currentStudent} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer info */}
      <footer className="mt-12 text-slate-500 dark:text-slate-600 text-sm font-medium flex items-center gap-2 transition-colors">
        <FileSpreadsheet className="w-4 h-4" />
        <span>Powered by University Registrar Database</span>
      </footer>
    </div>
  );
};

export default App;

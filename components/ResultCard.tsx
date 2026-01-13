
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCw, BookOpen, Award, Calendar, BadgeCheck } from 'lucide-react';
import { StudentRecord } from '../types';

interface ResultCardProps {
  student: StudentRecord;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ student, onReset }) => {
  // Logic for grade color
  const getGradeStyles = (grade: string | number) => {
    const g = String(grade).toUpperCase();
    if (g.startsWith('A')) return 'from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 shadow-emerald-200 dark:shadow-none';
    if (g.startsWith('B')) return 'from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 shadow-blue-200 dark:shadow-none';
    if (g.startsWith('C')) return 'from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 shadow-amber-200 dark:shadow-none';
    return 'from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900 shadow-slate-200 dark:shadow-none';
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-2xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.75rem] p-6 sm:p-8">
        {/* Confetti-like success indicator */}
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
            className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">Welcome back, {student["Student Name"]}!</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Your results are ready for viewing.</p>
        </div>

        {/* Grade Display Area */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.1em]">Course Title</p>
                <p className="font-bold text-slate-900 dark:text-slate-100 truncate pr-2">{student["Course"]}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.1em] mb-1">Semester</p>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                {student["Semester"] || 'Current'}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.1em] mb-1">Status</p>
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <BadgeCheck className="w-4 h-4" />
                {student["Status"] || 'Enrolled'}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`relative mt-6 p-8 rounded-[1.5rem] bg-gradient-to-br ${getGradeStyles(student["Grade"])} text-white shadow-xl flex flex-col items-center justify-center overflow-hidden`}
          >
            {/* Background Decorative Icon */}
            <Award className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            
            <span className="text-xs font-bold opacity-90 mb-1 uppercase tracking-[0.2em]">Final Grade</span>
            <span className="text-7xl font-black font-outfit drop-shadow-lg">{student["Grade"]}</span>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full mt-8 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold py-3 rounded-xl transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Check another result
        </motion.button>
      </div>
    </div>
  );
};

export default ResultCard;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Add Loader2 to the list of icons imported from lucide-react
import { User, IdCard, Search, AlertCircle, Loader2 } from 'lucide-react';
import { AuthCredentials } from '../types';

interface LoginFormProps {
  onSubmit: (creds: AuthCredentials) => void;
  errorMessage: string;
  clearError: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, errorMessage, clearError }) => {
  const [creds, setCreds] = useState<AuthCredentials>({ studentName: '', studentId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creds.studentName || !creds.studentId) return;
    
    setIsSubmitting(true);
    // Mimic processing time
    setTimeout(() => {
      onSubmit(creds);
      setIsSubmitting(false);
    }, 600);
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  return (
    <motion.div 
      animate={errorMessage ? shakeAnimation : {}}
      className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Login</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Enter your details exactly as they appear in your registration.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Student Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input 
              type="text"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
              placeholder="e.g. Alex Johnson"
              value={creds.studentName}
              onChange={(e) => {
                setCreds(prev => ({ ...prev, studentName: e.target.value }));
                if (errorMessage) clearError();
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
            Student ID / Code
          </label>
          <div className="relative">
            <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input 
              type="text"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
              placeholder="e.g. S1001"
              value={creds.studentId}
              onChange={(e) => {
                setCreds(prev => ({ ...prev, studentId: e.target.value }));
                if (errorMessage) clearError();
              }}
            />
          </div>
        </div>

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-700 dark:text-red-400 text-sm font-medium"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              Check My Grades
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default LoginForm;

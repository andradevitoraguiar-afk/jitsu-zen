import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, User } from '../types';

interface AppContextProps {
  state: AppState;
  login: (user: User) => void;
  logout: () => void;
  toggleTechnique: (id: string) => void;
  checkIn: () => void;
}

const initialState: AppState = {
  user: null,
  progress: {
    completedTechniques: [],
    attendanceDates: []
  }
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  // Load from local storage on mount
  useEffect(() => {
    const lastUserEmail = localStorage.getItem('last_user');
    if (lastUserEmail) {
      const storedUser = localStorage.getItem(`user_${lastUserEmail}`);
      if (storedUser) {
        const u = JSON.parse(storedUser);
        const storedProgress = localStorage.getItem(`progress_${u.email}`);
        setState({
          user: u,
          progress: storedProgress ? JSON.parse(storedProgress) : { completedTechniques: [], attendanceDates: [] }
        });
      }
    }
  }, []);

  // Save progress when it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem(`progress_${state.user.email}`, JSON.stringify(state.progress));
    }
  }, [state.progress, state.user]);

  const login = (user: User) => {
    localStorage.setItem('last_user', user.email);
    const storedProgress = localStorage.getItem(`progress_${user.email}`);
    setState({
      user,
      progress: storedProgress ? JSON.parse(storedProgress) : { completedTechniques: [], attendanceDates: [] }
    });
  };

  const logout = () => {
    localStorage.removeItem('last_user');
    setState(initialState);
  };

  const toggleTechnique = (id: string) => {
    setState(prev => {
      const isCompleted = prev.progress.completedTechniques.includes(id);
      const newCompleted = isCompleted
        ? prev.progress.completedTechniques.filter(tid => tid !== id)
        : [...prev.progress.completedTechniques, id];
      return {
        ...prev,
        progress: { ...prev.progress, completedTechniques: newCompleted }
      };
    });
  };

  const checkIn = () => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    setState(prev => {
        if (!prev.progress.attendanceDates.includes(iso)) {
            return {
                ...prev,
                progress: { ...prev.progress, attendanceDates: [...prev.progress.attendanceDates, iso] }
            }
        }
        return prev;
    });
  };

  return (
    <AppContext.Provider value={{ state, login, logout, toggleTechnique, checkIn }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
export interface User {
  email: string;
  name: string;
  password?: string;
}

export interface Technique {
  id: string;
  title: string;
  category: string;
  description: string;
  tips: string[];
  videoUrl?: string;
}

export interface Level {
  id: string;
  name: string;
  color: string;
  description: string;
  progress: number; // percentage placeholder for logic if needed
  techniques: Technique[];
}

export interface Discipline {
  id: string;
  name: string;
  iconType: string;
  instructor: string;
  imageUrl: string;
  description: string;
  levels: Level[];
}

export interface Session {
  id: string;
  time: string;
  disciplineId: string;
  title: string;
  instructor: string;
  duration: string;
}

export interface DaySchedule {
  day: string;
  shortDay: string;
  sessions: Session[];
}

export interface AppState {
  user: User | null;
  progress: {
    completedTechniques: string[];
    attendanceDates: string[];
  };
}

export interface LoginState {
  isRegistering: boolean;
  error: string;
}
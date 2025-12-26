import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WEEKLY_SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // Adjust JS day (0=Sun) to our array (0=Mon)
  });

  const todaySessions = WEEKLY_SCHEDULE[selectedDayIndex].sessions;

  return (
    <div className="bg-background-light font-display text-black antialiased min-h-screen pb-20 fade-in">
        <header className="sticky top-0 z-20 flex items-center bg-white/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100">
            <button onClick={() => navigate('/dashboard')} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
                <span className="material-symbols-outlined" style={{fontSize: '24px'}}>arrow_back</span>
            </button>
            <h2 className="text-black text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Horários</h2>
            <div className="w-10"></div>
        </header>
        <div className="sticky top-[68px] z-10 bg-white pt-2 pb-1 border-b border-gray-100">
            <div className="flex overflow-x-auto no-scrollbar px-4 gap-2 pb-2">
                {WEEKLY_SCHEDULE.map((day, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setSelectedDayIndex(idx)} 
                        className={`flex min-w-[60px] flex-col items-center justify-center rounded-2xl py-3 px-2 transition-colors group ${selectedDayIndex === idx ? 'bg-black text-white shadow-xl shadow-black/20 scale-105' : 'bg-transparent text-gray-400 hover:bg-gray-50'}`}
                    >
                        <span className="text-xs font-bold opacity-70 mb-1">{day.shortDay}</span>
                        <span className="text-lg font-bold">{10 + idx}</span>
                    </button>
                ))}
            </div>
        </div>
        <div className="px-4 pt-6 pb-2">
            <h2 className="text-black tracking-tight text-[28px] font-extrabold leading-tight">Treinos</h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">{WEEKLY_SCHEDULE[selectedDayIndex].day}</p>
        </div>
        <div className="flex flex-col gap-4 p-4">
            {todaySessions.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">fitness_center</span>
                    <p className="text-gray-500 text-sm">Sem treinos hoje. <br/> Descanso também é treino.</p>
                </div>
            ) : todaySessions.map(session => (
                <div key={session.id} className="relative group overflow-hidden rounded-2xl bg-white border border-gray-200 p-4 shadow-sm hover:border-black transition-colors">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-black text-lg font-bold leading-tight">{session.title}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                            <span className="material-symbols-outlined text-[16px]">schedule</span> {session.time} • {session.duration}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="size-6 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">{session.instructor.charAt(0)}</div>
                            <p className="text-gray-600 text-xs font-medium">{session.instructor}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Schedule;
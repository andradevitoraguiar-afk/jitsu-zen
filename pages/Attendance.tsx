import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Attendance: React.FC = () => {
  const { state, checkIn } = useApp();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const checkedInToday = state.progress.attendanceDates.includes(todayIso);

  const changeMonth = (offset: number) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + offset, 1));
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(date.getFullYear(), date.getMonth(), i);
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const attended = state.progress.attendanceDates.includes(iso);
        const isToday = today.getDate() === i && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear();

        days.push(
            <button key={i} className={`relative aspect-square flex flex-col items-center justify-center rounded-full text-sm font-bold
                ${isToday ? 'bg-black text-white shadow-lg shadow-black/20' : ''}
                ${!isToday && attended ? 'bg-slate-100 text-slate-900' : ''}
                ${!isToday && !attended ? 'text-slate-700 hover:bg-black/5' : ''}`}>
                {i}
                {attended && !isToday && <span className="absolute bottom-1.5 w-1 h-1 bg-slate-600 rounded-full"></span>}
            </button>
        );
    }
    return days;
  };

  return (
    <div className="bg-white text-slate-900 font-display antialiased min-h-screen flex flex-col pb-20 fade-in">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center justify-between p-4">
                <button onClick={() => navigate('/dashboard')} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
                    <span className="material-symbols-outlined" style={{fontSize: '24px'}}>arrow_back</span>
                </button>
                <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Frequência</h2>
                <div className="size-10"></div>
            </div>
        </header>
        <main className="flex-1 flex flex-col items-center w-full px-4 pt-2 pb-24 max-w-md mx-auto bg-white">
            <div className="w-full mt-4">
                <div className="flex items-center justify-between mb-6 px-2">
                    <button onClick={() => changeMonth(-1)} className="text-slate-500 hover:text-black transition-colors p-2"><span className="material-symbols-outlined">chevron_left</span></button>
                    <p className="text-lg font-bold text-black">{monthNames[date.getMonth()]} {date.getFullYear()}</p>
                    <button onClick={() => changeMonth(1)} className="text-slate-500 hover:text-black transition-colors p-2"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-7 mb-2">
                        {weekDays.map((d, i) => <div key={i} className="text-center text-xs font-semibold text-slate-400 uppercase py-2">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                        {renderDays()}
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col gap-2 rounded-2xl p-5 border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center gap-2 text-black">
                        <span className="material-symbols-outlined text-[20px]">fitness_center</span>
                        <p className="text-xs font-bold uppercase tracking-wider">Total</p>
                    </div>
                    <p className="text-slate-900 tracking-tight text-3xl font-bold">{state.progress.attendanceDates.length}</p>
                    <p className="text-xs text-slate-500 font-medium">Treinos</p>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl p-5 border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center gap-2 text-slate-700">
                        <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                        <p className="text-xs font-bold uppercase tracking-wider">Sequência</p>
                    </div>
                    <p className="text-slate-900 tracking-tight text-3xl font-bold">--</p>
                    <p className="text-xs text-slate-500 font-medium">Dias seguidos</p>
                </div>
            </div>
            <div className="w-full mt-8">
                <button 
                    onClick={checkIn} 
                    disabled={checkedInToday}
                    className={`group relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-xl h-14 shadow-lg shadow-black/25 active:scale-[0.98] transition-all duration-200 ${checkedInToday ? 'bg-slate-800 text-white cursor-default' : 'bg-black text-white hover:bg-slate-800'}`}
                >
                    <span className={`material-symbols-outlined relative z-10 ${checkedInToday ? 'filled' : ''}`}>check_circle</span>
                    <span className="text-base font-bold leading-normal tracking-[0.015em] relative z-10">{checkedInToday ? 'Presença Confirmada' : 'Fazer Check-in'}</span>
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">Confirme sua presença no dojo</p>
            </div>
        </main>
    </div>
  );
};

export default Attendance;
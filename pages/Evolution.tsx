import React from 'react';
import { useApp } from '../context/AppContext';
import { DISCIPLINES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Evolution: React.FC = () => {
  const { state } = useApp();

  const totalTechniques = DISCIPLINES.flatMap(d => d.levels.flatMap(l => l.techniques)).length;
  const learned = state.progress.completedTechniques.length;
  const percentage = totalTechniques > 0 ? Math.round((learned / totalTechniques) * 100) : 0;

  // Data for chart
  const chartData = DISCIPLINES.map(d => {
    const dTechs = d.levels.flatMap(l => l.techniques);
    const dCompleted = dTechs.filter(t => state.progress.completedTechniques.includes(t.id)).length;
    return {
      name: d.name.split(' ')[0], // Short name
      completed: dCompleted,
      total: dTechs.length
    };
  });

  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col antialiased text-black pb-24 fade-in">
        <header className="sticky top-0 z-20 flex items-center bg-white/95 backdrop-blur-md p-4 justify-between border-b border-gray-100">
            <h1 className="text-black text-xl font-bold tracking-tight">Evolução</h1>
            <div className="size-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">Z</div>
        </header>
        <main className="p-5 flex flex-col gap-6">
            <div className="bg-black text-white rounded-2xl p-6 shadow-xl shadow-black/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><span className="material-symbols-outlined text-9xl">emoji_events</span></div>
                <div className="relative z-10">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Domínio Geral</p>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-5xl font-black tracking-tighter">{percentage}%</span>
                        <span className="mb-2 text-gray-400 font-medium">das técnicas</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full transition-all duration-1000" style={{width: `${percentage}%`}}></div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2 text-gray-500"><span className="material-symbols-outlined text-xl">school</span><span className="text-xs font-bold uppercase">Aprendidas</span></div>
                    <p className="text-2xl font-bold text-black">{learned}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2 text-gray-500"><span className="material-symbols-outlined text-xl">history</span><span className="text-xs font-bold uppercase">Treinos</span></div>
                    <p className="text-2xl font-bold text-black">{state.progress.attendanceDates.length}</p>
                </div>
            </div>

            <div className="h-64 w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <h3 className="text-sm font-bold mb-4 uppercase text-gray-500">Técnicas por Disciplina</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000000' : '#4b5563'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4">Por Disciplina</h3>
                <div className="flex flex-col gap-4">
                    {DISCIPLINES.map(d => {
                        const dTechs = d.levels.flatMap(l => l.techniques);
                        const dCompleted = dTechs.filter(t => state.progress.completedTechniques.includes(t.id)).length;
                        const dPct = dTechs.length > 0 ? Math.round((dCompleted / dTechs.length) * 100) : 0;
                        return (
                            <div key={d.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold">{d.name}</h4>
                                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{dPct}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div className="bg-black h-2 rounded-full" style={{width: `${dPct}%`}}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    </div>
  );
};

export default Evolution;
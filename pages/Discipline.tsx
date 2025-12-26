import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DISCIPLINES } from '../constants';

const Discipline: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  
  const discipline = DISCIPLINES.find(d => d.id === id);

  if (!discipline) return <div>Disciplina não encontrada.</div>;

  const totalTechs = discipline.levels.reduce((acc, l) => acc + l.techniques.length, 0);

  return (
    <div className="bg-white text-black font-display antialiased pb-24 min-h-screen fade-in">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black px-4 h-14 flex items-center justify-between">
            <button onClick={() => navigate('/dashboard')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <span className="font-bold text-sm tracking-widest uppercase">Zen Jitsu</span>
            <div className="w-10"></div>
        </div>
        <div className="w-full h-48 relative border-b border-black overflow-hidden bg-gray-100">
            <img alt="Training" className="w-full h-full object-cover grayscale contrast-125" src={discipline.imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 w-full">
                <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide mb-2 inline-block">Disciplina</span>
                <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-black drop-shadow-sm">{discipline.name}</h1>
            </div>
        </div>
        <div className="px-5 py-6 flex flex-col gap-6">
            <p className="text-sm text-gray-700 leading-relaxed border-l-[3px] border-black pl-4 font-medium">{discipline.description}</p>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface border border-gray-200 rounded-lg p-3 text-center flex flex-col gap-1">
                    <span className="block text-xl font-black">{totalTechs}</span>
                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Técnicas</span>
                </div>
                <div className="bg-surface border border-gray-200 rounded-lg p-3 text-center flex flex-col gap-1">
                    <span className="block text-xl font-black">{discipline.levels.length}</span>
                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Níveis</span>
                </div>
                <div className="bg-surface border border-gray-200 rounded-lg p-3 text-center flex flex-col gap-1">
                    <span className="block text-xl font-black">--</span>
                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Horas</span>
                </div>
            </div>
        </div>
        <div className="px-5 pb-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined">stairs</span> Níveis
                </h2>
            </div>
            <div className="space-y-4 relative">
                <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gray-200 -z-10"></div>
                {discipline.levels.map(l => {
                    const lTechs = l.techniques.length;
                    const lCompleted = l.techniques.filter(t => state.progress.completedTechniques.includes(t.id)).length;
                    const pct = lTechs === 0 ? 0 : Math.round((lCompleted/lTechs)*100);
                    return (
                        <div key={l.id} onClick={() => navigate(`/discipline/${discipline.id}/level/${l.id}`)} className="cursor-pointer">
                            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden z-10 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-gray-50 border-2 border-black rounded-lg flex items-center justify-center shrink-0">
                                        <div className={`w-10 h-2 ${l.color} border border-gray-300 shadow-sm`}></div>
                                    </div>
                                    <div className="flex-1 pt-1 z-10">
                                        <h3 className="font-bold text-lg leading-none mb-1">{l.name}</h3>
                                        <p className="text-xs text-gray-500 mb-3 font-medium">{l.description}</p>
                                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                                            <span>Progresso</span> <span>{pct}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-100 rounded-full border border-black overflow-hidden">
                                            <div className="h-full bg-black transition-all duration-500" style={{width: `${pct}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default Discipline;
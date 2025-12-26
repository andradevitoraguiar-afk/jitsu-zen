import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DISCIPLINES } from '../constants';
import SenseiModal from '../components/SenseiModal';
import { askSensei } from '../services/geminiService';

const Level: React.FC = () => {
  const { disciplineId, levelId } = useParams<{ disciplineId: string, levelId: string }>();
  const navigate = useNavigate();
  const { state, toggleTechnique } = useApp();
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todas');
  
  // Sensei Modal State
  const [activeTechniqueTitle, setActiveTechniqueTitle] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discipline = DISCIPLINES.find(d => d.id === disciplineId);
  const level = discipline?.levels.find(l => l.id === levelId);

  if (!discipline || !level) return <div>Nível não encontrado.</div>;

  const allTechs = level.techniques.length;
  const completed = level.techniques.filter(t => state.progress.completedTechniques.includes(t.id)).length;
  const pct = allTechs === 0 ? 0 : Math.round((completed / allTechs) * 100);

  const categories = ['Todas', ...new Set(level.techniques.map(t => t.category || 'Geral'))];

  const filtered = level.techniques.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Todas' || t.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenSensei = async (techTitle: string) => {
    setActiveTechniqueTitle(techTitle);
    setIsModalOpen(true);
    setLoadingAi(true);
    setAiResponse(null);

    const response = await askSensei(techTitle, discipline.name);
    setAiResponse(response);
    setLoadingAi(false);
  };

  const handleCloseSensei = () => {
    setIsModalOpen(false);
    setActiveTechniqueTitle(null);
  };

  return (
    <div className="bg-background-light dark:bg-surface-dark text-black dark:text-white font-display antialiased min-h-screen flex flex-col fade-in">
        <SenseiModal 
            isOpen={isModalOpen} 
            onClose={handleCloseSensei} 
            title={activeTechniqueTitle || ''}
            response={aiResponse}
            loading={loadingAi}
        />

        <header className="sticky top-0 z-40 flex items-center justify-between px-4 pt-6 pb-4 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md">
            <button onClick={() => navigate(`/discipline/${disciplineId}`)} className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold uppercase tracking-wide">{level.name}</h1>
            <div className="w-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 pb-24 z-10">
            <div className="py-6">
                <div className="flex items-end justify-between mb-2">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Progresso do Nível</p>
                        <h2 className="text-2xl font-bold mt-1">{completed}<span className="text-gray-400">/{allTechs}</span> <span className="text-base font-normal text-gray-500">Técnicas</span></h2>
                    </div>
                    <div className="bg-black text-white px-3 py-1 rounded-full border border-black">
                        <span className="font-bold text-sm">{pct}%</span>
                    </div>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{width: `${pct}%`}}></div>
                </div>
            </div>

            <div className="mb-6">
                <div className="relative group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-black transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </span>
                    <input 
                        className="w-full bg-white dark:bg-[#2C2C2E] border border-gray-200 dark:border-[#3C3C3E] rounded-xl py-3.5 pl-12 pr-4 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all shadow-sm" 
                        placeholder="Buscar técnica..." 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-2">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)} 
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-colors ${filter === cat ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-black'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {filtered.map(tech => {
                    const isCompleted = state.progress.completedTechniques.includes(tech.id);
                    return (
                        <div key={tech.id} className="group relative bg-white dark:bg-[#1C1C1E] rounded-xl p-4 border border-gray-200 dark:border-[#2C2C2E] shadow-sm hover:border-black/30 transition-all duration-300">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-[#2C2C2E] text-gray-500 dark:text-gray-400">{tech.category || 'Geral'}</span>
                                    </div>
                                    <h3 className="text-base font-semibold text-black dark:text-white leading-tight mb-1 truncate">{tech.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{tech.description}</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <button onClick={() => handleOpenSensei(tech.title)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-800 text-xs font-bold transition-colors">
                                            <span className="material-symbols-outlined filled text-[16px]">smart_toy</span> Sensei AI
                                        </button>
                                        {tech.videoUrl && (
                                            <a href={tech.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 text-xs font-bold transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">play_circle</span> Vídeo Aula
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-start h-full pt-1">
                                    <button onClick={() => toggleTechnique(tech.id)} className={`w-8 h-8 border-2 rounded-lg transition-all flex items-center justify-center ${isCompleted ? 'bg-black border-black' : 'border-gray-300 hover:border-black'}`}>
                                        <span className={`material-symbols-outlined text-white text-[20px] transition-all duration-200 ${isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>check</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    </div>
  );
};

export default Level;
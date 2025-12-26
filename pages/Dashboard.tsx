import React from 'react';
import { useApp } from '../context/AppContext';
import { DISCIPLINES } from '../constants';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { state, logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full fade-in">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-colors">
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-black/10">Z</div>
                    <h1 className="text-black text-lg font-bold tracking-tight">Zen Jitsu</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={logout} className="relative p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-50">
                        <span className="material-symbols-outlined text-[24px]">logout</span>
                    </button>
                </div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto pb-24">
            <section className="p-5 pb-2">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative group cursor-pointer" onClick={() => navigate('/profile')}>
                        <div className="size-16 rounded-full bg-cover bg-center border-2 border-black p-0.5" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3srA55zGUWfg8BxETBFloB9muv6M8nfCIA07QKBPEYjiTkK0Vx-3nTsexLH7ov4KJaJ_k4ZO6cyAIFp4PW4Q-sAJGrrzkJoxbDveyBUhhn5ZHmTYC9obcEj5gKIaDO1t0vsZX_gr-fwB_mHrJPjJUjA5kOE4-BEAELAnGljRYMgNlEw2IMot1Ic-LXmCsuwWB2BcF3aWdhUceKAKo6dUKf2fqNXRXsdIMcd8Z4a-iYZ7mkNGiQ_L8v7V5SP1TnGwx2W1SFlouMg')"}}></div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-black text-2xl font-bold leading-tight">Olá, {state.user?.name}</h2>
                        <span className="text-gray-600 font-medium text-sm tracking-wide uppercase">Faixa Branca • 1º Grau</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div onClick={() => navigate('/evolution')} className="bg-card-gray p-5 rounded-xl flex flex-col justify-between h-36 border border-transparent hover:border-black/10 transition-colors group relative overflow-hidden cursor-pointer">
                        <div className="flex justify-between items-start z-10">
                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-black group-hover:text-white transition-colors text-black">
                                <span className="material-symbols-outlined">bar_chart</span>
                            </div>
                            <span className="text-xs font-bold text-black bg-white px-2 py-1 rounded-full shadow-sm">Ver</span>
                        </div>
                        <div className="z-10">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Técnicas</p>
                            <p className="text-black text-3xl font-extrabold tracking-tight">{state.progress.completedTechniques.length}</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/schedule')} className="bg-black p-5 rounded-xl shadow-xl shadow-black/10 flex flex-col justify-between h-36 relative overflow-hidden cursor-pointer">
                        <div className="absolute -right-6 -top-6 size-32 bg-gray-800 rounded-full blur-3xl opacity-50"></div>
                        <div className="flex justify-between items-start z-10">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                        </div>
                        <div className="z-10">
                            <p className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-1">Próxima Aula</p>
                            <p className="text-white text-xl font-bold leading-tight">Hoje, 19:30</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-black text-xl font-bold">Minhas Disciplinas</h3>
                    <button className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Ver todas</button>
                </div>
                <div className="flex flex-col gap-4">
                    {DISCIPLINES.map(d => {
                        const allTechs = d.levels.flatMap(l => l.techniques);
                        const completed = allTechs.filter(t => state.progress.completedTechniques.includes(t.id)).length;
                        const pct = allTechs.length === 0 ? 0 : Math.round((completed/allTechs.length)*100);
                        return (
                            <article key={d.id} onClick={() => navigate(`/discipline/${d.id}`)} className="bg-card-gray rounded-2xl p-5 border border-transparent hover:border-black/20 transition-all cursor-pointer group">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 shrink-0 rounded-xl bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-300" style={{backgroundImage: `url('${d.imageUrl}')`}}></div>
                                    <div className="flex-1 flex flex-col justify-between py-0.5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-black font-bold text-lg leading-tight mb-1">{d.name}</h4>
                                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{d.instructor}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-400 group-hover:text-black transition-colors">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-xs mb-2 font-medium">
                                        <span className="text-gray-600">Progresso</span>
                                        <span className="text-black font-bold">{pct}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-black h-1.5 rounded-full transition-all duration-500" style={{width: `${pct}%`}}></div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    </div>
  );
};

export default Dashboard;
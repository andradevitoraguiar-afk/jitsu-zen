import React from 'react';
import { useApp } from '../context/AppContext';

const Profile: React.FC = () => {
  const { state, logout } = useApp();

  const menuItems = [
    { icon: 'person', title: 'Dados Pessoais', subtitle: 'Editar informações' },
    { icon: 'school', title: 'Histórico de Graduação', subtitle: 'Minhas faixas' },
    { icon: 'settings', title: 'Configurações', subtitle: 'Notificações e app' },
    { icon: 'help', title: 'Ajuda & Suporte', subtitle: 'Fale conosco' }
  ];

  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col antialiased text-black pb-24 fade-in">
        <div className="relative bg-black text-white pt-10 pb-16 px-6 rounded-b-[2.5rem] shadow-xl shadow-black/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="size-24 rounded-full border-4 border-white shadow-lg bg-gray-800 flex items-center justify-center text-4xl font-bold mb-4 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3srA55zGUWfg8BxETBFloB9muv6M8nfCIA07QKBPEYjiTkK0Vx-3nTsexLH7ov4KJaJ_k4ZO6cyAIFp4PW4Q-sAJGrrzkJoxbDveyBUhhn5ZHmTYC9obcEj5gKIaDO1t0vsZX_gr-fwB_mHrJPjJUjA5kOE4-BEAELAnGljRYMgNlEw2IMot1Ic-LXmCsuwWB2BcF3aWdhUceKAKo6dUKf2fqNXRXsdIMcd8Z4a-iYZ7mkNGiQ_L8v7V5SP1TnGwx2W1SFlouMg')"}}></div>
                <h2 className="text-2xl font-bold">{state.user?.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{state.user?.email}</p>
                <div className="mt-4 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">Faixa Branca • 1º Grau</div>
            </div>
        </div>
        <main className="flex-1 p-6 -mt-8 relative z-20">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 overflow-hidden">
                {menuItems.map((item, i) => (
                    <button key={i} className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${i < 3 ? 'border-b border-gray-100' : ''}`}>
                        <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </button>
                ))}
            </div>
            <button onClick={logout} className="w-full mt-6 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 text-red-500 font-bold hover:bg-red-50 transition-colors">
                <span className="material-symbols-outlined">logout</span> Sair da conta
            </button>
        </main>
    </div>
  );
};

export default Profile;
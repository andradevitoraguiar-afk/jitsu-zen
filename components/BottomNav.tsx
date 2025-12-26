import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full glass-nav border-t border-gray-200 pb-5 pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-30">
        <div className="flex justify-between items-center max-w-md mx-auto h-16">
            <button 
                onClick={() => navigate('/dashboard')} 
                className={`flex flex-col items-center justify-center gap-1 w-12 group transition-colors ${getActive('/dashboard') ? 'text-black' : 'text-gray-400 hover:text-black'}`}
            >
                <span className={`material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform ${getActive('/dashboard') ? 'filled' : ''}`}>home</span>
                <span className="text-[10px] font-medium">Início</span>
            </button>

            <button 
                onClick={() => navigate('/schedule')} 
                className={`flex flex-col items-center justify-center gap-1 w-12 group transition-colors ${getActive('/schedule') ? 'text-black' : 'text-gray-400 hover:text-black'}`}
            >
                <span className={`material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform ${getActive('/schedule') ? 'filled' : ''}`}>calendar_month</span>
                <span className="text-[10px] font-medium">Agenda</span>
            </button>

            <div className="relative -top-6">
                <button 
                    onClick={() => navigate('/attendance')} 
                    className="size-14 rounded-full bg-black text-white shadow-xl shadow-black/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                >
                    <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
                </button>
            </div>

            <button 
                onClick={() => navigate('/evolution')} 
                className={`flex flex-col items-center justify-center gap-1 w-12 group transition-colors ${getActive('/evolution') ? 'text-black' : 'text-gray-400 hover:text-black'}`}
            >
                <span className={`material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform ${getActive('/evolution') ? 'filled' : ''}`}>bar_chart</span>
                <span className="text-[10px] font-medium">Evolução</span>
            </button>

            <button 
                onClick={() => navigate('/profile')} 
                className={`flex flex-col items-center justify-center gap-1 w-12 group transition-colors ${getActive('/profile') ? 'text-black' : 'text-gray-400 hover:text-black'}`}
            >
                <span className={`material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform ${getActive('/profile') ? 'filled' : ''}`}>person</span>
                <span className="text-[10px] font-medium">Perfil</span>
            </button>
        </div>
    </nav>
  );
};

export default BottomNav;
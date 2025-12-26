import React from 'react';

interface SenseiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  response: string | null;
  loading: boolean;
}

const SenseiModal: React.FC<SenseiModalProps> = ({ isOpen, onClose, title, response, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center fade-in">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative w-full max-w-md m-4 bg-black text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-800 to-black opacity-50 z-0"></div>
            <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold tracking-wider">SENSEI AI</h3>
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="size-16 bg-white text-black rounded-2xl flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-4xl">smart_toy</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold leading-tight">{title}</h2>
                        <p className="text-gray-400 text-sm">Análise Técnica</p>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar mb-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
                            <p className="text-gray-400 text-sm animate-pulse">Meditando...</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-sm">
                            <div className="whitespace-pre-line text-gray-300 leading-relaxed font-medium">
                                {response || ''}
                            </div>
                        </div>
                    )}
                </div>
                <button 
                    onClick={onClose} 
                    className="w-full bg-white text-black font-bold h-14 rounded-2xl uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                    Oss
                </button>
            </div>
        </div>
    </div>
  );
};

export default SenseiModal;
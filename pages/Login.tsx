import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    const storedUserStr = localStorage.getItem(`user_${email}`);

    if (isRegistering) {
        if (storedUserStr) {
            setError('Usuário já existe.');
            return;
        }
        const newUser = { email, name: email.split('@')[0], password };
        localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
        login(newUser);
        navigate('/dashboard');
    } else {
        if (!storedUserStr) {
            setError('Usuário não encontrado.');
            return;
        }
        const parsed = JSON.parse(storedUserStr);
        if (parsed.password !== password) {
            setError('Senha incorreta.');
            return;
        }
        login(parsed);
        navigate('/dashboard');
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white text-black font-display antialiased fade-in">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl opacity-80"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] bg-gray-200 rounded-full blur-3xl opacity-80"></div>
            <div className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-multiply opacity-[0.03]" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWydIwwXA2JFYIjLgORrcq1R8Kir_C8_cyEQjGIzZiNZRnhQ7JCXmIN8YQKIKphDpEWJMLkNg3-OGfaa-2L1sxoNgY-RCaM3j-xI9LVMI5BvwNXV4_4snjb1hfJUFWG5yo6J8ntPCumc0fpcnyZzp8a7z1AytZaBk80ndsXyh67xB55PbOT9Adhaut4WA9HFWbRAbWpvuMixSTMx5A-XbNRHHs7SApvR-r2SwSFvqSeZ6DUeOlg-pNCGB_cyQbrDg0GLtLrQETww')"}}></div>
        </div>
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-xl">
                    <span className="material-symbols-outlined text-3xl">self_improvement</span>
                </div>
                <h1 className="text-center text-4xl font-black tracking-tighter text-black uppercase drop-shadow-sm">
                    ZEN <span className="font-light">JITSU</span>
                </h1>
                <p className="mt-3 text-center text-sm text-gray-500 font-medium tracking-wide uppercase">
                    Domine sua mente. Treine seu corpo.
                </p>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold leading-6 text-black">Email</label>
                        <div className="relative mt-2 rounded-xl shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <span className="material-symbols-outlined text-black text-[20px]">mail</span>
                            </div>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="block w-full rounded-xl border-0 bg-white py-4 pl-12 pr-4 text-black ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200" 
                                placeholder="exemplo@email.com" 
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold leading-6 text-black">Senha</label>
                        <div className="relative mt-2 rounded-xl shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <span className="material-symbols-outlined text-black text-[20px]">lock</span>
                            </div>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="block w-full rounded-xl border-0 bg-white py-4 pl-12 pr-12 text-black ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200" 
                                placeholder="••••••••" 
                                required
                            />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}
                    <div className="flex flex-col gap-4 pt-2">
                        <button type="submit" className="flex w-full justify-center items-center gap-2 rounded-xl bg-black px-3 py-4 text-sm font-bold leading-6 text-white shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all active:scale-[0.98]">
                            {isRegistering ? 'CADASTRAR' : 'ENTRAR'}
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                        <button type="button" onClick={() => { setIsRegistering(!isRegistering); setError(''); }} className="flex w-full justify-center rounded-xl bg-gray-900 px-3 py-4 text-sm font-semibold leading-6 text-white hover:bg-black transition-all active:scale-[0.98]">
                            {isRegistering ? 'JÁ TENHO CONTA' : 'CRIAR CONTA'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
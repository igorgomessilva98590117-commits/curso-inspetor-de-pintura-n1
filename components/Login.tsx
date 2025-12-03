import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Contexto de autenticação
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validação básica
      if (!email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      // Tentativa de login via Contexto
      // Normalizamos o email para garantir consistência
      const success = await login(email.trim().toLowerCase(), password);

      if (!success) {
        throw new Error('Credenciais inválidas. Tente novamente.');
      }
      
      // Se sucesso, o App.tsx redirecionará automaticamente via isAuthenticated
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 font-sans selection:bg-orange-500 selection:text-white">
      {/* Background Effects - Sutis para dar profundidade */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
            <span className="text-white font-bold text-xl">IM</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
            INSPETOR<span className="text-orange-500">MASTER</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="email">
              E-mail
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
              </div>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                placeholder="adm"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="password">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                placeholder="••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/5 border border-red-500/10 p-3 rounded-lg animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:translate-y-[-1px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                ENTRAR
              </>
            )}
          </button>

          {/* Footer Links */}
          <div className="flex items-center justify-center mt-6">
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200"
              onClick={() => alert('Funcionalidade de recuperação de senha será implementada em breve.')}
            >
              Esqueci minha senha
            </button>
          </div>
        </form>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="text-xs text-gray-700">
          © {new Date().getFullYear()} Inspetor Master. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};


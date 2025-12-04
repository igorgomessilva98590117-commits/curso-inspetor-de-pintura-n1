import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, User, UserPlus, CheckCircle } from 'lucide-react';

type TabType = 'login' | 'register';

export const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  // Estados de feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
    setSuccess('');
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    resetForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const result = await login(email.trim(), password);

      if (!result.success) {
        setError(result.error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validação de confirmação de senha
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        setIsLoading(false);
        return;
      }

      const result = await register(email.trim(), password, name.trim());

      if (result.success) {
        if (result.error) {
          // Mensagem de sucesso com instrução (ex: confirmar email)
          setSuccess(result.error);
          resetForm();
        }
        // Se não tem mensagem extra, o login foi automático
      } else {
        setError(result.error || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 font-sans selection:bg-orange-500 selection:text-white">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      {/* Login/Register Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
        
        {/* Header */}
        <div className="text-center pt-8 pb-4 px-8">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
            <span className="text-white font-bold text-xl">IM</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
            INSPETOR<span className="text-orange-500">MASTER</span>
          </h1>
          <p className="text-gray-500 text-sm">
            {activeTab === 'login' ? 'Acesse sua conta para continuar' : 'Crie sua conta gratuita'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mx-8 mb-6 bg-[#141414] rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'login'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('register')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'register'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Cadastrar
          </button>
        </div>

        {/* Form Container */}
        <div className="px-8 pb-8">
          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="login-email">
                  E-mail ou Usuário
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="login-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="seu@email.com"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="login-password">
                  Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="••••••"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {/* Error/Success Messages */}
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
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="register-name">
                  Nome Completo
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="register-email">
                  E-mail
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="seu@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="register-password">
                  Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                  />
                </div>
                <p className="text-xs text-gray-600 ml-1">Mínimo de 6 caracteres</p>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="register-confirm-password">
                  Confirmar Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="register-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="Repita a senha"
                    autoComplete="new-password"
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

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 text-green-400 text-xs bg-green-500/5 border border-green-500/10 p-3 rounded-lg animate-fadeIn">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{success}</span>
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
                    <UserPlus className="w-4 h-4 mr-2" />
                    CRIAR CONTA
                  </>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-600 text-center mt-4">
                Ao criar uma conta, você concorda com nossos{' '}
                <button type="button" className="text-orange-500 hover:underline">
                  Termos de Uso
                </button>{' '}
                e{' '}
                <button type="button" className="text-orange-500 hover:underline">
                  Política de Privacidade
                </button>
              </p>
            </form>
          )}
        </div>
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

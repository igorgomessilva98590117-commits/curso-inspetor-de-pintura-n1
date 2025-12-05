import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, User, UserPlus, CheckCircle, X, ArrowLeft, MailCheck, Sparkles } from 'lucide-react';

type TabType = 'login' | 'register';
type ViewType = 'main' | 'forgot-password' | 'email-confirmation' | 'reset-email-sent';

export const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [currentView, setCurrentView] = useState<ViewType>('main');
  
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  
  // Estados de feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  const { login, register, loginWithGoogle, resetPassword } = useAuth();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setResetEmail('');
    setError('');
    setSuccess('');
    setRegisteredEmail('');
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

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const result = await loginWithGoogle();

      if (!result.success) {
        setError(result.error || 'Erro ao conectar com Google.');
        setIsLoading(false);
      }
      // Se sucesso, o Supabase vai redirecionar automaticamente
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
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

      const userEmail = email.trim();
      const result = await register(userEmail, password, name.trim());

      if (result.success) {
        // Cadastro bem-sucedido - sempre mostrar tela de confirmação de email
        setRegisteredEmail(userEmail);
        setCurrentView('email-confirmation');
      } else {
        setError(result.error || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const emailToReset = resetEmail.trim();
      const result = await resetPassword(emailToReset);

      if (result.success) {
        // Mostrar tela de sucesso
        setRegisteredEmail(emailToReset);
        setCurrentView('reset-email-sent');
      } else {
        setError(result.error || 'Erro ao enviar e-mail de recuperação.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const openForgotPassword = () => {
    setCurrentView('forgot-password');
    setError('');
    setSuccess('');
    setResetEmail(email); // Preenche com o email já digitado
  };

  const closeForgotPassword = () => {
    setCurrentView('main');
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 font-sans selection:bg-orange-500 selection:text-white">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Login/Register Card */}
      {currentView === 'main' && (
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

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2A2A2A]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[#0A0A0A] text-gray-500">ou continue com</span>
                  </div>
                </div>

                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-[#2A2A2A] rounded-lg shadow-sm text-sm font-medium text-white bg-[#141414] hover:bg-[#1A1A1A] hover:border-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Entrar com Google
                </button>

                {/* Footer Links */}
                <div className="flex items-center justify-center mt-6">
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200"
                    onClick={openForgotPassword}
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

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2A2A2A]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[#0A0A0A] text-gray-500">ou cadastre-se com</span>
                  </div>
                </div>

                {/* Google Register Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-[#2A2A2A] rounded-lg shadow-sm text-sm font-medium text-white bg-[#141414] hover:bg-[#1A1A1A] hover:border-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Cadastrar com Google
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
      )}

      {/* Email Confirmation Card - Após Cadastro */}
      {currentView === 'email-confirmation' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          <div className="text-center p-8">
            {/* Success Animation */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 bg-green-500/10 rounded-full animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <MailCheck className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              Quase lá! <span className="text-green-400">✓</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm mb-6">
              Enviamos um link de confirmação para:
            </p>

            {/* Email Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg mb-6">
              <Mail className="w-4 h-4 text-orange-500" />
              <span className="text-white font-medium text-sm">{registeredEmail}</span>
            </div>

            {/* Instructions */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 mb-6 text-left">
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-semibold">1.</span> Abra seu e-mail
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-semibold">2.</span> Clique no link de confirmação
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-orange-500 font-semibold">3.</span> Volte aqui e faça login
              </p>
            </div>

            {/* Spam Notice */}
            <p className="text-xs text-gray-600 mb-6">
              Não encontrou? Verifique sua pasta de <span className="text-gray-400">spam</span> ou <span className="text-gray-400">lixo eletrônico</span>
            </p>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentView('main');
                setActiveTab('login');
                setEmail(registeredEmail);
                setRegisteredEmail('');
              }}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-[#0A0A0A] transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              <LogIn className="w-4 h-4 mr-2" />
              VOLTAR PARA O LOGIN
            </button>
          </div>
        </div>
      )}

      {/* Reset Password Email Sent Card */}
      {currentView === 'reset-email-sent' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          <div className="text-center p-8">
            {/* Success Animation */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 bg-orange-500/10 rounded-full animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-green-400" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              E-mail Enviado! <span className="text-orange-400">📧</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm mb-6">
              Enviamos um link de recuperação para:
            </p>

            {/* Email Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded-lg mb-6">
              <Mail className="w-4 h-4 text-orange-500" />
              <span className="text-white font-medium text-sm">{registeredEmail}</span>
            </div>

            {/* Instructions */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 mb-6 text-left">
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-semibold">1.</span> Abra seu e-mail
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-semibold">2.</span> Clique no link de recuperação
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-orange-500 font-semibold">3.</span> Crie sua nova senha
              </p>
            </div>

            {/* Spam Notice */}
            <p className="text-xs text-gray-600 mb-6">
              Não encontrou? Verifique sua pasta de <span className="text-gray-400">spam</span> ou <span className="text-gray-400">lixo eletrônico</span>
            </p>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentView('main');
                setActiveTab('login');
                setEmail(registeredEmail);
                setRegisteredEmail('');
                setResetEmail('');
              }}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-[#0A0A0A] transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              <LogIn className="w-4 h-4 mr-2" />
              VOLTAR PARA O LOGIN
            </button>

            {/* Resend Link */}
            <button
              type="button"
              onClick={() => {
                setCurrentView('forgot-password');
                setResetEmail(registeredEmail);
              }}
              className="mt-4 text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200"
            >
              Não recebeu? Enviar novamente
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Card */}
      {currentView === 'forgot-password' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          
          {/* Header */}
          <div className="pt-6 px-8">
            <button
              type="button"
              onClick={closeForgotPassword}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar ao login</span>
            </button>
            
            <div className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                Recuperar Senha
              </h1>
              <p className="text-gray-500 text-sm">
                Digite seu e-mail para receber um link de recuperação
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="reset-email">
                  E-mail
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    autoFocus
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
                    <Mail className="w-4 h-4 mr-2" />
                    ENVIAR LINK DE RECUPERAÇÃO
                  </>
                )}
              </button>

              {/* Info */}
              <p className="text-xs text-gray-600 text-center mt-4">
                Você receberá um e-mail com um link para criar uma nova senha.
                Verifique também sua pasta de spam.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Footer Copyright */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="text-xs text-gray-700">
          © {new Date().getFullYear()} Inspetor Master. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

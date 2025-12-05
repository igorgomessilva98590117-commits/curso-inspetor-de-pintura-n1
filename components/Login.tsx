import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, User, UserPlus, CheckCircle, ArrowLeft, MailCheck, KeyRound, Sparkles } from 'lucide-react';

type PageType = 'login' | 'register' | 'forgot-password' | 'reset-success' | 'email-confirmation';

export const Login: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  // Estados de feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, resetPassword } = useAuth();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setResetEmail('');
    setError('');
    setSuccess('');
  };

  const goToLogin = () => {
    setCurrentPage('login');
    resetForm();
  };

  const goToRegister = () => {
    setCurrentPage('register');
    resetForm();
  };

  const goToForgotPassword = () => {
    setCurrentPage('forgot-password');
    setResetEmail(email); // Preenche com o email já digitado
    setError('');
    setSuccess('');
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
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        setIsLoading(false);
        return;
      }

      const userEmail = email.trim();
      const result = await register(userEmail, password, name.trim());

      if (result.success) {
        // Cadastro bem-sucedido - mostrar página de confirmação de email
        setRegisteredEmail(userEmail);
        setCurrentPage('email-confirmation');
      } else {
        setError(result.error || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!resetEmail.trim()) {
        setError('Por favor, digite seu e-mail.');
        setIsLoading(false);
        return;
      }

      const result = await resetPassword(resetEmail.trim());

      if (result.success) {
        setCurrentPage('reset-success');
      } else {
        setError(result.error || 'Erro ao enviar e-mail de recuperação.');
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

      {/* ==================== PÁGINA DE LOGIN ==================== */}
      {currentPage === 'login' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-8">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-xl">IM</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
              INSPETOR<span className="text-orange-500">MASTER</span>
            </h1>
            <p className="text-gray-500 text-sm">Acesse sua conta para continuar</p>
          </div>

          {/* Tabs */}
          <div className="flex mx-8 mb-6 bg-[#141414] rounded-lg p-1">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium bg-orange-600 text-white shadow-lg shadow-orange-600/20"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
            <button
              type="button"
              onClick={goToRegister}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              Cadastrar
            </button>
          </div>

          {/* Login Form */}
          <div className="px-8 pb-8">
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

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
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

              {/* Forgot Password Link */}
              <div className="flex items-center justify-center mt-6">
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-200 underline underline-offset-4"
                >
                  Esqueci minha senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== PÁGINA DE CADASTRO ==================== */}
      {currentPage === 'register' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-8">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-xl">IM</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
              INSPETOR<span className="text-orange-500">MASTER</span>
            </h1>
            <p className="text-gray-500 text-sm">Crie sua conta gratuita</p>
          </div>

          {/* Tabs */}
          <div className="flex mx-8 mb-6 bg-[#141414] rounded-lg p-1">
            <button
              type="button"
              onClick={goToLogin}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium bg-orange-600 text-white shadow-lg shadow-orange-600/20"
            >
              <UserPlus className="w-4 h-4" />
              Cadastrar
            </button>
          </div>

          {/* Register Form */}
          <div className="px-8 pb-8">
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
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 text-green-400 text-xs bg-green-500/5 border border-green-500/10 p-3 rounded-lg">
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
          </div>
        </div>
      )}

      {/* ==================== PÁGINA ESQUECI MINHA SENHA ==================== */}
      {currentPage === 'forgot-password' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          {/* Header com botão voltar */}
          <div className="pt-6 px-8">
            <button
              type="button"
              onClick={goToLogin}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar ao login</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center pb-6 px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Esqueci minha senha
            </h1>
            <p className="text-gray-500 text-sm">
              Digite seu e-mail para receber um link de recuperação
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleForgotPassword} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="reset-email">
                  E-mail cadastrado
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
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
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

      {/* ==================== PÁGINA DE SUCESSO RESET ==================== */}
      {currentPage === 'reset-success' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          <div className="text-center p-8">
            {/* Success Icon */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-24 h-24 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <MailCheck className="w-10 h-10 text-white" />
              </div>
              <CheckCircle className="absolute -top-1 -right-1 w-7 h-7 text-green-400" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-3">
              E-mail enviado! ✓
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm mb-6">
              Enviamos um link de recuperação para:
            </p>

            {/* Email Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl mb-6">
              <Mail className="w-5 h-5 text-orange-500" />
              <span className="text-white font-medium">{resetEmail}</span>
            </div>

            {/* Instructions */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 mb-6 text-left">
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-bold">1.</span> Abra seu e-mail
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-bold">2.</span> Clique no link de recuperação
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-orange-500 font-bold">3.</span> Crie sua nova senha
              </p>
            </div>

            {/* Spam Notice */}
            <p className="text-xs text-gray-600 mb-6">
              Não encontrou? Verifique sua pasta de <span className="text-gray-400 font-medium">spam</span> ou <span className="text-gray-400 font-medium">lixo eletrônico</span>
            </p>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={goToLogin}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              <LogIn className="w-4 h-4 mr-2" />
              VOLTAR AO LOGIN
            </button>

            {/* Resend Link */}
            <button
              type="button"
              onClick={goToForgotPassword}
              className="mt-4 text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200"
            >
              Não recebeu? Enviar novamente
            </button>
          </div>
        </div>
      )}

      {/* ==================== PÁGINA CONFIRMAÇÃO DE EMAIL (CADASTRO) ==================== */}
      {currentPage === 'email-confirmation' && (
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          <div className="text-center p-8">
            {/* Success Animation */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-24 h-24 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <MailCheck className="w-10 h-10 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              Quase lá! 🎉
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm mb-6">
              Enviamos um link de confirmação para:
            </p>

            {/* Email Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl mb-6">
              <Mail className="w-5 h-5 text-orange-500" />
              <span className="text-white font-medium">{registeredEmail}</span>
            </div>

            {/* Alert Box */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
              <p className="text-orange-400 text-sm font-medium">
                ⚠️ Você precisa confirmar seu e-mail antes de fazer login!
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 mb-6 text-left">
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-bold">1.</span> Abra sua caixa de entrada
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-bold">2.</span> Procure pelo e-mail do <span className="text-white font-medium">Inspetor Master</span>
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-orange-500 font-bold">3.</span> Clique no link de confirmação
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-orange-500 font-bold">4.</span> Volte aqui e faça login
              </p>
            </div>

            {/* Spam Notice */}
            <p className="text-xs text-gray-600 mb-6">
              Não encontrou? Verifique sua pasta de <span className="text-gray-400 font-medium">spam</span> ou <span className="text-gray-400 font-medium">lixo eletrônico</span>
            </p>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => {
                setEmail(registeredEmail);
                goToLogin();
              }}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              <LogIn className="w-4 h-4 mr-2" />
              IR PARA O LOGIN
            </button>
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

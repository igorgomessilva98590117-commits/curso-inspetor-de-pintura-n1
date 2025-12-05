import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, CheckCircle, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { updatePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validação
      if (!newPassword || !confirmPassword) {
        setError('Por favor, preencha todos os campos.');
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('As senhas não coincidem.');
        setIsLoading(false);
        return;
      }

      const result = await updatePassword(newPassword);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Erro ao atualizar senha.');
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

      {!success ? (
        /* Formulário de Nova Senha */
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Criar Nova Senha
            </h1>
            <p className="text-gray-500 text-sm">
              Digite sua nova senha para acessar sua conta
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="new-password">
                  Nova Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-600 ml-1">Mínimo de 6 caracteres</p>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="confirm-password">
                  Confirmar Nova Senha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-orange-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[#141414] border border-[#2A2A2A] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all duration-300 sm:text-sm"
                    placeholder="Repita a nova senha"
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
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    SALVAR NOVA SENHA
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 mt-4">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Sua senha é criptografada e armazenada com segurança.
                  Nunca compartilhamos seus dados.
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Tela de Sucesso */
        <div className="relative z-10 w-full max-w-[420px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden">
          <div className="text-center p-8">
            {/* Success Icon */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-24 h-24 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-3">
              Senha Atualizada! 🎉
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm mb-6">
              Sua senha foi alterada com sucesso. Você já pode acessar sua conta.
            </p>

            {/* Info Box */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-400 text-sm">
                ✓ Sua nova senha está ativa e pronta para uso!
              </p>
            </div>

            {/* Redirect Info */}
            <p className="text-xs text-gray-600 mb-6">
              Você será redirecionado automaticamente em alguns segundos...
            </p>

            {/* Loading indicator */}
            <div className="flex justify-center">
              <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
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


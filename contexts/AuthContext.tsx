import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id?: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuário admin padrão (acesso offline)
const ADMIN_CREDENTIALS = {
  email: 'adm',
  password: '123456',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verificar sessão ao carregar
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Verificar sessão do Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setIsAuthenticated(true);
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuário',
            avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
          });
        } else {
          // Verificar sessão local (admin offline)
          const localAuth = localStorage.getItem('inspetor_master_auth');
          const localUser = localStorage.getItem('inspetor_master_user');
          
          if (localAuth === 'true' && localUser) {
            const parsedUser = JSON.parse(localUser);
            if (parsedUser.email === 'adm') {
              setIsAuthenticated(true);
              setUser(parsedUser);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listener para mudanças de autenticação do Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsAuthenticated(true);
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuário',
          avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
        });
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        // Não limpar se for admin local
        const localUser = localStorage.getItem('inspetor_master_user');
        if (localUser) {
          const parsedUser = JSON.parse(localUser);
          if (parsedUser.email !== 'adm') {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validação de entrada
      if (!email || !password) {
        return { success: false, error: 'Por favor, preencha todos os campos.' };
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Verificar login admin (offline)
      if (normalizedEmail === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const userData: User = { email: 'adm', name: 'Administrador' };
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('inspetor_master_auth', 'true');
        localStorage.setItem('inspetor_master_user', JSON.stringify(userData));
        return { success: true };
      }

      // Login via Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      });

      if (error) {
        // Traduzir mensagens de erro comuns
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'E-mail ou senha incorretos.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Por favor, confirme seu e-mail antes de fazer login.' };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        setIsAuthenticated(true);
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuário',
        });
        return { success: true };
      }

      return { success: false, error: 'Erro desconhecido ao fazer login.' };
    } catch (error) {
      console.error('Erro durante login:', error);
      return { success: false, error: 'Erro de conexão. Verifique sua internet.' };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error('Erro no login com Google:', error);
        return { success: false, error: 'Erro ao conectar com Google. Tente novamente.' };
      }

      // O redirecionamento será feito automaticamente pelo Supabase
      return { success: true };
    } catch (error) {
      console.error('Erro durante login com Google:', error);
      return { success: false, error: 'Erro de conexão. Verifique sua internet.' };
    }
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validação de entrada
      if (!email || !password || !name) {
        return { success: false, error: 'Por favor, preencha todos os campos.' };
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const normalizedEmail = email.trim().toLowerCase();

      if (!emailRegex.test(normalizedEmail)) {
        return { success: false, error: 'Por favor, insira um e-mail válido.' };
      }

      // Validação de senha
      if (password.length < 6) {
        return { success: false, error: 'A senha deve ter pelo menos 6 caracteres.' };
      }

      // Validação de nome
      if (name.trim().length < 2) {
        return { success: false, error: 'O nome deve ter pelo menos 2 caracteres.' };
      }

      // Cadastro via Supabase
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (error) {
        // Traduzir mensagens de erro comuns
        if (error.message.includes('User already registered')) {
          return { success: false, error: 'Este e-mail já está cadastrado.' };
        }
        if (error.message.includes('Password should be')) {
          return { success: false, error: 'A senha não atende aos requisitos mínimos.' };
        }
        if (error.message.includes('Error sending confirmation')) {
          // Cadastro foi feito, mas email não foi enviado - permitir login mesmo assim
          return { success: true, error: 'Conta criada! Você já pode fazer login.' };
        }
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Verificar se precisa confirmar email
        if (data.user.identities && data.user.identities.length === 0) {
          return { success: false, error: 'Este e-mail já está cadastrado.' };
        }
        
        // Se o Supabase não exige confirmação de email, fazer login automático
        if (data.session) {
          setIsAuthenticated(true);
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name: name.trim(),
          });
          return { success: true };
        }
        
        // Se precisa confirmar email
        return { 
          success: true, 
          error: 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.' 
        };
      }

      return { success: false, error: 'Erro desconhecido ao cadastrar.' };
    } catch (error) {
      console.error('Erro durante cadastro:', error);
      return { success: false, error: 'Erro de conexão. Verifique sua internet.' };
    }
  };

  const logout = async () => {
    try {
      // Logout do Supabase
      await supabase.auth.signOut();
      
      // Limpar sessão local
      localStorage.removeItem('inspetor_master_auth');
      localStorage.removeItem('inspetor_master_user');
      
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Erro durante logout:', error);
      // Forçar logout mesmo com erro
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('inspetor_master_auth');
      localStorage.removeItem('inspetor_master_user');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loginWithGoogle, register, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuário admin padrão
const ADMIN_CREDENTIALS = {
  email: 'adm',
  password: '123456',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Verificar se há sessão salva com tratamento de erro
    try {
      return localStorage.getItem('inspetor_master_auth') === 'true';
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
      return false;
    }
  });
  
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('inspetor_master_user');
      if (!savedUser) return null;
      return JSON.parse(savedUser) as User;
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
      // Limpar dados corrompidos
      try {
        localStorage.removeItem('inspetor_master_user');
      } catch (e) {
        // Ignorar erro ao limpar
      }
      return null;
    }
  });

  // Carregar usuários cadastrados do localStorage com tratamento de erro
  const getRegisteredUsers = (): { [key: string]: { password: string; name: string } } => {
    try {
      const users = localStorage.getItem('inspetor_master_registered_users');
      if (!users) return {};
      return JSON.parse(users) as { [key: string]: { password: string; name: string } };
    } catch (error) {
      console.error('Erro ao carregar usuários do localStorage:', error);
      // Limpar dados corrompidos
      try {
        localStorage.removeItem('inspetor_master_registered_users');
      } catch (e) {
        // Ignorar erro ao limpar
      }
      return {};
    }
  };

  // Salvar usuários cadastrados no localStorage com tratamento de erro
  const saveRegisteredUsers = (users: { [key: string]: { password: string; name: string } }): boolean => {
    try {
      localStorage.setItem('inspetor_master_registered_users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Erro ao salvar usuários no localStorage:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validação de entrada
      if (!email || !password) {
        return false;
      }

      // Normalizar email (case-insensitive e trim)
      const normalizedEmail = email.trim().toLowerCase();
      
      // Validar login admin
      if (normalizedEmail === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const userData: User = { email: 'adm', name: 'Administrador' };
        setIsAuthenticated(true);
        setUser(userData);
        try {
          localStorage.setItem('inspetor_master_auth', 'true');
          localStorage.setItem('inspetor_master_user', JSON.stringify(userData));
        } catch (storageError) {
          console.error('Erro ao salvar sessão no localStorage:', storageError);
          // Continuar mesmo se localStorage falhar
        }
        return true;
      }

      // Validar usuários cadastrados
      const registeredUsers = getRegisteredUsers();
      if (registeredUsers[normalizedEmail] && registeredUsers[normalizedEmail].password === password) {
        const userData: User = { email: normalizedEmail, name: registeredUsers[normalizedEmail].name };
        setIsAuthenticated(true);
        setUser(userData);
        try {
          localStorage.setItem('inspetor_master_auth', 'true');
          localStorage.setItem('inspetor_master_user', JSON.stringify(userData));
        } catch (storageError) {
          console.error('Erro ao salvar sessão no localStorage:', storageError);
          // Continuar mesmo se localStorage falhar
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro durante login:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Validação de entrada
      if (!email || !password || !name) {
        return false;
      }

      // Validação básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const normalizedEmail = email.trim().toLowerCase();
      
      if (!emailRegex.test(normalizedEmail)) {
        return false; // Email inválido
      }

      // Validar comprimento mínimo de senha
      if (password.length < 6) {
        return false; // Senha muito curta
      }

      // Validar se email já existe
      const registeredUsers = getRegisteredUsers();
      if (registeredUsers[normalizedEmail]) {
        return false; // Email já cadastrado
      }

      // Validar se não é o email admin
      if (normalizedEmail === ADMIN_CREDENTIALS.email) {
        return false; // Não pode cadastrar com email admin
      }

      // Cadastrar novo usuário
      registeredUsers[normalizedEmail] = { password, name: name.trim() };
      const saved = saveRegisteredUsers(registeredUsers);
      
      if (!saved) {
        return false; // Falha ao salvar
      }

      // Fazer login automaticamente após cadastro
      const userData: User = { email: normalizedEmail, name: name.trim() };
      setIsAuthenticated(true);
      setUser(userData);
      
      try {
        localStorage.setItem('inspetor_master_auth', 'true');
        localStorage.setItem('inspetor_master_user', JSON.stringify(userData));
      } catch (storageError) {
        console.error('Erro ao salvar sessão no localStorage:', storageError);
        // Continuar mesmo se localStorage falhar
      }

      return true;
    } catch (error) {
      console.error('Erro durante cadastro:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      try {
        localStorage.removeItem('inspetor_master_auth');
        localStorage.removeItem('inspetor_master_user');
      } catch (storageError) {
        console.error('Erro ao limpar localStorage:', storageError);
        // Continuar mesmo se localStorage falhar
      }
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
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


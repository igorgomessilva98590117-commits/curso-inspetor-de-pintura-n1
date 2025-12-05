import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://ptehtybgnfkaupvkymsf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZWh0eWJnbmZrYXVwdmt5bXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTUzNTMsImV4cCI6MjA4MDQzMTM1M30.WmSH544EmPhp20f2zwcxcFyJk8YknIQ6ZUUzGleCIkw';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para os usuários
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
}




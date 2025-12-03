import React from 'react';
import { MentorChat } from '../components/MentorChat';
import { BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';

export const Mentor: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white dark:text-[#333333] transition-colors">
              Mentor Inspetor Master
            </h1>
            <p className="text-slate-400 dark:text-[#666666] text-lg transition-colors">
              Seu tutor especializado em Inspeção de Pintura Industrial e Corrosão
            </p>
          </div>
        </div>

        {/* Cards de Informação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a1a] dark:bg-white border border-[#1a1a1a] dark:border-slate-200 rounded-lg p-4 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-amber-500 dark:text-[#FF6700]" />
              <h3 className="font-semibold text-white dark:text-[#333333] transition-colors">
                Baseado em Normas
              </h3>
            </div>
            <p className="text-sm text-slate-400 dark:text-[#666666] transition-colors">
              Respostas baseadas em ABNT NBR, Normas Petrobras (N-13, N-9, N-2), ISO 8501, ISO 4624 e outras normas técnicas vigentes.
            </p>
          </div>

          <div className="bg-[#1a1a1a] dark:bg-white border border-[#1a1a1a] dark:border-slate-200 rounded-lg p-4 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-500 dark:text-[#FF6700]" />
              <h3 className="font-semibold text-white dark:text-[#333333] transition-colors">
                Dicas de Prova
              </h3>
            </div>
            <p className="text-sm text-slate-400 dark:text-[#666666] transition-colors">
              Identifique pegadinhas comuns e pontos críticos que aparecem frequentemente nas provas de certificação SNQC da ABRACO.
            </p>
          </div>

          <div className="bg-[#1a1a1a] dark:bg-white border border-[#1a1a1a] dark:border-slate-200 rounded-lg p-4 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-[#FF6700]" />
              <h3 className="font-semibold text-white dark:text-[#333333] transition-colors">
                Foco em Segurança
              </h3>
            </div>
            <p className="text-sm text-slate-400 dark:text-[#666666] transition-colors">
              Sempre alerta sobre normas de segurança (NR-33, NR-35) e boas práticas de SMS em pintura industrial.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <MentorChat />
    </div>
  );
};


import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';

export const EthicsBadge: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Badge */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-amber-500/90 to-orange-600/90 hover:from-amber-500 hover:to-orange-600 text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
        title="Selo de Integridade"
      >
        <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="bg-[#0a0a0a] dark:bg-white border border-[#1a1a1a] dark:border-slate-200 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 dark:text-[#666666] hover:text-white dark:hover:text-[#333333] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white dark:text-[#333333] mb-1 transition-colors">Selo de Integridade</h2>
                  <p className="text-slate-400 dark:text-[#666666] text-sm transition-colors">Compromisso Ético</p>
                </div>
              </div>

              <div className="prose prose-invert dark:prose-slate max-w-none">
                <p className="text-slate-300 dark:text-[#4A4A4A] leading-relaxed text-lg mb-4 transition-colors">
                  A integridade é a ferramenta mais importante do inspetor. Um relatório falso pode custar vidas e milhões em prejuízos.
                </p>
                <p className="text-slate-300 dark:text-[#4A4A4A] leading-relaxed transition-colors">
                  Aqui, aprendemos a técnica correta e a ética inegociável. Transformamos normas técnicas em poder de decisão, prevenindo falhas, salvando milhões em ativos e protegendo vidas.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#1a1a1a] dark:border-slate-200 transition-colors">
                <p className="text-amber-500 dark:text-[#FF6700] font-semibold text-sm transition-colors">
                  Mais que um Inspetor, um Guardião da Integridade.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};


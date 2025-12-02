import React from 'react';
import { FileText, TriangleAlert } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Documentação Técnica</h2>
        <p className="text-slate-400 mt-2">Workshops de preenchimento de RIPI e RNC.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* RIPI Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
           <div className="flex items-center gap-3 mb-4">
             <FileText className="text-blue-400 w-8 h-8" />
             <h3 className="text-xl font-bold text-white">Modelo RIPI (Relatório de Inspeção)</h3>
           </div>
           <p className="text-sm text-slate-400 mb-6">
             O RIPI deve conter a rastreabilidade total do processo. Um RIPI incompleto reprova o lote.
           </p>

           <div className="bg-white text-slate-900 p-4 rounded font-mono text-xs shadow-inner space-y-2">
              <div className="border-b border-slate-300 pb-2 mb-2 font-bold text-center">RELATÓRIO DE INSPEÇÃO DE PINTURA</div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-100 p-1">
                   <span className="block text-slate-500 text-[10px]">OBRA/PROJETO</span>
                   TANQUE TQ-5011 NAFTA
                </div>
                <div className="bg-slate-100 p-1">
                   <span className="block text-slate-500 text-[10px]">DATA</span>
                   15/10/2023
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-100 p-1">
                   <span className="block text-slate-500 text-[10px]">TEMP. AMB.</span>
                   28°C
                </div>
                <div className="bg-slate-100 p-1">
                   <span className="block text-slate-500 text-[10px]">U.R.A.</span>
                   72%
                </div>
                <div className="bg-slate-100 p-1 border border-red-400 bg-red-50">
                   <span className="block text-red-500 text-[10px]">TEMP. PEÇA</span>
                   31.5°C (Check Orvalho!)
                </div>
              </div>

              <div className="bg-slate-100 p-1">
                 <span className="block text-slate-500 text-[10px]">TINTA / LOTE</span>
                 Epóxi N-2680 / Lote: 4599-AX (Val: Dez/24)
              </div>

              <div className="bg-slate-100 p-1">
                 <span className="block text-slate-500 text-[10px]">RESULTADO MEPS (MÍCRONS)</span>
                 Média: 280µm (Min: 240, Max: 310) - APROVADO
              </div>
           </div>
        </div>

        {/* RNC Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
           <div className="flex items-center gap-3 mb-4">
             <TriangleAlert className="text-safety-orange w-8 h-8" />
             <h3 className="text-xl font-bold text-white">Modelo RNC (Não Conformidade)</h3>
           </div>
           <p className="text-sm text-slate-400 mb-6">
             A RNC deve ser descritiva, citar a norma violada e sugerir a disposição (o que fazer).
           </p>

           <div className="bg-white text-slate-900 p-4 rounded font-mono text-xs shadow-inner space-y-2">
              <div className="border-b border-red-500 pb-2 mb-2 font-bold text-center text-red-700">REGISTRO DE NÃO CONFORMIDADE</div>
              
              <div className="bg-red-50 p-2 border border-red-100">
                 <span className="block text-slate-500 text-[10px] font-bold">DESCRIÇÃO DO DESVIO</span>
                 Durante inspeção visual do Tanque 02, observou-se empolamento (bolhas) generalizado na região do costado sul, após 24h da aplicação da demão de acabamento.
              </div>

              <div className="bg-red-50 p-2 border border-red-100">
                 <span className="block text-slate-500 text-[10px] font-bold">CAUSA PROVÁVEL</span>
                 Contaminação por sais solúveis na superfície ou umidade retida (Solvente Retained).
              </div>

              <div className="bg-slate-100 p-2">
                 <span className="block text-slate-500 text-[10px] font-bold">DISPOSIÇÃO TÉCNICA (O QUE FAZER)</span>
                 1. Remover toda a tinta da área afetada por jateamento abrasivo Sa 2 1/2.<br/>
                 2. Realizar teste de clorato/sais (Bresle).<br/>
                 3. Repintar conforme esquema original.
              </div>
           </div>
        </div>

      </div>

      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Recebimento de Tintas (Amostragem N-2912)</h3>
        <p className="text-slate-300 text-sm mb-4">
          Ao receber um lote de latas, quantas devo abrir para inspecionar? 
          <span className="italic text-slate-400"> (Exemplo: Lote de 100 latas)</span>
        </p>
        <div className="grid grid-cols-4 gap-2 text-center text-sm">
           <div className="bg-slate-700 p-2 rounded">
             <div className="font-bold text-white">2 a 8 latas</div>
             <div className="text-petro-yellow">Amostra: 2</div>
           </div>
           <div className="bg-slate-700 p-2 rounded">
             <div className="font-bold text-white">9 a 15 latas</div>
             <div className="text-petro-yellow">Amostra: 3</div>
           </div>
           <div className="bg-slate-700 p-2 rounded">
             <div className="font-bold text-white">16 a 25 latas</div>
             <div className="text-petro-yellow">Amostra: 5</div>
           </div>
           <div className="bg-slate-700 p-2 rounded">
             <div className="font-bold text-white">26 a 50 latas</div>
             <div className="text-petro-yellow">Amostra: 8</div>
           </div>
        </div>
      </div>
    </div>
  );
};
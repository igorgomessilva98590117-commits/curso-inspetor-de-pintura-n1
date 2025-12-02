import React from 'react';
import { ShieldCheck, Book, ClipboardCheck } from 'lucide-react';
import { InspectorTip } from '../components/InspectorTip';

export const Home: React.FC<{ onChangeTab: (t: any) => void }> = ({ onChangeTab }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-petro-yellow opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Bem-vindo, <span className="text-petro-yellow">Futuro Inspetor</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mb-6">
          Sou o <strong>Prof. Inspetor Master</strong> (ABRACO N2 / NACE CIP 3). 
          Esta plataforma foi desenhada rigorosamente conforme as normas Petrobras (N-13, N-9, N-2) para prepará-lo para a qualificação SNQC.
        </p>
        
        <InspectorTip title="Compromisso Ético">
          A integridade é a ferramenta mais importante do inspetor. Um relatório falso pode custar vidas e milhões em prejuízos. Aqui, aprendemos a técnica correta e a ética inegociável.
        </InspectorTip>

        <button 
          onClick={() => onChangeTab('THEORY')}
          className="bg-petro-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg flex items-center"
        >
          Iniciar Treinamento
          <span className="ml-2">→</span>
        </button>
      </div>

      {/* Qualification Process */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
            <Book className="text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">1. Prova Teórica</h3>
          <p className="text-slate-400 text-sm">
            Questões de múltipla escolha baseadas nas normas. Domine a N-13 (Geral) e N-2 (Esquemas).
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="w-12 h-12 bg-yellow-900/50 rounded-lg flex items-center justify-center mb-4">
            <ClipboardCheck className="text-petro-yellow" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">2. Estudo de Casos</h3>
          <p className="text-slate-400 text-sm">
            Análise de documentação (RIPI/RNC). Você receberá um cenário real e deverá apontar conformidades.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="text-petro-green" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">3. Exame Prático</h3>
          <p className="text-slate-400 text-sm">
            Uso de instrumentos: Medição de espessura, teste de aderência, holiday detector e inspeção visual.
          </p>
        </div>
      </div>
    </div>
  );
};
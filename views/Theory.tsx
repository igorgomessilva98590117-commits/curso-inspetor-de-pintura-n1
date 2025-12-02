import React, { useState } from 'react';
import { NORMS, PAINTS } from '../constants';
import { InspectorTip } from '../components/InspectorTip';
import { ChevronDown, ChevronUp, Droplet, Sun, Wind } from 'lucide-react';

export const Theory: React.FC = () => {
  const [activeNorm, setActiveNorm] = useState<string | null>(null);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Módulo Teórico: Normas & Fundamentos</h2>
        <p className="text-slate-400 mt-2">Domine as "Bíblias" da Inspeção: N-13, N-9 e N-2.</p>
      </div>

      {/* Normas Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-petro-yellow flex items-center gap-2">
            <BookIcon /> Normas Petrobras
          </h3>
          {NORMS.map((norm) => (
            <div key={norm.code} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => setActiveNorm(activeNorm === norm.code ? null : norm.code)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-750 transition-colors"
              >
                <span className="font-bold text-white">{norm.code} - {norm.title}</span>
                {activeNorm === norm.code ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              {activeNorm === norm.code && (
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700">
                  <ul className="list-disc pl-5 space-y-2 text-slate-300">
                    {norm.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Environmental Conditions */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit">
          <h3 className="text-xl font-semibold text-petro-yellow mb-4">Condições Ambientais (N-13)</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-900/30 p-2 rounded">
                <Droplet className="text-blue-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Umidade Relativa (UR)</h4>
                <p className="text-slate-400 text-sm">Máximo <span className="text-red-400 font-bold">85%</span>. Acima disso, risco de condensação invisível.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-900/30 p-2 rounded">
                <Sun className="text-orange-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Temperatura de Superfície</h4>
                <p className="text-slate-400 text-sm">Deve estar pelo menos <span className="text-petro-yellow font-bold">3°C acima</span> da temperatura do Ponto de Orvalho.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-slate-700/30 p-2 rounded">
                <Wind className="text-slate-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Vento</h4>
                <p className="text-slate-400 text-sm">Verificar perda de material durante jateamento/pintura. Evitar contaminação de áreas adjacentes.</p>
              </div>
            </div>
          </div>
          
          <InspectorTip type="warning">
            Na prova prática, sempre verifique o higrômetro antes de qualquer medição! Se as condições não forem atendidas, o serviço não pode começar.
          </InspectorTip>
        </div>
      </div>

      {/* Paints Catalog */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2">Catálogo de Tintas (N-2)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {PAINTS.map((paint) => (
            <div key={paint.code} className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-petro-yellow transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-slate-700 text-xs font-mono px-2 py-1 rounded text-slate-300">{paint.code}</span>
              </div>
              <h4 className="font-bold text-lg text-white mb-2 group-hover:text-petro-yellow">{paint.name}</h4>
              <p className="text-slate-400 text-sm mb-3">{paint.description}</p>
              <p className="text-xs text-slate-500 italic border-t border-slate-700 pt-2 mt-auto">Uso: {paint.application}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);
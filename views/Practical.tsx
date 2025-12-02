import React, { useState } from 'react';
import { InspectorTip } from '../components/InspectorTip';
import { Info } from 'lucide-react';

// Using functional component for the interactive slider
export const Practical: React.FC = () => {
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [cleaning, setCleaning] = useState<'St3' | 'Sa2' | 'Sa2.5' | 'Sa3'>('Sa2.5');

  const gradeInfo = {
    A: "Superfície de aço com a carepa de laminação intacta em praticamente toda a superfície e sem corrosão.",
    B: "Superfície com início de corrosão e carepa de laminação começando a destacar.",
    C: "Superfície onde a carepa de laminação foi eliminada pela corrosão (presença de pites visíveis a olho nu).",
    D: "Superfície onde a carepa foi eliminada e há grande corrosão com pites severos."
  };

  const cleaningInfo = {
    St3: "Limpeza Mecânica Manual/Motriz: Brilho metálico aparente, mas sem remover toda a carepa/ferrugem profunda.",
    Sa2: "Jateamento Comercial: Remove quase toda a carepa/ferrugem. A superfície fica acinzentada.",
    'Sa2.5': "Metal Quase Branco: O padrão mais comum na indústria. 95% da área livre de resíduos visíveis. O restante são apenas manchas leves.",
    Sa3: "Metal Branco: 100% livre de qualquer contaminante. Aparência metálica uniforme. Exigido para inspeções rigorosas e imersão."
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Módulo Prático: Tratamento de Superfície (N-9)</h2>
        <p className="text-slate-400 mt-2">Simulador Visual: Entenda a base de uma boa pintura.</p>
      </div>

      {/* Simulator Container */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          {/* Weathering Grade Selector */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-bold text-petro-yellow mb-4">1. Grau de Intemperismo (Original)</h3>
            <div className="flex gap-2">
              {(['A', 'B', 'C', 'D'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`flex-1 py-2 rounded font-bold transition-all ${
                    grade === g 
                    ? 'bg-petro-green text-white ring-2 ring-green-400' 
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  Grau {g}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300 min-h-[60px]">{gradeInfo[grade]}</p>
          </div>

          {/* Cleaning Standard Selector */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-bold text-petro-yellow mb-4">2. Padrão de Limpeza</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['St3', 'Sa2', 'Sa2.5', 'Sa3'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCleaning(c)}
                  className={`py-2 px-3 rounded text-sm font-bold transition-all ${
                    cleaning === c 
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {c.replace('Sa', 'Sa ')}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300 min-h-[60px]">{cleaningInfo[cleaning]}</p>
          </div>
        </div>

        {/* Visualizer (Abstract Representation due to no image assets) */}
        <div className="bg-black rounded-xl border-4 border-slate-700 p-1 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white z-10">Simulação Visual</div>
          
          {/* Dynamic Visual Layer */}
          <div className={`w-full h-full absolute inset-0 transition-all duration-700`}
            style={{
              backgroundColor: 
                cleaning === 'Sa3' ? '#e2e8f0' : // White metal
                cleaning === 'Sa2.5' ? '#94a3b8' : // Near white
                cleaning === 'Sa2' ? '#64748b' : // Commercial
                '#475569', // St3
              backgroundImage: 
                cleaning === 'Sa3' ? 'none' :
                cleaning === 'Sa2.5' ? 'radial-gradient(#475569 1px, transparent 1px)' :
                cleaning === 'Sa2' ? 'radial-gradient(#334155 2px, transparent 2px)' :
                'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: cleaning === 'Sa2.5' ? '40px 40px' : cleaning === 'Sa2' ? '10px 10px' : 'auto'
            }}
          >
             {/* Overlay for rust based on Grade if cleaning is poor */}
             {(cleaning === 'St3' || cleaning === 'Sa2') && grade === 'D' && (
                <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay pointer-events-none"></div>
             )}
          </div>

          <div className="z-20 bg-slate-900/80 p-4 rounded text-center backdrop-blur-sm">
            <h4 className="text-xl font-bold text-white mb-1">
              Resultado: {cleaning.replace('Sa', 'Sa ')} sobre Grau {grade}
            </h4>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Visualização Aproximada</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
         <InspectorTip>
            <strong>Pulo do Gato (PC-02):</strong> Na prova prática, diferencie Sa 2 1/2 de Sa 3 olhando o fundo dos pites. Se o fundo do pite estiver escuro, é Sa 2 1/2. Se estiver brilhante/claro, é Sa 3.
         </InspectorTip>
         
         <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex gap-4 items-start">
            <Info className="text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white">Jateamento vs. Hidrojateamento (WJ)</h4>
              <p className="text-sm text-slate-400 mt-1">
                Jateamento abrasivo cria <strong>rugosidade (perfil de ancoragem)</strong>. 
                Hidrojateamento (WJ) apenas limpa, <strong>não cria rugosidade</strong>. 
                Se for pintar sobre WJ, certifique-se que o metal já tinha perfil anterior ou use tintas tolerantes.
              </p>
            </div>
         </div>
      </div>
    </div>
  );
};
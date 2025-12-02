import React from 'react';
import { InspectorTip } from '../components/InspectorTip';
import { Ruler, Activity, Zap } from 'lucide-react';

export const Lab: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
       <div className="border-b border-slate-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Laboratório de Inspeção</h2>
        <p className="text-slate-400 mt-2">Procedimentos de Ensaio conforme Critérios de Aceitação da N-13.</p>
      </div>

      <div className="grid gap-8">
        
        {/* Teste 1: Espessura */}
        <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-750 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg"><Ruler className="text-blue-400" /></div>
            <h3 className="text-xl font-bold text-white">1. Medição de Espessura de Película Seca (MEPS)</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-petro-yellow mb-2">Procedimento (PC-04)</h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-300 text-sm">
                  <li>Calibrar o aparelho com lâminas padrão próximas à espessura esperada.</li>
                  <li>Usar placa de metal liso e zerar o aparelho.</li>
                  <li>Realizar medições dispersas na área inspecionada.</li>
                </ol>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-white mb-2">Critério de Aceitação (N-13) - Regra 80/20</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    A média aritmética deve ser ≥ espessura nominal especificada.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">!</span>
                    Nenhuma leitura individual pode ser inferior a 80% da nominal.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Até 20% das leituras podem estar entre 80% e 100% da nominal.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Teste 2: Aderência */}
        <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-750 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg"><Activity className="text-purple-400" /></div>
            <h3 className="text-xl font-bold text-white">2. Teste de Aderência (PC-05)</h3>
          </div>
          <div className="p-6">
             <div className="grid md:grid-cols-2 gap-8">
               <div>
                  <h4 className="font-bold text-white border-b border-slate-600 pb-2 mb-2">Corte em X (Espessura {'>'} 125µm)</h4>
                  <p className="text-slate-400 text-sm mb-2">Método ASTM D3359 (Method A).</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Fazer um X com ângulo de 30-45°.</li>
                    <li>• Aplicar fita, remover e avaliar destacamento.</li>
                    <li>• <strong>Aprovação:</strong> Nível X1 ou melhor (apenas traços de destacamento nas interseções).</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-white border-b border-slate-600 pb-2 mb-2">Tração / Pull-Off (Qualquer espessura)</h4>
                  <p className="text-slate-400 text-sm mb-2">Método ASTM D4541. Destrutivo.</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Colar o "dolly" (promotor de aderência).</li>
                    <li>• Aguardar cura e aplicar força hidráulica.</li>
                    <li>• <strong>Aprovação:</strong> Valor em MPa ≥ Especificado (Ex: 15 MPa).</li>
                    <li>• <strong>Análise de Falha:</strong> A/B (Adesiva) vs B (Coesiva).</li>
                  </ul>
               </div>
             </div>
             <InspectorTip type="tip">
               No teste Pull-Off, se a cola falhar antes da tinta (Falha Y/Z), o teste é inválido e deve ser refeito, a menos que a força já tenha superado o mínimo exigido.
             </InspectorTip>
          </div>
        </section>

        {/* Teste 3: Holiday */}
        <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-750 p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="p-2 bg-yellow-600/20 rounded-lg"><Zap className="text-petro-yellow" /></div>
            <h3 className="text-xl font-bold text-white">3. Descontinuidade (Holiday Detector)</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="font-bold text-petro-yellow">Via Úmida (Baixa Voltagem)</h4>
                <p className="text-sm text-slate-300 mt-1">Para espessuras {"<"} 500 µm (microns). Usa-se 67,5V ou 90V. A esponja deve estar molhada com agente umectante.</p>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-safety-orange">Via Seca (Alta Voltagem)</h4>
                <p className="text-sm text-slate-300 mt-1">Para espessuras {">"} 500 µm. A voltagem é calculada conforme a espessura (V = C * √Espessura). Gera faísca visível no defeito.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
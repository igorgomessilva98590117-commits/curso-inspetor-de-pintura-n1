import React, { useState } from 'react';
import { InspectorTip } from '../components/InspectorTip';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';

export const Practical: React.FC = () => {
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [cleaning, setCleaning] = useState<'St3' | 'Sa2' | 'Sa2.5' | 'Sa3'>('Sa2.5');
  const [showOriginal, setShowOriginal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const gradeInfo = {
    A: "Superfície de aço com a carepa de laminação intacta em praticamente toda a superfície e sem corrosão.",
    B: "Superfície com início de corrosão e carepa de laminação começando a destacar.",
    C: "Superfície onde a carepa de laminação foi eliminada pela corrosão (presença de pites visíveis a olho nu).",
    D: "Superfície onde a carepa foi eliminada e há grande corrosão com pites severos."
  };

  const cleaningInfo = {
    St3: "Limpeza Mecânica Manual/Motriz: Brilho metálico aparente, mas sem remover toda a carepa/ferrugem profunda.",
    Sa2: "Jateamento Comercial: Remove quase toda a carepa/ferrugem. A superfície fica acinzentada.",
    'Sa2.5': "Metal Quase Branco: O padrão mais comum na indústria. 95% da área livre de resíduos visíveis.",
    Sa3: "Metal Branco: 100% livre de qualquer contaminante. Aparência metálica uniforme."
  };

  // Função para obter o caminho da imagem baseado no grau e limpeza
  const getImagePath = (g: string, c: string): string => {
    const basePath = '/images/surfaces/cleaning/';
    
    // Mapeamento de nomes de arquivo
    const cleaningMap: Record<string, string> = {
      'St3': 'St3',
      'Sa2': 'Sa2',
      'Sa2.5': 'Sa-2-1-2',
      'Sa3': 'Sa-3'
    };

    // Para grau A, só temos algumas combinações
    if (g === 'A') {
      if (c === 'St3') return `${basePath}A-St3.png`;
      if (c === 'Sa2.5') return `${basePath}A-Sa-2-1-2.png`;
      // Fallback para outras combinações de A
      return `${basePath}A-Sa-2-1-2.png`;
    }

    // Para B, C, D temos mais combinações
    const cleaningCode = cleaningMap[c] || 'Sa-2-1-2';
    return `${basePath}${g}-${cleaningCode}.png`;
  };

  // Caminho da imagem do grau original (sem limpeza)
  const getOriginalGradePath = (g: string): string => {
    return `/images/surfaces/cleaning/Grau-${g}.png`;
  };

  const currentImage = showOriginal ? getOriginalGradePath(grade) : getImagePath(grade, cleaning);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="border-b border-slate-700 dark:border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-white dark:text-slate-900">Módulo Prático: Tratamento de Superfície (N-9)</h2>
        <p className="text-slate-400 dark:text-slate-600 mt-2">Simulador Visual: Entenda a base de uma boa pintura.</p>
      </div>

      {/* Simulator Container */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="space-y-6">
          {/* Weathering Grade Selector */}
          <div className="bg-slate-800 dark:bg-white p-6 rounded-xl border border-slate-700 dark:border-slate-200 shadow-lg">
            <h3 className="font-bold text-amber-400 dark:text-amber-600 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Grau de Intemperismo (Original)
            </h3>
            <div className="flex gap-2">
              {(['A', 'B', 'C', 'D'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    grade === g 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30' 
                    : 'bg-slate-700 dark:bg-slate-100 text-slate-400 dark:text-slate-600 hover:bg-slate-600 dark:hover:bg-slate-200'
                  }`}
                >
                  Grau {g}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300 dark:text-slate-600 min-h-[50px]">{gradeInfo[grade]}</p>
          </div>

          {/* Cleaning Standard Selector */}
          <div className="bg-slate-800 dark:bg-white p-6 rounded-xl border border-slate-700 dark:border-slate-200 shadow-lg">
            <h3 className="font-bold text-amber-400 dark:text-amber-600 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Padrão de Limpeza
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(['St3', 'Sa2', 'Sa2.5', 'Sa3'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => { setCleaning(c); setShowOriginal(false); }}
                  className={`py-3 px-3 rounded-lg text-sm font-bold transition-all ${
                    cleaning === c && !showOriginal
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-700 dark:bg-slate-100 text-slate-400 dark:text-slate-600 hover:bg-slate-600 dark:hover:bg-slate-200'
                  }`}
                >
                  {c === 'Sa2.5' ? 'Sa 2½' : c.replace('Sa', 'Sa ')}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-300 dark:text-slate-600 min-h-[50px]">{cleaningInfo[cleaning]}</p>
          </div>

          {/* Toggle Original */}
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              showOriginal 
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
              : 'bg-slate-700 dark:bg-slate-100 text-slate-300 dark:text-slate-700 hover:bg-slate-600 dark:hover:bg-slate-200'
            }`}
          >
            {showOriginal ? '🔴 Mostrando: Estado Original (Sem Limpeza)' : '👁️ Ver Estado Original (Antes da Limpeza)'}
          </button>
        </div>

        {/* Visualizer with Real Images */}
        <div className="space-y-4">
          <div 
            className={`bg-slate-900 dark:bg-slate-100 rounded-xl border-4 ${showOriginal ? 'border-red-500' : 'border-slate-700 dark:border-slate-300'} relative overflow-hidden transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            style={{ minHeight: '350px' }}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            {/* Label */}
            <div className={`absolute top-3 left-3 ${showOriginal ? 'bg-red-500' : 'bg-black/70'} px-3 py-1.5 rounded-lg text-xs text-white z-20 font-medium`}>
              {showOriginal ? `Grau ${grade} - Original` : `${cleaning === 'Sa2.5' ? 'Sa 2½' : cleaning} sobre Grau ${grade}`}
            </div>

            {/* Zoom indicator */}
            <div className="absolute top-3 right-3 bg-black/70 p-2 rounded-lg z-20">
              {isZoomed ? <ZoomOut className="w-4 h-4 text-white" /> : <ZoomIn className="w-4 h-4 text-white" />}
            </div>
            
            {/* Image */}
            <div className={`w-full h-full transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
              <img 
                src={currentImage}
                alt={showOriginal ? `Grau ${grade} - Estado Original` : `${cleaning} sobre Grau ${grade}`}
                className="w-full h-full object-cover"
                style={{ minHeight: '350px' }}
                onError={(e) => {
                  // Fallback se a imagem não existir
                  (e.target as HTMLImageElement).src = '/images/surfaces/cleaning/Grau-B.png';
                }}
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-slate-800 dark:bg-white p-4 rounded-xl border border-slate-700 dark:border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${showOriginal ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
              <div>
                <h4 className="text-white dark:text-slate-900 font-semibold">
                  {showOriginal ? 'Estado Inicial da Superfície' : 'Resultado após Limpeza'}
            </h4>
                <p className="text-slate-400 dark:text-slate-600 text-sm">
                  {showOriginal 
                    ? `Grau ${grade} de intemperismo conforme ISO 8501-1` 
                    : `Padrão ${cleaning === 'Sa2.5' ? 'Sa 2½' : cleaning} conforme ISO 8501-1 / N-9`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
         <InspectorTip>
            <strong>Pulo do Gato (PC-02):</strong> Na prova prática, diferencie Sa 2½ de Sa 3 olhando o fundo dos pites. Se o fundo do pite estiver escuro, é Sa 2½. Se estiver brilhante/claro, é Sa 3.
         </InspectorTip>
         
         <div className="bg-slate-800 dark:bg-white p-4 rounded-lg border border-slate-700 dark:border-slate-200 flex gap-4 items-start">
            <Info className="text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white dark:text-slate-900">Jateamento vs. Hidrojateamento (WJ)</h4>
              <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">
                Jateamento abrasivo cria <strong className="text-white dark:text-slate-800">rugosidade (perfil de ancoragem)</strong>. 
                Hidrojateamento (WJ) apenas limpa, <strong className="text-white dark:text-slate-800">não cria rugosidade</strong>. 
              </p>
            </div>
         </div>
      </div>

      {/* Reference Chart */}
      <div className="bg-slate-800 dark:bg-white rounded-xl border border-slate-700 dark:border-slate-200 p-6 mt-8">
        <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-4">📊 Referência Rápida - Padrões de Limpeza</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700 dark:bg-slate-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-slate-400 dark:text-slate-600">St 3</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Limpeza Mecânica</div>
            <div className="text-amber-400 text-xs mt-2">Mínimo aceito</div>
          </div>
          <div className="bg-slate-700 dark:bg-slate-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-slate-300 dark:text-slate-700">Sa 2</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Jato Comercial</div>
            <div className="text-blue-400 text-xs mt-2">Uso geral</div>
          </div>
          <div className="bg-slate-700 dark:bg-slate-100 p-4 rounded-lg text-center border-2 border-green-500">
            <div className="text-2xl font-bold text-white dark:text-slate-900">Sa 2½</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Metal Quase Branco</div>
            <div className="text-green-400 text-xs mt-2">⭐ Mais usado</div>
          </div>
          <div className="bg-slate-700 dark:bg-slate-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-slate-100 dark:text-slate-800">Sa 3</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Metal Branco</div>
            <div className="text-purple-400 text-xs mt-2">Alta exigência</div>
            </div>
         </div>
      </div>
    </div>
  );
};

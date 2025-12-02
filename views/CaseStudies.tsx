import React, { useState } from 'react';
import { CASES } from '../constants';
import { InspectorTip } from '../components/InspectorTip';
import { CheckCircle, XCircle, AlertOctagon } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const activeCase = CASES.find(c => c.id === activeCaseId) || CASES[0];

  const handleSelectOption = (id: string) => {
    if (showFeedback) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (selectedOption) setShowFeedback(true);
  };

  const handleNextCase = () => {
    const currentIndex = CASES.findIndex(c => c.id === activeCaseId);
    const nextIndex = (currentIndex + 1) % CASES.length;
    setActiveCaseId(CASES[nextIndex].id);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-slate-700 pb-4 flex justify-between items-end">
        <div>
           <h2 className="text-3xl font-bold text-white">Estudo de Casos: Simulação Real</h2>
           <p className="text-slate-400 mt-2">Você é o Inspetor. Tome a decisão correta.</p>
        </div>
        <div className="flex gap-2">
          {CASES.map((c, idx) => (
             <button
               key={c.id}
               onClick={() => { setActiveCaseId(c.id); setSelectedOption(null); setShowFeedback(false); }}
               className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${activeCaseId === c.id ? 'bg-petro-yellow text-slate-900' : 'bg-slate-700 text-white'}`}
             >
               {idx + 1}
             </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-600 shadow-2xl overflow-hidden">
        {/* Header of Case */}
        <div className="bg-slate-900 p-6 border-b border-slate-700">
           <div className="flex items-center gap-2 mb-2">
             <AlertOctagon className="text-safety-orange" />
             <h3 className="text-xl font-bold text-white">{activeCase.title}</h3>
           </div>
           <p className="text-slate-400 italic mb-4">{activeCase.description}</p>
           <div className="bg-slate-800 p-4 rounded border-l-4 border-petro-green">
             <h4 className="text-sm font-bold text-petro-green uppercase mb-1">Contexto da Inspeção</h4>
             <p className="text-slate-200">{activeCase.context}</p>
           </div>
        </div>

        {/* Question Area */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-white mb-6">{activeCase.question}</h4>

          <div className="space-y-3">
            {activeCase.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let styleClass = "border-slate-600 hover:bg-slate-700";
              
              if (showFeedback) {
                if (opt.isCorrect) styleClass = "border-green-500 bg-green-900/20";
                else if (isSelected && !opt.isCorrect) styleClass = "border-red-500 bg-red-900/20";
                else styleClass = "border-slate-700 opacity-50";
              } else if (isSelected) {
                styleClass = "border-petro-yellow bg-yellow-900/10";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center ${styleClass}`}
                >
                  <span className="text-slate-200">{opt.text}</span>
                  {showFeedback && opt.isCorrect && <CheckCircle className="text-green-500" />}
                  {showFeedback && isSelected && !opt.isCorrect && <XCircle className="text-red-500" />}
                </button>
              );
            })}
          </div>

          {!showFeedback && (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="mt-6 w-full py-3 bg-petro-green text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Confirmar Decisão
            </button>
          )}

          {showFeedback && (
            <div className="mt-6 animate-fadeIn">
               <InspectorTip type={activeCase.options.find(o => o.id === selectedOption)?.isCorrect ? 'tip' : 'warning'}>
                 <strong>Feedback do Mestre:</strong> {activeCase.options.find(o => o.id === selectedOption)?.feedback}
               </InspectorTip>
               <button 
                 onClick={handleNextCase}
                 className="mt-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium"
               >
                 Próximo Caso &rarr;
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
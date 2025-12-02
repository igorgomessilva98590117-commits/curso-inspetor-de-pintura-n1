import React from 'react';
import { AlertTriangle, Lightbulb } from 'lucide-react';

interface InspectorTipProps {
  title?: string;
  children: React.ReactNode;
  type?: 'tip' | 'warning';
}

export const InspectorTip: React.FC<InspectorTipProps> = ({ title = "Dica do Inspetor Master", children, type = 'tip' }) => {
  const isWarning = type === 'warning';
  
  return (
    <div className={`border-l-4 ${isWarning ? 'border-safety-red bg-red-900/20' : 'border-petro-yellow bg-yellow-900/20'} p-4 my-4 rounded-r-lg`}>
      <div className="flex items-center gap-2 mb-2">
        {isWarning ? (
          <AlertTriangle className="text-safety-red w-5 h-5" />
        ) : (
          <Lightbulb className="text-petro-yellow w-5 h-5" />
        )}
        <h4 className={`font-bold uppercase tracking-wider text-sm ${isWarning ? 'text-safety-red' : 'text-petro-yellow'}`}>
          {title}
        </h4>
      </div>
      <div className="text-slate-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};
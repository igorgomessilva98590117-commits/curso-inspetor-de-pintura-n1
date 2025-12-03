import React from 'react';
import { Play, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  gradient: string;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  progress,
  gradient,
  onClick,
}) => {
  const isCompleted = progress === 100;

  return (
    <div
      className="group relative h-64 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:shadow-md"
      onClick={onClick}
    >
      {/* Background com gradiente (Modo Escuro) ou Cor Sólida (Modo Claro) */}
      <div className={`absolute inset-0 ${gradient} opacity-90 group-hover:opacity-100 transition-opacity dark:opacity-100 dark:bg-white dark:bg-none`} />
      
      {/* Overlay escuro para contraste (Apenas Modo Escuro) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:hidden" />
      
      {/* Borda no Modo Claro */}
      <div className="absolute inset-0 border border-transparent dark:border-slate-200 rounded-xl pointer-events-none transition-colors" />
      
      {/* Conteúdo do Card */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Badge de Concluído */}
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <div className="bg-green-500 rounded-full p-2 shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        {/* Título e Subtítulo */}
        <div className="flex-1 flex flex-col justify-end dark:justify-start dark:pt-2">
          <h3 className="text-xl font-bold text-white dark:text-[#333333] mb-2 line-clamp-2 group-hover:text-amber-300 dark:group-hover:text-[#FF6700] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-300 dark:text-[#666666] line-clamp-2">
            {subtitle}
          </p>
        </div>

        {/* Barra de Progresso */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 dark:text-[#666666]">Progresso</span>
            <span className="text-xs font-bold text-white dark:text-[#333333]">{progress}%</span>
          </div>
          <div className="h-2 bg-white/20 dark:bg-[#E0E0E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 dark:from-[#FF6700] dark:to-[#FF8533] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Botão Play (aparece no hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 dark:bg-white/80 backdrop-blur-[2px]">
          <div className="w-16 h-16 bg-white/20 dark:bg-[#FF6700] backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 dark:border-transparent group-hover:scale-110 transition-transform shadow-xl">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Play, Clock, CheckCircle2 } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  progress?: number;
  completed?: boolean;
  onClick?: () => void;
}

interface ContentTrackProps {
  title: string;
  items: ContentItem[];
  featured?: boolean;
}

export const ContentTrack: React.FC<ContentTrackProps> = ({ title, items, featured = false }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white dark:text-[#333333] mb-4 px-4 lg:px-0 transition-colors">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 px-4 lg:px-0 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className={`
              flex-shrink-0 relative group cursor-pointer
              transition-transform duration-300 hover:scale-105
              ${featured ? 'w-[320px]' : 'w-[240px]'}
            `}
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-300 border border-[#1a1a1a] dark:border-slate-300 transition-colors">
              {/* Placeholder for thumbnail image */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Progress Bar */}
              {item.progress !== undefined && item.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a1a1a] dark:bg-slate-200 transition-colors">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}

              {/* Completed Badge */}
              {item.completed && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Duration Badge */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {item.duration}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mt-2">
              <h3 className="text-white dark:text-[#333333] font-medium text-sm line-clamp-2 group-hover:text-amber-400 dark:group-hover:text-[#FF6700] transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


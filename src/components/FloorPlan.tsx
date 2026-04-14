import { cn } from '../lib/utils';

export function FloorPlan() {
  return (
    <div className="w-full h-full p-4 border border-stone-700/80 bg-stone-900/50 rounded-lg relative overflow-hidden flex flex-col">
      <h3 className="text-[#b91c1c] font-bold mb-2 text-sm">平面布局与柱网</h3>
      <div className="flex-1 relative">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Grid lines */}
          <g stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" strokeDasharray="2 2">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
            ))}
          </g>
          
          {/* Main Hall Outline */}
          <rect x="100" y="40" width="200" height="120" fill="none" stroke="rgba(212, 175, 55, 0.8)" strokeWidth="2" />
          <rect x="120" y="60" width="160" height="80" fill="none" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="1" />
          
          {/* Side Pavilions (Simplified) */}
          <rect x="40" y="60" width="40" height="80" fill="none" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="1" />
          <rect x="320" y="60" width="40" height="80" fill="none" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="1" />

          {/* Roof Lines (X) */}
          <line x1="100" y1="40" x2="200" y2="100" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
          <line x1="300" y1="40" x2="200" y2="100" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
          <line x1="100" y1="160" x2="200" y2="100" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
          <line x1="300" y1="160" x2="200" y2="100" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
          <line x1="120" y1="100" x2="280" y2="100" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />

          {/* Columns (Dots) */}
          <g fill="#b91c1c">
            {/* Outer columns */}
            {Array.from({ length: 14 }).map((_, i) => (
              <circle key={`top-${i}`} cx={100 + i * (200/13)} cy="40" r="2" />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <circle key={`bot-${i}`} cx={100 + i * (200/13)} cy="160" r="2" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <circle key={`left-${i}`} cx="100" cy={40 + i * (120/6)} r="2" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <circle key={`right-${i}`} cx="300" cy={40 + i * (120/6)} r="2" />
            ))}
          </g>

          {/* Labels */}
          <text x="200" y="30" fill="rgba(212, 175, 55, 0.8)" fontSize="10" textAnchor="middle" className="font-serif-sc">面阔十三间</text>
          <text x="310" y="100" fill="rgba(212, 175, 55, 0.8)" fontSize="10" transform="rotate(90 310 100)" className="font-serif-sc">进深六间</text>
          <text x="200" y="180" fill="rgba(212, 175, 55, 0.8)" fontSize="10" textAnchor="middle" className="font-serif-sc">殿身十一间</text>
        </svg>
      </div>
    </div>
  );
}

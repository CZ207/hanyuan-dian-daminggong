import { motion } from 'motion/react';
import { cn } from '../lib/utils';

type Region = 'base' | 'ramp' | 'mainHall' | 'sidePavilions' | null;

interface Props {
  activeRegion: Region;
  setActiveRegion: (region: Region) => void;
}

export function InteractiveStructureImage({ activeRegion, setActiveRegion }: Props) {
  const imageUrl = "https://img.cdn1.vip/i/69c22272cd19a_1774330482.webp";

  const getFill = (region: Region) => {
    if (activeRegion === region) return 'rgba(212, 175, 55, 0.35)'; // 典雅金色半透明
    return 'transparent';
  };

  const getStroke = (region: Region) => {
    if (activeRegion === region) return 'rgba(212, 175, 55, 0.9)'; // 金色边框
    return 'transparent';
  };

  const getGlowAnimation = (region: Region) => ({
    filter: activeRegion === region 
      ? ['drop-shadow(0 0 8px rgba(212,175,55,0.6))', 'drop-shadow(0 0 20px rgba(212,175,55,0.8))', 'drop-shadow(0 0 8px rgba(212,175,55,0.6))']
      : 'drop-shadow(0 0 0px rgba(212,175,55,0))'
  });

  const getGlowTransition = (region: Region) => (
    activeRegion === region 
      ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
      : { duration: 0.5 }
  );

  // 引导点组件
  const Hotspot = ({ cx, cy, region, label }: { cx: number, cy: number, region: Region, label: string }) => (
    <g 
      className="cursor-pointer group/hotspot"
      onMouseEnter={() => setActiveRegion(region)}
      onClick={() => setActiveRegion(region)}
    >
      <motion.circle 
        cx={cx} cy={cy} r="12" 
        fill="rgba(212, 175, 55, 0.2)" 
        stroke="rgba(212, 175, 55, 0.8)" 
        strokeWidth="2"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={cx} cy={cy} r="4" fill="#d4af37" />
      {/* 悬停提示文字 */}
      <text 
        x={cx} y={cy - 20} 
        fill="#fff" 
        fontSize="14" 
        textAnchor="middle" 
        className={cn(
          "font-serif-sc font-bold drop-shadow-md transition-opacity duration-300 pointer-events-none",
          activeRegion === region ? "opacity-100" : "opacity-0 group-hover/hotspot:opacity-100"
        )}
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-stone-950">
      
      {/* 真实背景图片 */}
      <img 
        src={imageUrl} 
        alt="含元殿真实结构参考" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
        style={{ transform: activeRegion ? 'scale(1.02)' : 'scale(1)' }}
        referrerPolicy="no-referrer"
      />
      
      {/* 交互式 SVG 遮罩层 */}
      <svg
        viewBox="0 0 1000 600"
        className="absolute inset-0 w-full h-full z-10"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Base (夯土台基) */}
        <motion.polygon
          points="50,380 950,380 1000,480 0,480"
          fill={getFill('base')}
          stroke={getStroke('base')}
          strokeWidth="2"
          onMouseEnter={() => setActiveRegion('base')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('base')}
          transition={getGlowTransition('base')}
        />

        {/* Ramp (龙尾道) */}
        <motion.polygon
          points="350,420 650,420 800,600 200,600"
          fill={getFill('ramp')}
          stroke={getStroke('ramp')}
          strokeWidth="2"
          onMouseEnter={() => setActiveRegion('ramp')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('ramp')}
          transition={getGlowTransition('ramp')}
        />

        {/* Side Pavilions (双阁与飞廊) */}
        <motion.g
          onMouseEnter={() => setActiveRegion('sidePavilions')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('sidePavilions')}
          transition={getGlowTransition('sidePavilions')}
        >
          <polygon points="0,200 220,200 220,380 0,380" fill={getFill('sidePavilions')} stroke={getStroke('sidePavilions')} strokeWidth="2" />
          <polygon points="780,200 1000,200 1000,380 780,380" fill={getFill('sidePavilions')} stroke={getStroke('sidePavilions')} strokeWidth="2" />
        </motion.g>

        {/* Main Hall (重檐结构) */}
        <motion.polygon
          points="250,150 750,150 780,380 220,380"
          fill={getFill('mainHall')}
          stroke={getStroke('mainHall')}
          strokeWidth="2"
          onMouseEnter={() => setActiveRegion('mainHall')}
          className="cursor-pointer transition-colors duration-500"
          animate={getGlowAnimation('mainHall')}
          transition={getGlowTransition('mainHall')}
        />

        {/* 引导热点 (Hotspots) */}
        <Hotspot cx={500} cy={430} region="base" label="高台选址" />
        <Hotspot cx={500} cy={510} region="ramp" label="龙尾道" />
        <Hotspot cx={110} cy={290} region="sidePavilions" label="翔鸾阁" />
        <Hotspot cx={890} cy={290} region="sidePavilions" label="栖凤阁" />
        <Hotspot cx={500} cy={265} region="mainHall" label="重檐主殿" />

      </svg>
    </div>
  );
}

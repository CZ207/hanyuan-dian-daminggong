import { useState } from 'react';
import { InteractiveStructureImage } from './components/InteractiveStructureImage';
import { FloorPlan } from './components/FloorPlan';
import { AiAssistant } from './components/AiAssistant';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Region = 'overview' | 'base' | 'ramp' | 'mainHall' | 'sidePavilions' | null;

const REGION_CONTENT = {
  base: {
    title: '高台选址',
    desc: '依天然地势建于三层大台之上，实测殿基高于坡下平地15.6米。高差设计营造磅礴气势。',
    researchTitle: '考古与复原差异',
    researchDesc: '关于台基的具体测量数据，学术界复原（76.8m x 43m）与考古实测（75.9m x 41.3m）存在细微差异。傅熹年先生研究与实际遗址数据，模型搭建建议以实际遗址测量数据作为夯土底座的基础轮廓，前者作为上部木构复原的参考。'
  },
  mainHall: {
    title: '重檐结构',
    desc: '采用了高级别的“重檐”结构。唐代李华在《含元殿赋》中有“飞重檐以切霞”的记载。',
    researchTitle: '梁架结构科学',
    researchDesc: '复原时以木柱梁架承重为主。遗址背部发掘出厚达1.2米的土墙遗迹，在后期学术探讨中，考虑到西安属地震多发区，仅用土墙承载面阔60多米的大型重檐屋顶不安全。'
  },
  sidePavilions: {
    title: '双阁与飞廊',
    desc: '主殿前左右两侧分峙翔鸾阁（东侧）与栖凤阁（西侧）。主殿与两阁之间通过二层的飞廊相连结，形成巨大的“凹”字形正立面轮廓。',
  },
  ramp: {
    title: '龙尾道动线',
    desc: '殿前正中设有一条长达70余米的阶梯式坡道，称为“龙尾道”，自平地三折而上。',
  }
};

const HISTORY = [
  { year: '贞观八年 (634年)', event: '初建' },
  { year: '龙朔二年 (662年)', event: '重启' },
  { year: '龙朔三年 (663年)', event: '完工' },
  { year: '光启元年 (885年)', event: '战火被毁' },
];

const NAV_ITEMS: { id: Region; label: string }[] = [
  { id: null, label: '沉浸全景' },
  { id: 'overview', label: '历史形制' },
  { id: 'base', label: '高台选址' },
  { id: 'mainHall', label: '重檐主殿' },
  { id: 'sidePavilions', label: '双阁飞廊' },
  { id: 'ramp', label: '龙尾道' },
];

export default function App() {
  const [activeRegion, setActiveRegion] = useState<Region>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-stone-950 text-stone-200 font-sans">
      
      {/* Background Layer (Full Screen Image) */}
      <div className="absolute inset-0 z-0">
        <InteractiveStructureImage activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      </div>

      {/* Header (Top Left) */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif-sc font-black text-stone-100 tracking-wider mb-2" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            大明宫含元殿
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#d4af37] tracking-widest" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            大唐皇朝的正殿威仪
          </h2>
        </motion.div>
      </div>

      {/* Info Panel (Right Side, Frosted Glass) */}
      <div className="absolute top-24 right-8 md:top-12 md:right-12 bottom-28 w-full max-w-md z-20 flex flex-col justify-start pointer-events-none">
        <AnimatePresence mode="wait">
          {activeRegion === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto backdrop-blur-xl bg-stone-900/50 border border-stone-500/30 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-6 max-h-full overflow-y-auto custom-scrollbar"
            >
              <div className="text-stone-200 text-sm leading-relaxed">
                在构建大明宫含元殿的数字化复原模型以展现中国古代建筑成就时，核心建筑形制如下：含元殿建于高15.6米的龙首原三层台基上，殿身面阔十一间，采用重檐结构，东西两侧飞廊连接翔鸾、栖凤二阁，殿前延伸有70余米的龙尾道。
              </div>

              {/* History Timeline */}
              <div>
                <h3 className="text-[#d4af37] font-bold mb-4 text-lg font-serif-sc flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#d4af37] inline-block rounded-full"></span>
                  历史沿革
                </h3>
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-px before:bg-stone-600">
                  {HISTORY.map((item, i) => (
                    <div key={i} className="relative flex items-center gap-4 pl-6">
                      <div className="absolute left-[5px] w-2 h-2 rounded-full bg-[#b91c1c] shadow-[0_0_8px_rgba(185,28,28,0.8)]"></div>
                      <div className="text-[#d4af37] text-sm font-bold w-24 shrink-0">{item.year}</div>
                      <div className="text-stone-300 text-sm">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor Plan Miniature */}
              <div className="h-48 mt-2">
                <FloorPlan />
              </div>
            </motion.div>
          )}

          {activeRegion && activeRegion !== 'overview' && (
            <motion.div 
              key={activeRegion}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto backdrop-blur-xl bg-stone-900/60 border border-[#d4af37]/40 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-6"
            >
              <div>
                <h3 className="text-3xl font-serif-sc font-bold text-[#d4af37] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#b91c1c] inline-block rounded-full"></span>
                  {REGION_CONTENT[activeRegion as keyof typeof REGION_CONTENT].title}
                </h3>
                <p className="text-stone-200 leading-relaxed text-lg">
                  {REGION_CONTENT[activeRegion as keyof typeof REGION_CONTENT].desc}
                </p>
              </div>

              {REGION_CONTENT[activeRegion as keyof typeof REGION_CONTENT].researchTitle && (
                <div className="pt-6 border-t border-stone-700/50">
                  <h4 className="text-xl font-serif-sc font-bold text-[#b91c1c] mb-3">
                    {REGION_CONTENT[activeRegion as keyof typeof REGION_CONTENT].researchTitle}
                  </h4>
                  <p className="text-stone-300 leading-relaxed text-sm">
                    {REGION_CONTENT[activeRegion as keyof typeof REGION_CONTENT].researchDesc}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className="flex items-center gap-1 md:gap-2 p-1.5 rounded-full backdrop-blur-xl bg-stone-900/60 border border-stone-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id || 'null'}
              onClick={() => setActiveRegion(item.id)}
              onMouseEnter={() => setActiveRegion(item.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                activeRegion === item.id 
                  ? "bg-[#d4af37] text-stone-950 shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
                  : "text-stone-300 hover:text-[#d4af37] hover:bg-stone-800/50"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <AiAssistant />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface HeroBundleVisualProps {
  size?: 'normal' | 'compact' | 'video';
}

export function HeroBundleVisual({ size = 'normal' }: HeroBundleVisualProps) {
  const isVideo = size === 'video';
  const isCompact = size === 'compact';

  return (
    <div className={`relative flex items-center justify-center select-none ${isVideo ? 'scale-90 md:scale-95' : isCompact ? 'scale-85' : 'scale-100'}`}>
      {/* Soft warm shadow on table surface */}
      <div className="absolute -bottom-4 w-72 h-8 bg-stone-900/20 rounded-full blur-md" />

      <div className="relative flex items-end justify-center w-80 h-72">
        {/* ============================================================ */}
        {/* 1. KNITTING NEEDLES & CROCHET HOOKS PROTRUDING (BEHIND BASKET) */}
        {/* ============================================================ */}
        <div className="absolute left-6 top-2 flex pointer-events-none z-0">
          {/* Bamboo Needle 1 */}
          <div 
            className="w-1.5 h-36 bg-gradient-to-t from-amber-700 via-amber-400 to-amber-200 rounded-full shadow-sm origin-bottom"
            style={{ transform: 'rotate(-28deg) translateY(-8px)' }}
          >
            <div className="w-3 h-3 rounded-full bg-amber-500 -ml-0.5 -mt-1 shadow-xs border border-amber-300" />
          </div>
          {/* Silver Hook 2 */}
          <div 
            className="w-1.5 h-40 bg-gradient-to-t from-slate-600 via-slate-300 to-slate-100 rounded-full shadow-sm origin-bottom ml-2"
            style={{ transform: 'rotate(-18deg) translateY(-14px)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400 -ml-0.5 -mt-1 shadow-xs" />
          </div>
          {/* Rose Gold Hook 3 */}
          <div 
            className="w-1.5 h-40 bg-gradient-to-t from-amber-800 via-amber-500 to-yellow-200 rounded-full shadow-sm origin-bottom ml-2"
            style={{ transform: 'rotate(-6deg) translateY(-16px)' }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-500 -ml-0.5 -mt-1 shadow-xs" />
          </div>
          {/* Bamboo Needle 4 */}
          <div 
            className="w-1.5 h-38 bg-gradient-to-t from-amber-700 via-amber-300 to-amber-100 rounded-full shadow-sm origin-bottom ml-2"
            style={{ transform: 'rotate(10deg) translateY(-12px)' }}
          >
            <div className="w-3 h-3 rounded-full bg-amber-400 -ml-0.5 -mt-1 shadow-xs" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. BASKET OF COLORFUL YARN BALLS (LEFT SIDE) */}
        {/* ============================================================ */}
        <div className="absolute left-0 bottom-2 z-10">
          {/* Orange Knitted Scarf/Swatch spilling under basket */}
          <div 
            className="absolute -bottom-1 -left-3 w-28 h-7 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 rounded-lg shadow-md border-b-2 border-orange-700/60"
            style={{ transform: 'rotate(-6deg)' }}
          >
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
            {/* Fringe tassels */}
            <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between py-1">
              <div className="w-3 h-0.5 bg-orange-700" />
              <div className="w-2.5 h-0.5 bg-orange-600" />
              <div className="w-3 h-0.5 bg-orange-700" />
              <div className="w-2 h-0.5 bg-orange-600" />
            </div>
          </div>

          {/* Yarn Balls Container Sitting in Basket */}
          <div className="relative w-44 h-36">
            {/* Yarn Ball 1: Vibrant Teal / Cyan (Top) */}
            <div 
              className="absolute left-18 top-1 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-700 shadow-md border border-cyan-300/60 z-2 overflow-hidden"
            >
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
              <div className="absolute inset-0 rounded-full border-t-2 border-cyan-200/50" />
            </div>

            {/* Yarn Ball 2: Bright Coral Pink (Top Left) */}
            <div 
              className="absolute left-7 top-4 w-15 h-15 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-rose-700 shadow-md border border-pink-300/60 z-3 overflow-hidden"
            >
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
              <div className="absolute inset-0 rounded-full border-t-2 border-rose-200/60" />
            </div>

            {/* Yarn Ball 3: Vibrant Orange (Center) */}
            <div 
              className="absolute left-14 top-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-orange-700 shadow-lg border border-amber-300/70 z-4 overflow-hidden"
            >
              <div className="w-full h-full opacity-45 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
              <div className="absolute inset-0 rounded-full border-t-2 border-yellow-200/70" />
            </div>

            {/* Yarn Ball 4: Sunny Yellow (Front Left on table) */}
            <div 
              className="absolute -left-2 bottom-0 w-13 h-13 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 shadow-md border border-yellow-200/80 z-20 overflow-hidden"
            >
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
              <div className="absolute inset-0 rounded-full border-t-2 border-white/60" />
            </div>

            {/* Yarn Ball 5: Sky Blue (Front Right on table) */}
            <div 
              className="absolute left-10 -bottom-1 w-13 h-13 rounded-full bg-gradient-to-br from-sky-300 via-blue-500 to-blue-700 shadow-md border border-sky-200/80 z-20 overflow-hidden"
            >
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
              <div className="absolute inset-0 rounded-full border-t-2 border-sky-100/70" />
            </div>

            {/* Yarn Ball 6: Berry Purple/Magenta (Far Left) */}
            <div 
              className="absolute -left-3 top-14 w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-600 via-purple-700 to-purple-900 shadow-md border border-fuchsia-300/40 z-2 overflow-hidden"
            >
              <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
            </div>

            {/* Woven Wicker Basket Body */}
            <div className="absolute left-3 bottom-3 w-38 h-20 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-700 rounded-b-3xl rounded-t-lg border-2 border-amber-800/60 shadow-lg overflow-hidden z-10">
              {/* Basket Weave Pattern */}
              <div 
                className="w-full h-full opacity-35"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #78350f 0, #78350f 2px, transparent 0, transparent 8px),
                                    repeating-linear-gradient(-45deg, #78350f 0, #78350f 2px, transparent 0, transparent 8px)`
                }}
              />
              {/* Basket rim */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-800 border-b border-amber-900/60 shadow-xs" />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. 3D BOOK: "Arts & Handcraft Crochet Guide!" (RIGHT SIDE) */}
        {/* ============================================================ */}
        <div className="relative ml-auto right-1 z-20">
          <div className="relative w-44 h-62 bg-[#1b2320] rounded-r-md rounded-l-xs shadow-2xl border-t border-r border-stone-600/60 flex overflow-hidden">
            {/* Book Spine (Left vertical edge highlight) */}
            <div className="w-3.5 bg-gradient-to-r from-stone-900 via-stone-800 to-[#1e2723] shrink-0 border-r border-stone-700/80 shadow-inner" />

            {/* Book Front Cover Content */}
            <div className="flex-grow p-3 flex flex-col justify-between bg-[#1f2824] text-center relative overflow-hidden">
              {/* Subtle texture */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

              {/* Cover Header */}
              <div className="relative z-10 pt-1">
                <span className="text-[9px] font-sans font-medium text-amber-200/90 tracking-wider">
                  Arts &amp; Handcraft
                </span>
                <div className="w-8 h-px bg-amber-300/40 mx-auto my-1" />
                <h4 className="text-xl font-black text-white leading-tight font-serif tracking-tight">
                  Crochet<br />
                  <span className="text-amber-300 font-sans">Guide!</span>
                </h4>
                <div className="w-10 h-0.5 bg-amber-400/80 mx-auto mt-1" />
              </div>

              {/* Cover Center Art: Illustrated Yarn Skein & Spool */}
              <div className="relative z-10 my-auto py-1 flex items-center justify-center gap-1.5">
                {/* Terracotta spool */}
                <div className="w-9 h-14 bg-gradient-to-b from-amber-600 via-orange-600 to-amber-700 rounded-t-lg rounded-b-md shadow-inner border border-orange-400/40 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-orange-700/50 flex flex-col justify-around py-0.5">
                    <div className="w-full h-px bg-orange-300/40" />
                    <div className="w-full h-px bg-orange-300/40" />
                    <div className="w-full h-px bg-orange-300/40" />
                  </div>
                </div>

                {/* Mint green yarn skein */}
                <div className="w-12 h-14 bg-gradient-to-tr from-emerald-600 via-teal-400 to-emerald-300 rounded-full shadow-md border border-teal-200/50 relative overflow-hidden">
                  <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-200/40" />
                </div>

                {/* Yellow bobbin */}
                <div className="w-5 h-11 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-500 rounded-sm shadow-xs border border-yellow-200/60" />
              </div>

              {/* Cover Footer Note */}
              <div className="relative z-10 pt-1 border-t border-stone-700/80 flex items-center justify-between text-[8px] text-stone-300 px-0.5 font-medium">
                <span className="text-amber-300 font-bold">crova.in</span>
                <span className="text-stone-400">2026 Edition</span>
              </div>
            </div>

            {/* Right Spine Edge with Vertical Text: "C r o c h e t   B u n d l e !" */}
            <div className="w-5 bg-[#141a17] border-l border-stone-700/80 flex flex-col items-center justify-around py-2 text-[8px] font-black tracking-widest text-amber-300 shrink-0 select-none uppercase">
              <span>C</span>
              <span>R</span>
              <span>O</span>
              <span>C</span>
              <span>H</span>
              <span>E</span>
              <span>T</span>
            </div>

            {/* Pages Edge Rim (White stacked paper illusion) */}
            <div className="w-1.5 bg-gradient-to-l from-stone-300 via-stone-100 to-stone-200 shrink-0 shadow-inner" />
          </div>
        </div>
      </div>
    </div>
  );
}

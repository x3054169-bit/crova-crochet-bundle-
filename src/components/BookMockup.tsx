export function BookMockup({ size = 'large' }: { size?: 'small' | 'medium' | 'large' }) {
  const isSmall = size === 'small';
  const isMed = size === 'medium';

  return (
    <div className={`relative mx-auto flex items-center justify-center select-none ${isSmall ? 'scale-75' : isMed ? 'scale-90' : 'scale-100'}`}>
      {/* Decorative Warm Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200/50 via-orange-100/40 to-rose-200/40 rounded-full blur-2xl -z-10" />

      {/* Book & Bundle Composition */}
      <div className="relative flex flex-col items-center">
        {/* Main 3D Book Graphic */}
        <div className="relative w-64 h-84 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-r-xl rounded-l-sm shadow-2xl shadow-stone-900/40 border-r-4 border-b-4 border-amber-600/40 transform -rotate-1 hover:rotate-0 transition-transform duration-300 overflow-hidden">
          {/* Book Spine Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-stone-950 via-stone-800 to-transparent z-20 border-r border-stone-700/50" />
          
          {/* Book Cover Design */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 bg-[#161616]">
            {/* Header branding */}
            <div className="text-center pt-2">
              <span className="text-[11px] font-medium tracking-widest uppercase text-amber-300/90 font-serif">
                Arts &amp; Handcraft
              </span>
              <div className="w-12 h-0.5 bg-amber-400/60 mx-auto my-1.5" />
              <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight font-serif">
                Crochet<br />
                <span className="text-amber-400 font-sans tracking-normal">Guide!</span>
              </h3>
              <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider font-semibold">
                By Crova
              </p>
            </div>

            {/* Visual Center Art (Yarn Bowl & Stitch Graphic) */}
            <div className="relative my-auto w-full h-32 flex items-center justify-center">
              {/* Colorful Yarn Skeins Composite */}
              <div className="relative w-36 h-28">
                {/* Yarn Ball 1 (Coral) */}
                <div className="absolute left-1 bottom-2 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-coral-500 to-rose-400 shadow-md flex items-center justify-center overflow-hidden border border-rose-300/40">
                  <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
                </div>
                {/* Yarn Ball 2 (Teal) */}
                <div className="absolute right-1 bottom-1 w-16 h-16 rounded-full bg-gradient-to-tr from-teal-600 via-emerald-500 to-teal-400 shadow-md flex items-center justify-center overflow-hidden border border-teal-300/40">
                  <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
                </div>
                {/* Yarn Ball 3 (Gold Mustard Center) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-lg flex items-center justify-center overflow-hidden border border-amber-200/50">
                  <div className="w-full h-full opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]" />
                </div>
                {/* Golden Bamboo Crochet Hook */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2 w-1.5 h-30 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-600 rounded-full shadow-lg transform rotate-28 z-10 border border-amber-100" />
                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-1.5 h-28 bg-gradient-to-b from-stone-200 via-slate-300 to-slate-500 rounded-full shadow-lg transform -rotate-30 z-10 border border-slate-100" />
              </div>
            </div>

            {/* Bottom Book Footnote */}
            <div className="border-t border-stone-800 pt-2 flex items-center justify-between text-[10px] text-stone-400">
              <span className="font-semibold text-amber-400">1000+ Patterns</span>
              <span className="text-stone-400">Master Edition</span>
            </div>
          </div>

          {/* Book Pages Edge Effect */}
          <div className="absolute right-0 top-1 bottom-1 w-2 bg-gradient-to-l from-stone-200 via-stone-100 to-stone-300 rounded-r shadow-inner" />
        </div>

        {/* 1000+ Patterns Circular Gold Badge */}
        <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 text-stone-900 font-extrabold flex flex-col items-center justify-center shadow-lg border-2 border-white ring-2 ring-amber-400/50 transform rotate-12">
          <span className="text-[12px] leading-tight font-black">1000+</span>
          <span className="text-[8px] uppercase tracking-tighter font-bold">Patterns</span>
        </div>

        {/* Instant Digital Delivery Badge */}
        <div className="absolute -bottom-3 left-4 bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-emerald-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
          Instant PDF &amp; Video Access
        </div>
      </div>
    </div>
  );
}

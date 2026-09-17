export function BrandStory() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Dashed Border Container matching Screenshot 4 */}
      <div className="inline-block w-full max-w-2xl mb-4 sm:mb-5">
        <div className="border-2 border-dashed border-stone-800 rounded-xl px-4 sm:px-8 py-2.5 sm:py-3 bg-transparent">
          <h3 className="text-sm sm:text-base md:text-lg font-black text-[#b91c1c] tracking-tight">
            Handcrafted with Care by Crova
          </h3>
        </div>
      </div>

      {/* Paragraph from Screenshot 4 */}
      <p className="text-xs sm:text-sm md:text-base text-stone-900 max-w-3xl mx-auto leading-relaxed font-semibold px-2">
        We're a small team passionate about crochet and handmade crafts. Since 2020, we've helped 15,000+ crochet enthusiasts across India learn, create, and fall in love with this beautiful craft — one stitch at a time.
      </p>
    </section>
  );
}

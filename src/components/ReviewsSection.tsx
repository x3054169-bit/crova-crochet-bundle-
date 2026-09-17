import { useState, type FormEvent } from 'react';
import { REVIEWS } from '../data/bundleData';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, X } from 'lucide-react';

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

  const totalReviews = reviewsList.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalReviews - 1 ? 0 : prev + 1));
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const created = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      verified: true,
      date: 'Just now',
      helpfulCount: 1,
      location: 'India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    setReviewsList([created, ...reviewsList]);
    setIsWriteReviewOpen(false);
    setNewReview({ name: '', comment: '', rating: 5 });
    setCurrentIndex(0);
  };

  // Get active pair of reviews for desktop (or single for mobile)
  const firstReview = reviewsList[currentIndex];
  const secondReviewIndex = (currentIndex + 1) % totalReviews;
  const secondReview = reviewsList[secondReviewIndex];

  return (
    <section id="reviews" className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Title matching Screenshot 4 and 5 */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-stone-900">
          <span>What Our Customers Say </span>
          <span className="text-[#d32f2f]">About This Bundle</span>
        </h2>
      </div>

      {/* Review Carousel Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Arrow Button matching Screenshot 5 */}
        <button
          onClick={handlePrev}
          aria-label="Previous Review"
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-100/90 hover:bg-rose-200 text-stone-700 flex items-center justify-center shadow-sm transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button matching Screenshot 5 */}
        <button
          onClick={handleNext}
          aria-label="Next Review"
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-100/90 hover:bg-rose-200 text-stone-700 flex items-center justify-center shadow-sm transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards Grid: 1 on mobile, 2 on desktop matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
          {/* Card 1 */}
          <div className="bg-[#fff5f5] rounded-3xl border border-rose-300/80 p-5 sm:p-7 shadow-xs flex flex-col justify-between transition-all">
            <div>
              {/* Header: Avatar, Name & Stars */}
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={firstReview.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                  alt={firstReview.name}
                  className="w-12 h-12 rounded-full object-cover border border-rose-200 shadow-2xs"
                />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {firstReview.name}
                  </h4>
                  {/* 5 Stars */}
                  <div className="flex text-amber-400 mt-0.5">
                    {[...Array(firstReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                "{firstReview.comment}"
              </p>
            </div>
          </div>

          {/* Card 2 (visible on desktop) */}
          <div className="hidden md:flex bg-[#fff5f5] rounded-3xl border border-rose-300/80 p-5 sm:p-7 shadow-xs flex-col justify-between transition-all">
            <div>
              {/* Header: Avatar, Name & Stars */}
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={secondReview.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={secondReview.name}
                  className="w-12 h-12 rounded-full object-cover border border-rose-200 shadow-2xs"
                />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {secondReview.name}
                  </h4>
                  {/* 5 Stars */}
                  <div className="flex text-amber-400 mt-0.5">
                    {[...Array(secondReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                "{secondReview.comment}"
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Dots Pagination matching Screenshot 5 */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviewsList.slice(0, 5).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                dotIdx === currentIndex % 5 ? 'bg-[#d32f2f] w-5' : 'bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

        {/* Write a review subtle button */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-[#d32f2f]" />
            <span>Share your crochet experience</span>
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-stone-900 mb-1">Write a Review</h3>
            <p className="text-xs text-stone-500 mb-4">
              Share your thoughts on the patterns, video courses, or planner.
            </p>

            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shalini Roy"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Rating</label>
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setNewReview({ ...newReview, rating: num })}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          num <= newReview.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you liked..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 focus:outline-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f9570c] hover:bg-[#ea4f07] text-white font-bold py-3 rounded-lg text-sm mt-2 transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

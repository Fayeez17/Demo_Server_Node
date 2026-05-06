import { useState } from "react";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = slides.length;

  const goToPrevious = () => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex === 0) {
        return totalSlides - 1;
      }
      return previousIndex - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex === totalSlides - 1) {
        return 0;
      }
      return previousIndex + 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full bg-gradient-to-br from-blue-50 to-indigo-100 px-10 py-16 text-center"
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
                {slide.label}
              </p>

              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                {slide.title}
              </h2>

              <p className="mx-auto max-w-xl text-lg text-gray-600">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-bold text-gray-700 shadow-md hover:bg-blue-600 hover:text-white"
        >
          ‹
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-bold text-gray-700 shadow-md hover:bg-blue-600 hover:text-white"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-blue-600"
                : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
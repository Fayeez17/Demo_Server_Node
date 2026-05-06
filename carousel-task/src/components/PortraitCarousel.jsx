import { useEffect, useState } from "react";

function PortraitCarousel({ pictures = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  if (pictures.length === 0) {
    return null;
  }

  const totalPictures = pictures.length;

  const previousIndex =
    currentIndex === 0 ? totalPictures - 1 : currentIndex - 1;

  const nextIndex =
    currentIndex === totalPictures - 1 ? 0 : currentIndex + 1;

  const goToPrevious = () => {
    setCurrentIndex((previousIndex)=>previousIndex =
    currentIndex === 0 ? totalPictures - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(nextIndex);
  };

  const handlePointerDown = (event) => {
    setDragStartX(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (dragStartX === null) return;

    const movement = event.clientX - dragStartX;
    setDragOffset(movement);
  };

  const handlePointerUp = () => {
    if (dragStartX === null) return;

    if (dragOffset > 70) {
      goToPrevious();
    }

    if (dragOffset < -70) {
      goToNext();
    }

    setDragStartX(null);
    setDragOffset(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black text-gray-900">Carousel</h2>
      </div>

      <div
        className="relative mx-auto h-[430px] max-w-6xl select-none sm:h-[500px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className={`absolute inset-0 ${
            dragStartX === null
              ? "transition-transform duration-300 ease-out"
              : ""
          }`}
          style={{ transform: `translateX(${dragOffset}px)` }}
        >
          {/* Previous preview */}
          <div
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 hidden h-[70%] w-[30%] -translate-y-1/2 cursor-pointer overflow-hidden rounded-3xl bg-gray-800 opacity-45 shadow-lg transition-all duration-500 hover:opacity-65 md:block"
          >
            <img
              src={pictures[previousIndex].image}
              alt={pictures[previousIndex].title}
              draggable="false"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-white/35"></div>
          </div>

          {/* Current main card */}
          <div className="absolute left-1/2 top-1/2 z-20 h-full w-full max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-gray-900 shadow-2xl sm:w-[72%]">
            <img
              src={pictures[currentIndex].image}
              alt={pictures[currentIndex].title}
              draggable="false"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-10">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-white/80">
                {pictures[currentIndex].label}
              </p>

              <h3 className="max-w-[90%] text-4xl font-black uppercase leading-tight sm:text-6xl">
                {pictures[currentIndex].title}
              </h3>
            </div>
          </div>

          {/* Next preview */}
          <div
            onClick={goToNext}
            className="absolute right-0 top-1/2 hidden h-[70%] w-[30%] -translate-y-1/2 cursor-pointer overflow-hidden rounded-3xl bg-gray-800 opacity-45 shadow-lg transition-all duration-500 hover:opacity-65 md:block"
          >
            <img
              src={pictures[nextIndex].image}
              alt={pictures[nextIndex].title}
              draggable="false"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-white/35"></div>
          </div>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-4xl font-bold text-black shadow-lg transition hover:bg-blue-600 hover:text-white sm:left-[13%]"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-4xl font-bold text-black shadow-lg transition hover:bg-blue-600 hover:text-white sm:right-[13%]"
        >
          ›
        </button>
      </div>

      <div className="mt-7 flex justify-center gap-2">
        {pictures.map((picture, index) => (
          <button
            type="button"
            key={picture.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-10 bg-blue-600"
                : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default PortraitCarousel;
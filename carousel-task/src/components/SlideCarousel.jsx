function SlideCarousel({ pictures = [] }) {
    return (
      <section className="mx-auto mt-16 w-full max-w-6xl">
        <div className="mb-6 text-center">  
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Slide Carousel
          </h2>
        </div>
  
        <div className="overflow-x-auto scroll-smooth rounded-3xl bg-black p-5">
          <div className="flex gap-4">
            {pictures.map((picture) => (
              <div
                key={picture.id}
                className="relative h-[480px] min-w-[75%] overflow-hidden rounded-2xl bg-gray-800 sm:min-w-[40%] lg:min-w-[30%]"
              >
                <img
                  src={picture.image}
                  alt={picture.title}
                  className="h-full w-full object-cover"
                />
  
                <div className="absolute inset-0 bg-black/35"></div>
  
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
                    {picture.label}
                  </p>
  
                  <h3 className="text-4xl font-black uppercase">
                    {picture.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default SlideCarousel;